import React, { useState } from "react";
import { SearchForm, SearchInput, SearchBtn } from "./sidebar.style";
import { SearchIcon } from "../icons";
import { SrOnly } from "../../styles/Global";

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
      <SrOnly htmlFor="query">
        Search query
      </SrOnly>
      <SearchInput
        type="text"
        value={query}
        id="query"
        name="query"
        onChange={search}
      />
      <SearchBtn type="submit">
        <SrOnly>Search</SrOnly>
        <SearchIcon />
      </SearchBtn>
    </SearchForm>
  );
};

export default SidebarSearch;
