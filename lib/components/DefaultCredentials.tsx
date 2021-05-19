import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Box,
  BoxProps,
  Button,
  Code,
  Text,
  useClipboard,
  useToast,
} from '@chakra-ui/react'
import request from 'axios'
import React, { useRef, useState } from 'react'
import { useDefaultCredentials } from '../hooks/useDefaultCredentials'

export interface ClientSecretBoxProps {
  canResetCredentials?: boolean
}

function ClientSecretBox({ canResetCredentials = true }: ClientSecretBoxProps) {
  const { clientSecret, setClientSecret } = useDefaultCredentials()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const cancelRef = useRef(null)
  const toast = useToast()

  const resetCredentials = async () => {
    setIsResetting(true)
    try {
      const res = await request.post(
        '/api/tru/console/v0.1/workspaces/default/credentials/reset',
        null,
      )
      setClientSecret(res.data.client_secret)
      setIsModalOpen(false)
    } catch (err) {
      toast({
        title: 'An error occured resetting your credentials',
        description:
          'Please try again. If this problem persists, please contact help@tru.id',
        status: 'error',
      })
    } finally {
      setIsResetting(false)
    }
  }

  // if !canResetCredentials then it's the open source console
  // using client_credentials grant and cannot reset the client secret
  // or it will invalidate the existing session
  if (clientSecret || !canResetCredentials) {
    return (
      <Code
        data-testid="client-secret-box"
        colorScheme="blue"
        px={2}
        rounded="lg"
      >
        {clientSecret}
      </Code>
    )
  }

  return (
    <>
      <Button
        width="35"
        verticalAlign="text-top"
        isLoading={isResetting}
        loadingText="Resetting"
        size="sm"
        colorScheme="red"
        onClick={() => setIsModalOpen(true)}
        data-testid="btn-reset-credentials"
      >
        Reset
      </Button>
      <AlertDialog
        isOpen={isModalOpen}
        isCentered
        leastDestructiveRef={cancelRef}
        onClose={() => setIsModalOpen(false)}
        data-testid="dialog-reset-credentials"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="700">
              Reset Secret
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                data-testid="btn-reset-credentials-confirm"
                colorScheme="red"
                ml={3}
                onClick={resetCredentials}
              >
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

function Table(props: BoxProps) {
  return (
    <Box
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray.100"
      rounded="md"
      overflow="hidden"
    >
      <Box as="table" width="full" {...props} />
    </Box>
  )
}

function TableRow(props: BoxProps) {
  return <Box as="tr" {...props} />
}

function TableBody(props: BoxProps) {
  return <Box as="tbody" {...props} />
}

function TableCell(props: BoxProps) {
  return (
    <Box
      as="td"
      px="3"
      py="2"
      lineHeight="1.25rem"
      whiteSpace="nowrap"
      {...props}
    />
  )
}

export interface DefaultCredentialsProps {
  showCopyButtons?: boolean
  canResetCredentials?: boolean
}

export default function DefaultCredentials({
  showCopyButtons = true,
  canResetCredentials = true,
}: DefaultCredentialsProps) {
  const credentials = useDefaultCredentials()
  const { hasCopied: hasCopiedClientId, onCopy: onClientIdCopy } = useClipboard(
    credentials.clientId || '',
  )
  const { hasCopied: hasCopiedClientSecret, onCopy: onClientSecretCopy } =
    useClipboard(credentials.clientSecret || '')
  const { hasCopied: hasCopiedDataResidency, onCopy: onDataResidencyCopy } =
    useClipboard(credentials.dataResidency || '')
  return (
    <Box>
      <Table>
        <TableBody>
          <TableRow bg="white">
            <TableCell>
              <Text fontWeight="700" fontSize="sm">
                Client ID
              </Text>
            </TableCell>
            <TableCell>
              <Box fontSize="sm" color="gray.500">
                <Code colorScheme="blue" px={2} rounded="lg">
                  {credentials.clientId}
                </Code>
              </Box>
            </TableCell>
            <TableCell textAlign="right">
              <Box fontSize="sm" color="gray.500">
                {showCopyButtons && (
                  <Button onClick={onClientIdCopy} ml={2} minW={90}>
                    {hasCopiedClientId ? 'Copied' : 'Copy'}
                  </Button>
                )}
              </Box>
            </TableCell>
          </TableRow>
          <TableRow bg="gray.50">
            <TableCell>
              <Text fontWeight="700" fontSize="sm">
                Client Secret
              </Text>
            </TableCell>
            <TableCell>
              <Box fontSize="sm" color="gray.500">
                <ClientSecretBox canResetCredentials={canResetCredentials} />
              </Box>
            </TableCell>
            <TableCell textAlign="right">
              <Box fontSize="sm" color="gray.500">
                {showCopyButtons && (
                  <Button onClick={onClientSecretCopy} ml={2} minW={90}>
                    {hasCopiedClientSecret ? 'Copied' : 'Copy'}
                  </Button>
                )}
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text fontWeight="700" fontSize="sm">
                Data Residency
              </Text>
            </TableCell>
            <TableCell>
              <Box fontSize="sm" color="gray.500">
                {credentials.dataResidency}
              </Box>
            </TableCell>
            <TableCell textAlign="right">
              <Box fontSize="sm" color="gray.500">
                <Button onClick={onDataResidencyCopy} ml={2} minW={90}>
                  {hasCopiedDataResidency ? 'Copied' : 'Copy'}
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Alert mt={5} status="info" rounded="lg">
        <AlertIcon ml={2} mr={5} />
        <Box>
          <Text fontWeight="700" mb={2}>
            We don't store your secret. Keep this safe.
          </Text>
          <Text>
            Your generated secret is only stored in localStorage, if your
            browser storage is cleared and you've lost your secret you can reset
            it.
          </Text>
        </Box>
      </Alert>
    </Box>
  )
}
