export interface Paging {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
}

export interface PaginationResult {
  startPage: number;
  totalPages: number;
  noPrev: boolean;
  noNext: boolean;
  pageNumbers: number[];
}

export interface PaginationProps {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
