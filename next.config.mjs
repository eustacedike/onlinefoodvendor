/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'wmpasocwnocyextrvbpw.supabase.co', // ← replace with your actual Supabase project ref
              pathname: '/storage/v1/object/public/product-images/**',
            },
          ],
      },    
};

export default nextConfig;
