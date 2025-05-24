'use client';


import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import Search from './search';
import Pagination from '../pagination';
import StockDetails from './StockDetails';
import { fetchMfsById, fetchStocks } from '@/lib/data';
import { defaultstocks } from '@/lib/defaultvals';
import { usePathname, useSearchParams } from 'next/navigation';

type Stock = {
  stock_id: string;
  isin_id: string;
  stock_symbol: string;
  stock_name: string;
  sector: string;
  market_cap: string;
  current_price: number | null;
  exchange: string;
  index: string;
};

type Fund = {
  fund_id: string;
  fund_name: string;
  amc_id: string;
  fund_type: string;
  total_assets: number | null;
  nav: number | null;
  expense_ratio: number | null;
  manager_name: string | null;
  is_active: boolean;
};

const ITEMS_PER_PAGE = 10;

const StocksList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [stocks, setStocks] = useState<Stock[]>(defaultstocks);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [Mfs, setMfs] = useState<Fund[]>([]);
  const [drawerTop, setDrawerTop] = useState(64); // Initial value assuming header height is 64px
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'market_cap'>('name'); // Ensure sort options match Stock properties
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAscending, setIsAscending] = useState(true); // State to track sorting order

  // Filter and sort the stocks
  const sortedStocks = [...stocks].sort((a, b) => {
    const valueA = sortBy === 'name' ? a.stock_name.toLowerCase() : a.market_cap.toLowerCase();
    const valueB = sortBy === 'name' ? b.stock_name.toLowerCase() : b.market_cap.toLowerCase();

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredStocks = sortedStocks.filter(stock =>
    stock.stock_name.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);
  const displayedStocks = filteredStocks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    const getStock = async (): Promise<void> => {
      const fetchedStocks = await fetchStocks();
      setStocks(fetchedStocks);
    };

    getStock();
  }, []);


  // Function to handle the sorting direction
  const sortStocks = () => {
    const sortedStocks = [...stocks].sort((a: Stock, b: Stock) => {
      return isAscending ? a.stock_name.localeCompare(b.stock_name) : b.stock_name.localeCompare(a.stock_name);
    });
    setStocks(sortedStocks);
    setIsAscending(!isAscending); // Toggle sorting direction
  };

  const handleClick = async (stock: Stock) => {
    setSelectedStock(stock);
    const mfs = await fetchMfsById(stock.stock_id);
    setMfs(mfs);
  };
  

  const closeSidebar = () => {
    setSelectedStock(null);
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'market_cap'); // Ensure type safety
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div id="hj" className="container relative max-w-4xl mx-auto p-8 bg-primary border border-[#38bdf8] shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-white">Stocks List</h1>

      <hr className='text-[#38bdf8]' />
      <div className="mt-4 flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full mb-4">
          <Search placeholder="Search stocks..." onSearch={handleSearch} />
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-gray-800 text-white p-2 rounded-md"
            >
              <option value="name">Sort by Name</option>
              <option value="market_cap">Sort by Market Cap</option>
            </select>
            {sortOrder === 'asc' ? (<button 
                onClick= {handleSortOrderChange} 
                className="btn btn-primary btn-square text-white p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
              </button>) : (<button 
                onClick= {handleSortOrderChange} 
                className="btn btn-primary btn-square text-white p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </button>)}
          </div>
        </div>
        <div className="w-1/2 p-4 space-y-4">
          {displayedStocks.length > 0 ? (
            displayedStocks.map((stock) => (
              <div key={stock.stock_id} className='flex items-center justify-center'> 
                <button
                  key={stock.stock_id}
                  className="btn btn-primary w-full"
                  onClick={() => handleClick(stock)}
                >
                  {stock.stock_name}
                </button>
              </div>
            ))
          ) : (
            <div className="border border-[#38bdf8] p-4 w-max rounded-lg shadow-sm text-white text-center">
              No stocks found
            </div>
          )}
        </div>

        <div className="mt-5 w-1/2 flex justify-center">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>

      <AnimatePresence>
        {selectedStock && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="p-2 border border-4 border-[#38bdf8] fixed right-0 h-[calc(100%-4rem)] bg-primary p-4 shadow-lg z-50 w-auto"
            style={{ top: `${drawerTop}px` }}
          >
            <div className="p-4 text-white">
              <h2 className="text-2xl font-bold text-center border border-[#38bdf8] border-4 rounded-lg p-2 mb-2">
                {selectedStock.stock_name}
              </h2>
              <StockDetails stock={selectedStock} mfs={Mfs} />
              <div className="flex justify-center">
                <button className="absolute btn btn-primary mb-4  h-10" onClick={closeSidebar}>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StocksList;
