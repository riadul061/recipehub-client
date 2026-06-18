/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: { remotePatterns: [{ hostname: "**", protocol: "https" }] },
};
export default nextConfig;