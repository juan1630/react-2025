import type { GifRadomResponse } from "../data/giphyResponse";

const API_KEY = "1eu22wGdXzXXB0matHYtHF6aVRirio40";

function createImageOnDom(image: string) {
  const imageTag = document.createElement("img");
  imageTag.src = image;
  document.body.append(imageTag);
}

const getRandomGifUrl = async (): Promise<string> => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
  );

  const {data} = await (response.json())  as GifRadomResponse;

  return data.images.original.url;
};


getRandomGifUrl().then(createImageOnDom)