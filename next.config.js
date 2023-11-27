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
  }

