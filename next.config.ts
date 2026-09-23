import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* «Recetas» pasó a llamarse «Fórmulas de El Floema» y cambió de dirección.
     El redirect es temporal a propósito: /recetas va a ser otra cosa (recetas
     con lo que hay en casa), y ese día se quita. */
  async redirects() {
    return [{ source: "/recetas", destination: "/formulas-el-floema", permanent: false }];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
