'use client';

import {
  SearchBar,
  SearchDropDown,
  SearchDropDownContainer
} from '@/components';
import { useEffect, useState } from 'react';
import { useDebounce } from './hooks';
import { data } from './dummyData';
import { ICorporate, ICorporates } from '@/lib/types/dto';

export default function Home() {
  const [search, setSearch] = useState('');
  const [corporates, setCorporates] = useState<ICorporates | null>([]);

  const handleSearch = useDebounce((term) => {
    setSearch(term);
  }, 700);

  console.log(search);

  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value;
    handleSearch(term);
  };

  useEffect(() => {
    if (search.length > 0) {
      const filteredData =
        data &&
        data
          .filter((corporate) => {
            const regex = new RegExp(search, 'i');
            return regex.test(corporate.회사명);
          })
          .slice(0, 5);

      setCorporates(filteredData);
    }
  }, [search]);

  return (
    <>
      <SearchBar searchHandler={searchHandler}>
        <SearchDropDownContainer>
          {corporates &&
            corporates.map((corporate: ICorporate) => (
              <SearchDropDown
                회사명={corporate.회사명}
                key={corporate.종목코드}
              />
            ))}
        </SearchDropDownContainer>
      </SearchBar>
    </>
  );
}
