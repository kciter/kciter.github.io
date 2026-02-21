import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { getSlugFromId, getDateFromId } from '@utils/posts';
import satori from 'satori';
import sharp from 'sharp';

const NOTO_SANS_KR_BOLD = await fetch(
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-700-normal.woff'
).then(r => r.arrayBuffer());

const NOTO_SANS_KR_REGULAR = await fetch(
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-400-normal.woff'
).then(r => r.arrayBuffer());

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts');
  return posts
    .filter(post => !post.data.image)
    .map(post => ({
      params: { slug: getSlugFromId(post.id) },
      props: {
        title: post.data.title,
        date: getDateFromId(post.id),
        categories: post.data.categories,
      },
    }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, date, categories } = props as {
    title: string;
    date: string;
    categories: string;
  };

  const label =
    categories === 'thought'
      ? 'Thought'
      : categories === 'book-report'
        ? 'Book Report'
        : 'Article';

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          backgroundImage:
            'radial-gradient(ellipse 500px 350px at 70% -5%, rgba(255, 232, 199, 0.18), transparent),' +
            'radial-gradient(ellipse 600px 350px at 45% -10%, rgba(255, 0, 153, 0.08), transparent),' +
            'radial-gradient(ellipse 450px 300px at 10% -5%, rgba(0, 56, 255, 0.07), transparent),' +
            'radial-gradient(ellipse 350px 250px at 90% 5%, rgba(255, 205, 27, 0.08), transparent)',
          backgroundColor: '#fff',
          fontFamily: 'Noto Sans KR',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '50px',
                left: '60px',
                fontSize: '28px',
                fontWeight: 700,
                color: '#000',
              },
              children: 'kciter.so',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#c44da2',
                      background: 'rgba(196, 77, 162, 0.1)',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    },
                    children: label,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '16px',
                      color: '#999',
                    },
                    children: date,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: title.length > 30 ? '42px' : '52px',
                fontWeight: 700,
                color: '#212b36',
                lineHeight: 1.3,
                wordBreak: 'keep-all',
              },
              children: title,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans KR',
          data: NOTO_SANS_KR_REGULAR,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Noto Sans KR',
          data: NOTO_SANS_KR_BOLD,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
