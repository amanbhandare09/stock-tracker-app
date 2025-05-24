'use client';

import '@/app/globals.css'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaChartLine, FaUniversity, FaLayerGroup } from 'react-icons/fa';
import { GrUserAdmin } from "react-icons/gr";
import { SiMoneygram } from "react-icons/si";
import Link from 'next/link';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const searchRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implement your search functionality here
//     console.log('Searching for:', searchTerm);
//   };

//   const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);
    
//     if (value.length > 0) {
//       // Here you would typically make an API call to get search results
//       // For now, we'll just simulate a delay
//       setTimeout(() => {
//         // This is where you would normally set the results from your API
//         setSearchResults([
//           { name: "HDFC Arbitrage Fund(G)", return: 7.7, type: "yellow" },
//           { name: "HDFC Arbitrage Fund(G)-Direct Plan", return: 8.4, type: "green" },
//           // ... other results
//         ]);
//       }, 300);
//     } else {
//       setSearchResults([]);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setSearchResults([]);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

  return (
  <header style={{ backgroundColor: '#38BDF8' }} className="p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          OverlapTracker
        </Link>
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 mt-4 p-4 rounded-lg shadow-lg"
          >
            <nav className="space-y-2">
              <Link href="/admin" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <GrUserAdmin className="w-6 h-6"/>
                <span>ADMIN</span>
              </Link>
              <Link href="/stocks" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <FaChartLine className="w-6 h-6" />
                <span>STOCKS</span>
              </Link>
              <Link href="/mutual-funds" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <FaUniversity className="w-6 h-6" />
                <span>MUTUAL FUNDS</span>
              </Link>
              <Link href="/indexes" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <SiMoneygram className="w-6 h-6"  />
                <span>INDEX</span>
              </Link>
              <Link href="/" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <FaLayerGroup className="w-6 h-6" />
                <span>OVERLAP</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;