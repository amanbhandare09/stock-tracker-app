# import pandas as pd
# from pathlib import Path
# from datetime import datetime, timedelta
# import re
# import argparse
# import os
# import glob

# def extract_fund_name(sheet_name, header_text):
#     # Extract fund name from header text
#     match = re.search(r'of the (.*?) for the', header_text)
#     return match.group(1) if match else 'Unknown Fund'

# def process_excel_file(file_path, output_file):
#     xl = pd.ExcelFile(file_path, engine='openpyxl')
#     data_frames = []
    
#     # Get the current date and calculate one month before
#     today = datetime.today()
#     last_month = today - timedelta(days=today.day)
#     month_year = last_month.strftime('%b-%Y')
    
#     for sheet_name in xl.sheet_names:
#         # Skip the sheet if the name is "Index"
#         if sheet_name.lower() == "index":
#             print(f"Skipping sheet: {sheet_name} (Sheet name is 'Index')")
#             continue
        
#         print(f"Processing sheet: {sheet_name}")
        
#         # Read the sheet, starting from the row where headers are located
#         df = xl.parse(sheet_name, skiprows=10)  # Skip the first 10 rows, so row 11 becomes the header
        
#         # Ensure the "Name of Instrument" column is present
#         if "Name of Instrument" not in df.columns:
#             print(f"Skipping sheet: {sheet_name} (No 'Name of Instrument' column found)")
#             continue
        
#         # Find the start and end of the equity section
#         equity_start = df[df["Name of Instrument"].str.contains("EQUITY & EQUITY RELATED", na=False, case=False)].index
#         equity_end = df[df["Name of Instrument"].str.contains("Total of all Equity", na=False, case=False)].index

#         if not equity_start.empty and not equity_end.empty:
#             # Extract the relevant portion of the DataFrame
#             relevant_data = df.loc[equity_start[0]:equity_end[0]-1]
            
#             # Rename columns and keep only the required columns
#             relevant_data = relevant_data.rename(columns={
#                 "Name of Instrument": "instrument",
#                 "ISIN": "isin",
#                 "Quantity": "quantity",
#                 "% to NAV": "holding_percentage",
#             })
#             relevant_data = relevant_data[[
#                 "instrument", "isin", "quantity", "holding_percentage"
#             ]]

#             # Add the additional columns
#             relevant_data['amc_short_name'] = 'QUANTUM'
#             relevant_data['mf_short_name'] = sheet_name
            
#             # Extract fund name from the 9th row (header text)
#             header_text = xl.parse(sheet_name, nrows=9).iloc[-1, 0]
#             relevant_data['fund_name'] = extract_fund_name(sheet_name, header_text)
            
#             relevant_data['fund_type'] = 'equity'
#             relevant_data['month_year'] = month_year
#             relevant_data.dropna(subset=['isin','quantity'], how='all', inplace=True)
            
#             if "holding_percentage" in relevant_data.columns:
#                 relevant_data["holding_percentage"] = (relevant_data["holding_percentage"].astype(float) * 100).round(2)

#             data_frames.append(relevant_data)
#         else:
#             print(f"Skipping sheet: {sheet_name} (No equity data found or 'Total of all Equity' missing)")
    
#     # Combine all the relevant data and save to a CSV
#     if data_frames:
#         final_df = pd.concat(data_frames, ignore_index=True)
#         final_df.to_csv(output_file, index=False)
#         print(f"Data saved to {output_file}")
#     else:
#         print("No relevant data found in any sheet.")
    
# input_file = r"C:\Users\prana\OneDrive\Documents\try\QUANTUM\722fce22-a28a-49bb-86ea-ec0b5b30d5d4.xlsx"  # replace with your file path
# output_file = r"C:\Users\prana\OneDrive\Documents\try\QUANTUM\quantum.csv" # replace with your desired output file path

# process_excel_file(input_file, output_file)


import pandas as pd
from pathlib import Path
from datetime import datetime, timedelta
import re
import argparse
import os

def extract_fund_name(sheet_name, header_text):
    # Extract fund name from header text
    match = re.search(r'of the (.*?) for the', header_text)
    return match.group(1) if match else 'Unknown Fund'

def process_excel_file(file_path, output_file):
    xl = pd.ExcelFile(file_path, engine='openpyxl')
    data_frames = []

    # Get the current date and calculate one month before
    today = datetime.today()
    last_month = today - timedelta(days=today.day)
    month_year = last_month.strftime('%b-%Y')

    for sheet_name in xl.sheet_names:
        # Skip the sheet if the name is "Index"
        if sheet_name.lower() == "index":
            print(f"Skipping sheet: {sheet_name} (Sheet name is 'Index')")
            continue

        print(f"Processing sheet: {sheet_name}")

        # Read the sheet, starting from the row where headers are located
        df = xl.parse(sheet_name, skiprows=10)  # Skip the first 10 rows, so row 11 becomes the header

        # Ensure the "Name of Instrument" column is present
        if "Name of Instrument" not in df.columns:
            print(f"Skipping sheet: {sheet_name} (No 'Name of Instrument' column found)")
            continue

        # Find the start and end of the equity section
        equity_start = df[df["Name of Instrument"].str.contains("EQUITY & EQUITY RELATED", na=False, case=False)].index
        equity_end = df[df["Name of Instrument"].str.contains("Total of all Equity", na=False, case=False)].index

        if not equity_start.empty and not equity_end.empty:
            # Extract the relevant portion of the DataFrame
            relevant_data = df.loc[equity_start[0]:equity_end[0]-1]

            # Rename columns and keep only the required columns
            relevant_data = relevant_data.rename(columns={
                "Name of Instrument": "instrument",
                "ISIN": "isin",
                "Quantity": "quantity",
                "% to NAV": "holding_percentage",
            })
            relevant_data = relevant_data[[
                "instrument", "isin", "quantity", "holding_percentage"
            ]]

            # Add the additional columns
            relevant_data['amc_short_name'] = 'QUANTUM'
            relevant_data['mf_short_name'] = sheet_name

            # Extract fund name from the 9th row (header text)
            header_text = xl.parse(sheet_name, nrows=9).iloc[-1, 0]
            relevant_data['fund_name'] = extract_fund_name(sheet_name, header_text)

            relevant_data['fund_type'] = 'equity'
            relevant_data['month_year'] = month_year
            relevant_data.dropna(subset=['isin', 'quantity'], how='all', inplace=True)

            if "holding_percentage" in relevant_data.columns:
                relevant_data["holding_percentage"] = (relevant_data["holding_percentage"].astype(float) * 100).round(2)

            data_frames.append(relevant_data)
        else:
            print(f"Skipping sheet: {sheet_name} (No equity data found or 'Total of all Equity' missing)")

    # Combine all the relevant data and save to a CSV
    if data_frames:
        final_df = pd.concat(data_frames, ignore_index=True)
        final_df.to_csv(output_file, index=False)
        print(f"Data saved to {output_file}")
    else:
        print("No relevant data found in any sheet.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process Excel files and save to CSV.")
    parser.add_argument("input_dir", help="Directory containing input Excel files.")
    parser.add_argument("output_file", help="Path to save the output CSV file.")
    args = parser.parse_args()

    # Process each Excel file in the input directory
    for excel_file in Path(args.input_dir).glob("*.xlsx"):
        process_excel_file(excel_file, args.output_file)
