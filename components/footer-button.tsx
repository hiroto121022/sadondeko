import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaNewspaper, FaProjectDiagram, FaMoneyBill, FaStore, FaRegFlag } from "react-icons/fa";

const FooterButton = () => {
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
    <div className="z-9 md:hidden flex justify-between items-center w-full h-12 fixed bottom-0 px-4 text-white bg-sadondeko nav">
      <div className="md:hidden hover:bg-skyblue h-12 px-2">
        <Link href="https://sadondeko.com/news" className="flex flex-col justify-center items-center hover:text-black py-1">
          <FaNewspaper size={30} />
          <div className="text-[9px]">お知らせ</div>
        </Link>
      </div>
      <div className="md:hidden hover:bg-skyblue h-12 px-2">
        <Link href="https://sadondeko.com/about" className="flex flex-col justify-center items-center hover:text-black py-1">
          <FaProjectDiagram size={30} />
          <div className="text-[9px]">プロジェクト説明</div>
        </Link>
      </div>
      <div className="md:hidden hover:bg-skyblue h-12 px-2">
        <Link href="https://sadondeko.com/nft" className="flex flex-col justify-center items-center hover:text-black py-1">
          <FaMoneyBill size={30} />
          <div className="text-[9px]">NFT購入</div>
        </Link>
      </div>
      <div className="md:hidden hover:bg-skyblue h-12 px-2">
        <Link href="https://sadondeko.com/shop" className="flex flex-col justify-center items-center hover:text-black py-1">
          <FaStore size={30} />
          <div className="text-[9px]">農産物購入</div>
        </Link>
      </div>
      <div className="md:hidden hover:bg-skyblue h-12 px-2">
        <Link href="https://sadondeko.com" className="flex flex-col justify-center items-center hover:text-black py-1">
          <FaRegFlag size={30} />
          <div className="text-[9px]">日本語/英語</div>
        </Link>
      </div>
    </div>
  );
};

export default FooterButton;