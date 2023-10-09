import { useState, useEffect, Dispatch, SetStateAction } from "react";

const getInitialValue = <T,>(
  key: string,
  defaultValue: T | (() => T),
  convertFromString: (value: string) => T
): T => {
  const localStorageValue = localStorage.getItem(key);
  if (localStorageValue) {
    try {
      return convertFromString(localStorageValue);
    } catch {
      localStorage.removeItem(key);
    }
  }
  return typeof defaultValue === "function"
    ? (defaultValue as () => T)()
    : defaultValue;
};

type ConvertToString<T> = (value: T) => string;
type ConvertFromString<T> = (value: string) => T;

interface UseLocalStorageOptions<T> {
  convertToString?: ConvertToString<T>;
  convertFromString?: ConvertFromString<T>;
}

export const useLocalStorage = <T,>(
  key: string,
  defaultValue: T | (() => T),
  options: UseLocalStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>] => {
  const { convertToString = JSON.stringify, convertFromString = JSON.parse } =
    options;

  const [state, setState] = useState(() =>
    getInitialValue(key, defaultValue, convertFromString)
  );

  useEffect(() => {
    localStorage.setItem(key, convertToString(state));
  }, [key, state, convertToString]);

  return [state, setState];
};
