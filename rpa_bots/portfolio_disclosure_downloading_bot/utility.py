import os
import zipfile
import re
import time
import shutil
from bs4 import BeautifulSoup
from selenium import webdriver
from xls2xlsx import XLS2XLSX
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from config import LINK_XLS_TO_XLSX
from constants import SUB_DIR
from date_script import year
#utility functions
def configure_driver(download_dir):
    os.makedirs(download_dir, exist_ok=True)
    prefs = {
        'download.default_directory': download_dir,
        'download.prompt_for_download': False,
        'profile.default_content_setting_values.automatic_downloads': 1,
        'profile.default_content_setting_values.notifications': 2,  # Disable notifications
    }
    options = webdriver.ChromeOptions()
    options.add_experimental_option('prefs', prefs)
    options.add_argument("--disable-popup-blocking")  
    options.add_argument("--disable-infobars")  
    options.add_argument("--disable-extensions")  
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--ignore-ssl-errors")
    options.add_argument("--disable-web-security")
    options.add_argument("--allow-running-insecure-content")
    return options

def wait_for_download_to_complete(download_dir, timeout=180, poll_frequency=1):
    end_time = time.time() + timeout
    while time.time() < end_time:
        if any(f.endswith('.crdownload') for f in os.listdir(download_dir)):
            time.sleep(poll_frequency)
        else:
            return True
    raise TimeoutError(f"Download did not complete within {timeout} seconds.")

def unzip_file(file_path, extract_to):
    with zipfile.ZipFile(file_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)
    os.remove(file_path) 

def extract_base_name(file_name):
    # Extract the base name without numerical suffixes
    match = re.match(r"(.+?)(\(\d+\))?(\.\w+)?$", file_name)
    if match:
        base_name = match.group(1)
        extension = match.group(3) if match.group(3) else ""
        return base_name + extension
    return file_name

def delete_existing_files(download_dir, before_files):
    files = os.listdir(download_dir)
    base_name_map = {}

    for file in files:
        base_name = extract_base_name(file)
        file_path = os.path.join(download_dir, file)
        base_name_path = os.path.join(download_dir, base_name)
        
        if re.search(r'\(\d+\)\.\w+$', file):  
            if os.path.exists(base_name_path):
                os.remove(base_name_path)
            shutil.move(file_path, base_name_path)
        else:
            base_name_map[base_name] = file_path

    # Delete older duplicates from before_files
    for file in before_files:
        base_name = extract_base_name(file)
        if base_name in base_name_map:
            existing_file_path = os.path.join(download_dir, file)
            if os.path.exists(existing_file_path):
                os.remove(existing_file_path)

def check_and_unzip_new_files(download_dir, before_files):
    current_files = set(os.listdir(download_dir))
    new_files = current_files - before_files
    for file in new_files:
        if file.endswith('.zip'):
            unzip_file(os.path.join(download_dir, file), download_dir)

#for one best link
def find_best_link(page_source, keywords, tag, attribute):
    soup = BeautifulSoup(page_source, 'html.parser')
    links = soup.find_all(tag, href=True)

    best_link = None
    max_count = 0

    for link in links:
        href = link.get(attribute)
        if href:
            count = sum(keyword.lower() in href.lower() for keyword in keywords)
            if count > max_count:
                best_link = link
                max_count = count

    return best_link

#for more than one links
def find_best_links(page_source, keywords, min_matches=3):
    soup = BeautifulSoup(page_source, 'html.parser')
    links = soup.find_all('a', href=True)
    
    matching_links = []
    for link in links:
        link_text = link.get_text().strip().lower()  
        match_count = sum(keyword.lower() in link_text for keyword in keywords)  # Count keyword matches
        if match_count >= min_matches:  # Check if the match count is at least the minimum required
            matching_links.append(link)
    
    return matching_links


def find_links_with_keywords(page_source, keywords):
    soup = BeautifulSoup(page_source, 'html.parser')
    matching_links = []

    for element in soup.find_all('a', href=True):
        href = element.get('href', '')
        text = element.get_text() or ''
        if all(keyword in href or keyword in text for keyword in keywords):
            matching_links.append(element)
    
    return matching_links

