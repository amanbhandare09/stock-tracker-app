import tagui as t
import os
import time
import pandas as pd
from config import NSE_URL, CSV_FILE_PATH
from constants import *


def extract_data():
    t.init()
    t.url(NSE_URL)

    for _ in range(200):
        if t.present('//tbody/tr[1]/td[3]/a[1]/img[1]'):
            if t.click('//tbody/tr[1]/td[3]/a[1]/img[1]'):
                break
        t.wait(1)

    time.sleep(10)

    current_dir = os.getcwd()
    files = os.listdir(current_dir)
    downloaded_file = max([os.path.join(current_dir, f) for f in files if os.path.isfile(os.path.join(current_dir, f))], key=os.path.getctime)

    df = pd.read_excel(downloaded_file, engine='openpyxl')

    if SYMBOL_COLUMN_NAME in df.columns:
        symbol_column = df[SYMBOL_COLUMN_NAME].dropna().reset_index(drop=True)
        
        if len(symbol_column) > 2:
            symbol_column = symbol_column[:-2] 
        
        headers = [
            COMPANY_NAME_COLUMN_NAME, FULL_COMPANY_NAME_COLUMN_NAME, STOCK_PRICE_COLUMN_NAME, TOTAL_MARKET_CAP_COLUMN_NAME,
            TRADED_VOLUME_COLUMN_NAME, TRADED_VALUE_COLUMN_NAME, FACE_VALUE_COLUMN_NAME, WEEK_52_HIGH_COLUMN_NAME,
            WEEK_52_LOW_COLUMN_NAME, BASIC_INDUSTRY_COLUMN_NAME, INDEX_COLUMN_NAME, DATE_OF_LISTING_COLUMN_NAME, STATUS_COLUMN_NAME, TRADING_STATUS_COLUMN_NAME, ISIN_COLUMN_NAME
        ]
        
        new_df = pd.DataFrame(columns=headers)
        new_df[COMPANY_NAME_COLUMN_NAME] = symbol_column
        
        csv_file_path = CSV_FILE_PATH
        new_df.to_csv(csv_file_path, index=False)
        
        print(f"Data from '{SYMBOL_COLUMN_NAME}' column has been copied to '{COMPANY_NAME_COLUMN_NAME}' with headers in {csv_file_path}")
    else:
        print(f"Column '{SYMBOL_COLUMN_NAME}' does not exist in the DataFrame.")
    
    t.close()
