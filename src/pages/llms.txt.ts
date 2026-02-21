import type { APIContext } from 'astro';
import { getPublishedPosts, getSlugFromId, getExcerpt } from '@utils/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const site = context.site || new URL('https://kciter.so');

  const lines: string[] = [
    '# kciter.so',
    '',
    '> A developer blog by Sunhyoup Lee, covering software engineering, modeling, animation, and more.',
    '',
    '## Articles',
    '',
    ...posts
      .filter(p => p.data.categories === 'article')
      .map(p => {
        const slug = getSlugFromId(p.id);
        const excerpt = getExcerpt(p.body || '');
        return `- [${p.data.title}](${site}posts/${slug}/): ${excerpt}`;
      }),
    '',
    '## Bookshelf',
    '',
    ...posts
      .filter(p => p.data.categories === 'book-report')
      .map(p => {
        const slug = getSlugFromId(p.id);
        return `- [${p.data.title}](${site}posts/${slug}/)`;
      }),
    '',
    '## Thought',
    '',
    ...posts
      .filter(p => p.data.categories === 'thought')
      .map(p => {
        const slug = getSlugFromId(p.id);
        return `- [${p.data.title}](${site}posts/${slug}/)`;
      }),
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
