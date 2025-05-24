import React, { useState } from "react";
// Import Material Icons
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Import Ag-Grid
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import type { ColDef } from "ag-grid-community"; // ColDef type
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

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

interface IndexDetailsProps {
  selectedIndex: Index;
  closeDrawer: () => void;
  Stks: Stocks[] | null;
}

const IndexDetails: React.FC<IndexDetailsProps> = ({ selectedIndex, Stks ,closeDrawer }) => {
  // Sample row data for the grid

  // Column definitions for the grid
  const defaultColDef = { flex: 1, sortable: true, filter: true };
  const [colDefs] = useState<ColDef<{ srNo: number; stock_name: string; close: number; stock_symbol: string; w_h:number;}, any>[]>(
    [
      { headerName: "Stock Name", field: "stock_name", ...defaultColDef },
      { headerName: "Current Price", field: "close", ...defaultColDef },
      { headerName: "Stock Symbol", field: "stock_symbol", ...defaultColDef },
      { headerName: "52 week High", field: "w_h", ...defaultColDef },
    ]
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white border border-sky-400 border-4 p-4 rounded-lg text-center">
        {selectedIndex.index_name}
      </h2>
      <div className="p-4 rounded-lg shadow-md text-white space-y-4">
        <div className="space-x-4 flex"><div className="w-1/2 p-2 bg-neutral rounded-lg text-center">
          <p>
            <OpenInNewIcon className="mr-2" /> <strong>Open:</strong> {selectedIndex.open}
          </p>
        </div>
        <div className="w-1/2 p-2 bg-neutral rounded-lg  text-center">
          <p>
            <CloseIcon className="mr-2" /> <strong>Close:</strong> {selectedIndex.close}
          </p>
        </div></div>
        <div className="space-x-4 flex"><div className="w-1/2 p-2 bg-neutral rounded-lg text-center">
          <p>
            <PriceChangeIcon className="mr-2" /> <strong>LTP:</strong> {selectedIndex.ltp}
          </p>
        </div>
        <div className="w-1/2 p-2 bg-neutral rounded-lg text-center">
          <p>
            <TrendingUpIcon className="mr-2" /> <strong>Weekly High:</strong> {selectedIndex.w_h}
          </p>
        </div></div>
        <div className="space-x-4 flex"><div className="w-1/2 p-2 bg-neutral rounded-lg  text-center">
          <p>
            <TrendingDownIcon className="mr-2" /> <strong>Weekly Low:</strong> {selectedIndex.w_l}
          </p>
        </div>
        <div className="w-1/2 p-2 bg-neutral rounded-lg  text-center">
          <p>
            {selectedIndex.is_active ? (
              <CheckCircleIcon className="mr-2" />
            ) : (
              <CancelIcon className="mr-2" />
            )}
            <strong>Status:</strong> {selectedIndex.is_active ? "Active" : "Inactive"}
          </p>
        </div></div>
      </div>
      {/* Ag-Grid Table */}
      <div className="ag-theme-quartz-dark mt-4 overflow-y-auto" style={{ height: 400, width: "100%" }}>
      <AgGridReact
              rowData={Stks}
              columnDefs={colDefs as any} // Update the type of columnDefs
              defaultColDef={defaultColDef as any} // Update the type of defaultColDef
              domLayout="normal"
              rowHeight={40}
              headerHeight={50}
              className="rounded-lg overflow-hidden"
              overlayNoRowsTemplate="<span class='text-gray-500'>No mutual funds found</span>"
            />
      </div>
      <div className="flex justify-center my-4">
        <button className="btn btn-primary" onClick={closeDrawer}>
          Close
        </button>
      </div>
    </div>
  );
};

export default IndexDetails;





