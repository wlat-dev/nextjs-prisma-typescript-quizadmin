/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: "imgix",
    path: "https://latshawprep.imgix.net/",
  },
};

