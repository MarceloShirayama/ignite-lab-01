import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useMeQuery } from '../../graphql/generated/graphql'
import { ssrGetProducts } from '../../graphql/generated/page'
import { withApollo } from '../../lib/withApollo'

type Props = {
  user: any
  data: any
}

function Home(props: Props) {
  const { data: me } = useMeQuery()

  return (
    <div className="text-violet-500">
      <h1>Hello Ignite Lab</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    console.log(await getAccessToken(ctx.req, ctx.res))

    // return getServerPageGetProducts(null, ctx)
    return { props: {} }
  }
})

export default withApollo(ssrGetProducts.withPage()(Home))
