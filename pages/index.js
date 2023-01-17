import { Hero } from "../sections";
import {
  apolloClient,
  getFollowing,
  getPublications,
  getPublicationsQueryVariables,
} from "../constants/lensConstants";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import PostFeed from "../components/PostFeed";

let profileIdList = ["0x869c"];

const Home = () => {
  const { address } = useAccount();
  const [pubs, setPubs] = useState();

  useEffect(() => {
    if (address) {
      getPublicationsList().then((publications) => {
        console.log(publications);
        setPubs(publications);
      });
    }
  }, [address]);

  const getPublicationsList = async () => {
    let followers;
    let followingsIds = [];
    followers = await apolloClient.query({
      query: getFollowing,
      variables: { request: { address: address } },
    });
    followingsIds = followers.data.following.items.map((f) => f.profile.id);

    profileIdList = profileIdList.concat(followingsIds);
    const publications = await apolloClient.query({
      query: getPublications,
      variables: getPublicationsQueryVariables(profileIdList),
    });
    return publications;
  };
  return (
    <div className="overflow-hidden">
      <div>Out Decentralized Blog!</div>
      {!pubs ? (
        <div>Loading...</div>
      ) : (
        <PostFeed posts={pubs.data.publications.items} />
      )}
    </div>
  );
};

export default Home;
