// Your component with tabs and pagination
import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "../components/container";
import { FaImage, FaArrowRight, FaUsers } from "react-icons/fa";
import Layout from "../components/layout";
import { motion } from 'framer-motion'
import { getAllPostsForHome } from "../lib/api";
import { useRouter } from 'next/router'
import en from "../locales/en";
import ja from "../locales/ja";

export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === "en" ? en : ja;
  return { locale, t };
}

export default function ABOUT({ allPosts: { edges }, preview }) {
  const [activeTab, setActiveTab] = useState(223);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const { t } = useLocale()

  // Filter posts by active category and paginate
  const filteredPosts = edges
    .filter(post =>
      post.node.categories.edges.some(category =>
        category.node.categoryId === activeTab
      )
    );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Scroll to the top when the page number changes
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <motion.div
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }}    // アンマウント時
      transition={{ duration: 1 }} // アニメーションの持続時間を1秒に設定
    >
    <Layout preview={preview}>
      <Head>
        <title>{t.PROJECTTITLE}</title>
        <meta
          property="description"
          content={t.ABOUT_TEXT_1}
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:description"
          content={t.ABOUT_TEXT_1}
        />
        <meta
          property="og:image"
          content="https://www.sadondeko.com/wp-content/uploads/2024/07/sadondeko-2-edited.png"
        />
        <meta
          property="og:title"
          content={t.PROJECTTITLE}
        />
        <meta
          property="og:url"
          content="https://nft.sadondeko.com/about/"
        />
        <meta
          property="og:site_name"
          content="さどんでこNFTプロジェクト"
        />
        <meta
          property="article:published_time"
          content="2024-08-18T03:00:00+00:00"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="twitter:description"
          content={t.ABOUT_TEXT_1}
        />
        <meta
          property="twitter:title"
          content="プロジェクト説明 | さどんでこNFTプロジェクト"
        />
        <meta
          property="twitter:url"
          content="https://nft.sadondeko.com/about/"
        />
        <meta
          property="twitter:image"
          content="https://www.sadondeko.com/wp-content/uploads/2024/07/sadondeko-2-edited.png"
        />
        <meta
          property="twitter:domain"
          content="nft.sadondeko.com"
        />
      </Head>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between md:pt-8 pt-12 mb-16 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 md:text-left text-center">
            {t.ABOUT_TITLE}
          </h1>
        </section>
        <section className="px-4">

          <div className="flex flex-wrap sm:mb-0 mb-10 lg:mb-10">
            <div className="w-full lg:w-1/2">
              <div className="px-4 pb-8 md:pb-8 pt-0 md:pt-8">
                <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.ABOUT_HEAD_1}</div>
                <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_1}</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="flex justify-center">
                <img 
                  src="https://www.sadondeko.com/wp-content/uploads/2024/11/IMG_3833-scaled.jpg"
                  alt="Sadondeko Project"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:mb-0 mb-10 lg:mb-10 hidden md:flex">
            <div className="w-full lg:w-1/2">
              <div className="flex justify-center">
                <img 
                  src="https://www.sadondeko.com/wp-content/uploads/2024/11/IMG_4675.jpg"
                  alt="Sadondeko Project"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="px-4 pb-8 md:pb-8 pt-0 md:pt-8">
                <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.ABOUT_HEAD_2}</div>
                <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_2}</p>
                <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_3}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap sm:mb-0 mb-10 lg:mb-10 md:hidden">
            <div className="w-full lg:w-1/2">
              <div className="px-4 pb-8 md:pb-8 pt-0 md:pt-8">
                <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.ABOUT_HEAD_2}</div>
                <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_2}</p>
                <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_3}</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="flex justify-center">
                <img 
                  src="https://www.sadondeko.com/wp-content/uploads/2024/11/IMG_4675.jpg"
                  alt="Sadondeko Project"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:mb-0 mb-10 lg:mb-10">
            <div className="w-full lg:w-1/2">
              <div className="px-4 pb-8 md:pb-8 pt-0 md:pt-8">
                <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.ABOUT_HEAD_3}</div>
                <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_4}</p>
                <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_5}</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="flex justify-center">
                <img 
                  src={t.ABOUT_IMAGE_3}
                  alt="Sadondeko Project"
                />
              </div>
            </div>
          </div>
          </section>

      </Container>
    </Layout>
    </motion.div>
  );
}

export const getStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};