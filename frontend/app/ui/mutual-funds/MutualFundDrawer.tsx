import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid

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

interface StockDetailsProps {
  filteredStocks: Stock[];
  closeDrawer: () => void;
}

const StockDetails: React.FC<StockDetailsProps> = ({filteredStocks, closeDrawer }) => {
  // Column Definitions
  const [colDefs] = useState([
    { headerName: "Stock Name", field: "s_stock_name" as const ,sortable: true, filter: true, flex: 1 , editable: true , cellClass: 'text-blue-600'},
    { headerName: "Current Price", field: "s_close" as const ,sortable: true, filter: true, flex: 1 , editable: true , cellClass: 'text-blue-600'},
    { headerName: "Market Cap", field: "s_market_cap" as const ,sortable: true, filter: true, flex: 1 , editable: true , cellClass: 'text-blue-600'},
    { headerName: "Holding Percentage", field: "f_holding_percentage" as const ,sortable: true, filter: true, flex: 1 , editable: true , cellClass: 'text-blue-600'},
  ]);

  return (
    <div className="mb-4 p-6">
      <h1 className='text-center'>Stocks in this Mutual Fund:</h1>
      <div className='flex justify-center'>
        <div className="w-full mt-4 max-h-80 overflow-y-auto ag-theme-quartz-dark" style={{ height: '500px' }}>
          {/* <div className="flex justify-between items-center mt-4">
            <Search placeholder="Search Stocks..." onSearch={handleStockSearch} className="w-1/3" />
          </div> */}
          <AgGridReact
            rowData={filteredStocks} // Stock data
            columnDefs={colDefs} // Column definitions
            domLayout='autoHeight'
             // Adjust grid height to row data
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button className="btn btn-primary mb-4" onClick={closeDrawer}>
          Close
        </button>
      </div>
    </div>
  );
};

export default StockDetails;

