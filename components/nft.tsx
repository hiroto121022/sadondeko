import useLocale from "../components/locale"
import { useState, useEffect } from "react";
import { client } from "../lib/client";
import { contract } from "../lib/contract";
import { FaArrowRight, FaProjectDiagram, FaEthereum } from "react-icons/fa";
import { estimateGasCost } from "thirdweb";
import { useActiveAccount ,useWalletBalance, TransactionButton, useReadContract,  MediaRenderer } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { getNFT, getClaimConditionById, claimTo } from "thirdweb/extensions/erc1155";
import { getContractMetadata } from "thirdweb/extensions/common";
import { isWithinRadius, Coordinates } from "./locationUtils";

// あるtokenIDのNFTの値段をGas Cost込で計算する
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

// addressがtokenIdのNFTを所持しているか確認し、所持していればNFTの画像を表示、所持していなければSampleと上に被せて表示する
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

// addressがtokenId:1のNFTを所持しているかどうか確認し、所持している場合は表示する
export const NftEvolve = ({ address }: { address: string }) => {
  const [ownsToken, setOwnsToken] = useState<boolean | null>(null);

  const { t } = useLocale();

  const { data, isLoading } = useReadContract({
    contract,
    method: "function balanceOf(address account, uint256 id) view returns (uint256)",
    params: [address, BigInt(1)],
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
        <div className="flex flex-wrap sm:mb-0 lg:mb-10">
          <div className="w-full lg:w-1/2 md:pb-10 pb-0">
            <div className="pl-6 pt-0 md:pt-8">
              <div className="font-bold md:text-3xl text-2xl py-4 mx-auto"><NftName tokenId={BigInt(1)} /></div>
              <p className="mt-6 md:text-xl text-lg"><NftDesription tokenId={BigInt(1)} /></p>
              <div className="font-bold md:text-3xl text-2xl py-4 mx-auto text-center mt-6"><NftCheckText address={address} tokenId={BigInt(1)} /></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex justify-center">
              <NftCheck address={address} tokenId={BigInt(1)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <a href="/about" className="inline-flex items-center justify-center justify-between gap-4 p-5 text-xl font-medium text-slate-800 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
            <FaEthereum size={30} className="text-sadondeko" />
            <span className="">{t.NFT_EVOLVE}</span>
            <FaArrowRight size={30} className="text-sadondeko" />
          </a> 
        </div>
      )}
    </div>
  );
};

// addressがtokenIdsの順番にNFTを所持しているか確認し、所持しているもののデータを表示する
export const NftOwnershipCheck = ({ address, tokenIds }: { address: string, tokenIds: bigint[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastOwnedTokenId, setLastOwnedTokenId] = useState<bigint | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState<boolean>(true);
  const { t } = useLocale();

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
    return <div>{t.LOADING}</div>;
  }

  return (
    <div className="mb-20">
      {lastOwnedTokenId !== null ? (
        <div className="flex flex-wrap mb-10">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="flex flex-col sm:flex-row justify-center items-center">
              <div className="font-bold md:text-5xl text-4xl py-4 mx-auto"><NftName tokenId={lastOwnedTokenId} /></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-4">
            <div className="flex justify-center"><NftImage tokenId={lastOwnedTokenId} /></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap mb-10">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="flex flex-col sm:flex-row justify-center items-center">
              <div className="font-bold md:text-5xl text-4xl py-4 mx-auto">{t.MYPAGE_MINARAI}</div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-4">
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
        </div>
      )}
    </div>
  );
};

// addressがtokenIdのNFTを所持しているかどうか確認し、所持していれば購入済み、所持していなければアカウントのwalletを確認し、購入金額に達していれば購入ボタンを表示する
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

// addressがtokenIdのNFTを所持しているかどうか確認し、所持していれば購入済み、所持していなければアカウントのwalletを確認し、購入金額に達していてかつ特定の場所にいる場合に購入ボタンを表示する
export const ClaimButtonGeo = ({
  address,
  tokenId,
  targetLatitude,
  targetLongitude,
  radius,
}: {
  address: string;
  tokenId: bigint;
  targetLatitude: number;
  targetLongitude: number;
  radius: number;
}) => {
  const [price, setPrice] = useState('');
  const [balance, setBalance] = useState('');
  const [gasprice, setGasPrice] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [supply, setSupply] = useState('');
  const [ownsToken, setOwnsToken] = useState<boolean | null>(null);
  const [isWithinRange, setIsWithinRange] = useState(false);

  const targetLocation: Coordinates = {
    latitude: targetLatitude,
    longitude: targetLongitude,
  };

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
        console.error('Error getting price or balance:', error);
        setIsLoading(false);
      }
    };

    const checkLocation = async () => {
      try {
        const result = await isWithinRadius(targetLocation, radius);
        setIsWithinRange(result);
      } catch (error) {
        console.error("位置情報の取得に失敗しました:", error);
        setIsWithinRange(false);
      }
    };

    fetchPriceAndBalance();
    checkLocation();

    const fetchPrice = async () => {
      const conditionId = BigInt(0);
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
  }, [contract, tokenId, address, client, balanceOf, balanceOfLoading, balanceWallet, balanceWalletLoading, radius, targetLocation]);

  const mintCost = BigInt(price) + BigInt(gasprice);

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
            isWithinRange ? (
              <TransactionButton
                transaction={() => {
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
              <p>{t.OUT_OF_RANGE}</p>
            )
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

// tokenIdのNFTの画像を表示する
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

// tokenIdのNFTの画像をSampleの文字を被せて表示する
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

// tokenIdのNFTの名前を表示する
export const NftName = ({ tokenId }: { tokenId: bigint }) => {
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
    return <>{t.LOADING}</>;
  }
  return <>{nft.metadata.name}</>;
};

// tokenIdのNFTの説明を表示する
export const NftDesription = ({ tokenId }: { tokenId: bigint }) => {
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
    return <>{t.LOADING}</>;
  }
  return <>{nft.metadata.description}</>;
};

// addressがtokenIdのNFTを所持しているか確認し、所持していれば購入済み、所持していなければ購入していない、という文字を表示する
export const NftCheckText = ({ address, tokenId }: { address: string, tokenId: bigint }) => {
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
    <>
      {ownsToken !== null && ownsToken ? (
        <>{t.NFT_BUYED}</>
      ) : (
        <>{t.NFT_NOT_BUYED}</>
      )}
    </>
  );
};

// tokenIdのNFTが何個購入されたか表示する
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