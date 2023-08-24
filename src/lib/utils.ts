import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDateToString(_date: string) {
  const needAdd = _date.length !== 13;
  let numericDate = parseInt(_date);
  if (needAdd) numericDate = numericDate * 1000;

  const date = new Date(numericDate);
  return date.toLocaleString([], {
    timeStyle: 'short',
    dateStyle: 'long',
    hour12: false
  });
}
