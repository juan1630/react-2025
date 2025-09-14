import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({})

  const handleTermsClicked = async (term: string) => {
    if (gifsCache.current[term]) {
        setGifs(gifsCache.current[term])
        return
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
    gifsCache.current[term] = gifs;
  };

  const handleSearch = async (query: string = "") => {
    query.trim().toLowerCase();

    if (query.length === 0) return;
    if (previousTerms.includes(query)) return;

    setPreviousTerms((previous) => [...previous, query].splice(0, 8));
    const gifsResponse = await getGifsByQuery(query);
    setGifs(gifsResponse);

    gifsCache.current[query] = gifs;
  };

  return {
    gifs,
    previousTerms,
    handleSearch,
    handleTermsClicked,
  };
};
