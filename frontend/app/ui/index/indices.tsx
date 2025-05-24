"use client";

import React, { useState, useMemo, useEffect } from "react";
import { fetchIndices, fetchStksByIdx } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import IndexDetails from "./indexdetails"; // Make sure this path matches your actual file structure


type Index ={
  index_id: string;
  index_name: string;
  open: number;
  close: number;
  ltp: number;
  w_h: number;
  w_l: number;
  index_cat: string;
  is_active: boolean;
}

type Stocks = {
  stock_id: string,
  isin_id: string,
  stock_symbol: string,
  stock_name: string,
  sector: string,
  market_cap: number,
  exchange: string,
  open: number,
  close: number,
  w_h: number,
  w_l: number,
}


export default function Indices() {

  const [indices, setIndices] = useState<Index[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<Index | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [Stks, setStks] = useState<Stocks[] | null >(null);

  useEffect(() => {
    const getIndex = async (): Promise<void> => {
      const fetchedIndices = await fetchIndices();
      setIndices(fetchedIndices);

      // Dynamically set the default category to the first one available
      if (fetchedIndices.length > 0) {
        setSelectedCategory(fetchedIndices[0].index_cat);
      }
    };
    getIndex();
  }, []);

  const handleClick = async (index: Index) => {
    setSelectedIndex(index);
    const stks: Stocks[] = await fetchStksByIdx(index.index_id);
    setStks(stks);
  };

  const closeDrawer = () => {
    setSelectedIndex(null);
  };

  const filteredIndices = useMemo(() => {
    return selectedCategory
      ? indices.filter((index) => index.index_cat === selectedCategory)
      : indices;
  }, [selectedCategory, indices]);

  return (
    <div className="container relative max-w-4xl mx-auto p-8 bg-primary border border-[#38bdf8] shadow-lg">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl bg-base-200 rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col justify-center items-center p-6">
            <div className="flex space-x-12">
              <h1 className="text-3xl font-bold justify-start text-white mb-2 sm:mb-0">Mutual Fund Indices</h1>
              <div className="flex flex-col justify-center items-center">
                <label htmlFor="category" className="text-sm font-medium text-gray-300 mr-2">
                  Select Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-[#2c3749] text-white text-sm py-2 px-4 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-[#3498db] cursor-pointer"
                >
                  {[...new Set(indices.map((index) => index.index_cat))].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
          </div>

          <div className="w-1/2 p-4 space-y-4 justify-center items-center">

            {indices.length > 0 ? (
              filteredIndices.map((index) => (
                <div key={index.index_id} className="flex items-center justify-between">
                  <button
                    key={index.index_id}
                    className="btn btn-primary w-full"
                    onClick={() => handleClick(index)}
                    >
                    {index.index_name}
                  </button>
                </div>
              ))
            ) : (
              <div className="border border-[#38bdf8] p-4 w-max rounded-lg shadow-sm text-white text-center">
                No Indices found
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Drawer for Index Details */}
      <AnimatePresence>
        {selectedIndex && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className=" fixed right-0 top-0 h-full bg-primary p-4 shadow-lg z-50 w-1/2 border-l-2 border-[#38bdf8] overflow-y-auto"
          >
            <IndexDetails selectedIndex={selectedIndex} Stks={Stks} closeDrawer={closeDrawer} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
