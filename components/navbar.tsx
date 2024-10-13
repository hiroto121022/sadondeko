import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUsers } from "react-icons/fa";
import { client } from "../lib/client";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { ConnectButton } from "thirdweb/react";

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

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [show, setShow] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (nav) {
      setShow(true);
    } else {
      // アニメーションを適用する前に少し待つ
      const timer = setTimeout(() => setShow(false), 490); // 500msはアニメーションの長さ
      return () => clearTimeout(timer);
    }
  }, [nav]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const links = [
    {
      id: 1,
      link: "https://sadondeko.com/news",
      name: "お知らせ",
    },
    {
      id: 2,
      link: "https://sadondeko.com/about",
      name: "プロジェクト説明",
    },
    {
      id: 3,
      link: "https://sadondeko.com/nft",
      name: "NFT購入",
    },
    {
      id: 4,
      link: "https://sadondeko.com/shop",
      name: "農産物購入",
    },
    {
      id: 5,
      link: "https://sadondeko.com/profile",
      name: "プロフィール",
    },
  ];

  return (
    <div className="z-50 flex justify-between items-center w-full md:h-16 h-12 sticky top-0 md:px-4 text-white bg-sadondeko nav">
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
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature md:ml-2">
          <a
            className="link-underline link-underline-black"
            href="https://sadondeko.com"
            rel="noreferrer"
          >
            <Image
              src="/favicon/sadondeko.png"
              alt="Sadondeko"
              width={120}
              height={60}
              className=""
            />
          </a>
        </h1>
      </div>
      <div className="md:hidden hover:bg-skyblue h-12 px-2">
        <Link href="https://sadondeko.com/profile" className="flex flex-col justify-center items-center hover:text-black">
          <FaUsers size={30} />
          <div className="text-[9px]">プロフィール</div>
        </Link>
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
        <li
          className="nav-links pl-3 cursor-pointer capitalize font-medium text-white hover:text-white duration-200 link-underline"
        >
          <ConnectButton
            client={client}
            wallets={wallets}
            connectButton={{ label: "ウォレットを接続" }}
            connectModal={{ size: "compact" }}
            locale={"ja_JP"}
          />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;