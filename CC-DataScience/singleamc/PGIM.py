import pandas as pd
from pathlib import Path
import pyxlsb
from datetime import datetime
import argparse


def process_excel_file(file_path):
    xl = pd.ExcelFile(file_path, engine='pyxlsb')
    data_frames = []
    file_name = Path(file_path).stem  # Extract the file name without the extension

    for sheet_name in xl.sheet_names:
        print(f"Processing sheet: {sheet_name}")
        df = xl.parse(sheet_name, header=None)  # Read without headers initially
        
        # Find the index where the desired columns are present
        header_index = df[df.apply(lambda row: row.str.contains("Name of  Instrument|ISIN", na=False, case=False).any(), axis=1)].index
        if header_index.empty:
            print(f"Neither 'Name of the Instrument' nor 'ISIN' found in {sheet_name}. Skipping...")
            continue

        # Get the index of the row with the header
        header_index = header_index[0]
        df = xl.parse(sheet_name, skiprows=header_index)  # Skip rows until the header
        df.columns = df.columns.str.strip()  # Clean any whitespace from headers
        
        # Re-check if the key columns exist
        if "Name of  Instrument" in df.columns:
            column_name = "Name of  Instrument"
        elif "ISIN" in df.columns:
            column_name = "ISIN"
        else:
            print(f"Neither 'Name of the Instrument' nor 'ISIN' found in {sheet_name}. Skipping...")
            continue

        # Locate "Equity & Equity related"
        equity_start = df[df[column_name].str.contains("Equity & Equity related", na=False, case=False)].index
        if equity_start.empty:
            print(f"'Equity & Equity related' not found in {sheet_name}. Skipping...")
            continue

        print(f"'Equity & Equity related' found at row {equity_start[0]} in {sheet_name}.")
        
        # Start from the row after "Equity & Equity related"
        equity_start = equity_start[0] + 1
        # Locate the first "Sub Total"
        sub_total_index = df.iloc[equity_start:].loc[df[column_name].str.contains("Sub Total", na=False, case=False)].index
        
        if not sub_total_index.empty:
            sub_total_index = sub_total_index[0]   # Include "Sub Total" row
            extracted_data = df.iloc[equity_start:sub_total_index]
            
            # Filter out rows with specific phrases
            extracted_data = extracted_data[~extracted_data[column_name].str.contains(
                "Listed|Awaiting listing on Stock Exchange", na=False, case=False
            )]

            # Rename columns
            extracted_data.rename(columns={
                "Name of  Instrument": "instrument",
                "ISIN": "isin",
                "Quantity": "quantity",
                "%  to Net Assets": "holding_percentage"
            }, inplace=True)
            
            # Add the necessary columns
            extracted_data['amc_short_name'] = 'PGIM'
            extracted_data['mf_short_name'] = sheet_name
            extracted_data['fund_name'] = file_name  # Add a column with the file name
            extracted_data['fund_type'] = 'equity'
            extracted_data['month_year'] = (datetime.now() - pd.DateOffset(months=1)).strftime('%b-%Y')
            
            # Keep only the relevant columns
            extracted_data = extracted_data[[
                'instrument', 'isin', 'quantity', 'holding_percentage',
                'amc_short_name', 'mf_short_name', 'fund_name', 'fund_type', 'month_year'
            ]]
            
            # Drop rows where the first 4 columns are empty
            extracted_data.dropna(subset=['instrument', 'isin', 'quantity', 'holding_percentage'], how='all', inplace=True)
            

            data_frames.append(extracted_data)
            print(f"Data extracted from {sheet_name}, rows {equity_start} to {sub_total_index}.")
        else:
            print(f"'Sub Total' not found after 'Equity & Equity related' in {sheet_name}. Skipping...")

    return pd.concat(data_frames, ignore_index=True) if data_frames else pd.DataFrame()

def process_directory(directory_path, output_file):
    combined_data = pd.DataFrame()  # Initialize as an empty DataFrame

    for file in Path(directory_path).glob('*.xlsb'):
        print(f"Processing {file.name}")
        processed_data = process_excel_file(file)
        if not processed_data.empty:
            combined_data = pd.concat([combined_data, processed_data], ignore_index=True)
        else:
            print(f"No relevant data found in {file.name}.")

    if not combined_data.empty:
        combined_data.to_csv(output_file, index=False)
        print(f"Data has been processed and saved to {output_file}")
    else:
        print("No data was processed.")

# Run the processing
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process AMC Excel files.")
    parser.add_argument("source_dir", type=str, help="Path to the source directory containing the Excel files.")
    parser.add_argument("output_file", type=str, help="Path to the output CSV file.")

    args = parser.parse_args()

    process_directory(args.source_dir, args.output_file)

 