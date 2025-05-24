import React, { useState , useEffect  } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { ModuleRegistry, ColDef  } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

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

interface StockDetailsProps {
  stock: {
    stock_symbol: string;
    sector: string;
    market_cap: string;
  };
  mfs: Fund[];
}

const StockDetails: React.FC<StockDetailsProps> = ({ stock, mfs }) => {
  // console.log("Received Stock:", stock);
  // console.log("Received Mutual Funds:", mfs);

  useEffect(() => {
    setFilteredFunds(mfs);
  }, [mfs]);
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>(mfs);

  // const handleSearch = (query: string) => {
  //   const filtered = mfs.filter((fund: Fund) =>
  //     fund.fund_name.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredFunds(filtered);
  // };

  const colDefs: ColDef[] = [
    {
      headerName: 'Sr.no.',
      valueGetter: (params: any) => params.node.rowIndex + 1,
      width: 10,
      cellClass: 'font-semibold text-gray-600'
    },
    {
      field: 'fund_name',
      headerName: 'Mutual Fund Name',
      flex: 1,
      editable: true,
      cellClass: 'text-blue-600 hover:text-blue-800'
    },
  ];

  const defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    flex: 1,
  };

  return (
    <div className="overflow-x-auto bg-primary p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-6 mb-4">
          <div className="bg-neutral hover:bg-gray-600 shadow-md rounded-lg p-4 flex items-center justify-center">
            <BusinessIcon className="text-red-500 mr-3 text-2xl" />
            <p>
              <strong className="text-red-500 text-lg">Symbol:</strong> <span className="text-red-500">{stock.stock_symbol}</span>
            </p>
          </div>
          <div className="bg-neutral hover:bg-gray-600 shadow-md rounded-lg p-4 flex items-center justify-center">
            <CategoryIcon className="text-blue-500 mr-3 text-2xl" />
            <p>
              <strong className="text-blue-500 text-lg">Sector:</strong> <span className="text-blue-500">{stock.sector}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-neutral hover:bg-gray-600 shadow-md rounded-lg p-4 flex items-center justify-center">
            <AttachMoneyIcon className="text-green-500 mr-3 text-2xl" />
            <p>
              <strong className="text-green-500 text-lg">Market Cap:</strong> <span className="text-green-500">{stock.market_cap}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full ag-theme-quartz-dark" style={{ height: '275px' }}>
          {/* <Search placeholder="Search Mutual Funds..." onSearch={handleSearch} /> */}
          {filteredFunds.length > 0 ? (
            <AgGridReact
              rowData={filteredFunds}
              columnDefs={colDefs as any} // Update the type of columnDefs
              defaultColDef={defaultColDef as any} // Update the type of defaultColDef
              domLayout="normal"
              rowHeight={40}
              headerHeight={50}
              className="rounded-lg overflow-hidden"
              overlayNoRowsTemplate="<span class='text-gray-500'>No mutual funds found</span>"
            />
          ) : (
            <div className="text-gray-500 text-center mt-4">
              No mutual funds investing in this stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
