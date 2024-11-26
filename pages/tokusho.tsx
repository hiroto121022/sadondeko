// Your component with tabs and pagination
import { useState, useEffect } from "react";
import Head from "next/head";
import Container from "../components/container";
import { FaImage, FaArrowRight, FaUsers } from "react-icons/fa";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { motion } from 'framer-motion'
import { getAllPostsForHome } from "../lib/api";
import build from "next/dist/build";

export default function ABOUT({ allPosts: { edges }, preview }) {
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
        <title>プロジェクト説明 | さどんでこNFT</title>
        <meta
          property="description"
          content="さどんでこNFTプロジェクトの概要ページです。佐渡の鬼太鼓に魅了された新潟大学生5人が、「NFTアートで鬼太鼓おんでこを盛り上げたい」という思いから活動が始まりました。新潟大学生が佐渡の伝統文化「鬼太鼓」をデジタルアート（NFT）に落とし込むことで、「鬼太鼓」の認知を広め、文化継承を実現するために活動しています。"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:description"
          content="さどんでこNFTプロジェクトの概要ページです。佐渡の鬼太鼓に魅了された新潟大学生5人が、「NFTアートで鬼太鼓おんでこを盛り上げたい」という思いから活動が始まりました。新潟大学生が佐渡の伝統文化「鬼太鼓」をデジタルアート（NFT）に落とし込むことで、「鬼太鼓」の認知を広め、文化継承を実現するために活動しています。"
        />
        <meta
          property="og:image"
          content="https://www.sadondeko.com/wp-content/uploads/2024/07/sadondeko-2-edited.png"
        />
        <meta
          property="og:title"
          content="プロジェクト説明 | さどんでこNFTプロジェクト"
        />
        <meta
          property="og:url"
          content="https://sadondeko.com/about/"
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
          content="さどんでこNFTプロジェクトの概要ページです。佐渡の鬼太鼓に魅了された新潟大学生5人が、「NFTアートで鬼太鼓おんでこを盛り上げたい」という思いから活動が始まりました。新潟大学生が佐渡の伝統文化「鬼太鼓」をデジタルアート（NFT）に落とし込むことで、「鬼太鼓」の認知を広め、文化継承を実現するために活動しています。"
        />
        <meta
          property="twitter:title"
          content="プロジェクト説明 | さどんでこNFTプロジェクト"
        />
        <meta
          property="twitter:url"
          content="https://sadondeko.com/about/"
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
        <section className="flex-col md:flex-row flex items-center md:justify-between md:pt-8 pt-12 mb-16 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 md:text-left text-center">
            <span className="inline-block">特定商取引法に</span>
            <span className="inline-block">基づく表記</span>
          </h1>
        </section>
        <section className="px-4">
          <table className="min-w-full border-collapse border border-gray-200 table-auto">
            <tbody>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">販売者名称</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">小出豊</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">所在地</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">請求があった場合、遅滞なく開示します。</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">電話番号</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">請求があった場合、遅滞なく開示します。</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">メールアドレス</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">contact@sadondeko.com</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">運営統括責任者</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">小出豊</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">追加手数料等の追加料金</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">追加手数料はありません。</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">交換及び返品</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">＜お客様都合の返品・交換の場合＞<br />発送処理前の商品：クレジット決済の中断をしていただければ発送はされません。<br />発送処理後の商品：商品到着後 10 日以内に以下のメールアドレス（メールアドレス：contact@sadondeko.com）にご連絡いただいた場合に限り、返金いたします。発送処理後10日以降の商品の、返品はお受けしておりません。
                                                                  <br />＜商品に不備がある場合＞<br />返金又は新しい商品と交換いたします。以下のメールアドレス（メールアドレス：contact@sadondeko.com）までご連絡ください。
                </td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">引渡時期</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">注文後すぐにご確認いただけます。</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">受付可能な決済手段</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">クレジットカードのみ</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">決済期間</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">クレジットカード決済のみのため、ただちに処理されます。</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">販売価格</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">￥5,000(消費税込み)</td>
              </tr>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left w-1/5">販売数量の制限</th>
                <td className="border border-gray-300 px-4 py-2 w-4/5">先着50名様までの限定販売です。お一人様1個のみ購入可能です。</td>
              </tr>
            </tbody>
          </table>
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