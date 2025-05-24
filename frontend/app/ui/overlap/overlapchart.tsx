// components/OverlapChart.js
import React from 'react';
import RadialProgress from '@/app/ui/overlap/radialprogress';

type Calculation = {
  totalpercentage: number,
  commontotalpercentage: number[],
  uncommon_percentage: number[],
  total_stock: number[],
  commontotal_stock: number,
  uncommon_stock: number[],
  overlap_percentage:number,
}

const OverlapChart = ({ data }:{ data:Calculation}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative flex justify-center items-center w-full px-4 py-4  mx-2 my-2 border border-[#38bdf8] rounded-lg shadow-lg">
        {/* Scheme A */}
        <div className="absolute bg-[#38bdf8] left-0 top-0 p-2 bg-[#38bdf8] text-white rounded-tl-lg rounded-br-lg">
          SCHEME A
        </div>

        {/* Scheme B */}
        <div className="absolute bg-[#38bdf8] right-0 top-0 p-2 bg-[#38bdf8] text-white rounded-tr-lg rounded-bl-lg">
          SCHEME B
        </div>

        <div className="flex join">
            {/* Scheme A Box */}
            <div className="flex flex-col items-center justify-center w-1/4  border border-[#38bdf8] rounded-lg p-4 join-item">
              <div className="flex justify-between mx-2 items-center my-2">
                <RadialProgress percentage={data.uncommon_percentage[0]}/>
              </div>
              <div className='flex justify-around'>
              <p className="text-center">IN SCHEME A, NOT IN SCHEME B</p>
              </div>
            </div>

            {/* Common Stocks Box */}
            <div className="flex flex-col items-between justify-between w-2/4 border border-[#38bdf8] rounded-lg p-4 join-item">
              <div className="flex flex-col items-center my-2">
                <div className="flex justify-between w-full px-4">
                <RadialProgress percentage={data.commontotalpercentage[0]}/>
                <RadialProgress percentage={data.commontotalpercentage[1]}/>
                </div>
              </div>
              <div className='flex justify-around'>
              <p className="text-center">COMMMON IN SCHEME A</p>
              <p className="text-center">COMMON IN SCHEME B</p>
              </div>
            </div>

            {/* Scheme B Box */}
            <div className="flex flex-col items-center justify-center w-1/4 border border-[#38bdf8] rounded-lg p-4 join-item">
              <div className="flex justify-between mx-2 items-center my-2">
                <RadialProgress percentage={data.uncommon_percentage[1]}/>
              </div>
              <div className='flex justify-around'>
              <p className="text-center">IN SCHEME B, NOT IN SCHEME A</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default OverlapChart;