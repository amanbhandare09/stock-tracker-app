import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  

  return (
    <div className="flex space-x-2 join">
      <button
        className={`join-item btn ${
          currentPage === 1
            ? 'btn-disabled'
            : 'bg-blue text-white-500 hover:bg-white-500 hover:text-blue'
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        «
      </button>

      <button className="join-item btn">Page {currentPage}</button>

      <button
        className={`join-item btn ${
          currentPage === totalPages
            ? 'btn-disabled'
            : 'bg-blue text-white-500 hover:bg-white-500 hover:text-blue'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
