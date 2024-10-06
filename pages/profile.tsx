// Your component with tabs and pagination
import { useState, useEffect } from "react";
import { useWalletBalance } from "thirdweb/react";
import { client } from "../lib/client";
import { contract } from "../lib/contract";
import { defineChain } from "thirdweb/chains";
import { getNFT } from "thirdweb/extensions/erc1155";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { ConnectButton, TransactionButton, useReadContract, useActiveAccount, MediaRenderer } from "thirdweb/react";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getClaimConditionById, claimTo } from "thirdweb/extensions/erc1155";
import { estimateGasCost } from "thirdweb";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { motion } from 'framer-motion'
import { getAllPostsForHome } from "../lib/api";

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

export default function PROFILE({ allPosts: { edges }, preview }) {

  const account = useActiveAccount();

  return (
    <motion.div
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }}    // アンマウント時
      transition={{ duration: 1 }} // アニメーションの持続時間を1秒に設定
    >
      <Layout preview={preview}>
        <Head>
          <title>プロフィール | さどんでこNFT</title>
        </Head>
        <Container>
          <section className="flex-col md:flex-row flex items-center md:justify-between md:pt-8 pt-12 mb-16 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 md:text-left text-center">
              プロフィール
            </h1>
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
              <div className="justify-center mb-20">
                <h2 className="mb-8s text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                  あなたのステータス
                </h2>
                <NftOwnershipCheck address={account.address} tokenIds={[BigInt(0)]} />
                <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                  NFT購入履歴
                </h2>
                <div className="justify-center mb-10 sm:mb-1">
                  <hr className="mb-10"></hr>
                  <div className="flex flex-wrap sm:mb-0 lg:mb-10">
                    <div className="w-full lg:w-1/2 md:pb-10 pb-0">
                      <div className="pl-6 pt-0 md:pt-8">
                        <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">Ondeko Art ： 第一進化</div>
                        <p className="mt-6 md:text-xl text-lg">佐渡・鷲崎の「鬼太鼓」を題材にしたアート作品。鬼太鼓は、太鼓の音に合わせて鬼が踊る佐渡の伝統文化である。鬼太鼓は、鬼の踊り、太鼓の音、掛け声で構成されている。鬼の模様やお面は、鷲崎の「鬼太鼓」を忠実に再現している。背景には雄獅子と雌獅子、トビシマカンゾウが描かれている。</p>
                        <div className="font-bold md:text-3xl text-2xl py-4 mx-auto text-center mt-6"><NftCheckText address={account.address} tokenId={BigInt(0)} /></div>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                      <div className="flex justify-center">
                        <NftCheck address={account.address} tokenId={BigInt(0)} />
                      </div>
                    </div>
                  </div>
                  <hr className="mb-10"></hr>
                  <h1 className="text-center text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
                    第2進化、最終進化は順次公開予定です。
                  </h1>
                </div>
              </div>
              ) : (
                <div className="h-[70vh] max-md:h-[30vh] mx-auto">
                  <div className="text-center text-xl top-1/2 relative">
                    <p className="text-center">ウォレットが接続されていません。右上ボタンからウォレットを接続してください。</p>
                  </div>
                </div>
              )}
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
    <div className="mb-20">
      {lastOwnedTokenId !== null ? (
        <div className='flex flex-wrap justify-center'>
          <div className="font-bold md:text-3xl text-2xl py-4 mx-auto"><NftName tokenId={lastOwnedTokenId} /></div>
          <div className="flex justify-center"><NftImage tokenId={lastOwnedTokenId} /></div>
        </div>
      ) : (
        <div className='flex flex-col flex-wrap justify-center'>
          <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">おんでこ見習い</div>
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
          return priceNumber.toFixed(18).replace(/\.?0+$/, '');
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

export const NftCheckText = ({ address, tokenId }: { address: string, tokenId: bigint }) => {
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
    <>
      {ownsToken !== null && ownsToken ? (
        <>購入済みです</>
      ) : (
        <>購入していません</>
      )}
    </>
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