import React, { useState } from "react";
import {
  SearchForm,
  SearchInput,
  SearchIconContainer,
  SearchContainer,
} from "./sidebar.style";
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
      <SearchContainer>
        <SrOnly htmlFor="query">Search query</SrOnly>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInput
          type="text"
          value={query}
          id="query"
          name="query"
          onChange={search}
          placeholder="Search"
        />
      </SearchContainer>
    </SearchForm>
  );
};

export default SidebarSearch;
