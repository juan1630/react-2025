import { useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}
export const CustomSearch = ({ placeholder, onQuery }: Props) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    
    const timeoutId = setTimeout(()=> {
      onQuery(query)
    } , 700)

    return ()=> {
      clearTimeout(timeoutId)
    }
  }, [query, setQuery])

  const handleSearch = () => {
    onQuery(query);
    setQuery('')
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        name=""
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder ? placeholder : "Buscar"}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
