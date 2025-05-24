"use client";
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Pagination from '../pagination';
import { useState } from 'react';

const ITEMS_PER_PAGE = 6;

type Data = {
  stock:string,
  overlap1:number,
  overlap2:number,
}

const HorizontalBarGraph = ({ data, name }:{ data:Data[], name:string[]}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const displayedStocks = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    (data.length === 0)?(<div>No overlap data found</div>):
    (<div className="flex flex-col w-full p-4 bg-base-300">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart layout="vertical" data={displayedStocks} barCategoryGap="20%" barGap={10}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis type="number" stroke="#ccc" />
          <YAxis dataKey="stock" type="category" tickMargin={20} width={250} stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', borderColor: '#444' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          />
          <Legend wrapperStyle={{ color: '#fff' }} />
           <Bar dataKey="overlap1" fill="#1e50d8" barSize={20} name={name[0]}  />
          <Bar dataKey="overlap2" fill="#1fc660" barSize={20} name={name[1]}  />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>)
  );
};

export default HorizontalBarGraph;


