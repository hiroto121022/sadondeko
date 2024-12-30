import { useState, useEffect } from "react";
import { client } from "../lib/client";
import { contract } from "../lib/contract";
import { wallets } from "../lib/wallets"
import { ConnectButton, useReadContract, useActiveAccount } from "thirdweb/react";
import { getClaimConditionById } from "thirdweb/extensions/erc1155";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import Animation from "../components/animation";
import useLocale from "../components/locale";
import { NftCheck, NftOwnershipCheck, NftCheckText, NftName, NftDesription, ClaimButtonGeo, NftEvolve } from "../components/nft";

export default function PROFILE({ preview }) {

  const account = useActiveAccount();

  const { t } = useLocale();
  return (
    <Animation>
      <Layout preview={preview}>
        <Head>
          <title>{t.MYPAGETITLE}</title>
        </Head>
        <Container>
          <section className="flex-col md:flex-row flex items-center md:justify-between md:pt-8 pt-12 mb-16 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 md:text-left text-center">
              {t.MYPAGE}
            </h1>
          </section>
          <section className="px-4">
            <div>
              <div className="flex justify-end mb-5 md:hidden">
                <ConnectButton
                  client={client}
                  wallets={wallets}
                  connectModal={{ size: "compact" }}
                />
              </div>
              {account && account.address ? (
              <div className="justify-center mb-20">
                <h2 className="mb-8s text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                  {t.MYPAGE_STATUS}
                </h2>
                <NftOwnershipCheck address={account.address} tokenIds={[BigInt(0), BigInt(1)]} />
                <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                  {t.MYPAGE_HISTORY}
                </h2>
                <div className="justify-center mb-10 sm:mb-1">
                  <hr className="mb-10"></hr>
                  <div className="flex flex-wrap sm:mb-0 lg:mb-10">
                    <div className="w-full lg:w-1/2 md:pb-10 pb-0">
                      <div className="pl-6 pt-0 md:pt-8">
                        <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.NFT_NAME}</div>
                        <p className="mt-6 md:text-xl text-lg">{t.NFT_DESCRIPTION}</p>
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
                  <NftEvolve address={account.address} />
                </div>
              </div>
              ) : (
                <div className="h-[70vh] max-md:h-[30vh] mx-auto">
                  <div className="text-center text-xl top-1/2 relative">
                    <p className="text-center">{t.MYPAGE_WALLET}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </Container>
      </Layout>
    </Animation>
  );
}