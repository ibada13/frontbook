import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface PaginatorProps {
  path: string;
  totalPages: number;
}

const Paginator: React.FC<PaginatorProps> = ({path , totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const searchparams = useSearchParams();
    const currentPage = Number(searchparams.get('id'))||1
  return (
    <div className="text-white p-3 text-lg" style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" }}>
      <Link
              href={`${path}?id=${currentPage - 1}`}
              className={currentPage === 1 ? ' hidden text-red-600 cursor-not-allowed' : ''}
              aria-disabled={ currentPage === 1}
      >
        Previous
      </Link>

      {pages.map((page) => (
        <Link
              key={page}
              href={`${path}?id=${page}`}
              
              className={ currentPage === page ? 'text-red-600 text-2xl font-extrabold':''}
        >
          {page}
        </Link>
      ))}

      <Link
        className={currentPage === totalPages ?' hidden' :''}
      href={`${path}?id=${currentPage +1 }`}


      >
        Next
      </Link>
    </div>
  );
};

export default Paginator;
