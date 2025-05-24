import pandas as pd
import re  # Import the regex module to safely handle string matches
from pathlib import Path
from datetime import datetime
import argparse
import os
import glob

def process_excel_file(file_path):
    xl = pd.ExcelFile(file_path, engine='openpyxl')  # Use openpyxl for .xlsx files
    data_frames = []

    for sheet_name in xl.sheet_names:
        print(f"Processing sheet: {sheet_name}")

        try:
            # Read the entire sheet without headers initially
            df = xl.parse(sheet_name, header=None)
            
            # Extract 'fund_name' from the first row and columns B to E (index 1 to 4)
            fund_name = ' '.join(df.iloc[0, 0:1].astype(str).str.strip())
            # Remove the string after the first occurrence of '('
            match = re.match(r'^[\w\s-]+(?=\s*\()', fund_name)
            if match:
                fund_name = match.group(0)

            # Dynamically identify the row where the "NAME OF THE INSTRUMENT" column appears
            instrument_row_idx = df.apply(lambda row: row.str.contains("Name of the Instrument", case=False, na=False)).any(axis=1).idxmax()
            
            # Skip rows above the identified row
            df = df.iloc[instrument_row_idx:].reset_index(drop=True)
            
            # Set the first row as the header
            df.columns = df.iloc[0].str.strip()
            df = df[1:].reset_index(drop=True)  # Skip the header row
            
            # Check for duplicate columns
            if df.columns.duplicated().any():
                print(f"Duplicate columns found in {sheet_name}. Skipping...")
                continue
            
            # Locate the 'EQUITY & EQUITY RELATED' section using uppercase search
            equity_start = df[df['ISIN Number'].str.contains('Equity & Equity related', na=False, case=False)].index
            if equity_start.empty:
                print(f"'Equity & Equity related' not found in {sheet_name}. Skipping...")
                continue
            equity_start = equity_start[0] + 1  # Start from the row after "EQUITY & EQUITY RELATED"
            
            # Find 'EQUITY & EQUITY RELATED TOTAL' row
            sub_total_index = df.iloc[equity_start:].loc[df['ISIN Number'].str.contains('Sub Total', na=False, case=False)].index
            if sub_total_index.empty:
                print(f"'Sub Total' not found after 'Equity & Equity related' in {sheet_name}. Skipping...")
                continue
            sub_total_index = sub_total_index[0]  # Include the "EQUITY & EQUITY RELATED TOTAL" row
            
            # Extract relevant data
            extracted_data = df.iloc[equity_start:sub_total_index].copy()
            
            # Filter out rows with specific phrases
            filter_pattern = re.escape('(a) Listed / awaiting listing on Stock Exchanges |B) LISTED/AWAITING LISTING ON STOCK EXCHANGES')
            extracted_data = extracted_data[~extracted_data['Name of the Instrument'].str.contains(
                filter_pattern, na=False, case=False
            )]
            

            # Add additional columns
            extracted_data['amc_short_name'] = "FRANKLIN_TEMPLETON"
            extracted_data['mf_short_name'] = sheet_name 
            extracted_data['fund_name'] = fund_name
            extracted_data['fund_type'] = 'equity'
            extracted_data['month_year'] = (datetime.now() - pd.DateOffset(months=1)).strftime('%b-%Y')

            # Rename columns as per the requirements
            extracted_data.rename(columns={
                'Name of the Instrument': 'instrument',
                'ISIN Number': 'isin',
                'Quantity': 'quantity',
                '% to Net Assets': 'holding_percentage'
            }, inplace=True)
            
           # Round the holding_percentage to 2 decimal places
            extracted_data['holding_percentage'] = extracted_data['holding_percentage'].astype(float).round(2)


            # Check if the first column is fully empty, if so, drop it
            if extracted_data.iloc[:, 0].isnull().all():
                extracted_data.drop(extracted_data.columns[0], axis=1, inplace=True)
            
            # Keep only the required columns
            extracted_data = extracted_data[['instrument', 'isin', 'quantity', 'holding_percentage', 'amc_short_name', 'mf_short_name', 'fund_name', 'fund_type', 'month_year']]
            
            # Remove rows where both `quantity` and `holding_percentage` are empty
            extracted_data.dropna(subset=['isin'], how='all', inplace=True)

            # Remove rows where both `quantity` and `holding_percentage` are empty
            extracted_data.dropna(subset=['quantity', 'holding_percentage'], how='all', inplace=True)
            
            # Reset index to avoid issues during concatenation
            extracted_data.reset_index(drop=True, inplace=True)
            data_frames.append(extracted_data)
            print(f"Data extracted from {sheet_name}, rows {equity_start} to {sub_total_index}.")

        except Exception as e:
            print(f"Error processing sheet {sheet_name}: {e}")

    return pd.concat(data_frames, ignore_index=True) if data_frames else None

def main():
    parser = argparse.ArgumentParser(description="Process all Excel files in a directory.")
    parser.add_argument("source_folder", type=str, help="Path to the folder containing Excel files.")
    parser.add_argument("output_file", type=str, help="Path to the output CSV file.")

    args = parser.parse_args()
    
    # List all .xlsx files in the specified folder
    file_paths = glob.glob(os.path.join(args.source_folder, "*.xlsx"))

    all_data_frames = []

    for file_path in file_paths:
        print(f"Processing file: {file_path}")
        result_df = process_excel_file(file_path)
        if result_df is not None:
            all_data_frames.append(result_df)

    if all_data_frames:
        combined_df = pd.concat(all_data_frames, ignore_index=True)
        combined_df.to_csv(args.output_file, index=False)
        print(f"Processed data saved to {args.output_file}")
    else:
        print("No data was processed.")


if __name__ == "__main__":
    main()
