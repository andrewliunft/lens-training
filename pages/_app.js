import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { LensProvider } from "../context/LensContext";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../constants/lensConstants";

import * as React from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [mainnet, polygon],
    [
      alchemyProvider({ apiKey: "ASzOoMdVeykRAVDqjJGP3DeQGoMVvHnX" }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "Sam Sandoval Portfolio",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <div className="overflow-hidden dark:bg-[#0f0f0f] light:bg-white min-h-screen">
      <Head>
        <title>Sam Sandoval</title>
        <meta name="description" content="Sam Sandoval"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link href="snow.css" />
      </Head>
      <ChakraProvider>
        <WagmiConfig client={wagmiClient}>
          <ApolloProvider client={apolloClient}>
            <LensProvider>
              <RainbowKitProvider
                chains={chains}
                theme={midnightTheme()}
                initialChainId={mainnet}
              >
                <ThemeProvider enableSystem={true} attribute="class">
                  <Navbar className="z-1" />
                  <Component className="z-2" {...pageProps} />
                  <Footer />
                </ThemeProvider>
              </RainbowKitProvider>
            </LensProvider>
          </ApolloProvider>
        </WagmiConfig>
      </ChakraProvider>
    </div>
  );
}
