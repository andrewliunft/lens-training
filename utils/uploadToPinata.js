const pinataSDK = require("@pinata/sdk");
const path = require("path");
const fs = require("fs");

// Initialize Pinata
const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const pinataApiSecret = process.env.NEXT_PUBLIC_PINATA_API_SECRET;
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret);

const storeImage = async (imageFilePath) => {
  const fullImagePath = path.resolve(imageFilePath);
  const file = fs.readdirSync(fullImagePath);

  const readableStreamForFile = fs.createReadStream(`${imageFilePath}`);

  try {
    const options = {
      pinataMetadata: {
        name: "NFT",
      },
    };
    const response = await pinata.pinFileToIPFS(readableStreamForFile, options);
    responses.push(response);
  } catch (error) {
    console.log(error);
  }
  return { response, file };
};

const storeTokenUriMetadata = async (metadata) => {
  try {
    const response = await pinata.pinJSONToIPFS(metadata);
    return response;
  } catch (e) {
    console.log(e);
  }
};
module.exports = { storeImage, storeTokenUriMetadata };
