import React, { useState } from "react";
import { SearchForm, SearchInput, SearchBtn } from "../../styles/Sidebar";

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
      <SearchInput value={query} id="query" name="query" onChange={search} />
      <SearchBtn type="submit">Search</SearchBtn>
    </SearchForm>
  );
};

export default SidebarSearch;
