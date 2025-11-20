import usePaginationData from "@/hooks/usePaginationData"; // 커스텀 훅 임포트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { PaginationProps } from "@/interfaces/pagination.interface";

function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const { totalPages, noPrev, noNext, pageNumbers, startPage } = usePaginationData({
    totalItems,
    itemCountPerPage,
    pageCount,
    currentPage,
  });

  if (totalPages === 0) {
    return null;
  }

  const handlePrevGroup = () => {
    setCurrentPage(startPage - 1);
  };

  const handleNextGroup = () => {
    setCurrentPage(startPage + pageCount);
  };

  return (
    <div className="my-4 flex items-center justify-center">
      <nav>
        <ul className="flex items-center gap-2">
          <li>
            <button
              onClick={handlePrevGroup}
              disabled={noPrev}
              className={`rounded-full border border-gray-300 p-3 leading-tight ${
                noPrev
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </li>

          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => setCurrentPage(pageNumber)}
                className={`rounded-full px-4 py-3 text-sm leading-tight ${
                  pageNumber === currentPage
                    ? "border-[#3AC48D] bg-[#3AC48D] font-bold text-white"
                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
                }`}
                disabled={pageNumber === currentPage}>
                {pageNumber}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={handleNextGroup}
              disabled={noNext}
              className={`rounded-full border border-gray-300 p-3 leading-tight ${
                noNext
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
