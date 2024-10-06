import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Tags from "../../components/tags";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import 'swiper/swiper-bundle.css';

export default function Post({ post, posts, preview }) {
  const router = useRouter();
  const morePosts = posts?.edges?.slice(0) || [];

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const targetCategoryId = 223;
  const filteredPosts = morePosts.filter(post => 
    post.node.categories.edges.some(category => 
      category.node.categoryId === targetCategoryId
    )
  );
  const sadondekoPosts = filteredPosts.slice(0, 3);

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.seo.title}
                </title>
                <meta
                  property="description"
                  content={post.seo.opengraphDescription}
                />
                <meta
                  property="og:type"
                  content="article"
                />
                <meta
                  property="og:description"
                  content={post.seo.opengraphDescription}
                />
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
                <meta
                  property="og:title"
                  content={post.seo.title}
                />
                <meta
                  property="og:url"
                  content="https://sadondeko.com/news/"
                />
                <meta
                  property="og:site_name"
                  content="さどんでこNFTプロジェクト"
                />
                <meta
                  property="article:published_time"
                  content={post.date}
                />
                <meta
                  name="twitter:card"
                  content="summary_large_image"
                />
                <meta
                  property="twitter:description"
                  content={post.seo.opengraphDescription}
                />
                <meta
                  property="twitter:title"
                  content={post.seo.title}
                />
                <meta
                  property="twitter:url"
                  content="https://sadondeko.com/news/"
                />
                <meta
                  property="twitter:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
                <meta
                  property="twitter:domain"
                  content="sadondeko.com"
                />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
              こちらの記事もいかがですか
            </h2>
            {sadondekoPosts.length > 0 && <MoreStories posts={sadondekoPosts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  };
};
