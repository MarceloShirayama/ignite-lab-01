import { getAccessToken } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res)

  const httpProxyOptions = {
    target: 'http://localhost:3332/graphql',
    headers: { Authorization: `Bearer ${accessToken}` }
  }

  return httpProxyMiddleware(req, res, httpProxyOptions)
}

export const config = {
  api: {
    bodyParser: false
  }
}
