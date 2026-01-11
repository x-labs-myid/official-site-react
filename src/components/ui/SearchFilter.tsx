import { type ReactNode, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Pagination from "./Pagination";

interface SearchFilterProps {
  searchValue?: string;
  onSearch?: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  pagination?: {
    totalPages: number;
    totalData: number;
    currentPage: number;
    changePage: (page: number) => void;
  };
  children?: ReactNode; // For additional filters like dropdowns
}

const SearchFilter = ({
  searchValue = "",
  onSearch,
  placeholder = "Search...",
  loading = false,
  pagination,
  children,
}: SearchFilterProps) => {
  const [term, setTerm] = useState(searchValue);

  // Sync internal state with prop
  useEffect(() => {
    setTerm(searchValue);
  }, [searchValue]);

  // Debounce search
  useEffect(() => {
    if (!onSearch) return;
    const timeout = setTimeout(() => {
      if (term !== searchValue) {
        onSearch(term);
      }
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Search Input & Filters */}
        <div className="flex flex-1 w-full gap-2 items-center">
          {onSearch && (
            <div className="relative w-full md:max-w-xs">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none opacity-50">
                <FaMagnifyingGlass />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder={placeholder}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          {/* Additional Filters Slot */}
          {children && (
            <div className="flex gap-2 items-center flex-1 overflow-x-auto pb-1 md:pb-0">
              {children}
            </div>
          )}
        </div>

        {/* Pagination Summary or Controls (Desktop) */}
        {pagination && (
          <div className="hidden md:block">
            <Pagination
              totalPages={pagination.totalPages}
              totalData={pagination.totalData}
              currentPage={pagination.currentPage}
              changePage={pagination.changePage}
            />
          </div>
        )}
      </div>

      {/* Mobile Pagination */}
      {pagination && (
        <div className="md:hidden flex justify-center">
          <Pagination
            totalPages={pagination.totalPages}
            totalData={pagination.totalData}
            currentPage={pagination.currentPage}
            changePage={pagination.changePage}
          />
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
