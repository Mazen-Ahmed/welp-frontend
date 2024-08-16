import createNextIntlPlugin from  'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
          protocol: 'https',
          hostname: 'welp-prod.s3.amazonaws.com',
          port: '',
          pathname: '/media/**'
        }]
      },
      output: "standalone",
      
      reactStrictMode: false,
};

export default withNextIntl(nextConfig);
