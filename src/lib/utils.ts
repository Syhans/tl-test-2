import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPrevAndNext<T>(arr: T[], current: T) {
  const currentIndex = arr.indexOf(current);
  const prev = arr[currentIndex - 1] as T | undefined;
  const next = arr[currentIndex + 1] as T | undefined;
  return { prev, next };
}
