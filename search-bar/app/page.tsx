'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';

import {
  SearchBar,
  SearchDropDown,
  SearchDropDownContainer
} from '@/components';
import { ICorporate } from '@/lib';
import { useDebounce } from './hooks';

async function updateCorporates(url: string, { arg }: { arg: string }) {
  return axios.get(url + arg).then((res) => res.data);
}

export default function Home() {
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const { trigger, data } = useSWRMutation(
    '/api/search?title=',
    updateCorporates
  );

  /** Extract 5 datas for Search Dropdown*/
  const fiveCorporates = useMemo(() => {
    return data && [...data].slice(0, 5);
  }, [data]);

  /** Use debounce for setting a search terms*/
  const handleSearch = useDebounce((term) => {
    setSearch(term);
  }, 700);

  /** get Value of Drop down test via click */
  const getValueOfDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!e.currentTarget.textContent) return null;

    setSearch(e.currentTarget.textContent);

    if (searchRef.current)
      searchRef.current.value = e.currentTarget.textContent;
  };

  /** search input handler*/
  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value;
    handleSearch(term);
  };

  /** Hook for passively fetching corporates based on search input */
  useEffect(() => {
    let ignore = false;
    if (search.length > 0 && !ignore) {
      trigger(search);
    }
    return () => {
      ignore = true;
    };
  }, [trigger, search]);

  return (
    <>
      <SearchBar searchHandler={searchHandler} ref={searchRef}>
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
    </>
  );
}
