'use client';

import {
  SearchBar,
  SearchDropDown,
  SearchDropDownContainer
} from '@/components';
import { ICorporate } from '@/lib';
import { useHomeHook } from './page.hook';

export default function Home() {
  const [
    searchHandler,
    searchRef,
    search,
    getValueOfDropDown,
    fiveCorporates,
    goCorporatepage
  ] = useHomeHook();

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
