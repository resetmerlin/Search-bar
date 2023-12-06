import React, { PropsWithChildren } from 'react';

export default function SearchDropDownContainer({
  children
}: PropsWithChildren) {
  return (
    <div className="h-auto border  border-gray-300 rounded w-auto">
      {children}
    </div>
  );
}
