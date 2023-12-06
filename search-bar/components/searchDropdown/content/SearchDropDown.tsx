import { ICorporate } from '@/lib/types/dto';
import React from 'react';

export default function SearchDropDown({ 회사명 }: Pick<ICorporate, '회사명'>) {
  return (
    <div className="block w-full p-4 ps-10 text-sm text-gray-900   bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-100	 ">
      {회사명}
    </div>
  );
}
