import Head from "next/head";
import Image from "next/image";
import { motion } from 'framer-motion'
import { FaArrowRight, FaProjectDiagram } from "react-icons/fa";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { getAllPostsForHome } from "../lib/api";
import styles from "./index.module.css";

export default function Index({ allPosts: { edges }, preview }) {
  const allPosts = edges.slice(0);
  const targetCategoryId = 223;
  const filteredPosts = allPosts.filter(post =>
    post.node.categories.edges.some(category =>
      category.node.categoryId === targetCategoryId
    )
  );
  const sadondekoPosts = filteredPosts.slice(0, 3);
  const image = (
    <Image
      alt="さどんでこNFTプロジェクト"
      src="/favicon/sadondeko.png"
      width={836}
      height={469}
      className="mx-auto"
    />
  );
  const nft_image = (
    <Image
      alt="さどんでこNFTプロジェクト"
      src="/favicon/nft.png"
      width={1000}
      height={1000}
      className="absolute inset-0 h-full max-md:w-full object-left left-[42vw] max-md:left-[25%] object-cover top-12 md:top-16 opacity-80"
    />
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} // 初期状態
        animate={{ opacity: 1 }} // マウント時
        exit={{ opacity: 0 }}    // アンマウント時
        transition={{ duration: 1 }} // アニメーションの持続時間を1秒に設定
      >
        <Layout preview={preview}>
          <Head>
            <title>さどんでこNFTプロジェクト</title>
            <meta
              property="description"
              content="佐渡の鬼太鼓に魅了された新潟大学生5人が、「NFTアートで鬼太鼓おんでこを盛り上げたい」という思いから活動が始まりました。新潟大学生が佐渡の伝統文化「鬼太鼓」をデジタルアート（NFT）に落とし込むことで、「鬼太鼓」の認知を広め、文化継承を実現するために活動しています。"
            />
            <meta
              property="og:type"
              content="website"
            />
            <meta
              property="og:description"
              content="佐渡の鬼太鼓に魅了された新潟大学生5人が、「NFTアートで鬼太鼓おんでこを盛り上げたい」という思いから活動が始まりました。新潟大学生が佐渡の伝統文化「鬼太鼓」をデジタルアート（NFT）に落とし込むことで、「鬼太鼓」の認知を広め、文化継承を実現するために活動しています。"
            />
            <meta
              property="og:image"
              content="https://wordpress.sadondeko.com/wp-content/uploads/2024/07/sadondeko-2-edited.png"
            />
            <meta
              property="og:title"
              content="さどんでこNFTプロジェクト"
            />
            <meta
              property="og:url"
              content="https://sadondeko.com"
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
              content="佐渡の鬼太鼓に魅了された新潟大学生5人が、「NFTアートで鬼太鼓おんでこを盛り上げたい」という思いから活動が始まりました。新潟大学生が佐渡の伝統文化「鬼太鼓」をデジタルアート（NFT）に落とし込むことで、「鬼太鼓」の認知を広め、文化継承を実現するために活動しています。"
            />
            <meta
              property="twitter:title"
              content="さどんでこNFTプロジェクト"
            />
            <meta
              property="twitter:url"
              content="https://sadondeko.com"
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
          <section className={styles.section_top}>
          {nft_image}
          <div className="absolute bg-[#f5f5f5] w-[105%] h-[150%] right-[40%] -top-[17%] rotate-[-15deg]"></div>
            <div className={styles.section_inner}>
              <div className={styles.img_area}>
                {image}
              </div>
              <div className={styles.text_area}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 font-zen-antique">
                  <span className="inline-block">さどんでこNFT</span>
                  <span className="inline-block">プロジェクト</span>
                </h1>
                <h2 className="mt-6 ml-4 text-sadondeko text-2xl md:text-3xl tracking-tighter leading-tight md:pr-8 font-zen-antique">
                  <span className="inline-block">デジタルアートで</span>
                  <span className="inline-block">佐渡の</span>
                  <span className="inline-block"><ruby>鬼太鼓<rt>おんでこ</rt></ruby>の</span>
                  <span className="inline-block">継承を</span>
                  <span className="inline-block">目指す</span>
                </h2>
              </div>
            </div>
          </section>
          <Container>
            <section className="mb-28">
              <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                プロジェクト概要
              </h2>
              <h3 className="mt-6 ml-4 text-xl md:text-2xl leading-relaxed md:pr-8">
                  <span className="inline-block">佐渡の<ruby>鬼太鼓<rt>おんでこ</rt></ruby>に</span>
                  <span className="inline-block">魅了された</span>
                  <span className="inline-block">新潟大学生5人が、</span>
                  <span className="inline-block">「NFTアートで</span>
                  <span className="inline-block"><ruby>鬼太鼓<rt>おんでこ</rt></ruby>を</span>
                  <span className="inline-block">盛り上げたい」</span>
                  <span className="inline-block">という思いから</span>
                  <span className="inline-block">活動が始まりました。</span>
              </h3>
              <h3 className="mt-6 ml-4 text-xl md:text-2xl leading-relaxed md:pr-8">
                  <span className="inline-block font-bold">新潟大学生</span>
                  <span className="inline-block">が</span>
                  <span className="inline-block">佐渡の伝統文化</span>
                  <span className="inline-block">「<span className="font-bold"><ruby>鬼太鼓<rt>おんでこ</rt></ruby></span>」を</span>
                  <span className="inline-block"><span className="font-bold">デジタルアート</span>（NFT）に</span>
                  <span className="inline-block">落とし込むことで、</span>
                  <span className="inline-block">「<ruby>鬼太鼓<rt>おんでこ</rt></ruby>」の</span>
                  <span className="inline-block">認知を広め、</span>
                  <span className="inline-block font-bold">文化継承を実現</span>
                  <span className="inline-block">するために</span>
                  <span className="inline-block">活動しています。</span>
              </h3>
              <h2 className="mt-12 mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                デジタルアート（NFT）の特徴
              </h2>
              <h3 className="mt-6 ml-4 text-2xl md:text-3xl leading-relaxed md:pr-8">
                1．3段階の<span className="font-bold">進化</span>があります
              </h3>
              <img 
                src="https://wordpress.sadondeko.com/wp-content/uploads/2024/07/%E3%81%95%E3%81%A9%E3%82%93%E3%81%A7%E3%81%93%E3%82%A2%E3%83%BC%E3%83%88-34.png"
                alt="進化"
                className="mx-auto w-[80%]"
              />
              <h3 className="mt-6 ml-4 text-2xl md:text-3xl leading-relaxed md:pr-8">
                2．佐渡での活動の<span className="font-bold">許可証</span>になります
              </h3>
              <p className="mt-6 ml-8 text-xl md:text-2xl leading-relaxed md:pr-8">
                  <span className="inline-block">農産物の購入や</span>
                  <span className="inline-block">祭りの参加など、</span>
                  <span className="inline-block">佐渡の方々と</span>
                  <span className="inline-block">関わる機会を</span>
                  <span className="inline-block">得ることができます。</span>
                  <span className="inline-block">進化するほど、</span>
                  <span className="inline-block">佐渡の方々と</span>
                  <span className="inline-block">より深い関係を</span>
                  <span className="inline-block">築くことが</span>
                  <span className="inline-block">できます。</span>
              </p>
              <div className="flex justify-center mt-10">
                <a href="/about" className="inline-flex items-center justify-center justify-between gap-4 p-5 text-xl font-medium text-slate-800 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <FaProjectDiagram size={30} className="text-sadondeko" />
                    <span className="">プロジェクトの詳細はこちら</span>
                    <FaArrowRight size={30} className="text-sadondeko" />
                </a> 
              </div>
            </section>
            <section>
              <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                お知らせ
              </h2>
              {sadondekoPosts.length > 0 && <MoreStories posts={sadondekoPosts} />}
            </section>
          </Container>
        </Layout>
      </motion.div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};
