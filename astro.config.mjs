import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';

/** Shiki transformer: ```js title="app.js" → pre[data-language="app.js"].has-filename */
function transformerTitle() {
  return {
    name: 'transformer-title',
    pre(node) {
      const raw = this.options.meta?.__raw;
      if (!raw) return;
      const match = raw.match(/title\s*=\s*"([^"]+)"/);
      if (!match) return;
      node.properties['data-language'] = match[1];
      node.properties.class = [
        ...(Array.isArray(node.properties.class) ? node.properties.class : []),
        'has-filename'
      ];
    }
  };
}

export default defineConfig({
  site: 'https://kciter.so',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerTitle(),
      ]
    },
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
