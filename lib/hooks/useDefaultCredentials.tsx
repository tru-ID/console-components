import React, { ReactNode, useContext, useEffect, useState } from "react";

export interface DefaultCredentialsInterface {
  clientId: string;
  clientSecret: string;
  dataResidency: string;
}

export interface DefaultCredentialsContextInterface
  extends DefaultCredentialsInterface {
  setCredentials: (credentials: DefaultCredentialsInterface) => void;
  setClientSecret: (secret: string) => void;
  clearCredentials: () => void;
}

const DefaultCredentialsContext = React.createContext<
  Partial<DefaultCredentialsContextInterface>
>({});

export const useDefaultCredentials = () =>
  useContext(DefaultCredentialsContext);

export interface DefaultCredentialsProviderProps {
  children: ReactNode;
  defaultClientId?: string;
  defaultClientSecret?: string;
  defaultDataResidency?: string;
}

export function DefaultCredentialsProvider({
  children,
  defaultClientId = "",
  defaultClientSecret = "",
  defaultDataResidency = "",
}: DefaultCredentialsProviderProps) {
  const [clientId, setClientId] = useState<string>(defaultClientId);
  const [clientSecret, setClientSecret] = useState<string>(defaultClientSecret);
  const [dataResidency, setDataResidency] =
    useState<string>(defaultDataResidency);
  useEffect(() => {
    setClientId(defaultClientId);
    setClientSecret(defaultClientSecret);
    setDataResidency(defaultDataResidency);
  }, [defaultClientId, defaultClientSecret, defaultDataResidency]);
  const setCredentials = (credentials: DefaultCredentialsInterface) => {
    const {
      clientId: cId,
      clientSecret: cSecret,
      dataResidency: DR,
    } = credentials;
    if (cId) {
      localStorage.setItem("default_workspace_client_id", cId);
      setClientId(cId);
    }
    if (cSecret) {
      localStorage.setItem("default_workspace_client_secret", cSecret);
      setClientSecret(cSecret);
    }
    if (DR) {
      setDataResidency(DR);
    }
  };
  const setSecret = (secret: string) => {
    localStorage.setItem("default_workspace_client_secret", secret);
    setClientSecret(secret);
  };
  const clearCredentials = () => {
    localStorage.removeItem("default_workspace_client_id");
    localStorage.removeItem("default_workspace_client_secret");
    setClientSecret(undefined);
    setClientId(undefined);
    setDataResidency(undefined);
  };
  useEffect(() => {
    const cSecret = localStorage.getItem("default_workspace_client_secret");
    if (cSecret) {
      setClientSecret(cSecret);
    }
    const cId = localStorage.getItem("default_workspace_client_id");
    if (cId) {
      setClientId(cId);
    }
  }, []);
  return (
    <DefaultCredentialsContext.Provider
      value={{
        clientId,
        clientSecret,
        dataResidency,
        setCredentials,
        setClientSecret: setSecret,
        clearCredentials,
      }}
    >
      {children}
    </DefaultCredentialsContext.Provider>
  );
}
