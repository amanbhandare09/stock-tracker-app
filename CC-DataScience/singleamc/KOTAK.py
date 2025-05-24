import pandas as pd
import re
from pathlib import Path
from datetime import datetime
import os
import glob

def process_excel_file(file_path):
    xl = pd.ExcelFile(file_path, engine='openpyxl')  # Use openpyxl for .xlsx files
    data_frames = []
    file_name = Path(file_path).stem  # Extract the file name without the extension

    for sheet_name in xl.sheet_names:
        print(f"Processing sheet: {sheet_name}")

        try:
            # Read the entire sheet without headers initially
            df = xl.parse(sheet_name, header=None)
            
            # Convert entire DataFrame to string to avoid issues with non-string types
            df = df.astype(str)
            
            # Extract 'fund_name' from the first row and columns B to E (index 1 to 4)
            fund_name_string = df.iloc[0, 2].strip()
            
            # Use regular expression to extract the fund name
            match = re.search(r'of (.+?) as on', fund_name_string)
            if match:
                fund_name = match.group(1).strip()
            else:
                fund_name = "Fund Name Not Found"

            # Check if required headers are present in the 2nd row
            headers_row = df.iloc[1, :].str.strip().str.lower()
            required_headers = ['name of instrument']
            if not all(header in headers_row.tolist() for header in required_headers):
                print(f"Required headers not found in sheet {sheet_name}. Skipping...")
                continue
            
            # Dynamically identify the row where "Equity & Equity related" appears in column A
            equity_related_idx = df[df[0].str.contains("Equity & Equity related", case=False, na=False)].index
            if equity_related_idx.empty:
                print(f"'Equity & Equity related' not found in {sheet_name}. Skipping...")
                continue
            equity_related_idx = equity_related_idx[0]   # Start from the row after "Equity & Equity related"
            
            # Search for the "Listed/Awaiting listing on Stock Exchange" in column B
            listed_idx = df[df[1].str.contains("Listed/Awaiting listing on Stock Exchange", na=False, case=False)].index
            if listed_idx.empty:
                print(f"'Listed/Awaiting listing on Stock Exchange' not found in {sheet_name}. Skipping...")
                continue
            listed_idx = listed_idx[0]  # Index of the row containing the string
            
            # Include the row immediately after the "Listed/Awaiting listing on Stock Exchange" row
            start_idx = listed_idx - 1
            
            # Set the first row as the header from the initial headers row
            df.columns = df.iloc[1].str.strip()
            df = df[2:].reset_index(drop=True)  # Skip the header row and reset the index

            # Extract relevant data starting from the identified row
            extracted_data = df.iloc[start_idx:].copy()
            
            # Locate the 'TOTAL' row in column E to stop the data collection
            sub_total_idx = extracted_data[extracted_data.iloc[:, 4].str.contains('Total', na=False, case=False)].index
            if sub_total_idx.empty:
                print(f"'Total' not found after 'Equity & Equity related' in {sheet_name}. Skipping...")
                continue
            sub_total_idx = sub_total_idx[0]  # Include the "TOTAL" row
            
            # Keep only relevant rows, excluding the 'TOTAL' row
            extracted_data = extracted_data.loc[:sub_total_idx-1]
            
            # Add additional columns
            extracted_data['amc_short_name'] = "KOTAK"
            extracted_data['mf_short_name'] = sheet_name 
            extracted_data['fund_name'] = fund_name  # Extracting fund_name from column C
            extracted_data['fund_type'] = 'equity'
            extracted_data['month_year'] = (datetime.now() - pd.DateOffset(months=1)).strftime('%b-%Y')

            # Combine columns A-C for the Name of Instrument
            extracted_data['instrument'] = extracted_data.iloc[:, 2]
            
            # Map other columns
            extracted_data.rename(columns={
                df.columns[3]: 'isin',  # ISIN Code in column D
                df.columns[6]: 'quantity',  # Quantity in column G
                df.columns[8]: 'holding_percentage'  # % to Net Assets in column I
            }, inplace=True)
            
            # Check if the first column is fully empty, if so, drop it
            if extracted_data.iloc[:, 0].isnull().all():
                extracted_data.drop(extracted_data.columns[0], axis=1, inplace=True)
            
            # Keep only the required columns
            extracted_data = extracted_data[['instrument', 'isin', 'quantity', 'holding_percentage', 'amc_short_name', 'mf_short_name', 'fund_name', 'fund_type', 'month_year']]
            
            # Remove rows where both `quantity` and `holding_percentage` are empty
            extracted_data.dropna(subset=['isin', 'quantity'], how='all', inplace=True)
            extracted_data.dropna(subset=['quantity', 'holding_percentage'], how='all', inplace=True)
            
            # Reset index to avoid issues during concatenation
            extracted_data.reset_index(drop=True, inplace=True)
            data_frames.append(extracted_data)
            print(f"Data extracted from {sheet_name}, rows {start_idx} to {sub_total_idx-1}.")

        except Exception as e:
            print(f"Error processing sheet {sheet_name}: {e}")

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
        print("Usage: python script_name.py <input_directory_path> <output_file_path>")
        sys.exit(1)

    SOURCE_FOLDER = sys.argv[1]
    OUTPUT_FILE = sys.argv[2]

    process_directory(SOURCE_FOLDER, OUTPUT_FILE)
