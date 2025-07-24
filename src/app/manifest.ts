import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EmoryLife",
    short_name: "EmoryLife",
    description:
      "Information hub for Korean community at Emory University. Or at least a place to post campus squirrel pics.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#18181b",
    icons: [
      {
        src: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  };
}
