'use client';

import { Search } from '@/components';
import { useSearchHook } from './hooks';

export default function Home() {
  const [
    searchHandler,
    searchRef,
    search,
    getValueOfDropDown,
    fiveCorporates,
    goCorporatepage
  ] = useSearchHook();

  return (
    <Search
      searchHandler={searchHandler}
      ref={searchRef}
      search={search}
      getValueOfDropDown={getValueOfDropDown}
      fiveCorporates={fiveCorporates}
      goCorporatepage={goCorporatepage}
    />
  );
}
