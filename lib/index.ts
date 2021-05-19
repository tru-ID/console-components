import Balance from './components/Balance'
import DefaultCredentials from './components/DefaultCredentials'
import {
  DefaultCredentialsProvider,
  useDefaultCredentials,
} from './hooks/useDefaultCredentials'
import useWorkspace from './hooks/useWorkspace'
import theme from './theme'

export {
  theme,
  // UI components
  Balance,
  DefaultCredentials,
  // hooks
  useDefaultCredentials,
  useWorkspace,
  // providers
  DefaultCredentialsProvider,
}
