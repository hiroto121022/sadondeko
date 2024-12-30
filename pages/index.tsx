import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import Container from "../components/container";
import Layout from "../components/layout";
import useLocale from "../components/locale"
import Animation from "../components/animation";
import { PriceComponent, NftCheck, ClaimButton, NftSample } from "../components/nft";
import { FaArrowRight, FaProjectDiagram, FaEthereum } from "react-icons/fa";
import { useEffect } from "react";
import { wallets } from "../lib/wallets"
import { client } from "../lib/client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";

export default function Index({ preview }) {

  const { t } = useLocale();
  const account = useActiveAccount();

  useEffect(() => {
    // アプリの読み込みが完了した後の処理
    const nftContents = document.querySelector<HTMLElement>('.nft-contents');

    if (nftContents) {
      // 特定の条件をチェック
      const conditionMet = true; // ここに条件を設定

      if (conditionMet) {
        nftContents.style.display = 'block';
      }
    }
  }, []);  

  // トップの画像
  const top_image = (
    <Image
      alt="さどんでこNFTプロジェクト"
      src="https://www.sadondeko.com/wp-content/uploads/2024/11/sadondeko_project_top.webp"
      width={1280}
      height={720}
      className="absolute inset-0 h-full w-full object-center object-cover opacity-80"
    />
  );

  return (
    <>
      <Animation>
        <Layout preview={preview}>
          <Head>
            <title>Sadondeko NFT Project</title>
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
              content="Sadondeko NFT Project"
            />
            <meta
              property="og:url"
              content="https://nft.sadondeko.com"
            />
            <meta
              property="og:site_name"
              content="Sadondeko NFT Project"
            />
            <meta
              property="article:published_time"
              content="2024-12-18T03:00:00+00:00"
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
              content="Sadondeko NFT Project"
            />
            <meta
              property="twitter:url"
              content="https://nft.sadondeko.com"
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
          <section className={styles.section_top}>
            {top_image}
            <div className={styles.section_inner}>
              <div className={styles.text_area}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 font-zen-antique">
                  <span className="inline-block">Sadondeko NFT Project</span>
                </h1>
                <h2 className="mt-6 ml-4 mr-2 text-sadondeko text-2xl md:text-3xl tracking-tighter leading-tight md:pr-8 font-zen-antique">
                  {t.SUBTITLE}
                </h2>
              </div>
            </div>
          </section>
          <Container>
            <section className="mb-10">
              <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                {t.PROJECTABOUT}
              </h2>
              <h3 className="mt-6 ml-4 text-xl md:text-2xl leading-relaxed md:pr-8">
                {t.PROJECTTEXT}
              </h3>
              <h2 className="mt-12 mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                {t.HOME_HEAD_1}
              </h2>
              <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">
                {t.HOME_TEXT_1}
              </p>
              <img 
                src={t.HOME_IMAGE_1}
                alt="進化"
                className="mx-auto w-[80%]"
              />
            </section>
            <section className="mb-10">
              <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                {t.HOME_HEAD_2}
              </h2>
              <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">
                {t.HOME_TEXT_2}
              </p>
              <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">
                {t.HOME_TEXT_3}
              </p>
              <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">
                {t.HOME_TEXT_4}
              </p>
              <div className="flex justify-center mt-10">
                <a href="/about" className="inline-flex items-center justify-center justify-between gap-4 p-5 text-xl font-medium text-slate-800 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                  <FaProjectDiagram size={30} className="text-sadondeko" />
                  <span className="">{t.ABOUT_BUTTON}</span>
                  <FaArrowRight size={30} className="text-sadondeko" />
                </a> 
              </div>
            </section>
            <hr className="mb-10"></hr>
            <div>
              <h1 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                {t.NFT_HEAD_1}
              </h1>
              <section className="px-4 mb-10">
                <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
                  {t.NFT_HEAD_2}
                </h2>
                <p className="px-8 mb-6 leading-10 text-xl md:text-2xl">
                  {t.OPENSEA_TEXT}
                </p>
                <div className="flex justify-center mt-10">
                  <a href="https://opensea.io/assets/ethereum/0x801e6db4cc08f436032297bc32d1eede67133515/0/" className="inline-flex items-center justify-center justify-between gap-4 p-5 text-xl font-medium text-slate-800 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <FaEthereum size={30} className="text-sadondeko" />
                    <span className="">{t.OPENSEA_BUTTON}</span>
                    <FaArrowRight size={30} className="text-sadondeko" />
                  </a>
                </div>
              </section>
              <section className="px-4 mb-10">
                <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
                  {t.NFT_HEAD_3}
                </h2>
                {account && account.address ? (
                  // ログイン時
                  <div className="justify-center mb-10 sm:mb-1">
                    <div className="flex flex-wrap sm:mb-0 lg:mb-10">
                      <div className="w-full lg:w-1/2 md:pb-10 pb-0">
                        <div className="pl-6 pt-0 md:pt-8">
                          <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.NFT_NAME}</div>
                          <p className="mt-6 md:text-xl text-lg">{t.NFT_DESCRIPTION}</p>
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2">
                        <div className="flex justify-center">
                          <NftCheck address={account.address} tokenId={BigInt(0)} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-10">
                      <div className="w-full lg:w-1/2">
                        <div className="flex flex-col sm:flex-row justify-center sm:items-center">
                          <div className="text-xl px-10 whitespace-nowrap text-center sm:text-left">{t.NFT_PRICE}<PriceComponent tokenId={BigInt(0)} /> ETH</div>
                          <div className="text-base px-5 sm:pl-0 text-center sm:text-left">{t.NFT_GAS}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center sm:items-center">
                          <div className="text-xl px-10 whitespace-nowrap text-center sm:text-left">{t.NFT_WALLET}</div>
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2 mt-4">
                        <div className="flex justify-center">
                          <ClaimButton address={account.address} tokenId={BigInt(0)} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // 未ログイン時
                  <div className="justify-center mb-10 sm:mb-1">
                    <hr className="mb-10"></hr>
                    <div className="flex flex-wrap sm:mb-0 lg:mb-10">
                      <div className="w-full lg:w-1/2">
                        <div className="pl-6 pt-0 md:pt-8">
                          <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.NFT_NAME}</div>
                          <p className="mt-6 md:text-xl text-lg">{t.NFT_DESCRIPTION}</p>
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2">
                        <div className="flex justify-center">
                          <div className="mb-10">
                            <NftSample tokenId={BigInt(0)} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-10">
                      <div className="w-full lg:w-1/2">
                        <div className="flex flex-col sm:flex-row justify-center sm:items-center">
                          <div className="text-xl px-10 whitespace-nowrap text-center sm:text-left">{t.NFT_PRICE}<PriceComponent tokenId={BigInt(0)} /> ETH</div>
                          <div className="text-base px-5 sm:pl-0 text-center sm:text-left">{t.NFT_GAS}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center sm:items-center">
                          <div className="text-xl px-10 whitespace-nowrap text-center sm:text-left">{t.NFT_WALLET}</div>
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2 mt-4">
                        <div className="flex justify-center">
                          <ConnectButton
                            client={client}
                            wallets={wallets}
                            connectModal={{ size: "compact" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </Container>
        </Layout>
      </Animation>
    </>
  );
}