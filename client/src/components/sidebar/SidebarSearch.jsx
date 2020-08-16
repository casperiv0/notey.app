import React, { useState } from "react";
import { SearchForm, SearchInput, SearchBtn } from "../../styles/Sidebar";

const SidebarSearch = () => {
  const [query, setQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    // TODO: make request for search
    // TODO: maybe filter a list
    // TODO: bring query up to main sidebar to filter
  };

  return (
    <SearchForm onSubmit={onSubmit}>
      <SearchInput
        value={query}
        id="q"
        name="q"
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchBtn>Search</SearchBtn>
    </SearchForm>
  );
};

export default SidebarSearch;
