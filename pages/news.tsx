// Your component with tabs and pagination
import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { motion } from 'framer-motion'
import { getAllPostsForHome } from "../lib/api";

export default function NEWS({ allPosts: { edges }, preview }) {
  const [activeTab, setActiveTab] = useState(223);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

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
        <title>お知らせ | さどんでこNFTプロジェクト</title>
        <meta
          property="description"
          content="さどんでこNFTプロジェクトのお知らせページです。佐渡の鬼太鼓に魅了された新潟大学生5人が、「NFTアートで鬼太鼓おんでこを盛り上げたい」という思いから活動が始まりました。新潟大学生が佐渡の伝統文化「鬼太鼓」をデジタルアート（NFT）に落とし込むことで、「鬼太鼓」の認知を広め、文化継承を実現するために活動しています。"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:description"
          content="さどんでこNFTプロジェクトのお知らせページです。佐渡の鬼太鼓に魅了された新潟大学生5人が、「NFTアートで鬼太鼓おんでこを盛り上げたい」という思いから活動が始まりました。新潟大学生が佐渡の伝統文化「鬼太鼓」をデジタルアート（NFT）に落とし込むことで、「鬼太鼓」の認知を広め、文化継承を実現するために活動しています。"
        />
        <meta
          property="og:image"
          content="https://www.sadondeko.com/wp-content/uploads/2024/07/sadondeko-2-edited.png"
        />
        <meta
          property="og:title"
          content="お知らせ | さどんでこNFTプロジェクト"
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
          content="2024-08-18T03:00:00+00:00"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          property="twitter:description"
          content="さどんでこNFTプロジェクトのお知らせページです。佐渡の鬼太鼓に魅了された新潟大学生5人が、「NFTアートで鬼太鼓おんでこを盛り上げたい」という思いから活動が始まりました。新潟大学生が佐渡の伝統文化「鬼太鼓」をデジタルアート（NFT）に落とし込むことで、「鬼太鼓」の認知を広め、文化継承を実現するために活動しています。"
        />
        <meta
          property="twitter:title"
          content="お知らせ | さどんでこNFTプロジェクト"
        />
        <meta
          property="twitter:url"
          content="https://sadondeko.com/news/"
        />
        <meta
          property="twitter:image"
          content="https://www.sadondeko.com/wp-content/uploads/2024/07/sadondeko-2-edited.png"
        />
        <meta
          property="twitter:domain"
          content="sadondeko.com"
        />
      </Head>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between md:pt-8 pt-4 mb-16 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
            お知らせ
          </h1>
        </section>

        {/* Tabs */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 mx-2 py-2 font-bold text-lg ${activeTab === 223 ? 'text-blue-500 text-2xl border-b-4 border-blue-500' : 'text-gray-700 text-lg'}`}
            onClick={() => handleTabClick(223)}
          >
            さどんでこNFT 活動報告
          </button>
          <button
            className={`px-4 mx-2 py-2 font-bold text-lg ${activeTab === 225 ? 'text-blue-500 text-2xl border-b-4 border-blue-500' : 'text-gray-700 text-lg'}`}
            onClick={() => handleTabClick(225)}
          >
            さどんでこNFT 技術部門
          </button>
        </div>

        {/* Posts */}
        {currentPosts.length > 0 && <MoreStories posts={currentPosts} />}

        {/* Pagination */}
        <div className="flex justify-center mt-8 mb-16 pb-6">
          <nav className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-1 font-bold ${currentPage === index + 1 ? 'bg-blue-500 text-white text-lg' : 'bg-gray-200 text-gray-700 text-base'}`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
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