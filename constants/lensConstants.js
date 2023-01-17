import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

const API_URL = "https://api.lens.dev";

export const apolloClient = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export const challenge = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`;

export const authenticate = gql`
  mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {
    authenticate(request: { address: $address, signature: $signature }) {
      accessToken
      refreshToken
    }
  }
`;

export const getDefaultProfile = gql`
  query DefaultProfile($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      id
    }
  }
`;

export const getFollowing = gql`
  query Profile($request: FollowingRequest!) {
    following(request: $request) {
      items {
        profile {
          id
        }
      }
    }
  }
`;

export const getPublications = gql`
  query Post($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        ... on Post {
          id
          onChainContentURI
          profile {
            name
          }
          metadata {
            image
            name
          }
        }
      }
    }
  }
`;

export const getPublicationsQueryVariables = function (profileIds) {
  return {
    request: {
      limit: 5,
      publicationTypes: "POST",
      metadata: {
        mainContentFocus: "ARTICLE",
      },
      profileIds: profileIds,
    },
  };
};

export const getPublication = gql`
  query Publication($request: PublicationQueryRequest!) {
    publication(request: $request) {
      ... on Post {
        metadata {
          content
          image
          name
        }
        profile {
          name
        }
      }
    }
  }
`;

export const createContentMetadata = function (
  content,
  contentName,
  imageUri,
  imageType
) {
  return {
    version: "2.0.0",
    metadata_Id: uuidv4(),
    description: "Created from LensBlog",
    content: content,
    name: contentName,
    mainContentFocus: "Article",
    attributes: [],
    locale: "en-US",
    appId: "lensBlog",
    image: imageUri,
    imageMimeType: imageType,
  };
};

export const TRUE_BYTES =
  "0x00000000000000000000000000000000000000000000000000000000000000000000000000000001";
