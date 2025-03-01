/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    images: {
    // TODO
      unoptimized: true,
    },
    // basePath: '/game-collection',
  }
   
  export default nextConfig