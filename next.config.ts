import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.apple.com" },
      { protocol: "https", hostname: "images.samsung.com" },
      { protocol: "https", hostname: "hurtel.com" },
      { protocol: "https", hostname: "media.wired.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "image.oppo.com" },
      { protocol: "https", hostname: "techtoro.io" },
      { protocol: "https", hostname: "images-cdn.ubuy.co.in" },
      { protocol: "https", hostname: "techcrunch.com" },
      { protocol: "https", hostname: "www.dell.com" },
      { protocol: "https", hostname: "encrypted-tbn1.gstatic.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "www.cnet.com" },
      { protocol: "https", hostname: "api.ecom.longines.com" },
      { protocol: "https", hostname: "www.maximawatches.com" },
      { protocol: "https", hostname: "rukminim2.flixcart.com" },
      { protocol: "https", hostname: "shop.timexindia.com" },
      { protocol: "https", hostname: "www.casio.com" },
      { protocol: "https", hostname: "www.technosport.in" },
      { protocol: "https", hostname: "www.zodiaconline.com" },
      { protocol: "https", hostname: "www.stuff.tv" },
    ],
  },
};

export default nextConfig;
