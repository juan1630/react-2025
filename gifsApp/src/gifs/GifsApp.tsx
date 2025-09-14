
import { PreviousGifs } from "./components/PreviousGifs";

import { CustomHeader } from "../shared/components/CustomHeader";
import { CustomSearch } from "../shared/components/SearchBar";
import { GifList } from "./components/GifList";
import { useGifs } from './hooks/useGifs'


export const GifsApp = () => {

  const { gifs, previousTerms ,handleSearch, handleTermsClicked } = useGifs()

  return (
    <>
      {/* header */}
      <CustomHeader
        title="Buscardor de gifs"
        description="Descubre y comparte gifs para toda ocasión"
      />
      {/* Search */}
      <CustomSearch placeholder="Busca un gif" onQuery={handleSearch} />
      {/* Busquedas previas */}
      <PreviousGifs
        searches={previousTerms}
        onLabelClick={handleTermsClicked}
      />
      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
