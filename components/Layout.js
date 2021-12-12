import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Header from "./Header";
import Search from "./Search";

export default function Layout({ title, keywords, children, description }) {
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isMenuOpen);

  useEffect(() => {
    console.log("useEffect");
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
        console.log("関数の中身は呼ばれてるcheckIfClickedOutside");
        console.log("checkf isMenuOpen", isMenuOpen);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }
  }, [isMenuOpen]);

  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
  //       setIsMenuOpen(false);
  //       console.log("関数の中身は呼ばれてるcheckIfClickedOutside");
  //       console.log("checkf isMenuOpen", isMenuOpen);
  //     }
  //   };
  //   if (isMenuOpen) {
  //     document.addEventListener("mousedown", checkIfClickedOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", checkIfClickedOutside);
  //     };
  //   }
  // }, [isMenuOpen]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Search isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} ref={ref} />

      {/*
    <button onClick={() => setIsMenuOpen(true)}>Click</button>
      {isMenuOpen && <Search ref={ref} />}
    */}

      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}

Layout.defaultProps = {
  title: "Welcome to DevSpace",
  keywords: "development, coding, programming",
  description: "The best info and news in IT field",
};
