import { TNormalElementProps } from '@/lib';

export default function SearchDropDownContainer({
  children,
  className
}: TNormalElementProps<HTMLDivElement>) {
  return (
    <div
      className={`h-auto border  border-gray-300 rounded w-auto ${className}`}
    >
      {children}
    </div>
  );
}
