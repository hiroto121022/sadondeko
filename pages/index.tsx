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
import { FaArrowRight, FaProjectDiagram, FaEthereum } from "react-icons/fa";
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
        "discord",
        "email",
        "x",
        "phone",
        "line",
        "apple",
        "facebook",
        "telegram",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === "en" ? en : ja;
  return { locale, t };
}

export default function Index({ allPosts: { edges }, preview }) {
  const allPosts = edges.slice(0);
  const targetCategoryId = 223;
  const filteredPosts = allPosts.filter(post =>
    post.node.categories.edges.some(category =>
      category.node.categoryId === targetCategoryId
    )
  );
  const sadondekoPosts = filteredPosts.slice(0, 3);

  const { t } = useLocale();

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
      className="absolute inset-0 h-full w-full object-center object-cover opacity-80"
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
              content="2024-11-26T03:00:00+00:00"
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
          {nft_image}
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

export const NftCheck = ({ address, tokenId }: { address: string, tokenId: bigint }) => {
  const [ownsToken, setOwnsToken] = useState<boolean | null>(null);

  const { t } = useLocale();

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
    return <div>{t.LOADING}</div>;
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

  const { t } = useLocale();

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
    return <div>{t.LOADING}</div>;
  }

  return (
    <div className="md:text-xl text-lg">
      {ownsToken !== null && ownsToken ? (
        <p>{t.NFT_BUYED}</p>
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
              {t.NFT_MINT}
            </TransactionButton>
          ) : (
            <p>{t.NFT_COST}</p>
          )
        ) : (
          <p>{t.NFT_AMOUNT}</p>
        )
      )}
    </div>
  );
};

export const NftImage = ({ tokenId }: { tokenId: bigint }) => {
  const [nft, setNft] = useState<any>(null);
  const { t } = useLocale();

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
    return <div>{t.LOADING}</div>;
  }

  if (!nft.metadata.image) {
    return <div>{t.LOADING}</div>;
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
  const { t } = useLocale();

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
    return <div>{t.LOADING}</div>;
  }

  if (!nft.metadata.image) {
    return <div>{t.LOADING}</div>;
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