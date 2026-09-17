import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://dijay.netlify.app';

export default defineConfig({
  site,
  integrations: [sitemap()],
  image: {
    domains: [],
    remotePatterns: [],
  },
});
