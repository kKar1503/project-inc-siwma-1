import React from 'react';

interface SearchComponentProps {
  searchCallback: (searchInput: string) => void;
  focusCallback?: (focus: boolean) => void;
  placeholder?: string;
}

declare const Search: React.FC<SearchComponentProps>;

export default Search;
