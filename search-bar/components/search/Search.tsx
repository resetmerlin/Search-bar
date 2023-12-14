'use client';

import React from 'react';
import { ICorporate } from '@/lib';
import { SearchBar } from './searchBar';
import { SearchDropDown, SearchDropDownContainer } from './searchDropdown';
import { useSearchHook } from '@/app/hooks';

export default function Search() {
  const [
    searchHandler,
    searchRef,
    search,
    getValueOfDropDown,
    fiveCorporates,
    goCorporatepage
  ] = useSearchHook();

  return (
    <SearchBar
      searchHandler={searchHandler}
      ref={searchRef}
      goCorporatepage={goCorporatepage}
    >
      <SearchDropDownContainer
        className={!search ? 'opacity-0' : 'opacity-100'}
      >
        {fiveCorporates &&
          fiveCorporates.map((corporate: ICorporate) => (
            <SearchDropDown
              getValueOfDropDown={getValueOfDropDown}
              회사명={corporate.회사명}
              key={corporate.종목코드}
            />
          ))}
      </SearchDropDownContainer>
    </SearchBar>
  );
}
