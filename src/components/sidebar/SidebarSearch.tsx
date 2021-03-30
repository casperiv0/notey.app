import * as React from "react";
import { SearchForm, SearchInput, SearchIconContainer, SearchContainer } from "./styles";
import SearchIcon from "@icons/SearchIcon";
import { SrOnly } from "@styles/Global";

const SidebarSearch = ({ filterNotes }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    filterNotes(query);
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    filterNotes(e.target.value.toLowerCase());
  };

  return (
    <SearchForm onSubmit={onSubmit}>
      <SearchContainer>
        <SrOnly htmlFor="query">Search query</SrOnly>
        <SearchIconContainer onClick={() => ref.current?.focus()}>
          <SearchIcon />
        </SearchIconContainer>
        <SearchInput
          ref={ref}
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
