import { useForm } from "react-hook-form";
import { useLensContext } from "../context/LensContext";
import { createContentMetadata } from "../constants/lensConstants";

import { TRUE_BYTES } from "../constants/lensConstants";

const PINATA_PIN_ENDPOINT = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

async function pinMetadataToPinata(
  metadata,
  contentName,
  pinataApiKey,
  pinataApiSecret
) {
  console.log("pinning metadata to pinata...");
  const data = JSON.stringify({
    pinataMetadata: { name: contentName },
    pinataContent: metadata,
  });
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: pinataApiKey,
      pinata_api_secret: pinataApiSecret,
    },
    body: data,
  };

  const response = await fetch(PINATA_PIN_ENDPOINT, config);
  const ipfsHash = (await response.json()).IpfsHash;
  console.log(`Stored content metadata with ${ipfsHash}`);
  return ipfsHash;
}

function PostForm() {
  const { profileId, token } = useLensContext();
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    mode: "onChange",
  });

  const publishPost = async function ({
    content,
    contentName,
    imageUri,
    imageType,
    pinataApiKey,
    pinataApiSecret,
  }) {
    let fullContentUri;
    const contentMetadata = createContentMetadata(
      content,
      contentName,
      imageUri,
      imageType
    );
    const metadataIpfsHash = await pinMetadataToPinata(
      contentMetadata,
      contentName,
      pinataApiKey,
      pinataApiSecret
    );
    fullContentUri = `ipfs://${metadataIpfsHash}`;
    console.log(fullContentUri);

    // post to blockchain
    const transactionParameters = [
      profileId,
      "0x23b9467334bEb345aAa6fd1545538F3d54436e96",
      TRUE_BYTES,
      "0x17317F96f0C7a845FFe78c60B10aB15789b57Aaa",
      TRUE_BYTES,
    ];
    console.log(transactionParameters);
  };

  return (
    <form onSubmit={handleSubmit(publishPost)}>
      <input
        placeholder="Post Title"
        name="contentName"
        {...register("contentName", {
          maxLength: 100,
          minLength: 1,
          required: true,
        })}
      />
      <textarea
        placeholder="Write your article in markdown here!"
        name="contentName"
        {...register("content", {
          maxLenth: 25000,
          minLength: 10,
          required: true,
        })}
      />

      <input
        placeholder="(optional) Image URI"
        name="imageUri"
        {...register("imageURI", {
          maxLength: 100,
          minLength: 1,
          required: false,
        })}
      />

      <input
        placeholder="(optional) Image type"
        name="imageType"
        {...register("imageType", {
          maxLength: 100,
          minLength: 1,
          required: false,
        })}
      />

      <input
        placeholder="(optional) Pinata API Key"
        name="pinataApiKey"
        {...register("pinataApiKey", {
          maxLength: 100,
          minLength: 1,
          required: false,
        })}
      />

      <input
        placeholder="(optional) Pinata API Secret"
        name="pinataApiSecret"
        {...register("pinataApiSecret", {
          maxLength: 100,
          minLength: 1,
          required: false,
        })}
      />

      {errors ? <div>{errors.content?.message}</div> : <div></div>}
      {profileId && token ? (
        <button type="submit">Publish!</button>
      ) : (
        <div>You need to sign in, or have a lens handle!</div>
      )}
    </form>
  );
}

export default function WritePost() {
  return (
    <div>
      <PostForm />
    </div>
  );
}
