import React from 'react';

interface SearchHistoryComponentProps {
  searchHistory: string[];
  onClickCallback: (value: string) => void;
}

declare const SearchHistory: React.FC<SearchHistoryComponentProps>;

export default SearchHistory;
