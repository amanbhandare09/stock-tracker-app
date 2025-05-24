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
  }
  type Stock = {
    s_stock_id: string;
    isin_id: string;
    stock_symbol: string;
    s_stock_name: string;
    sector: string;
    market_cap: string;
    current_price: number | null;
    exchange: string;
    index: string;
  };
export const Fund: Fund[] = [
    {
      fund_id: "FND001",
      fund_name: "Global Growth Fund",
      amc_id: "AMC001",
      fund_type: "Equity",
      total_assets: 1500000000, // 1.5 billion
      nav: 120.45,
      expense_ratio: 0.75,
      manager_name: "John Smith",
      is_active: true,
    },
    {
      fund_id: "FND002",
      fund_name: "High Yield Bond Fund",
      amc_id: "AMC002",
      fund_type: "Fixed Income",
      total_assets: 800000000, // 800 million
      nav: 98.20,
      expense_ratio: 0.60,
      manager_name: "Jane Doe",
      is_active: true,
    },
    {
      fund_id: "FND003",
      fund_name: "Emerging Markets Fund",
      amc_id: "AMC003",
      fund_type: "Equity",
      total_assets: 500000000, // 500 million
      nav: 55.30,
      expense_ratio: 1.00,
      manager_name: "Alice Johnson",
      is_active: true,
    },
    {
      fund_id: "FND004",
      fund_name: "Sustainable Investment Fund",
      amc_id: "AMC004",
      fund_type: "Mixed Asset",
      total_assets: 950000000, // 950 million
      nav: 85.75,
      expense_ratio: 0.85,
      manager_name: "Michael Brown",
      is_active: false,
    },
    {
      fund_id: "FND005",
      fund_name: "Tech Innovators Fund",
      amc_id: "AMC005",
      fund_type: "Equity",
      total_assets: 1200000000, // 1.2 billion
      nav: 145.60,
      expense_ratio: 0.90,
      manager_name: "Emily Davis",
      is_active: true,
    },
    {
      fund_id: "FND006",
      fund_name: "Global Real Estate Fund",
      amc_id: "AMC006",
      fund_type: "Real Estate",
      total_assets: 700000000, // 700 million
      nav: 78.10,
      expense_ratio: 0.70,
      manager_name: "Robert Wilson",
      is_active: true,
    },
    {
      fund_id: "FND007",
      fund_name: "Balanced Growth Fund",
      amc_id: "AMC007",
      fund_type: "Balanced",
      total_assets: 650000000, // 650 million
      nav: 100.00,
      expense_ratio: 0.80,
      manager_name: "Laura Martinez",
      is_active: true,
    },
    {
      fund_id: "FND008",
      fund_name: "Bond Income Fund",
      amc_id: "AMC008",
      fund_type: "Fixed Income",
      total_assets: 400000000, // 400 million
      nav: 102.90,
      expense_ratio: 0.50,
      manager_name: "James Lee",
      is_active: false,
    },
  ];
  export const Stock: Stock[] = [
    {
      s_stock_id: "STK001",
      isin_id: "US0378331005",
      stock_symbol: "AAPL",
      s_stock_name: "Apple Inc.",
      sector: "Technology",
      market_cap: "2.7 trillion",
      current_price: 175.30,
      exchange: "NASDAQ",
      index: "NASDAQ-100",
    },
    {
      s_stock_id: "STK002",
      isin_id: "US5949181045",
      stock_symbol: "AMZN",
      s_stock_name: "Amazon.com, Inc.",
      sector: "Consumer Discretionary",
      market_cap: "1.6 trillion",
      current_price: 134.90,
      exchange: "NASDAQ",
      index: "NASDAQ-100",
    },
    {
      s_stock_id: "STK003",
      isin_id: "US4592001014",
      stock_symbol: "GOOGL",
      s_stock_name: "Alphabet Inc.",
      sector: "Communication Services",
      market_cap: "1.4 trillion",
      current_price: 2700.45,
      exchange: "NASDAQ",
      index: "S&P 500",
    },
    {
      s_stock_id: "STK004",
      isin_id: "US88160R1014",
      stock_symbol: "MSFT",
      s_stock_name: "Microsoft Corporation",
      sector: "Technology",
      market_cap: "2.5 trillion",
      current_price: 345.20,
      exchange: "NASDAQ",
      index: "NASDAQ-100",
    },
    {
      s_stock_id: "STK005",
      isin_id: "US00507V1098",
      stock_symbol: "TSLA",
      s_stock_name: "Tesla, Inc.",
      sector: "Consumer Discretionary",
      market_cap: "860 billion",
      current_price: 698.75,
      exchange: "NASDAQ",
      index: "NASDAQ-100",
    },
    {
      s_stock_id: "STK006",
      isin_id: "US2220721014",
      stock_symbol: "NFLX",
      s_stock_name: "Netflix, Inc.",
      sector: "Communication Services",
      market_cap: "220 billion",
      current_price: 405.60,
      exchange: "NASDAQ",
      index: "S&P 500",
    },
    {
      s_stock_id: "STK007",
      isin_id: "US0378331005",
      stock_symbol: "META",
      s_stock_name: "Meta Platforms, Inc.",
      sector: "Communication Services",
      market_cap: "960 billion",
      current_price: 330.20,
      exchange: "NASDAQ",
      index: "NASDAQ-100",
    },
    {
      s_stock_id: "STK008",
      isin_id: "US05538T1034",
      stock_symbol: "NVDA",
      s_stock_name: "NVIDIA Corporation",
      sector: "Technology",
      market_cap: "1.2 trillion",
      current_price: 490.75,
      exchange: "NASDAQ",
      index: "NASDAQ-100",
    },
  ];
  