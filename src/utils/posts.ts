import { getCollection } from 'astro:content';
import readingTime from 'reading-time';

/**
 * Extract slug from post ID.
 * Post IDs follow the pattern: "YYYY-MM-DD-title/index.mdx" or "YYYY-MM-DD-title.mdx"
 * Returns just the title portion (e.g., "how-to-design-animation")
 */
export function getSlugFromId(id: string): string {
  // Remove directory suffix like "/index" or file extension
  const clean = id.replace(/\/index$/, '').replace(/\.mdx?$/, '');
  // Remove date prefix
  return clean.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/**
 * Extract date string from post ID.
 * Returns "YYYY-MM-DD" format.
 */
export function getDateFromId(id: string): string {
  const match = id.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : '';
}

/**
 * Get reading time stats from post body text.
 */
export function getReadingTime(body: string) {
  return readingTime(body);
}

/**
 * Generate an excerpt from MDX body text by stripping markdown syntax.
 */
export function getExcerpt(body: string, maxLength = 140): string {
  const text = body
    // Remove import statements
    .replace(/^import\s.+$/gm, '')
    // Remove JSX/HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove markdown headings
    .replace(/^#{1,6}\s+/gm, '')
    // Remove markdown images
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove markdown links (keep text)
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    // Remove bold/italic
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove footnotes
    .replace(/\[\^[^\]]+\]/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

/**
 * Get all published (non-draft, non-hidden) posts sorted by date descending.
 */
export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => {
    return !data.draft && !data.hide;
  });
  return posts.sort((a, b) => {
    const dateA = getDateFromId(a.id);
    const dateB = getDateFromId(b.id);
    return dateB.localeCompare(dateA);
  });
}

/**
 * Get all posts in a given series, sorted by date ascending.
 */
export async function getSeriesPosts(seriesName: string) {
  const posts = await getCollection('posts', ({ data }) => {
    return data.series === seriesName && !data.draft;
  });
  return posts.sort((a, b) => {
    const dateA = getDateFromId(a.id);
    const dateB = getDateFromId(b.id);
    return dateA.localeCompare(dateB);
  });
}
