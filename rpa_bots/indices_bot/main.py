import tagui as t
import os
import pandas as pd
from urllib.parse import quote
from config import *
from constants import *
from utility import *
import shutil  

t.init(visual_automation = True)

t.url(LINK_ALL_INDICES)
t.wait(2)
custom_wait('//*[@id="liveindexTable"]/tbody/tr[2]')

# Click the download button
t.click('//*[@id="dwldcsv"]')

current_download_dir = ALL_INDICES_LIST

if wait_for_download(timeout=100, interval=1):
    t.wait(2)
    current_dir = os.getcwd()
    files = os.listdir(current_dir)
    csv_files = [os.path.join(current_dir, f) for f in files if f.endswith('.csv') and os.path.isfile(os.path.join(current_dir, f))]
    
    if csv_files:
        downloaded_file = max(csv_files, key=os.path.getctime)

        df = pd.read_csv(downloaded_file, delimiter=',', dtype=str)

        df.columns = df.columns.str.strip()

        print("Column names in CSV file after stripping:")
        print(df.columns)
        move_files_to_subdirectory(current_download_dir)
        
        for index, row in df.iterrows():
            index_name = row[COLUMN_NAME]

            if not index_name or pd.isna(index_name):
                continue  

            encoded_index_name = quote(index_name)
            url = f'{BASE_URL}{encoded_index_name}'
            t.url(url)

            for _ in range(60):
                if t.present('//*[@id="equity-stock"]/div[2]/div/div[3]/div/ul/li/a/span'):
                    break
                t.wait(1)
            t.wait(2)
            t.dclick('//*[@id="equity-stock"]/div[2]/div/div[3]/div/ul/li/a/span')
            t.wait(3)

            if wait_for_download(timeout=100, interval=1):
                if index_name == INDEX_1:
                    current_download_dir = FOLDER_1
                elif index_name == INDEX_2:
                    current_download_dir = FOLDER_2
                elif index_name == INDEX_3:
                    current_download_dir = FOLDER_3
                elif index_name == INDEX_4:
                    current_download_dir = FOLDER_4
                elif index_name == INDEX_5:
                    current_download_dir = FOLDER_5
                move_files_to_subdirectory(current_download_dir)
            else:
                print("Download timed out or failed.")
    else:
        print('No CSV')

else:
    print("Download timed out or failed.")

t.close()

full_path = os.path.join(BASE_DIR, ALL_INDICES_LIST)

# Delete the ALL_INDICES_LIST folder
if os.path.exists(full_path):
    shutil.rmtree(full_path)
    print(f"Deleted folder: {full_path}")
else:
    print(f"Folder {full_path} does not exist.")

indices_name=[FOLDER_1,FOLDER_2,FOLDER_3,FOLDER_4,FOLDER_5]

# Upload the downloaded files to Dropbox
try:
    upload_to_dropbox(indices_name)
except Exception as e:
    print(f"Failed to upload files ")
