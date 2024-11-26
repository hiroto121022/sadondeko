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
          content="https://www.sadondeko.com/about/"
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
          content="https://www.sadondeko.com/about/"
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
            <span className="inline-block">さどんでこNFT</span>
            <span className="inline-block">プロジェクトとは</span>
          </h1>
        </section>
        <section className="px-4">
          <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
            プロジェクト概要
          </h2>
          <img 
            src="https://www.sadondeko.com/wp-content/uploads/2024/08/鷲崎の方々との今までの交流-2.jpeg"
            alt="交流"
            className="mx-auto w-[70%]"
          />
          <p className="px-4 mb-6 leading-10 text-xl md:text-2xl">
           <span className="inline-block">このプロジェクトは、</span>
           <span className="inline-block">2023年9月から</span>
           <span className="inline-block">2024年1月</span>
           <span className="inline-block">にかけて</span>
           <span className="inline-block">開催された</span>
           <span className="inline-block">「第2回ローカルイノベーションプログラムin佐渡」</span>
           <span className="inline-block">に参加した</span>
           <span className="inline-block">新潟大学の</span>
           <span className="inline-block">学生たち</span>
           <span className="inline-block">によって</span>
           <span className="inline-block">立ち上げられました。</span>
           <span className="inline-block">このプログラム</span>
           <span className="inline-block">を通じて、</span>
           <span className="inline-block">私たちは</span>
           <span className="inline-block">佐渡の</span>
           <span className="inline-block">伝統文化</span>
           <span className="inline-block">である</span>
           <span className="inline-block">「鬼太鼓（おんでこ）」</span>
           <span className="inline-block">に出会い、</span>
           <span className="inline-block">その風貌、音、そして迫力ある動きに</span>
           <span className="inline-block">その風貌、</span>
           <span className="inline-block">音、</span>
           <span className="inline-block">そして</span>
           <span className="inline-block">迫力ある</span>
           <span className="inline-block">動きに</span>
           <span className="inline-block">魅了されました。</span>
           <span className="inline-block">また、</span>
           <span className="inline-block">鬼太鼓を</span>
           <span className="inline-block">きっかけに</span>
           <span className="inline-block">佐渡の</span>
           <span className="inline-block">皆さんと</span>
           <span className="inline-block">深く交流し、</span>
           <span className="inline-block">佐渡を</span>
           <span className="inline-block">佐渡を「第二の故郷」</span>
           <span className="inline-block">と感じる</span>
           <span className="inline-block">ようにも</span>
           <span className="inline-block">なりました。</span>
           <span className="inline-block">中でも、</span>
           <span className="inline-block">佐渡の</span>
           <span className="inline-block">鷲崎集落の</span>
           <span className="inline-block">本田さん</span>
           <span className="inline-block">には特に</span>
           <span className="inline-block">親しくして</span>
           <span className="inline-block">いただき、</span>
           <span className="inline-block">本田さんから</span>
           <span className="inline-block">「鷲崎の</span>
           <span className="inline-block">鬼太鼓を</span>
           <span className="inline-block">存続させる</span>
           <span className="inline-block">ために</span>
           <span className="inline-block">さまざまな</span>
           <span className="inline-block">取り組みを</span>
           <span className="inline-block">しているが、</span>
           <span className="inline-block">なかなか</span>
           <span className="inline-block">上手く</span>
           <span className="inline-block">いかない。</span>
           <span className="inline-block">若い</span>
           <span className="inline-block">人たちから</span>
           <span className="inline-block">新しい</span>
           <span className="inline-block">アイデアを</span>
           <span className="inline-block">もらいたい」</span>
           <span className="inline-block">とのお話を</span>
           <span className="inline-block">いただきました。</span>
           <span className="inline-block">私たちは、</span>
           <span className="inline-block">鬼太鼓</span>
           <span className="inline-block">を通して</span>
           <span className="inline-block">多くの</span>
           <span className="inline-block">楽しい</span>
           <span className="inline-block">思い出を</span>
           <span className="inline-block">いただいた</span>
           <span className="inline-block">本田さん</span>
           <span className="inline-block">に感謝を</span>
           <span className="inline-block">込めて、</span>
           <span className="inline-block">新潟の</span>
           <span className="inline-block">大学生</span>
           <span className="inline-block">として</span>
           <span className="inline-block">鬼太鼓</span>
           <span className="inline-block">の継承</span>
           <span className="inline-block">に向けて</span>
           <span className="inline-block">何か</span>
           <span className="inline-block">できる</span>
           <span className="inline-block">ことは</span>
           <span className="inline-block">ないか</span>
           <span className="inline-block">と考え</span>
           <span className="inline-block">ました。</span>
           <span className="inline-block">同じ思いを抱くチームメンバーとともに</span>
           <span className="inline-block">アイデアを出し合い、</span> 
           <span className="inline-block">有識者へのヒアリングや</span>
           <span className="inline-block">佐渡の皆さんとの話し合いを</span>
           <span className="inline-block">重ねた結果、</span>
           <span className="inline-block">鬼太鼓の魅力が詰まった</span>
           <span className="inline-block">デジタルアートを制作し、</span>
           <span className="inline-block">それを広めることで、</span>
           <span className="inline-block">より多くの人に</span>
           <span className="inline-block">鬼太鼓を知ってもらえる</span>
           <span className="inline-block">のではないか</span>
           <span className="inline-block">と考えました。</span>
           <span className="inline-block">また、デジタルアートが</span>
           <span className="inline-block">現地で「進化する」</span>
           <span className="inline-block">という機能を持たせることで、</span>
           <span className="inline-block">そのデジタルアートを</span>
           <span className="inline-block">手にした人々が</span>
           <span className="inline-block">佐渡を訪れ、</span>
           <span className="inline-block">実際の鬼太鼓を</span>
           <span className="inline-block">見に来るきっかけも</span>
           <span className="inline-block">生まれると</span>
           <span className="inline-block">期待しています。</span>
           <span className="inline-block">佐渡には</span>
           <span className="inline-block">100を超える</span>
           <span className="inline-block">集落があり、</span>
           <span className="inline-block">それぞれが</span>
           <span className="inline-block">特有の鬼太鼓を</span>
           <span className="inline-block">伝統として</span>
           <span className="inline-block">受け継いでいます。</span>
           <span className="inline-block">現在は</span>
           <span className="inline-block">鷲崎集落の皆さん</span>
           <span className="inline-block">と協力して</span>
           <span className="inline-block">プロジェクトを</span>
           <span className="inline-block">進めていますが、</span>
           <span className="inline-block">将来的には</span>
           <span className="inline-block">佐渡のすべての集落に</span>
           <span className="inline-block">それぞれの</span>
           <span className="inline-block">鬼太鼓アートが存在し、</span>
           <span className="inline-block">佐渡が</span>
           <span className="inline-block">「鬼太鼓アートの島」</span>
           <span className="inline-block">となるような</span>
           <span className="inline-block">未来を目指しています。</span>
           <span className="inline-block">鬼太鼓の</span>
           <span className="inline-block">文化継承に向け、</span>
           <span className="inline-block">全力で</span>
           <span className="inline-block">取り組んでまいります！</span>
          </p>
          <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
            デジタルアートの特徴
          </h2>
          <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">
           <span className="inline-block">実際に</span>
           <span className="inline-block">佐渡に</span>
           <span className="inline-block">訪れることで、</span>
           <span className="inline-block">動きと</span>
           <span className="inline-block">音が</span>
           <span className="inline-block">追加され</span>
           <span className="inline-block">アートが</span>
           <span className="inline-block">進化します</span>
          </p>
          <img 
            src="https://www.sadondeko.com/wp-content/uploads/2024/10/画像1.png"
            alt="進化"
            className="mx-auto w-[100%]"
          />
          <p className="px-8 mb-6 leading-10 text-lg md:text-xl">
           <span className="inline-block">＊現在は</span>
           <span className="inline-block">進化</span>
           <span className="inline-block">バージョン</span>
           <span className="inline-block">「おんでこ名人」</span>
           <span className="inline-block">を制作中</span>
           <span className="inline-block">です。</span>
          </p>

            <section className="mb-18"></section>        
        <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
           <span className="inline-block">あなたが</span>
           <span className="inline-block">鬼太鼓に</span>
           <span className="inline-block">貢献できる</span>
           <span className="inline-block">こと</span>
        </h2>
        <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">
          <span className="inline-block">①鬼太鼓アートを</span>
          <span className="inline-block">友達に</span>
          <span className="inline-block">共有して、</span>
          <span className="inline-block">鬼太鼓が</span>
          <span className="inline-block">日本中・</span>
          <span className="inline-block">世界中に</span>
          <span className="inline-block">広がる</span>
        </p>
        <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">
          <span className="inline-block">②鬼太鼓アートを</span>
          <span className="inline-block">きっかけに</span>
          <span className="inline-block">実際に</span>
          <span className="inline-block">鬼太鼓を</span>
          <span className="inline-block">見に行くことで、</span>
          <span className="inline-block">鬼太鼓の</span>
          <span className="inline-block">祭りが</span>
          <span className="inline-block">盛り上がる</span>
        </p>
        <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">
           <span className="inline-block">③たとえ鬼太鼓が</span>
           <span className="inline-block">途絶えてしまった</span>
           <span className="inline-block">としても、</span>
           <span className="inline-block">鬼太鼓の姿を</span>
           <span className="inline-block">再現した</span>
           <span className="inline-block">アートを</span>
           <span className="inline-block">あなたが</span>
           <span className="inline-block">持っているだけで、</span>
           <span className="inline-block">伝統文化が</span>
           <span className="inline-block">受け継がれていく。</span>
        </p>
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