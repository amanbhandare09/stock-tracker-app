import tagui as t
import pandas as pd
from urllib.parse import quote
from config import CSV_FILE_PATH, BASE_URL
from constants import *

def process_data():
    t.init()
    df = pd.read_csv(CSV_FILE_PATH, delimiter=',', dtype=str)

    print("Column names in CSV file:")
    print(df.columns)

    for index, row in df.iterrows():
        company_name = row[COMPANY_NAME_COLUMN_NAME]

        if not company_name or pd.isna(company_name):
            continue  

        encoded_company_name = quote(company_name)
        url = f'{BASE_URL}{encoded_company_name}'
        t.url(url)

        for _ in range(60):
            if t.present('//*[@id="quoteName"]'):
                if t.read('//*[@id="quoteName"]'):
                    break
            t.wait(1)

        try:
            full_company_name = t.read('//*[@id="quoteName"]/span[1]') or 'N/A'
            stock_price = t.read('//span[@id="quoteLtp"]') or 'N/A'
            total_market_cap = t.read('//*[@id="orderBookTradeTMC"]') or 'N/A'
            traded_volume = t.read("//span[@id='orderBookTradeVol']") or 'N/A'
            traded_value = t.read("//span[@id='orderBookTradeVal']") or 'N/A'
            face_value = t.read("//span[@id='mainFaceValue']") or 'N/A'
            week_52_high = t.read("//span[@id='week52highVal']") or 'N/A'
            week_52_low = t.read("//span[@id='week52lowVal']") or 'N/A'
            basic_industry = t.read("//*[@id='securities_info_table']/tbody/tr[7]/td[2]") or 'N/A'
            index_listed = t.read("//*[@id='securities_info_table']/tbody/tr[6]/td[2]") or 'N/A'
            date_of_listing = t.read("//*[@id='securities_info_table']/tbody/tr[3]/td[2]") or 'N/A'
            status = t.read('/html/body/div[11]/div/div/section/div/div/div/div/div/div[2]/div/div/div/div[2]/div/div[2]/div/div[5]/div/div/div/table/tbody/tr[1]/td[2]') or 'N/A'
            trading_status = t.read("/html/body/div[11]/div/div/section/div/div/div/div/div/div[2]/div/div/div/div[2]/div/div[2]/div/div[5]/div/div/div/table/tbody/tr[2]/td[2]") or 'N/A'
            isinnumber = t.read("//*[@id='quoteName']/span[2]") or 'N/A'
        except Exception as e:
            print(f"Error extracting data for {company_name}: {e}")
            continue

        print(f"Full Company Name: {full_company_name}")
        print(f"Stock Price: {stock_price}")
        print(f"Total Market Cap: {total_market_cap}")
        print(f"Traded Volume: {traded_volume}")
        print(f"Traded Value: {traded_value}")
        print(f"Face Value: {face_value}")
        print(f"52 Week High: {week_52_high}")
        print(f"52 Week Low: {week_52_low}")
        print(f"Basic Industry: {basic_industry}")
        print(f"Index: {index_listed}")
        print(f"Date of Listing: {date_of_listing}")
        print(f"Status: {status}")
        print(f"Trading Status: {trading_status}")
        print(f"ISIN: {isinnumber}")

        df.at[index, FULL_COMPANY_NAME_COLUMN_NAME] = full_company_name
        df.at[index, STOCK_PRICE_COLUMN_NAME] = stock_price
        df.at[index, TOTAL_MARKET_CAP_COLUMN_NAME] = total_market_cap
        df.at[index, TRADED_VOLUME_COLUMN_NAME] = traded_volume
        df.at[index, TRADED_VALUE_COLUMN_NAME] = traded_value
        df.at[index, FACE_VALUE_COLUMN_NAME] = face_value
        df.at[index, WEEK_52_HIGH_COLUMN_NAME] = week_52_high
        df.at[index, WEEK_52_LOW_COLUMN_NAME] = week_52_low
        df.at[index, BASIC_INDUSTRY_COLUMN_NAME] = basic_industry
        df.at[index, INDEX_COLUMN_NAME] = index_listed
        df.at[index, DATE_OF_LISTING_COLUMN_NAME] = date_of_listing
        df.at[index, STATUS_COLUMN_NAME] = status
        df.at[index, TRADING_STATUS_COLUMN_NAME] = trading_status
        df.at[index, ISIN_COLUMN_NAME] = isinnumber

        df.to_csv(CSV_FILE_PATH, index=False)
        