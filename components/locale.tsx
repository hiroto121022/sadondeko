import { useRouter } from 'next/router'
import en from "../locales/en";
import ja from "../locales/ja";

const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === "en" ? en : ja;
  return { locale, t };
}

export default useLocale;