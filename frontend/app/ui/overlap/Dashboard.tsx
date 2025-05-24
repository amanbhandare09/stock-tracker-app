import { CircularProgress, Box } from '@mui/material';
import {
  JoinInner as CommonStocksIcon,
  DataUsage as UncommonStocksAIcon,
  DataUsage as UncommonStocksBIcon,
  Timeline as TotalStocksAIcon,
  TrendingUp as TotalStocksBIcon
} from '@mui/icons-material';

type Calculation = {
  totalpercentage: number,
  commontotalpercentage: number,
  uncommon_percentage: number,
  total_stock: number[],
  commontotal_stock: number,
  uncommon_stock: number[],
  overlap_percentage:number,
}

const Dashboard = ({ data }:{ data:Calculation}) => {
  return (
    <div className="p-6 grid grid-cols-2 gap-4 bg-base-300  rounded-lg ">
      <div className="border border-4 border-blue-700 shadow rounded-lg p-4 flex flex-col items-center justify-center">
        <Box position="relative" display="inline-flex">
          <CircularProgress variant="determinate" value={data.overlap_percentage} size={80} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <div className="text-xl font-semibold text-white">{data.overlap_percentage}%</div>
          </Box>
        </Box>
        <div className="mt-2 text-gray-600 text-center text-white">percentage portfolio overlap</div>
      </div>
      <div className="border border-4 border-blue-700  shadow rounded-lg p-4 flex flex-col items-center justify-center">
        <CommonStocksIcon className="text-green-500" style={{ fontSize: 40 }} />
        <div className="text-2xl font-bold text-white">{data.commontotal_stock}</div>
        <div className="mt-2 text-gray-600 text-center text-white">Common stocks</div>
      </div>
      <div className="border border-4 border-blue-700 shadow rounded-lg p-4 flex flex-col items-center justify-center">
        <UncommonStocksAIcon className="text-blue-500" style={{ fontSize: 40 }} />
        <div className="text-2xl font-bold text-white">{data.uncommon_stock[0]}</div>
        <div className="mt-2  text-stone-300">Uncommon stocks in A</div>
        <div className="flex items-center">
        <TotalStocksAIcon className="text-blue-500" style={{ fontSize: 30 }} />
        <div className="text-stone-400">total stocks in A: {data.total_stock[0]}</div>
        </div>
      </div>
      <div className="border border-4 border-blue-700 shadow rounded-lg p-4 flex flex-col items-center justify-center">
        <UncommonStocksBIcon className="text-red-500" style={{ fontSize: 40 }} />
        <div className="text-2xl font-bold text-white">{data.uncommon_stock[1]}</div>
        <div className="mt-2 text-gray-600">Uncommon stocks in B</div>
        <div className="flex items-center">
        <TotalStocksBIcon className="text-red-500" style={{ fontSize: 30 }} />
        <div className="text-stone-400">total stocks in B: {data.total_stock[1]}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
