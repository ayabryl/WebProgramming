import { useContext } from "react";
import { InputBase, styled, alpha } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import SearchContext from "../../contexts/SearchContext";
import { theme } from "../../theme";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "primary.main",
  "&:hover": {
    backgroundColor: "primary.main",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "primary.main",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
  border: "1px solid black",
}));

const SearchBar = () => {
  const { searchWord, setSearchWord } = useContext(SearchContext);
  const onValueChange = (event) => {
    setSearchWord(event.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for items and brands"
        inputProps={{ "aria-label": "search" }}
        value={searchWord}
        onChange={onValueChange}
      />
    </Search>
  );
};

export default SearchBar;
