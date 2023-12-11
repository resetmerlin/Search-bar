'use client';

import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector, useDebounce } from '.';
import {
  AppDispatch,
  ICorporate,
  ICorporates,
  bTrieAdded,
  bTrieFindWords,
  selectBTrie
} from '@/lib';

export const useSearchOfflineHook = (): [
  searchHandler: (e: React.FormEvent<HTMLInputElement>) => void,
  searchRef: RefObject<HTMLInputElement>,
  search: string,
  getValueOfDropDown: (e: React.MouseEvent<HTMLButtonElement>) => void,
  fiveCorporates: ICorporates,
  goCorporatepage: (e: React.FormEvent<HTMLFormElement>) => void
] => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { startTerm: data } = useAppSelector(selectBTrie);

  const [search, searchRef, searchHandler, getValueOfDropDown] = useSearch();

  /** Extract 5 datas for Search Dropdown*/
  const fiveCorporates = useMemo(() => {
    return (
      data &&
      [...data].slice(0, 5).map((corporate) => {
        return {
          회사명: corporate
        };
      })
    );
  }, [data]);

  console.log(fiveCorporates);

  useFetchCorporates(search, dispatch);

  const goCorporatepage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.length !== 1 && search.length === 0) return null;

    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    if (target.search.value === data[0].회사명)
      router.push(`/corporate/${data[0]?.종목코드}`);
  };

  return [
    searchHandler,
    searchRef,
    search,
    getValueOfDropDown,
    fiveCorporates,
    goCorporatepage
  ];
};

/** Hooks for Search related */
const useSearch = (): [
  search: string,
  searchRef: RefObject<HTMLInputElement>,
  searchHandler: (e: React.FormEvent<HTMLInputElement>) => void,
  getValueOfDropDown: (e: React.MouseEvent<HTMLButtonElement>) => void
] => {
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  /** Use debounce for setting a search terms*/
  const handleSearch = useDebounce((term) => {
    setSearch(term);
  }, 700);

  /** search input handler*/
  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value;
    handleSearch(term);
  };

  /** get Value of Drop down test via click */
  const getValueOfDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!e.currentTarget.textContent) return null;

    setSearch(e.currentTarget.textContent);

    if (searchRef.current)
      searchRef.current.value = e.currentTarget.textContent;
  };

  return [search, searchRef, searchHandler, getValueOfDropDown];
};

/** Hook for passively fetching corporates based on search input */
const useFetchCorporates = (search: string, dispatch: AppDispatch) => {
  console.log(search);
  useEffect(() => {
    let ignore = false;
    if (search.length > 0 && !ignore) {
      dispatch(bTrieFindWords(search));
    }
    return () => {
      ignore = true;
    };
  }, [dispatch, search]);
};