def convert_xls_to_xlsx(driver,download_dir,timeout=60):
    # Iterate through all files in the download directory
    for filename in os.listdir(download_dir):
        if filename.endswith(".xls"):
            xls_path = os.path.join(download_dir, filename)
            xlsx_filename = filename.replace(".xls", ".xlsx")
            xlsx_path = os.path.join(download_dir, xlsx_filename)
            
            # Convert .xls file to .xlsx using xls2xlsx
            try:
                x2x = XLS2XLSX(xls_path)
                x2x.to_xlsx(xlsx_path)
                print(f"Converted '{filename}' to '{xlsx_filename}'")
                
                # Delete the original .xls file
                os.remove(xls_path)
                print(f"Deleted original file '{filename}'")
                
            except Exception as e:
                print(f"Error converting or deleting '{filename}': {e}")
                try:
                    driver.get(LINK_XLS_TO_XLSX)
                    upload_element = driver.find_element(By.XPATH, '//*[@id="file"]')
                    upload_element.send_keys(xls_path)
                    time.sleep(2)  

                    convert_button = WebDriverWait(driver, timeout).until(
                        EC.element_to_be_clickable((By.XPATH, '//*[@id="FileInputDropdown"]/section/button'))
                    )
                    convert_button.click()
                    time.sleep(25)

                    button = driver.find_element(By.XPATH, '//*[@id="ConversionList"]/div/div[3]/div/div/a')
                    button.click()
                    time.sleep(15)
                    print("Downloaded .xlsx file successfully.")

                    os.remove(xls_path)
                    print(f"Deleted original .xls file '{filename}' after downloading .xlsx")
                    
                except Exception as web_e:
                    print(f"Error uploading '{filename}' to online converter: {web_e}")


def download_files(driver, keywords):
    page_source = driver.page_source
    # Find all links containing the keywords
    matching_links = find_links_with_keywords(page_source, keywords)

    if matching_links:
        for link in matching_links:
            download_link = link.get('href')
            print(f"Found link: {download_link}")

            try:
                link_element = driver.find_element(By.XPATH, f"//a[@href='{download_link}']")
                
                WebDriverWait(driver, 10).until(
                    EC.visibility_of_element_located((By.XPATH, f"//a[@href='{download_link}']"))
                )
                
                y_position = link_element.location['y']
                driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
                time.sleep(1)

                driver.execute_script("arguments[0].click();", link_element)
                time.sleep(2)
            except Exception as e:
                print(f"Error occurred: {e}")
    else:
        print("No matching download links found on this page. Stopping.")


def delete_folder_if_empty(folder_path):
    if os.path.exists(folder_path) and not os.listdir(folder_path):
        os.rmdir(folder_path)
        print(f"Deleted empty folder '{folder_path}'")

def get_user_directory():
    user_directory = os.path.expanduser("~")
    return user_directory

def upload_to_dropbox(amc_names):
    user_directory = get_user_directory()
    source_base_path = os.path.join(os.getcwd(), year, SUB_DIR)
    destination_base_path = os.path.join(user_directory, "Stock Dropbox", "Stock Team Folder","RAW", year, SUB_DIR)

    if not os.path.exists(destination_base_path):
        os.makedirs(destination_base_path)

    if not os.path.exists(source_base_path):
        print(f"Source folder {source_base_path} does not exist.")
        return

    try:
        for amc_name in amc_names:
            source_subfolder_path = os.path.join(source_base_path, amc_name) 
            destination_subfolder_path = os.path.join(destination_base_path, amc_name)  

            if not os.path.exists(destination_subfolder_path):
                os.makedirs(destination_subfolder_path)

            if os.path.exists(source_subfolder_path) and os.path.isdir(source_subfolder_path):
                for file_name in os.listdir(source_subfolder_path):
                    source_file_path = os.path.join(source_subfolder_path, file_name)
                    destination_file_path = os.path.join(destination_subfolder_path, file_name)

                    if os.path.isfile(source_file_path):
                        try:
                            shutil.copy(source_file_path, destination_file_path)
                            print(f"Moved {source_file_path} to {destination_file_path}")
                        except Exception as e:
                            print(f"Failed to move {source_file_path}: {e}")
                    else:
                        print(f"Skipping directory {source_file_path}")
            else:
                print(f"Source subfolder {source_subfolder_path} does not exist or is not a directory.")
    except Exception as e:
        print(f"Error processing subfolders: {e}")