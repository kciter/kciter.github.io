import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, getSlugFromId, getDateFromId, getExcerpt } from '@utils/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'kciter.so',
    description: 'devlog',
    site: context.site!,
    customData: '<generator>Astro</generator>',
    items: posts.map(post => ({
      title: post.data.title,
      description: getExcerpt(post.body || ''),
      pubDate: new Date(getDateFromId(post.id)),
      link: `/posts/${getSlugFromId(post.id)}/`
    }))
  });
}
