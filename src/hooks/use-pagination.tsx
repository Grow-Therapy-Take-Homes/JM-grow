import { useCallback, useMemo, useState } from "react";

interface UsePaginationArgs<T> {
  data: T[] | undefined;
  itemsPerPage: number;
}

export type UsePaginationReturn<T = object> = {
  activeData: T[];
  currentPage: number;
  pageCount: number;
  setPage: (pageNumber: number) => void;
};

export const usePagination = <T,>({
  data,
  itemsPerPage,
}: UsePaginationArgs<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = useMemo(() => {
    if (!data) return 0;

    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  const setPage = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const activeData = useMemo(
    () =>
      Array.isArray(data)
        ? data.slice(
            currentPage * itemsPerPage,
            currentPage * itemsPerPage + itemsPerPage
          )
        : [],
    [data, currentPage, itemsPerPage]
  );

  return {
    activeData,
    currentPage,
    pageCount,
    setPage,
  };
};

export default usePagination;
