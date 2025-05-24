import pandas as pd
from pathlib import Path
from datetime import datetime
import os
import glob

def process_excel_file(file_path):
    xl = pd.ExcelFile(file_path, engine='openpyxl')
    data_frames = []
    file_name = Path(file_path).stem  # Extract the file name without the extension

    for sheet_name in xl.sheet_names:
        print(f"Processing sheet: {sheet_name}")
        df = xl.parse(sheet_name, header=None, skiprows=22)  # Skip first 22 rows
        
        # Drop the first column and reset index
        df = df.iloc[:, 1:].reset_index(drop=True)  

        # Set the column names
        column_names = [
            "Name of Instrument", "ISIN", "Industry/Rating", 
            "Quantity", "Market/Fair Value (INR Lacs)", "% to Net Assets", "% Yield"
        ]
        df.columns = column_names
        
        # Locate "Equity & Equity related"
        equity_start = df[df["Name of Instrument"].str.contains("Equity & Equity related", na=False, case=False)].index
        if equity_start.empty:
            print(f"'Equity & Equity related' not found in {sheet_name}. Skipping...")
            continue
        
        print(f"'Equity & Equity related' found at row {equity_start[0]} in {sheet_name}.")
        
        # Start from the row after "Equity & Equity related"
        equity_start = equity_start[0] + 1
        # Locate the first "Sub Total"
        sub_total_index = df.iloc[equity_start:].loc[df["Name of Instrument"].str.contains("Sub Total", na=False, case=False)].index
        
        if not sub_total_index.empty:
            sub_total_index = sub_total_index[0]   # Include "Sub Total" row
            extracted_data = df.iloc[equity_start:sub_total_index]
            
            # Filter out rows with specific phrases
            extracted_data = extracted_data[~extracted_data["Name of Instrument"].str.contains(
                "Listed|Awaiting listing on Stock Exchange", na=False, case=False
            )]

            # Drop rows where the first 4 columns are empty
            extracted_data = extracted_data.dropna(subset=extracted_data.columns[:4], how='all')

            # Rename the columns
            extracted_data = extracted_data.rename(columns={
                "Name of Instrument": "instrument",
                "ISIN": "isin",
                "Quantity": "quantity",
                "% to Net Assets": "holding_percentage",
            })

            # Keep only the required columns
            extracted_data = extracted_data[[
                "instrument", "isin", "quantity", "holding_percentage"
            ]]
            
            # Add the additional columns
            extracted_data['amc_short_name'] = 'SHRIRAM'
            extracted_data['mf_short_name'] = sheet_name
            extracted_data['fund_name'] = sheet_name
            extracted_data['fund_type'] = 'equity'
            extracted_data['month_year'] = (datetime.now() - pd.DateOffset(months=1)).strftime('%b-%Y')

            data_frames.append(extracted_data)
            print(f"Data extracted from {sheet_name}, rows {equity_start} to {sub_total_index}.")
        else:
            print(f"'Sub Total' not found after 'Equity & Equity related' in {sheet_name}. Skipping...")

    return pd.concat(data_frames, ignore_index=True) if data_frames else None

def process_directory(directory_path, output_file):
    all_data = []
    for file_path in glob.glob(os.path.join(directory_path, "*.xlsx")):
        print(f"Processing file: {file_path}")
        processed_data = process_excel_file(file_path)
        if processed_data is not None:
            all_data.append(processed_data)
    
    if all_data:
        final_data = pd.concat(all_data, ignore_index=True)
        final_data.to_csv(output_file, index=False)
        print(f"All data has been processed and saved to {output_file}")
    else:
        print("No data was processed.")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python SHRIRAM.py <input_directory_path> <output_file_path>")
        sys.exit(1)

    SOURCE_FOLDER = sys.argv[1]
    OUTPUT_FILE = sys.argv[2]

    process_directory(SOURCE_FOLDER, OUTPUT_FILE)
