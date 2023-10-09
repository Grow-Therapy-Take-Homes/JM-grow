import { useEffect, useReducer } from "react";

import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  setPage: (page: number) => void;
  pageRangeSize?: number;
}

const PAGE_RANGE_SIZE = 5;

function rangeReducer(
  state: number[],
  {
    pageCount,
    page,
    pageRangeSize,
  }: { pageCount: number; page: number; pageRangeSize: number }
) {
  const pageRange = Math.min(pageRangeSize, pageCount);
  let start = 1;

  // check direction to dertermine how to make sure range is in the middle or doesn't go below 1
  if (page > Math.floor(pageRange / 2)) {
    start = page - Math.floor(pageRange / 2) + 1;
  }

  //limit the range to not exceed pagecount
  if (pageCount && start + pageRange >= pageCount) {
    start = pageCount - pageRange + 1;
  }

  return Array.from({ length: pageRange }, (_, i) => start + i);
}

export const Pagination = ({
  currentPage,
  pageCount,
  setPage,
  pageRangeSize = PAGE_RANGE_SIZE,
}: PaginationProps) => {
  const [range, setStartRange] = useReducer(rangeReducer, []);

  const handlePageChange = (direction: number) => {
    const newPage = currentPage + direction;

    if (newPage < 0 || newPage > pageCount - 1) {
      return;
    }

    setPage(newPage);
  };

  useEffect(() => {
    setStartRange({ page: currentPage, pageCount, pageRangeSize });
  }, [pageCount, currentPage, pageRangeSize]);

  return (
    <div className={styles.Pagination}>
      <button
        className={`${styles.PaginationButton} ${
          currentPage === 0 ? styles.PaginationButtonDisabled : ""
        }`}
        onClick={() => handlePageChange(-1)}
        disabled={currentPage === 0}
        data-testid="back"
      >
        &#8249;
      </button>
      <div className={styles.PaginationButtonGroup}>
        {range.map((page) => {
          return (
            <button
              key={page}
              className={`${styles.PaginationButton} ${
                currentPage === page - 1 ? styles.PaginationButtonSelected : ""
              }`}
              onClick={() => setPage(page - 1)}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className={`${styles.PaginationButton} ${
          currentPage >= pageCount - 1 ? styles.PaginationButtonDisabled : ""
        }`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage >= pageCount - 1}
        data-testid="forward"
      >
        &#8250;
      </button>
    </div>
  );
};
