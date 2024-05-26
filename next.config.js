/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

module.exports = {
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000", "https://miniature-chainsaw-grr9r7r7r9q39qrq.github.dev/"],
        },
    },
}
