"use client";

import styles from "../styles";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { ConnectBtn } from "./ConnectButton";
import ColorThemeBtn from "./ColorThemeBtn";

import Link from "next/link";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <section className={`${styles.innerWidth} min-h-10 mx-auto`}>
      <div className="flex justify-between gap-4">
        <div className="flex flex-row gap-2">
          <Link href="/">
            <p className={`${styles.paragraphText}`}>Home</p>
          </Link>
          <ColorThemeBtn theme={theme} onClick={handleToggleTheme} />
        </div>

        <div className="flex flex-row gap-4">
          <Link href="/write-blog">
            <p className={`${styles.paragraphText}`}>Write Blog</p>
          </Link>

          <ConnectBtn
            showBalance={false}
            chainStatus="icon"
            accountStatus="avatar"
            theme={theme}
          />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
