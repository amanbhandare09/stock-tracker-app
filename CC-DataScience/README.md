# CC-DataScience

This project processes and analyzes financial data from various Asset Management Companies (AMCs).

## Setup

### Step 1: Download Dropbox
#### Dropbox Installation Guide
1. *Download and Install Dropbox*
   - Download from [Dropbox Installer](https://www.dropbox.com/install).
   - Run the installer and follow the instructions.

2. *Sign In or Sign Up*
   - Open Dropbox after installation.
   - Sign in with your account or sign up for a new account.

3. *Request admin for access to shared Dropbox folder*
   - Go to the [Access Dropbox](https://www.dropbox.com/scl/fo/y1cseq4iio52zqoo64bgp/AEqUStxuXZmhSTuKgbNJ8Ds?rlkey=a5txsbjl1yfvfroamvwu4jxs7&st=mrydstpm&dl=0)
   - Click on the **Join folder** and click on **Request Access**.

4. *Accept the invitation*
   - Open the email and **Join Team** the invitation sent by admin.
   
5. *Access Your Dropbox Folder*
   - The Dropbox folder is typically located at:
     ```bash
     C:\Users\YourUsername\Stock Dropbox
     ```
   - Access this folder via File Explorer.

### Step 2: Setup GoogleSheets API

1. *Create a Project on Google Cloud Console*:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.

2. *Enable the Google Sheets API*:
   - Go to the [API Library](https://console.cloud.google.com/apis/library) and search for "Google Sheets API".
   - Click on it and then click the "Enable" button.

3. *Enable the Google Drive API*:
   - Similarly, search for "Google Drive API" and enable it. This is necessary to access the spreadsheet.

4. *Create Credentials*:
   - Go to the [Credentials page](https://console.cloud.google.com/apis/credentials).
   - Click on "Create Credentials" and select "Service Account".
   - Fill in the details and click "Create".
   - On the next screen, select "Project" and then click "Continue".
   - For the role, select "Editor" to allow your service account to edit sheets.
   - Click "Continue", and then "Done".

5. *Download the JSON Key File*:
   - After creating the service account, you will see it listed in the "Service Accounts" section.
   - Click on it, then click "Add Key" > "Create new key".
   - Choose the JSON format and click "Create". This will download a JSON file containing your credentials.

6. *Share the Google Sheet with Your Service Account*:
   - Open your Google Sheet.
   - Click "Share" and share it with the email address of your service account (found in the JSON file under client_email).

### Step 3: Pyhton Installation

1. **Install Python:** 
   Ensure Python is installed on your machine. Download it from [python.org](https://www.python.org/). The version used for this project is **3.12.4**.

2. **Navigate to the Project Directory:**
```bash
   cd internship-2024\stock-tracker\data_science
```
3. **Create a Virtual Environment:**
```bash
python -m venv venv
```
4. **Activate the Virtual Environment:**

**On Windows:**
```bash
.\venv\Scripts\activate
```
**On macOS and Linux:**
```bash
source venv/bin/activate
```

### Step 4: Install Dependencies 
```bash
pip install -r Req.txt
```

### Step 5: Create a .env file in the CC-DataScience folder
```bash
# Monthly
MONTHLY_DIRECTORY_PATH=C:\Users\YourUsername\Stock Dropbox\Stock Team Folder\RAW\2024\Monthly
MONTHLY_OUTPUT_PATH=C:\Users\YourUsername\Stock Dropbox\Stock Team Folder\Output\Monthly_Output

# Fortnightly
FORTNIGHTLY_DIRECTORY_PATH=C:\Users\YourUsername\Stock Dropbox\Stock Team Folder\RAW\2024\Fortnightly
FORTNIGHTLY_OUTPUT_PATH=C:\Users\YourUsername\Stock Dropbox\Stock Team Folder\Output\Fortnightly_Output

#Google sheet loc
STOCK_LIST=C:\Users\YourUsername\Stock Dropbox\Stock Team Folder\Stock List

# Indices
INDICES_DIRECTORY_PATH=C:\Users\YourUsername\Stock Dropbox\Stock Team Folder\RAW\indices_data
INDICES_OUTPUT_PATH=C:\Users\YourUsername\Stock Dropbox\Stock Team Folder\Output\index
```
