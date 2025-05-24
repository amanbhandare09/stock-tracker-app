import tagui as t
import time
import os
import shutil
from constants import *

#Checks if the specified element (xpath) is present on the page and waits in a loop until the element appears
def custom_wait(xpath, timeout=100, interval=1):
    for _ in range(timeout):
        if t.present(xpath):
            return True 
        t.wait(interval)
    return False  

def wait_for_download(timeout=100, interval=1):
    for _ in range(timeout):
        if not any(filename.endswith('.crdownload') for filename in os.listdir(os.getcwd())):
            return True
        time.sleep(interval)
    return False

def move_files_to_subdirectory(subdir_name):
    base_dir = BASE_DIR
    if not os.path.exists(base_dir):
        os.mkdir(base_dir)

    target_dir = os.path.join(base_dir, subdir_name)
    if not os.path.exists(target_dir):
        os.mkdir(target_dir)

    current_dir = os.getcwd()
    files = os.listdir(current_dir)
    csv_files = [os.path.join(current_dir, f) for f in files if f.endswith('.csv') and os.path.isfile(os.path.join(current_dir, f))]

    for csv_file in csv_files:
        shutil.move(csv_file, os.path.join(target_dir, os.path.basename(csv_file)))


def get_user_directory():
    user_directory = os.path.expanduser("~")
    return user_directory

def upload_to_dropbox(indices_names):
    user_directory = get_user_directory()
    source_base_path = os.path.join(os.getcwd(), BASE_DIR)
    destination_base_path = os.path.join(user_directory, "Stock Dropbox", "Stock Team Folder",MAIN_FOLDER,BASE_DIR)

    if not os.path.exists(destination_base_path):
        os.makedirs(destination_base_path)

    if not os.path.exists(source_base_path):
        print(f"Source folder {source_base_path} does not exist.")
        return

    try:
        for amc_name in indices_names:
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