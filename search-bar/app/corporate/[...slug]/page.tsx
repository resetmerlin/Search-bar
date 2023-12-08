'use client';

import { useAppSelector, useSearchHook } from '@/app/hooks';
import { Search } from '@/components';
import { selectBTrie } from '@/lib';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Corporate() {
  const { slug } = useParams();
  const code = slug[0];

  const { trie } = useAppSelector(selectBTrie);

  const [
    searchHandler,
    searchRef,
    search,
    getValueOfDropDown,
    fiveCorporates,
    goCorporatepage
  ] = useSearchHook();

  return (
    <div>
      <Search
        searchHandler={searchHandler}
        ref={searchRef}
        search={search}
        getValueOfDropDown={getValueOfDropDown}
        fiveCorporates={fiveCorporates}
        goCorporatepage={goCorporatepage}
      />
    </div>
  );
}
