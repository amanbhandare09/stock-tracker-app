import dropbox
import os

ACCESS_TOKEN = 'sl.B721TePzyqafv9c80Bbp7BEzcZ8CYqVASqSqf9_DCJwRF-g7hhDjh-ek5DRc2IOTIalTcMuiTQjbpaHn2Wn40ZsGEHUyZDk4jrSlOweYnkm-SPi4n4WrLrI2DSz_0f_dkgIHlCHX_MSyNjxrO12-'

dbx = dropbox.Dropbox(ACCESS_TOKEN)

def upload_all_local_files(output_file_path):
        directory_path = output_file_path
        for file_name in os.listdir(directory_path):
            file_path = os.path.join(directory_path, file_name)
            with open(file_path, "rb") as f:
                data = f.read()
                dbx.files_upload(data, f"/{file_name}")
                print(f"Uploaded {file_name}")

# def list_folder_recursive(folder_path):
#     try:
#         result = dbx.files_list_folder(folder_path, recursive=True)
#         items = result.entries

#         while result.has_more:
#             result = dbx.files_list_folder_continue(result.cursor)
#             items.extend(result.entries)

#         return items

#     except dropbox.exceptions.ApiError as err:
#         print(f"Error listing folder: {err}")
#         return []

# def download_file_from_dropbox(dropbox_path, local_path):
#     try:
#         dbx.files_download_to_file(local_path, dropbox_path)
#         print(f"Downloaded '{dropbox_path}' to '{local_path}'")
#     except dropbox.exceptions.ApiError as err:
#         print(f"Error downloading file '{dropbox_path}': {err}")

# def download_folder_contents(dropbox_folder_path, local_folder_path):
#     items = list_folder_recursive(dropbox_folder_path)

#     for item in items:
#         if isinstance(item, dropbox.files.FileMetadata):
#             # Construct local file path
#             local_file_path = os.path.join(local_folder_path, item.path_display[1:])
#             os.makedirs(os.path.dirname(local_file_path), exist_ok=True)

#             # Download file
#             download_file_from_dropbox(item.path_lower, local_file_path)


# def dropbox_script():
#     dropbox_folder_path = '/Stock Team Folder/2024'  # Path to your shared folder
#     local_folder_path = 'C:/Users/HP/OneDrive/Documents/CODE/InternshipProject/Mutual Funds/CC-DataScience/AllFiles/Monthly'  # Local folder where files will be saved

#     os.makedirs(local_folder_path, exist_ok=True)

#     download_folder_contents(dropbox_folder_path, local_folder_path)

#     print("Download completed!")