"use client";

import styles from "../styles";
import { useState, useEffect } from "react";
import { socialsDark } from "../constants";
import { useTheme } from "next-themes";

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <section className={`${styles.innerWidth} mx-auto`}>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700/50"></hr>
      <div className="flex flex-col justify-start">
        <div className="flex justify-between py-4">
          <p className={`${styles.paragraphText}`}>
            Solidity • Hardhat • Next.js • TailwindCSS • Wagmi
          </p>
          <div className="flex flex-row gap-4 pr-6 md:pr-0">
            {theme == "dark"
              ? socialsDark.map((social) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.link}
                    key={social.name}
                  >
                    <img
                      src={social.url}
                      alt={social.name}
                      className="w-[20px] h-[20px] object-contain cursor-pointer socialicon duration-200"
                    />
                  </a>
                ))
              : socialsDark.map((social) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.link}
                    key={social.name}
                  >
                    <img
                      key={social.name}
                      src={social.url}
                      alt={social.name}
                      className="w-[20px] h-[20px] object-contain cursor-pointer socialicon duration-200 invert-[100%]"
                    />
                  </a>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
