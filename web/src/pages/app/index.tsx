import {
  getAccessToken,
  useUser,
  withPageAuthRequired
} from '@auth0/nextjs-auth0'
import { useGetProductsQuery } from '../../graphql/generated/graphql'
import { withApollo } from '../../lib/withApollo'

function Home() {
  const { user } = useUser()
  const { data, loading, error } = useGetProductsQuery()

  return (
    <div>
      <h1>Hello Ignite Lab</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    console.log(getAccessToken(req, res))

    return {
      props: {}
    }
  }
})

export default withApollo(Home)
