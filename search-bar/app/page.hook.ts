'use client';

import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useAppDispatch, useDebounce } from './hooks';
import { AppDispatch, ICorporate, bTrieAdded } from '@/lib';

async function updateCorporates(url: string, { arg }: { arg: string }) {
  return axios.get(url + arg).then((res) => res.data);
}
export const useHomeHook = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { trigger, data } = useSWRMutation(
    '/api/search?title=',
    updateCorporates
  );

  const [search, searchRef, searchHandler, getValueOfDropDown] = useSearch();

  /** Extract 5 datas for Search Dropdown*/
  const fiveCorporates = useMemo(() => {
    return data && [...data].slice(0, 5);
  }, [data]);

  /** Array only with corporate title */
  const onlyCorprateTitle = useMemo(() => {
    return data && [...data].map((corporate: ICorporate) => corporate.회사명);
  }, [data]);

  useFetchCorporates(search, trigger);

  useAddTitleOnStore(onlyCorprateTitle, dispatch);

  const goCorporatepage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.length !== 1 && search.length === 0) return null;
    console.log(data);

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

/** Hook for passively fetching corporates based on search input */
const useFetchCorporates = (search: string, trigger: any) => {
  useEffect(() => {
    let ignore = false;
    if (search.length > 0 && !ignore) {
      trigger(search);
    }
    return () => {
      ignore = true;
    };
  }, [trigger, search]);
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

/** Hooks for dispatch corporate title lists*/
const useAddTitleOnStore = (
  onlyCorprateTitle: string[],
  dispatch: AppDispatch
) => {
  useEffect(() => {
    let ignore = false;
    if (onlyCorprateTitle?.length > 0 && !ignore) {
      dispatch(bTrieAdded(onlyCorprateTitle));
    }
    return () => {
      ignore = true;
    };
  }, [dispatch, onlyCorprateTitle]);
};
