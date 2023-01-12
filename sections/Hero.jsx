"use client";

import styles from "../styles";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <section
      className={`${styles.innerWidth} flex justify-center items-center mx-auto`}
    >
      {isConnected && address ? (
        <p className="text-white">Connected</p>
      ) : (
        <p className="text-white">Not Connected</p>
      )}
    </section>
  );
};

export default Hero;
