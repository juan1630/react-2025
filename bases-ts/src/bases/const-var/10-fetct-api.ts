import type { GifRadomResponse } from "../data/giphyResponse";

const API_KEY = "1eu22wGdXzXXB0matHYtHF6aVRirio40";

const myRequest = fetch(
  `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
);


function createImageOnDom(image: string) {
    const imageTag = document.createElement('img');
    imageTag.src = image;
    document.body.append(imageTag)
}

myRequest
  .then((response) => response.json())
  .then(({ data }: GifRadomResponse) => {
    
    const imageUrl = data.images.original.url;
    createImageOnDom(imageUrl);
  })
  .catch((error) => console.log(error))
  .finally();
