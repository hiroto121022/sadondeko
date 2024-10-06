import { GetServerSideProps } from 'next';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPostsWithSlug } from '../../lib/api'; // APIからデータを取得する関数
import { formatISO } from 'date-fns';
import { xml } from 'xml';

const generateSitemap = (posts) => {
  const baseUrl = 'https://sadondeko.com'; // 自サイトのURLに変更してください

  const urls = posts.map((post) => ({
    url: [
      { loc: `${baseUrl}/posts/${post.node.slug}` },
      { lastmod: formatISO(new Date(post.node.date)) },
    ],
  }));

  return xml(
    [
      { urlset: urls },
    ],
    { declaration: true }
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const allPosts = await getAllPostsWithSlug();

  const sitemap = generateSitemap(allPosts.edges);

  context.res.setHeader('Content-Type', 'text/xml');
  context.res.write(sitemap);
  context.res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}