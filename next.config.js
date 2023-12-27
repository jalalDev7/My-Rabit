/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'uploadthing-prod.s3.us-west-2.amazonaws.com',
          port: '',
          pathname: '/*',
        },
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: '',
          pathname: '/f/*',
        },
      ],
    },
    env: {
      KINDE_SITE_URL: process.env.KINDE_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
      KINDE_POST_LOGOUT_REDIRECT_URL:
          process.env.KINDE_POST_LOGOUT_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}`,
      KINDE_POST_LOGIN_REDIRECT_URL:
          process.env.KINDE_POST_LOGIN_REDIRECT_URL ??
          `https://${process.env.VERCEL_URL}/dashboard`
    }
  }

