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
          content="https://wordpress.sadondeko.com/wp-content/uploads/2024/07/sadondeko-2-edited.png"
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
          content="https://wordpress.sadondeko.com/wp-content/uploads/2024/07/sadondeko-2-edited.png"
        />
        <meta
          property="twitter:domain"
          content="sadondeko.com"
        />
      </Head>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between md:pt-8 pt-12 mb-16 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 md:text-left text-center">
            <span className="inline-block">さどんでこNFT</span>
            <span className="inline-block">プロジェクトとは</span>
          </h1>
        </section>
        <section className="px-4">
          <h2 className="mt-6 mb-14 text-xl md:text-2xl leading-relaxed text-center">
                  <span className="inline-block">佐渡の<ruby>鬼太鼓<rt>おんでこ</rt></ruby>に</span>
                  <span className="inline-block">魅了された新潟大学生5人が</span>
                  <span className="inline-block">「NFTアートで</span>
                  <span className="inline-block"><ruby>鬼太鼓<rt>おんでこ</rt></ruby>を盛り上げたい」</span>
                  <span className="inline-block">という思いから</span>
                  <span className="inline-block">活動を開始</span>
          </h2>
          <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
            プロジェクト概要
          </h2>

          <p className="px-4 mb-6 leading-10 text-xl md:text-2xl">新潟大学生が、佐渡の伝統文化である「<ruby>鬼太鼓<rt>おんでこ</rt></ruby>」をデジタルアートに落とし込むことで、「<ruby>鬼太鼓<rt>おんでこ</rt></ruby>」の認知を広め、文化継承を実現するために活動しています。</p>
          <p className="px-4 mb-6 leading-10 text-xl md:text-2xl">「さどんでこ」というチーム名は、「さど」+「おんでこ」を組み合わせて作りました。</p>
          <p className="px-4 mb-8 leading-10 md:mb-12 text-xl md:text-2xl md:pr-8">佐渡には<ruby>鬼太鼓<rt>おんでこ</rt></ruby>を伝統として続けている村が100箇所ほどあり、それぞれ特有の鬼太鼓の色を持っています。現在は佐渡の鷲崎という村の皆さんと協力してプロジェクトを進めていますが、最終的には、<ruby>鬼太鼓<rt>おんでこ</rt></ruby>を行っている約100箇所すべての村の皆さんと協力して、それぞれの村に<ruby>鬼太鼓<rt>おんでこ</rt></ruby>アートが存在するような<ruby>鬼太鼓<rt>おんでこ</rt></ruby>アートの島「佐渡」を目指しています。</p>
          <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
            デジタルアートの特徴
          </h2>
          <h3 className="mt-6 ml-4 text-2xl md:text-3xl leading-relaxed md:pr-8">
            佐渡を訪れることで、<span className="font-bold">デジタルアートが進化</span>がします。
          </h3>
          <img 
            src="https://wordpress.sadondeko.com/wp-content/uploads/2024/10/画像5.png"
            alt="進化"
            className="mx-auto w-[80%]"
          />
          <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">実際に佐渡を訪れ、鬼太鼓やそれを営む佐渡の皆さんの魅力に触れる一つのきっかけとなれるデジタルアートです。<ruby>鬼太鼓<rt>おんでこ</rt></ruby>アートが進化します。(佐渡に訪れないと進化することができません。)</p>
          <p className="px-8 mb-6 leading-10 text-lg md:text-xl">＊現在は進化バージョン「アート+動き」を制作中です。</p>
          <h3 className="mt-10 mb-6 ml-4 text-2xl md:text-3xl leading-relaxed md:pr-8">
            デジタルアートを所有することで<span className="font-bold">あなたが鬼太鼓に</span>貢献できること
          </h3>
          <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">①鬼太鼓アートとその進化がきっかけで、あなたが鬼太鼓の祭りに行くことで、祭りが盛り上がる</p>
          <p className="px-8 mb-6 leading-10 text-lg md:text-2xl">②鬼太鼓アートを友達に共有して、鬼太鼓が日本中、世界中に広がる</p>
          <p className="px-8 mb-6 leading-10 text-lg md:text-2xl">③万が一鬼太鼓がなくなってしまっても、実際同様の風貌で舞を踊る鬼太鼓アートをあなたが所有しているだけで、伝統文化が繋がれていく</p>
          <p className="px-8 mb-6 leading-10 text-lg md:text-xl">＊特徴を表にまとめました↓（現在は鷲崎村のみアート販売しています）</p>
          <div className="relative overflow-hidden">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixd">
              <thead className="text-base md:text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-1/3">
                    段階
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/3">
                    NFTアートの種類
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/3">
                    参加できる活動
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/3">
                    おんでこ見習い
                  </th>
                  <td className="px-6 py-4 w-1/3">
                    ドット絵
                  </td>
                  <td className="px-6 py-4 w-1/3">
                    鷲崎の農産物販売を購入できる
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/3">
                    おんでこ特待生
                  </th>
                  <td className="px-6 py-4 w-1/3">
                    アート
                  </td>
                  <td className="px-6 py-4 w-1/3">
                    鷲崎に来てNFTを進化できる
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/3">
                    おんでこ名人
                  </th>
                  <td className="px-6 py-4 w-1/3">
                    アート+動き+音
                  </td>
                  <td className="px-6 py-4 w-1/3">
                    お手伝いとして鬼太鼓の祭りに参加できる
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="px-8 mb-6 leading-10 text-lg md:text-xl">＊参加できる活動は変更する場合があります。</p>
          </div>
        </section>
        <section className="mt-44">
          <h1 className="text-center text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
            さどんでこNFTプロジェクトのNFTアートを購入してみませんか？
          </h1>
          <div className="flex justify-center mt-10">
            <a href="/nft" className="inline-flex items-center justify-center justify-between gap-4 p-5 text-xl font-medium text-slate-800 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                <FaImage size={30} className="text-sadondeko" />
                <span className="">NFT購入へ</span>
                <FaArrowRight size={30} className="text-sadondeko" />
            </a> 
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