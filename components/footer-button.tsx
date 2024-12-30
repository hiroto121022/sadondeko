import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaProjectDiagram, FaUsers  } from "react-icons/fa";
import { useRouter } from "next/router";
import useLocale from "./locale";

const FooterButton = () => {
  const router = useRouter();
  const { locale, locales, pathname, query, asPath } = router;
  const [nav, setNav] = useState(false);
  const [show, setShow] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { t } = useLocale()

  const switchLanguage = (newLocale) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  useEffect(() => {
    if (nav) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 490); // 490msはアニメーションの長さ
      return () => clearTimeout(timer);
    }
  }, [nav]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="z-9 md:hidden flex justify-between items-center w-full h-12 sticky bottom-0 px-4 text-white bg-sadondeko nav">
      <div className="md:hidden hover:bg-skyblue h-12 px-2">
        <Link href="/about" className="flex flex-col justify-center items-center hover:text-black py-1">
          <FaProjectDiagram size={30} />
          <div className="text-[9px]">{t.ABOUT}</div>
        </Link>
      </div>
      <div className="md:hidden hover:bg-skyblue h-12 px-2">
        <Link href="/mypage" className="flex flex-col justify-center items-center hover:text-black py-1">
          <FaUsers size={30} />
          <div className="text-[9px]">{t.MYPAGE}</div>
        </Link>
      </div>
      <div className="flex items-center gap-2 md:hidden h-12 px-2">
        {locales.map((lng) => (
            <button
              key={lng}
              onClick={() => switchLanguage(lng)}
              className={`px-2 py-1 rounded ${
                lng === locale
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {lng.toUpperCase()}
            </button>
          ))}
      </div>
    </div>
  );
};

export default FooterButton;