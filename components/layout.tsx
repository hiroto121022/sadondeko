import Footer from "./footer";
import Meta from "./meta";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import FooterButton from "./footer-button";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Navbar />
      <div className="min-h-screen">
        <main className="relative w-full">{children}</main>
      </div>
      <Footer />
      <FooterButton/>
    </>
  );
}
