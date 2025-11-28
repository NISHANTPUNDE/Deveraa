import nextPWA from 'next-pwa';
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.pexels.com', 'upload.wikimedia.org', 'deveraa.com','blog.deveraa.com'],
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                    { key: "Cache-Control", value: "no-store" }
                ]
            }
        ]
    }
};

export default nextPWA({
    dest: 'public'
})(nextConfig);

