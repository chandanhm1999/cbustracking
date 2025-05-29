import React from "react";
import SearchPart from "../components/search/SearchPart";
import Nav from "../components/navbar/Nav";
import SearchByStop from "../components/search/SearchByStop";

const Search = () => {
  return (
    <>
      <Nav />
      <SearchPart />
      <SearchByStop />
    </>
  );
};

export default Search;
