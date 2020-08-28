import React, { useState } from "react";
import { SearchForm, SearchInput, SearchBtn } from "./sidebar.style";
import { SearchIcon } from "../icons";

const SidebarSearch = ({ filterNotes }) => {
  const [query, setQuery] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    filterNotes(query);
  };

  const search = (e) => {
    setQuery(e.target.value);
    filterNotes(e.target.value.toLowerCase());
  };

  return (
    <SearchForm onSubmit={onSubmit}>
      <label htmlFor="query" className="sr-only">
        Search query
      </label>
      <SearchInput type="text" value={query} id="query" name="query" onChange={search} />
      <SearchBtn type="submit">
        <span className="sr-only">Search</span>
        <SearchIcon />
      </SearchBtn>
    </SearchForm>
  );
};

export default SidebarSearch;
