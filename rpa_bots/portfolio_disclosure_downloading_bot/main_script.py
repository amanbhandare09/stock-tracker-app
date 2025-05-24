from selenium import webdriver
import time
import os
from utility import *
from web_script import *
from date_script import *
from constants import *

def generate_download_dirs(amc_names, base_dir=year, sub_dir=SUB_DIR):
    download_dirs = {}
    for fund in amc_names:
        download_dirs[fund] = os.path.join(os.getcwd(), base_dir, sub_dir, fund)
    return download_dirs

# List of fund names (ALL)
amc_names = [
    AMC1, AMC2, AMC3, AMC4, AMC5, AMC6, AMC7, AMC8, AMC9, AMC10,
    AMC11, AMC12, AMC13, AMC14, AMC15, AMC16, AMC17, AMC18, AMC19, AMC20,
    AMC21, AMC22, AMC23, AMC24, AMC25, AMC26, AMC27, AMC28, AMC29, AMC30,
    AMC31, AMC32, AMC33, AMC34, AMC35, AMC36, AMC37, AMC38, AMC39, AMC40,
    AMC41, AMC42
]

# List of fund names (Specific)
# amc_names=[
#     AMC6
# ]

download_dirs = generate_download_dirs(amc_names)

def download_amc_data(download_function, download_dir, driver_options, max_retries=3, delay=5):
    retry_count = 0
    while retry_count < max_retries:
        driver = webdriver.Chrome(options=driver_options)
        try:
            # BEFORE DOWNLOADING
            before_files = set(os.listdir(download_dir))
            
            # Special handling for download_from_jmfinancial
            if download_function == download_from_jmfinancial:
                download_function(driver, download_dir)
            else:
                download_function(driver)
            
            time.sleep(DOWNLOAD_CLICK_TIME)
            
            # AFTER DOWNLOADING
            wait_for_download_to_complete(download_dir)
            delete_existing_files(download_dir,before_files)
            check_and_unzip_new_files(download_dir, before_files)
            convert_xls_to_xlsx(driver,download_dir)
            delete_folder_if_empty(download_dir)
            break
        except Exception as e:
            print(f"Error downloading from {download_function.__name__}: {e}")
            retry_count += 1
            if retry_count < max_retries:
                print(f"Retrying ({retry_count}/{max_retries})...")
                time.sleep(delay)  # Wait before retrying
        finally:
            driver.quit()
    else:
        print(f"Failed to download data after {max_retries} attempts.")
        delete_folder_if_empty(download_dir)

# Mapping of fund names to their respective download functions
download_functions = {
    AMC1: download_from_360,
    AMC2: download_from_aditya_birla,
    AMC3: download_from_boimf,
    AMC4: download_from_baroda_bnpparibas,
    AMC5: download_from_canara_robeco,
    AMC6: download_from_dsp_mutual_fund,
    AMC7: download_from_edelweiss,
    AMC8: download_from_franklintempletonindia,
    AMC9: download_from_grow,
    AMC10: download_from_hdfc,
    AMC11: download_from_helios,
    AMC12: download_from_hsbc,
    AMC13: download_from_icici,
    AMC14: download_from_invescomutualfund,
    AMC15: download_from_itiamc,
    AMC16: download_from_jmfinancial,
    AMC17: download_from_bandhan,
    AMC18: download_from_axis,
    AMC19: download_from_motilal,
    AMC20: download_from_njmutualfund,
    AMC21: download_from_old_bridge_asset_management,
    AMC22: download_from_ppfas,
    AMC23: download_from_kotak,
    AMC24: download_from_samco,
    AMC25: download_from_quant,
    AMC26: download_from_pgim,
    AMC27: download_from_nippon,
    AMC28: download_from_navi,
    AMC29: download_from_mirae,
    AMC30: download_from_sbi,
    AMC31: download_from_sundaram,
    AMC32: download_from_trust,
    AMC33: download_from_whiteoak,
    AMC34: download_from_taurus,
    AMC35: download_from_union,
    AMC36: download_from_zerodha,
    AMC37: download_from_lic,
    AMC38: download_from_mahindra,
    AMC39: download_from_shriram,
    AMC40: download_from_uti,
    AMC41: download_from_tata,
    AMC42: download_from_quantum
}

# Loop through fund names to perform the download
for amc_name in amc_names:
    if amc_name in download_functions:
        download_dir = download_dirs[amc_name]
        driver_options = configure_driver(download_dir)
        download_function = download_functions[amc_name]
        download_amc_data(download_function, download_dir, driver_options)
    else:
        print(f"No download function available for {amc_name}")


# Upload the downloaded files to Dropbox
try:
    upload_to_dropbox(amc_names)
except Exception as e:
    print(f"Failed to upload files ")