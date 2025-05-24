"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Search from "@/app/ui/stocks/search";
import Pagination from "@/app/ui/pagination";
import StockDetails from "./MutualFundDrawer";
import { fetchFunds, fetchStksById } from '@/lib/data';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

type Stock = {
  f_shares_held: number,
  f_holding_percentage: number,
  s_stock_id: string,
  s_stock_name: string,
  s_market_cap: number,
  s_close: number,
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
const NAVBAR_HEIGHT = '4rem';

export default function Listing() {
  const [Funds, setFunds] = useState<Fund[]>([]);
  const [Stks, setStks] = useState<Stock[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>(Stks);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const getFund = async (): Promise<void> => {
      const fetchedFunds = await fetchFunds();
      setFunds(fetchedFunds);
      console.log(fetchedFunds);
    };

    getFund();
  }, []);

  const handleSearchChange = (query: string): void => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (): void => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortFunds = (funds: Fund[]): Fund[] => {
    return funds.sort((a, b) => {
      const valueA = sortBy === 'name' ? a.fund_name.toLowerCase() : a.expense_ratio || 0;
      const valueB = sortBy === 'name' ? b.fund_name.toLowerCase() : b.expense_ratio || 0;

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredFunds = sortFunds(
    Funds.filter(({ fund_name }: Fund) =>
      fund_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredFunds.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredFunds.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDrawer = async (fund: Fund) => {
    setSelectedFund(fund);
    const Stocks = await fetchStksById(fund.fund_id);
    setStks(Stocks);
    setFilteredStocks(Stocks);
  };

  const closeDrawer = (): void => {
    setSelectedFund(null);
  };

  const handleStockSearch = (query: string): void => {
    const filtered = Stks.filter((stock: Stock) =>
      stock.s_stock_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStocks(filtered);
  };

  return (
    <div className="bg-primary min-h-screen p-4">
      <div className="container max-w-4xl mx-auto p-8 bg-primary border border-[#38bdf8] shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-white">Mutual Funds</h1>
        <hr className="text-[#38bdf8] mb-6" />
        <div className={`flex flex-col items-center gap-4`}>
          <div className="flex items-center justify-between w-full">
            <Search placeholder="Search names..." onSearch={handleSearchChange} />
            <div className="flex items-center gap-4">
              <select 
                value={sortBy} 
                onChange={handleSortChange} 
                className="bg-gray-800 text-white p-2 rounded-md"
              >
                <option value="name">Sort by Name</option>
                <option value="expense_ratio">Sort by Expense Ratio</option>
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
          <div
            className={`flex flex-col items-center gap-4 transition-transform duration-300 ${
              selectedFund ? 'transform -translate-x-[12rem]' : ''
            }`}
          >
            <div className="w-full md:w-1/2 p-4 space-y-4">
              {currentItems.length > 0 ? (
                currentItems.map((fund: Fund) => (
                  <div key={fund.fund_id} className='flex items-center justify-between'>
                    <button
                      key={fund.fund_id}
                      onClick={() => openDrawer(fund)}
                      className="btn btn-primary w-full text-left"
                    >
                      {fund.fund_name}
                    </button>
                  </div>
                ))
              ) : (
              <div className="border border-[#38bdf8] p-4 w-max rounded-lg shadow-sm text-white text-center">
                No mutual funds found
              </div>
              )}
            </div>
            <div className="mt-5 flex justify-center w-full md:w-1/2">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedFund && (
          <motion.div
            initial={{ opacity: 0, x: 100, top: `calc(${NAVBAR_HEIGHT} + 0px)` }}
            animate={{ opacity: 1, x: 0, top: `calc(${NAVBAR_HEIGHT} + 0px)` }}
            exit={{ opacity: 0, x: 100, top: `calc(${NAVBAR_HEIGHT} + 0px)` }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 h-[calc(100%-4rem)] bg-primary p-4 shadow-lg z-50 w-[43rem] border-l-2 border-[#38bdf8] overflow-x-auto"
          >
            <div className="text-white">
              <h2 className="text-2xl font-bold border-4 border-[#38bdf8] rounded-lg p-4 mb-4 text-center">
                {selectedFund.fund_name}
              </h2>

              <StockDetails 
                filteredStocks={filteredStocks} 
                closeDrawer={closeDrawer}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}