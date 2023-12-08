'use client';

import { Search } from '@/components';
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
