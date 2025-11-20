import { useMemo } from "react";
import type { Paging, PaginationResult } from "@/interfaces/pagination.interface";

export default function usePaginationData({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}: Paging): PaginationResult {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);

  const start = useMemo(() => {
    if (currentPage < 1) return 1;
    if (pageCount < 1) return 1;

    return Math.floor((currentPage - 1) / pageCount) * pageCount + 1;
  }, [currentPage, pageCount]);

  const paginationResult = useMemo(() => {
    const noPrev = start === 1;
    const noNext = start + pageCount > totalPages;
    const end = Math.min(start + pageCount - 1, totalPages);
    const pageNumbers: number[] = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return {
      startPage: start,
      totalPages: totalPages,
      noPrev,
      noNext,
      pageNumbers,
    };
  }, [start, totalPages, pageCount]);

  return paginationResult;
}
