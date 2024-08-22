import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import bookshop from "@bookshop/astro-bookshop";
import tailwind from "@astrojs/tailwind";
import alpine from "@astrojs/alpinejs";
import { autoAddRoseyTags } from "./src/autoAddRoseyTags";

// https://astro.build/config
export default defineConfig({
  site: "https://tiny-jackal.cloudvent.net/",
  integrations: [react(), tailwind(), bookshop(), alpine()],
  markdown: {
    rehypePlugins: [autoAddRoseyTags],
  },
});
