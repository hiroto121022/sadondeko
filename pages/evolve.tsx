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
import { NftEvolve } from "../components/nft";

export default function EVOLVE({ preview }) {

  const account = useActiveAccount();

  const { t } = useLocale();
  return (
    <Animation>
      <Layout preview={preview}>
        <Head>
          <title>{t.EVOLVE_TITLE}</title>
        </Head>
        <Container>
          <section className="flex-col md:flex-row flex items-center md:justify-between md:pt-8 pt-12 mb-16 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 md:text-left text-center">
              {t.EVOLVE_TITLE}
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
                  {t.EVOLVE_heading_1}
                </h2>
                <NftEvolve address={account.address} tokenIds={[BigInt(0), BigInt(1)]} />
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