import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  minPrice: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  showSortOptions: boolean;
  setShowSortOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  showSortOptions,
  setShowSortOptions,
}) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.,]/g, '');
    setMinPrice(sanitizedValue);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.,]/g, '');
    setMaxPrice(sanitizedValue);
  };

  const toggleSortOptions = () => {
    if (showSortOptions) {
      // Clear filters when toggling off sort options
      setSearchQuery('');
      setSortOrder('');
      setMinPrice('');
      setMaxPrice('');
    }
    setShowSortOptions(!showSortOptions);
  };

  return (
    <div className="flex flex-col items-center w-full mb-1 p-4">
      <div className="flex justify-center items-center w-full max-w-xl mb-4">
        <div className="relative w-48">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 border-2 border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-red-800 transition duration-200"
          />
        </div>
        <button
          onClick={toggleSortOptions}
          className="ml-2 bg-red-800 text-white px-3 py-2 rounded-lg shadow-sm hover:bg-red-900 transition duration-200"
        >
          {showSortOptions ? 'Clear Filters' : 'Sort By'}
        </button>
      </div>

      {showSortOptions && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 w-full max-w-xl">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-auto border-2 border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:border-red-800 transition duration-200"
          >
            <option value="">Select Sort Order</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>

          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Min"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="w-full md:w-auto border-2 border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:border-red-800 transition duration-200"
            />
            <input
              type="text"
              placeholder="Max"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="w-full md:w-auto border-2 border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:border-red-800 transition duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
