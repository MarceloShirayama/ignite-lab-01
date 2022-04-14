import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { apolloCliente } from '../lib/apollo'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloCliente}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  )
}

export default MyApp
