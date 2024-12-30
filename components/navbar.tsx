import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaBars, FaTimes } from "react-icons/fa";
import { client } from "../lib/client";
import { wallets } from "../lib/wallets"
import { ConnectButton } from "thirdweb/react";
import useLocale from "./locale";

const Navbar = () => {
  const router = useRouter();
  const { locale, locales, pathname, query, asPath } = router;
  const [nav, setNav] = useState(false);
  const [show, setShow] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (nav) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 490); // アニメーション用タイマー
      return () => clearTimeout(timer);
    }
  }, [nav]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { t } = useLocale()

  const links = [
    {
      id: 1,
      link: "/",
      name: t.HOME,
    },
    {
      id: 2,
      link: "/about",
      name: t.ABOUT,
    },
    {
      id: 3,
      link: "/mypage",
      name: t.MYPAGE,
    },
  ];

  const switchLanguage = (newLocale) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="z-50 flex justify-between items-center w-full h-16 sticky top-0 md:px-4 text-white bg-sadondeko nav">
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 pl-2 text-white md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      <ul
        className={`flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500 ${nav ? 'animate-slideIn' : 'animate-slideOut'} ${!show && !nav ? 'hidden' : ''}`}
      >
        {links.map(({ id, link, name }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize py-6 text-4xl"
          >
            <Link onClick={() => setNav(!nav)} href={link}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <h1 className="text-5xl font-signature md:ml-2">
          <Link
            href="/"
          >
            <Image
              src="/favicon/sadondeko.png"
              alt="Sadondeko"
              width={120}
              height={60}
              className=""
            />
          </Link>
        </h1>
      </div>
      <div className="md:hidden h-16 px-2 flex items-center">
        <ConnectButton
          client={client}
          wallets={wallets}
          connectModal={{ size: "compact" }}
        />
      </div>
      <ul className="hidden md:flex items-center">
        {links.map(({ id, link, name }) => (
          <li
            key={id}
            className="nav-links px-3 cursor-pointer capitalize text-nowrap lg:font-medium md:text-xs lg:text-base text-white hover:scale-110 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{name}</Link>
          </li>
        ))}
        <li className="nav-links pl-3">
          <ConnectButton
            client={client}
            wallets={wallets}
            connectModal={{ size: "compact" }}
          />
        </li>
        {/* 言語切り替えボタン */}
        <li className="flex items-center gap-2 px-3">
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
        </li>
      </ul>
    </div>
  );
};

export default Navbar;