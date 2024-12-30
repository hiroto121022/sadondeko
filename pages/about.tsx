import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import useLocale from "../components/locale";
import Animation from "../components/animation";

export default function ABOUT({ preview }) {

  const { t } = useLocale()

  return (
    <Animation>
      <Layout preview={preview}>
        <Head>
          <title>{t.PROJECTTITLE}</title>
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
            content={t.PROJECTTITLE}
          />
          <meta
            property="og:url"
            content="https://nft.sadondeko.com/about/"
          />
          <meta
            property="og:site_name"
            content="さどんでこNFTプロジェクト"
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
            content={t.PROJECTTITLE}
          />
          <meta
            property="twitter:url"
            content="https://nft.sadondeko.com/about/"
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
        <Container>
          <section className="flex-col md:flex-row flex items-center md:justify-between md:pt-8 pt-12 mb-16 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 md:text-left text-center">
              {t.ABOUT_TITLE}
            </h1>
          </section>
          <section className="px-4">

            <div className="flex flex-wrap sm:mb-0 mb-10 lg:mb-10">
              <div className="w-full lg:w-1/2">
                <div className="px-4 pb-8 md:pb-8 pt-0 md:pt-8">
                  <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.ABOUT_HEAD_1}</div>
                  <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_1}</p>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex justify-center">
                  <img 
                    src="https://www.sadondeko.com/wp-content/uploads/2024/11/IMG_3833-scaled.jpg"
                    alt="Sadondeko Project"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:mb-0 mb-10 lg:mb-10 hidden md:flex">
              <div className="w-full lg:w-1/2">
                <div className="flex justify-center">
                  <img 
                    src="https://www.sadondeko.com/wp-content/uploads/2024/11/IMG_4675.jpg"
                    alt="Sadondeko Project"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="px-4 pb-8 md:pb-8 pt-0 md:pt-8">
                  <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.ABOUT_HEAD_2}</div>
                  <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_2}</p>
                  <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_3}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap sm:mb-0 mb-10 lg:mb-10 md:hidden">
              <div className="w-full lg:w-1/2">
                <div className="px-4 pb-8 md:pb-8 pt-0 md:pt-8">
                  <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.ABOUT_HEAD_2}</div>
                  <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_2}</p>
                  <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_3}</p>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex justify-center">
                  <img 
                    src="https://www.sadondeko.com/wp-content/uploads/2024/11/IMG_4675.jpg"
                    alt="Sadondeko Project"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:mb-0 mb-10 lg:mb-10">
              <div className="w-full lg:w-1/2">
                <div className="px-4 pb-8 md:pb-8 pt-0 md:pt-8">
                  <div className="font-bold md:text-3xl text-2xl py-4 mx-auto">{t.ABOUT_HEAD_3}</div>
                  <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_4}</p>
                  <p className="mt-6 md:text-xl text-lg">{t.ABOUT_TEXT_5}</p>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex justify-center">
                  <img 
                    src={t.ABOUT_IMAGE_3}
                    alt="Sadondeko Project"
                  />
                </div>
              </div>
            </div>
            </section>
        </Container>
      </Layout>
    </Animation>
  );
}