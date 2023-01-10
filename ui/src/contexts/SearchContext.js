import { createContext } from "react";

const SearchContext = createContext({
  searchWord: "",
  setSearchWord: () => {},
});

export default SearchContext;
