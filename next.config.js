/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'lh3.googleusercontent.com'
            }
        ],
        domains: [
            'lh3.googleusercontent.com',
            'res.cloudinary.com',
            'avatars.githubusercontent.com'
        ]
    }
}

module.exports = nextConfig
