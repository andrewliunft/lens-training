import { ApolloClient } from "@apollo/client";
import { useState, createContext, useContext, useEffect, use } from "react";
import {
  challenge,
  apolloClient,
  authenticate,
  getDefaultProfile,
} from "../constants/lensConstants";

import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { AccordionButton } from "@chakra-ui/react";

export const LensContext = createContext();

export const useLensContext = () => {
  return useContext(LensContext);
};

export function LensProvider({ children }) {
  const [profileId, setProfileId] = useState();
  const [token, setToken] = useState();
  const { address } = useAccount();

  const signIn = async function () {
    try {
      const challengeInfo = await apolloClient.query({
        query: challenge,
        variables: { address: address },
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text
      );

      console.log("hi");

      const authData = await apolloClient.mutate({
        mutation: authenticate,
        variables: {
          address: address,
          signature,
        },
      });

      const {
        data: {
          authenticate: { accessToken },
        },
      } = authData;
      setToken(accessToken);
      console.log(`Access token: ${accessToken}`);
    } catch (error) {
      console.log("Error signing in", error);
    }
  };

  const getProfileId = async () => {
    const defaultProfile = await apolloClient.query({
      query: getDefaultProfile,
      variables: {
        request: {
          ethereumAddress: address,
        },
      },
    });
    if (defaultProfile.data.defaultProfile) {
      console.log(defaultProfile.data.defaultProfile.id);
      return defaultProfile.data.defaultProfile.id;
    } else {
      console.log(`ETH Address ${address} does not have a Lens Profile Id`);
    }

    return null;
  };

  useEffect(() => {
    const readToken = window.localStorage.getItem("lensToken");
    if (readToken) {
      setToken(readToken);
    }
    if (address && !token && !readToken) {
      signIn();
    }
    if (!address) {
      window.localStorage.removeItem("lensToken");
    }
    if (address) {
      getProfileId().then((id) => setProfileId(id));
    }
  }, [address]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("lensToken", token);
    }
  }, [token]);

  return (
    <LensContext.Provider value={{ profileId, token }}>
      {children}
    </LensContext.Provider>
  );
}
