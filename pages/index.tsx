import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";
import Container from "../components/container";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import { useRouter } from 'next/router'
import en from "../locales/en";
import ja from "../locales/ja";
import { motion } from 'framer-motion'
import { FaArrowRight, FaProjectDiagram } from "react-icons/fa";
import { GetStaticProps } from "next";
import { getAllPostsForHome } from "../lib/api";
import { useState, useEffect } from "react";
import { useWalletBalance } from "thirdweb/react";
import { client } from "../lib/client";
import { contract } from "../lib/contract";
import { defineChain } from "thirdweb/chains";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { getNFT } from "thirdweb/extensions/erc1155";
import { ConnectButton, TransactionButton, useReadContract, useActiveAccount, MediaRenderer } from "thirdweb/react";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getClaimConditionById, claimTo } from "thirdweb/extensions/erc1155";
import { estimateGasCost } from "thirdweb";

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "phone",
        "x",
        "line",
        "facebook",
        "email",
        "discord",
        "passkey",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
];

export default function Index({ allPosts: { edges }, preview }) {
  const allPosts = edges.slice(0);
  const targetCategoryId = 223;
  const filteredPosts = allPosts.filter(post =>
    post.node.categories.edges.some(category =>
      category.node.categoryId === targetCategoryId
    )
  );
  const sadondekoPosts = filteredPosts.slice(0, 3);

  useEffect(() => {
    // アプリの読み込みが完了した後の処理
    const nftContents = document.querySelector<HTMLElement>('.nft-contents');

    if (nftContents) {
      // 特定の条件をチェック（例：ユーザーがログインしているか）
      const conditionMet = true; // ここに条件を設定

      if (conditionMet) {
        nftContents.style.display = 'block';
      }
    }
  }, []);

  const account = useActiveAccount();
  // 背景画像
  const nft_image = (
    <Image
      alt="さどんでこNFTプロジェクト"
      src="https://www.sadondeko.com/wp-content/uploads/2024/11/sadondeko_project_top.webp"
      width={1280}
      height={720}
      className="absolute inset-0 w-full h-full object-center object-cover opacity-80"
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
              content="2024-11-26T03:00:00+00:00"
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
          {nft_image}
            <div className={styles.section_inner}>
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
                <span className="inline-block">進化する</span>
              </p>
              <img 
                src="https://www.sadondeko.com/wp-content/uploads/2024/10/画像1.png"
                alt="進化"
                className="mx-auto w-[80%]"
              />
              <section className="mt-10 mb-18"></section>
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
                    <span className="inline-block"><span className="font-bold">伝統文化が</span></span>
                    <span className="inline-block"><span className="font-bold">受け継がれていく。</span></span>
                  </p>
                <div className="flex justify-center mt-10">
                <a href="/about" className="inline-flex items-center justify-center justify-between gap-4 p-5 text-xl font-medium text-slate-800 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <FaProjectDiagram size={30} className="text-sadondeko" />
                    <span className="">プロジェクトの詳細はこちら</span>
                    <FaArrowRight size={30} className="text-sadondeko" />
                </a> 
              </div>
            </section>

            <section className="px-4">
            <div>
              <div className="flex justify-end mb-5 md:hidden">
                <ConnectButton
                  client={client}
                  wallets={wallets}
                  connectButton={{ label: "ウォレットを接続" }}
                  connectModal={{ size: "compact" }}
                  locale={"ja_JP"}
                />
              </div>
              {account && account.address ? (
                <div className="justify-center mb-10 sm:mb-1">
                  <hr className="mb-10"></hr>
                  <div className="flex flex-wrap sm:mb-0 lg:mb-10">
                    <div className="w-full lg:w-1/2 md:pb-10 pb-0">
                      <div className="pl-6 pt-0 md:pt-8">
                        <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">Ondeko Art ： 第一進化</div>
                        <p className="mt-6 md:text-xl text-lg">佐渡・鷲崎の「鬼太鼓」を題材にしたアート作品。鬼太鼓は、太鼓の音に合わせて鬼が踊る佐渡の伝統文化である。鬼太鼓は、鬼の踊り、太鼓の音、掛け声で構成されている。鬼の模様やお面は、鷲崎の「鬼太鼓」を忠実に再現している。背景には雄獅子と雌獅子、トビシマカンゾウが描かれている。</p>
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
                        <div className="text-xl px-10 whitespace-nowrap text-center sm:text-left">値段：<PriceComponent tokenId={BigInt(0)} /> ETH</div>
                        <div className="text-base px-5 sm:pl-0 text-center sm:text-left">＊別途Gas代が掛かります</div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-center sm:items-center">
                        <div className="text-xl px-10 whitespace-nowrap text-center sm:text-left">1個 / 1ウォレット</div>
                        <div className="text-base px-5 sm:pl-0 text-center sm:text-left">購入可能数：あと <SupplyDrop tokenId={BigInt(0)} /> 個</div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 mt-4">
                      <div className="flex justify-center">
                        <ClaimButton address={account.address} tokenId={BigInt(0)} />
                      </div>
                    </div>
                  </div>
                  <hr className="mb-10"></hr>
                  <h1 className="text-center text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
                    第2進化、最終進化は順次公開予定です。
                  </h1>
                </div>
              ) : (
                <div className="justify-center mb-10 sm:mb-1">
                  <hr className="mb-10"></hr>
                  <div className="flex flex-wrap sm:mb-0 lg:mb-10">
                    <div className="w-full lg:w-1/2">
                      <div className="pl-6 pt-0 md:pt-8">
                        <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">Ondeko Art ： 第一進化</div>
                        <p className="mt-6 md:text-xl text-lg">佐渡・鷲崎の「鬼太鼓」を題材にしたアート作品。鬼太鼓は、太鼓の音に合わせて鬼が踊る佐渡の伝統文化である。鬼太鼓は、鬼の踊り、太鼓の音、掛け声で構成されている。鬼の模様やお面は、鷲崎の「鬼太鼓」を忠実に再現している。背景には雄獅子と雌獅子、トビシマカンゾウが描かれている。</p>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <div className="flex justify-center">
                        <div className="mb-20">
                          <NftSample tokenId={BigInt(0)} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-10">
                    <div className="w-full lg:w-1/2">
                      <div className="flex flex-col sm:flex-row justify-center sm:items-center">
                        <div className="text-xl px-10 whitespace-nowrap text-center sm:text-left">値段：<PriceComponent tokenId={BigInt(0)} /> ETH</div>
                        <div className="text-base px-5 sm:pl-0 text-center sm:text-left">＊別途Gas代が掛かります</div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-center sm:items-center">
                        <div className="text-xl px-10 whitespace-nowrap text-center sm:text-left">1個 / 1ウォレット</div>
                        <div className="text-base px-5 sm:pl-0 text-center sm:text-left">購入可能数：あと <SupplyDrop tokenId={BigInt(0)} /> 個</div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 mt-4">
                      <div className="flex justify-center">
                        <ConnectButton
                          client={client}
                          wallets={wallets}
                          connectButton={{ label: "ウォレットを接続" }}
                          connectModal={{ size: "compact" }}
                          locale={"ja_JP"}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="mb-10"></hr>
                  <h1 className="text-center text-2xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
                    第2進化、最終進化は順次公開予定です。
                  </h1>
                </div>
              )}
            </div>
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

export const NftOwnershipCheck = ({ address, tokenIds }: { address: string, tokenIds: bigint[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastOwnedTokenId, setLastOwnedTokenId] = useState<bigint | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState<boolean>(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metadata = await getContractMetadata({ contract });
        setMetadata(metadata);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    fetchMetadata();
  }, []);

  const { data, isLoading: isLoadingBalance } = useReadContract({
    contract,
    method: "function balanceOf(address account, uint256 id) view returns (uint256)",
    params: [address, tokenIds[currentIndex]],
  });

  useEffect(() => {
    if (!isLoadingBalance && isChecking) {
      if (data && BigInt(data) > BigInt(0)) {
        setLastOwnedTokenId(tokenIds[currentIndex]);
        if (currentIndex < tokenIds.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setIsChecking(false); // 全てのトークンIDをチェックしたので終了
        }
      } else {
        setIsChecking(false); // 所持していないトークンIDが見つかったので終了
      }
    }
  }, [data, isLoadingBalance, isChecking, currentIndex, tokenIds]);

  if (isLoadingBalance || isLoadingMetadata) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="mb-10">
      {lastOwnedTokenId !== null ? (
        <div className='flex flex-wrap justify-center'>
          <h3><NftName tokenId={lastOwnedTokenId} /></h3>
          <div className="flex justify-center"><NftImage tokenId={lastOwnedTokenId} /></div>
        </div>
      ) : (
        <div className='flex flex-wrap justify-center'>
          <h3>おんでこ見習い</h3>
          <div className="flex justify-center">
            <MediaRenderer
              client={client}
              src={metadata?.image || 'fallback_image_path'}
              alt="NFT Image"
              height="80%"
              width="80%"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const PriceComponent = ({ tokenId }: { tokenId: bigint }) => {
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchPrice = async () => {
      const conditionId = BigInt(1);
      try {
        const result = await getClaimConditionById({
          contract,
          tokenId: BigInt(tokenId),
          conditionId: conditionId,
        });

        const formatPrice = (priceBigInt: bigint) => {
          let priceString = priceBigInt.toString();
          let priceNumber = parseFloat(priceString) / 1e18;
          return priceNumber.toFixed(3).replace(/\.?0+$/, '');
        };

        const priceNumber = formatPrice(result.pricePerToken);
        setPrice(priceNumber);
      } catch (error) {
        console.error('Error getting price:', error);
      }
    };

    fetchPrice();
  }, [contract, tokenId]);

  return (
    <>{price}</>
  );
};

export const SupplyDrop = ({ tokenId }: { tokenId: bigint }) => {
  const [supply, setSupply] = useState('');

  useEffect(() => {
    const fetchPrice = async () => {
      const conditionId = BigInt(1);
      try {
        const result = await getClaimConditionById({
          contract,
          tokenId: BigInt(tokenId),
          conditionId: conditionId,
        });

        const priceNumber = result.maxClaimableSupply - result.supplyClaimed
        setSupply(priceNumber.toString());
      } catch (error) {
        console.error('Error getting price:', error);
      }
    };

    fetchPrice();
  }, [contract, tokenId]);

  return (
    <>{supply}</>
  );
};

export const NftCheck = ({ address, tokenId }: { address: string, tokenId: bigint }) => {
  const [ownsToken, setOwnsToken] = useState<boolean | null>(null);

  const { data, isLoading } = useReadContract({
    contract,
    method: "function balanceOf(address account, uint256 id) view returns (uint256)",
    params: [address, tokenId],
  });

  useEffect(() => {
    if (!isLoading) {
      if (data && BigInt(data) > BigInt(0)) {
        setOwnsToken(true);
      } else {
        setOwnsToken(false);
      }
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="mb-20">
      {ownsToken !== null && ownsToken ? (
        <NftImage tokenId={tokenId} />
      ) : (
        <NftSample tokenId={tokenId} />
      )}
    </div>
  );
};

export const ClaimButton = ({ address, tokenId }: { address: string, tokenId: bigint }) => {
  const [price, setPrice] = useState('');
  const [balance, setBalance] = useState('');
  const [gasprice, setGasPrice] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [supply, setSupply] = useState('');
  const [ownsToken, setOwnsToken] = useState<boolean | null>(null);

  const { data: balanceOf, isLoading: balanceOfLoading } = useReadContract({
    contract,
    method: "function balanceOf(address account, uint256 id) view returns (uint256)",
    params: [address, tokenId],
  });

  const { data: balanceWallet, isLoading: balanceWalletLoading } = useWalletBalance({
    chain: defineChain(1),
    address: address,
    client,
  });

  useEffect(() => {
    const fetchPriceAndBalance = async () => {
      const conditionId = BigInt(1);
      try {
        //Claim Conditionを読み込む
        const result = await getClaimConditionById({
          contract,
          tokenId: BigInt(tokenId),
          conditionId: conditionId,
        });

        setPrice(result.pricePerToken.toString());

        const transaction = claimTo({
          contract,
          to: address,
          tokenId: tokenId,
          quantity: BigInt(1),
        });

        const gasCost = await estimateGasCost({ transaction });

        setGasPrice(gasCost.wei.toString());

        setIsLoading(false);
      } catch (error) {
        console.error('Error getting price or balance:');
        setIsLoading(false);
      }
    };
    fetchPriceAndBalance();

    const fetchPrice = async () => {
      const conditionId = BigInt(1);
      try {
        const result = await getClaimConditionById({
          contract,
          tokenId: BigInt(tokenId),
          conditionId: conditionId,
        });

        const priceNumber = result.maxClaimableSupply - result.supplyClaimed
        setSupply(priceNumber.toString());
      } catch (error) {
        console.error('Error getting price:', error);
      }
    };
    fetchPrice();

    if (!balanceOfLoading) {
      if (balanceOf && BigInt(balanceOf) > BigInt(0)) {
        setOwnsToken(true);
      } else {
        setOwnsToken(false);
      }
    }

    if (!balanceWalletLoading) {
      if (balanceWallet && balanceWallet.value) {
        setBalance(balanceWallet.value.toString());
      } else {
        setBalance('0');
      }
    }

  }, [contract, tokenId, address, client, balanceOf, balanceOfLoading, balanceWallet, balanceWalletLoading]);

  const mintCost = BigInt(price) + BigInt(gasprice)

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="md:text-xl text-lg">
      {ownsToken !== null && ownsToken ? (
        <p>購入済みです</p>
      ) : (
        BigInt(supply) > 0 ? (

          BigInt(balance) > mintCost ? (
            <TransactionButton
              transaction={() => {
                // Create a transaction object and return it
                const tx = claimTo({
                  contract,
                  to: address,
                  tokenId: tokenId,
                  quantity: BigInt(1),
                });
                return tx;
              }}
              onTransactionSent={(result) => {
                console.log("Transaction submitted", result.transactionHash);
              }}
              onTransactionConfirmed={(receipt) => {
                console.log("Transaction confirmed", receipt.transactionHash);
              }}
              onError={(error) => {
                console.error("Transaction error", error);
              }}
            >
              NFTを購入する
            </TransactionButton>
          ) : (
            <p>ウォレットに十分な資産がありません</p>
          )
        ) : (
          <p>購入上限に達しました</p>
        )
      )}
    </div>
  );
};

export const NftName = ({ tokenId }: { tokenId: bigint }) => {
  const [nft, setNft] = useState<any>(null);

  useEffect(() => {
    const fetchNFT = async () => {
      const nftData = await getNFT({
        contract,
        tokenId: tokenId,
      });
      setNft(nftData);
    };

    fetchNFT();
  }, [tokenId]);

  if (!nft) {
    return <>NFTデータの読み込み中</>;
  }
  return <>{nft.metadata.name}</>;
};

export const NftDescription = ({ tokenId }: { tokenId: bigint }) => {
  const [nft, setNft] = useState<any>(null);

  useEffect(() => {
    const fetchNFT = async () => {
      const nftData = await getNFT({
        contract,
        tokenId: tokenId,
      });
      setNft(nftData);
    };

    fetchNFT();
  }, [tokenId]);

  if (!nft) {
    return <>NFTデータの読み込み中</>;
  }
  return <>{nft.metadata.description}</>;
};

export const NftImage = ({ tokenId }: { tokenId: bigint }) => {
  const [nft, setNft] = useState<any>(null);

  useEffect(() => {
    const fetchNFT = async () => {
      const nftData = await getNFT({
        contract,
        tokenId: tokenId,
      });
      setNft(nftData);
    };

    fetchNFT();
  }, [tokenId]);

  if (!nft) {
    return <div>NFTデータの読み込み中...</div>;
  }

  if (!nft.metadata.image) {
    return <div>画像を読み込み中...</div>;
  }

  return (
    <div className="flex justify-center">
      <MediaRenderer
        client={client}
        src={nft.metadata.image}
        alt="NFT Image"
        height='90%'
        width='90%'
      />
    </div>
  );
};

export const NftSample = ({ tokenId }: { tokenId: bigint }) => {
  const [nft, setNft] = useState<any>(null);

  useEffect(() => {
    const fetchNFT = async () => {
      const nftData = await getNFT({
        contract,
        tokenId: tokenId,
      });
      setNft(nftData);
    };

    fetchNFT();
  }, [tokenId]);

  if (!nft) {
    return <div>NFTデータの読み込み中...</div>;
  }

  if (!nft.metadata.image) {
    return <div>画像を読み込み中...</div>;
  }

  return (
    <div className="relative flex justify-center">
      <MediaRenderer
        client={client}
        src={nft.metadata.image}
        className='opacity-50'
        alt="NFT Image"
        height='90%'
        width='90%'
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-black text-7xl font-bold opacity-90 transform rotate-45 select-none pointer-events-none">sample</span>
      </div>
    </div>
  );
};

export const NftBalance = ({ address, tokenId }: { address: string, tokenId: bigint }) => {
	const { data, isLoading } = useReadContract({
	  contract, 
	  method: "function balanceOf(address account, uint256 id) view returns (uint256)", 
	  params: [address, tokenId]
	});

  if (isLoading) {
    return null; // 読み込み中は何も表示しない（必要に応じて変更）
  }

  const hasBalance = data && BigInt(data) > BigInt(0);

  return <>{hasBalance}</>;
};