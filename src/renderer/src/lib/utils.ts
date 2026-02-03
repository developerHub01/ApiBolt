import { SERVER_API_BASE_URL } from "@shared/constant/api-bolt";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = <Args extends Array<unknown>>(
  callback: (...args: Args) => void,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

export const axiosServerClient = axios.create({
  baseURL: SERVER_API_BASE_URL,
});
