import Alert from "./alert";
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
      <div className="min-h-screen">
        <Navbar />
        <main className="relative w-full">{children}</main>
        <FooterButton/>
      </div>
      <Footer />
    </>
  );
}
