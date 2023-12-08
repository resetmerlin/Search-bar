import React, { forwardRef } from 'react';
import { ICorporate, ICorporates } from '@/lib';
import { SearchBar } from './searchBar';
import { SearchDropDown, SearchDropDownContainer } from './searchDropdown';

type IProps = {
  searchHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  goCorporatepage: (e: React.FormEvent<HTMLFormElement>) => void;
  search: string;
  fiveCorporates: ICorporates;
  getValueOfDropDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default forwardRef<HTMLInputElement, IProps>(function Search(
  {
    searchHandler,
    search,
    fiveCorporates,
    getValueOfDropDown,
    goCorporatepage
  },
  ref
) {
  return (
    <SearchBar
      searchHandler={searchHandler}
      ref={ref}
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
});
