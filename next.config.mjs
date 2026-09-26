/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = "";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repoName = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  repo = `/${repoName}`;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || repo || "";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
