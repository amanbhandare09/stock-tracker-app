import os
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

INDICES_DIRECTORY_PATH = os.getenv('INDICES_DIRECTORY_PATH')
INDICES_OUTPUT_PATH = os.getenv('INDICES_OUTPUT_PATH')
 
# Define the columns you want to keep
columns_to_keep = ["SYMBOL", "OPEN", "HIGH", "PREV. CLOSE", "LTP", "52W H", "52W L"]

new_column_names = {
    "SYMBOL": "symbol",
    "OPEN": "open",
    "HIGH": "high",
    "PREV. CLOSE": "close",
    "LTP": "ltp",
    "52W H": "w_h",
    "52W L": "w_l"
}


# Create an empty DataFrame to store data from all folders
final_df = pd.DataFrame()

# Iterate over each folder within the base directory
for folder_name in os.listdir(INDICES_DIRECTORY_PATH):
    folder_path = os.path.join(INDICES_DIRECTORY_PATH, folder_name)
    
    # Ensure it's a directory
    if os.path.isdir(folder_path):
        # Iterate over each CSV file in the current folder
        for file_name in os.listdir(folder_path):
            if file_name.endswith('.csv'):
                file_path = os.path.join(folder_path, file_name)

                # Read the CSV file
                df = pd.read_csv(file_path)

                # Strip any leading/trailing spaces from column names
                df.columns = df.columns.str.strip()

                # Ensure the columns_to_keep are present in the DataFrame
                available_columns = [col for col in columns_to_keep if col in df.columns]

                # If all necessary columns are present, proceed to filter
                if available_columns:
                    # Create a copy of the filtered DataFrame to avoid the SettingWithCopyWarning
                    filtered_df = df.loc[:, available_columns].copy()

                    filtered_df['52W H']=filtered_df['52W H'].replace({'-':'0.00'})
                    filtered_df['52W L']=filtered_df['52W L'].replace({'-':'0.00'})

                    # Add the 'index_name' column using the first row's value if it exists
                    if not df.empty and df.shape[0] > 0:
                        filtered_df['indice_name'] = df.iloc[0, 0]
                    else:
                        filtered_df['indice_name'] = None  # or some default value

                    # Add the 'indices' column with the name of the folder
                    filtered_df['indice_category'] = folder_name

                    # Rename columns
                    filtered_df.rename(columns=new_column_names, inplace=True)

                    # Remove commas from numeric columns
                    for col in ["open", "high", "close", "ltp", "w_h", "w_l"]:
                        if col in filtered_df.columns:
                            filtered_df[col] = filtered_df[col].str.replace(',', '').astype(float)

                    # Append the filtered data to the final DataFrame
                    final_df = pd.concat([final_df, filtered_df])

                else:
                    print(f"Warning: Not all required columns found in file {file_name}")

# Save the final consolidated data to a new CSV in the base directory
output_file_path = os.path.join(INDICES_OUTPUT_PATH, 'final_indices.csv')
final_df.to_csv(output_file_path, index=False)

print(f"Final consolidated data saved to '{output_file_path}'.")
