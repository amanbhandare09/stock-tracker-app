import os
from datetime import datetime

def test_folder_creation(main_folder_path ,amc_folders):
 multiple_sheets_folder_path = os.path.join(main_folder_path, 'multiple_sheets')

 assert os.path.isdir(main_folder_path),f"Main folder {main_folder_path} was not created."

 print(f"Main folder {main_folder_path} was created successfully.")

 assert os.path.isdir(multiple_sheets_folder_path),f"Multiple sheets folder {multiple_sheets_folder_path} was not created."

 print(f"Multiple sheets folder {multiple_sheets_folder_path} was created successfully.")

 actual_amc_folder = [folder for folder in os.listdir(multiple_sheets_folder_path) if os.path.isdir(os.path.join(multiple_sheets_folder_path, folder))]

 expected_count = 41
 actual_count = len(actual_amc_folder)
 assert actual_count == expected_count,f"Expected {expected_count} AMC folders but found {actual_count} AMC folders."

 print(f"Expected {expected_count} AMC folders and found {actual_count} AMC folders.")

 for amc_folder in amc_folders:
     assert amc_folder in actual_amc_folder,f"Expected {amc_folder} folder but not found."

 print(f"Expected AMC folders are found in the multiple sheets folder.")

current_year = datetime.now().year

main_folder = '../portfolio_disclosure_downloading_bot/{current_year}'

expected_amc_folders = ['360','BOI','ADITYA_BIRLA_CAPITAL','BARODA','DSP','CANARA_ROBECO','EDELWEISS','FRANKLIN_TEMPLETON','GROWW', 'HDFC', 'HELIOS','HSBC','ICICI','INVESCO','ITIAMC','JM_FINANCIAL','BANDHAN','AXIS','MOTILAL','NJ','OLD_BRIDGE_ASSET','PPFAS','KOTAK','SAMCO','QUANT','PGIM','NIPPON','NAVI','MIRAE','SBI','SUNDARAM','TRUST','WHITEOAK','TAURUS','UNION','ZERODHA','LIC','MAHINDRA','SHRIRAM','UTI','TATA']

test_folder_creation(main_folder, expected_amc_folders)


