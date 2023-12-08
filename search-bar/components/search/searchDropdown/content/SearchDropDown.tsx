import { ICorporate } from '@/lib/types/dto';
import React from 'react';

type IProps = {
  회사명: string;
  getValueOfDropDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function SearchDropDown({ 회사명, getValueOfDropDown }: IProps) {
  return (
    <button
      onClick={getValueOfDropDown}
      className="block w-full p-4 ps-10 text-sm text-gray-900  text-left	 bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-100	 "
    >
      {회사명}
    </button>
  );
}
