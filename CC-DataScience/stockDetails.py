import gspread
from google.oauth2.service_account import Credentials
import yfinance as yf
import time
import os
import requests
import sys
from dotenv import load_dotenv

load_dotenv()

STOCK_LIST = os.getenv('STOCK_LIST')

# Define scope and authenticate credentials for Google Sheets API
scope = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
creds = Credentials.from_service_account_file(
    "C:/Users/HP/OneDrive/Documents/CODE/InternshipProject/Mutual Funds/CC-DataScience/utilis/MutualFundJson/stocks-433706-1eba024cb90a.json",
    scopes=scope
)
client = gspread.authorize(creds)

# Open the Google Sheet
spreadsheet = client.open("stocks daily")
worksheet = spreadsheet.sheet1  

worksheet.clear()

# Update headers in the Google Sheet
worksheet.update('A1:E1', [["stock", "current_price", "high_52_week", "low_52_week"]])

# Read stock symbols from a text file
with open("CC-DataScience/Data/stockSymbol.txt", 'r') as file:
    stockSymbols = [line.strip() for line in file]

# Prepare data to update in batch
batch_data = []

for i, stock in enumerate(stockSymbols, start=2):
    stockdata = stock + ".NS"
    
    try:
        stock_data = yf.Ticker(stockdata)
        hist = stock_data.history(period="1d")
        hist_1y = stock_data.history(period="max")
        
        # Check if the historical data is empty
        if not hist.empty:
            current_price = hist['Close'].iloc[0]
            high_52_week = hist_1y['Close'].max()
            low_52_week = hist_1y['Close'].min()

            # Format values to 2 decimal places
            current_price = f"{current_price:.2f}"
            high_52_week = f"{high_52_week:.2f}"
            low_52_week = f"{low_52_week:.2f}"
            
            # Append row data to batch data list
            batch_data.append([stock, current_price, high_52_week, low_52_week])
            
            print(f"Prepared update for {stock}")
        else:
            print(f"No data found for {stock}, symbol may be delisted or incorrect.")
    
    except Exception as e:
        print(f"Error fetching data for {stock}: {e}")
    
    time.sleep(1)  # Sleep for 1 second to prevent rate limiting

if batch_data:
    worksheet.update(f'A2:E{1 + len(batch_data)}', batch_data)


def getGoogleSheet(spreadsheet_id, outDir, outFile):
    url = f'https://docs.google.com/spreadsheets/d/{spreadsheet_id}/export?format=csv'
    response = requests.get(url)
    if response.status_code == 200:
        filepath = os.path.join(outDir, outFile)
        with open(filepath, 'wb') as f:
            f.write(response.content)
            print(f'CSV file saved to: {filepath}')
    else:
        print(f'Error downloading Google Sheet: {response.status_code}')
        sys.exit(1)

# Print success message after updating stock prices
print("Stock prices updated successfully!")

# Define output directory and ensure it exists
outDir = STOCK_LIST
os.makedirs(outDir, exist_ok=True)

# Specify Google Sheet ID and download the CSV file
spreadsheet_id = '1RJIYxtkaPOqy37pEcd-tNLA2za9ZD2tZ_S1sErMxh74'
getGoogleSheet(spreadsheet_id, outDir, "stockDetails.csv")

sys.exit(0)  # Exit the script successfully