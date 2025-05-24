# 1. NSE Market Data Scraper

This Python script automates the extraction of market data from the NSE India website. It utilizes the TagUI library for web automation, pandas for data manipulation, and openpyxl for handling Excel files.

## Installation

1. **Install Python:** Ensure Python is installed on your machine. Download it from [python.org](https://www.python.org/). The version used for this project is **3.12.4**.

2. **Navigate to the Project Directory:**
   ```bash
   cd stock-tracker/rpa_bots/nse_stock_scraper_bot
   ```
3. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   ```

4. **Activate the Virtual Environment**
   **On Windows:**
      ```bash
      .\venv\Scripts\activate
      ```
   **On macOS and Linux:**
      ```bash
      source venv/bin/activate
      ```

5. **Install Dependencies: Use pip to install the required libraries.**
   ```bash
   pip install -r requirements.txt
   ```

6. **Create a .env file in the folder(nse_stock_scraper_bot) with the following environment variables:**
   ```bash
   NSE_URL=https://www.nseindia.com/regulations/listing-compliance/nse-market-capitalisation-all-companies
   CSV_FILE_PATH=finalnse.csv
   BASE_URL=https://www.nseindia.com/get-quotes/equity?symbol=
   ```
## Usage
**To run the script, use the following command:**
   ```bash
   python main.py
   ```
# 2. Portfolio Disclosure Downloading Bot (Monthly) 

This project automates the downloading of data from various Asset Management Companies (AMCs) using Selenium and BeautifulSoup. The data is downloaded into specific directories based on AMC names and converted from `.xls` to `.xlsx` format if necessary.

## Installation

1. **Install Python:** Ensure Python is installed on your machine. Download it from [python.org](https://www.python.org/). The version used for this project is **3.12.4**.

2. **Navigate to the Project Directory:**
   ```bash
   cd stock-tracker/rpa_bots/portfolio_disclosure_downloading_bot
   ```

3. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   ```

4. **Activate the Virtual Environment**
   **On Windows:**
      ```bash
      .\venv\Scripts\activate
      ```
   **On macOS and Linux:**
      ```bash
      source venv/bin/activate
      ```
   
5. **Install Dependencies: Use pip to install the required libraries.**
   ```bash
   pip install -r requirements.txt
   ```

6. **Create a .env file in the folder(portfolio_disclosure_downloading_bot) with the following environment variables:**
```bash
# Links to AMC portfolio disclosures
LINK_360=https://archive.iiflmf.com/downloads/disclosures/
LINK_ADITYA_BIRLA_CAPITAL=https://mutualfund.adityabirlacapital.com/forms-and-downloads/portfolio
LINK_BOI=https://www.boimf.in/investor-corner#t2
LINK_BARODA=https://www.barodabnpparibasmf.in/downloads/monthly-portfolio-scheme
LINK_CANARA_ROBECO=https://www.canararobeco.com/statutory-disclosures/scheme-monthly-portfolio
LINK_DSP=https://www.dspim.com/mandatory-disclosures/portfolio-disclosures
LINK_EDELWEISS=https://www.edelweissmf.com/statutory#Portfolio-of-Schemes
LINK_FRANKLIN_TEMPLETON=https://www.franklintempletonindia.com/reports
LINK_GROWW=https://www.growwmf.in/statutory-disclosure/portfolio
LINK_HDFC=https://www.hdfcfund.com/statutory-disclosure/portfolio/monthly-portfolio
LINK_HELIOS=https://www.heliosmf.in/downloads/
LINK_HSBC=https://www.assetmanagement.hsbc.co.in/en/mutual-funds/investor-resources/information-library
LINK_ICICI=https://www.archive.icicipruamc.com/downloads/others/monthly-portfolio-disclosures
LINK_INVESCO=https://invescomutualfund.com/literature-and-form?tab=Complete
LINK_ITIAMC=https://www.itiamc.com/statuory-disclosure
LINK_JM_FINANCIAL=https://www.jmfinancialmf.com/downloads/Portfolio-Disclosure/Monthly-Portfolio-of-Schemes
LINK_BANDHAN=https://bandhanmutual.com/downloads/disclosures
LINK_AXIS=https://www.axismf.com/statutory-disclosures
LINK_MOTILAL=https://www.motilaloswalmf.com/download/month-end-portfolio
LINK_NJ=https://downloads.njmutualfund.com/njmf_download.php?nme=127
LINK_OLD_BRIDGE_ASSET=https://www.amfiindia.com/investor-corner/online-center/portfoliodisclosure
LINK_PPFAS=https://amc.ppfas.com/downloads/portfolio-disclosure/
LINK_KOTAK=https://www.kotakmf.com/Information/forms-and-downloads
LINK_SAMCO=https://www.samcomf.com/StatutoryDisclosure
LINK_QUANT=https://quantmutual.com/statutory-disclosures
LINK_PGIM=https://www.pgimindiamf.com/statutory-disclosure/monthlyportfolio
LINK_NIPPON=https://www.amfiindia.com/investor-corner/online-center/portfoliodisclosure
LINK_NAVI=https://navi.com/mutual-fund/downloads/portfolio
LINK_MIRAE=https://www.miraeassetmf.co.in/downloads/portfolio
LINK_SBI=https://www.sbimf.com/portfolios
LINK_SUNDARAM=https://www.sundarammutual.com/Statutory-Disclosures?Goto=Monthly_Portfolios
LINK_TRUST=https://www.trustmf.com/disclosures
LINK_WHITEOAK=https://mf.whiteoakamc.com/regulatory-disclosures/scheme-portfolios
LINK_TAURUS=https://taurusmutualfund.com/monthly-portfolio
LINK_UNION=https://unionmf.com/about-us/downloads/monthly-portfolio
LINK_ZERODHA=https://www.zerodhafundhouse.com/resources/disclosures/
LINK_LIC=https://www.licmf.com/downloads/monthly-portfolio
LINK_MAHINDRA=https://www.mahindramanulife.com/downloads#MANDATORY-DISCLOSURES-+-MONTHLY-PORTFOLIO-DISCLOSURE
LINK_SHRIRAM=https://www.shriramamc.in/investor-statutory-disclosures#distributor-commission-disclosure
LINK_UTI=https://www.utimf.com/downloads/scheme-wise-portfolio-disclosure
LINK_TATA=https://www.tatamutualfund.com/schemes-related
LINK_XLS_TO_XLSX=https://www.freeconvert.com/xls-to-xlsx
```

## Usage
**To run the script, use the following command:**
```bash
python main_script.py
```

# 3. Fortnightly Disclosure Downloading Bot

## Installation

1. **Install Python:** Ensure Python is installed on your machine. Download it from [python.org](https://www.python.org/). The version used for this project is **3.12.4**.

2. **Navigate to the Project Directory:**
   ```bash
   cd stock-tracker/rpa_bots/fortnightly_disclosure_downloading_bot
   ```

3. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   ```
4. **Activate the Virtual Environment**
   **On Windows:**
      ```bash
      .\venv\Scripts\activate
      ```
   **On macOS and Linux:**
      ```bash
      source venv/bin/activate
      ```
   
5. **Install Dependencies: Use pip to install the required libraries.**
   ```bash
   pip install -r requirements.txt
   ```

6. **Create a .env file in the folder(fortnightly_disclosure_downloading_bot) with the following environment variables:**
```bash
LINK_360=https://archive.iiflmf.com/downloads/disclosures/
LINK_ADITYA_BIRLA_CAPITAL=https://mutualfund.adityabirlacapital.com/forms-and-downloads/portfolio
LINK_BOI=https://www.boimf.in/regulatory-reports/fortnightly-portfolio-of-debt-schemes
LINK_BARODA=https://www.barodabnpparibasmf.in/downloads/midmonth-portfolio-scheme
LINK_CANARA_ROBECO=https://www.canararobeco.com/investor/prelogin/statutory-disclosures/fortnightly-portfolio-disclosure/#
LINK_DSP=https://www.dspim.com/mandatory-disclosures/portfolio-disclosures
LINK_EDELWEISS=https://www.edelweissmf.com/statutory#Portfolio-of-Schemes
LINK_FRANKLIN_TEMPLETON=https://www.franklintempletonindia.com/reports
LINK_GROWW=https://www.growwmf.in/statutory-disclosure/portfolio
LINK_HDFC=https://www.hdfcfund.com/statutory-disclosure/portfolio/monthly-portfolio
LINK_HELIOS=https://www.heliosmf.in/downloads/
LINK_HSBC=https://www.assetmanagement.hsbc.co.in/en/mutual-funds/investor-resources/information-library
LINK_ICICI=https://www.archive.icicipruamc.com/downloads/others/fortnightly-portfolio-disclosures
LINK_INVESCO=https://invescomutualfund.com/literature-and-form?tab=Fortnightly
LINK_ITIAMC=https://www.itiamc.com/statuory-disclosure
LINK_JM_FINANCIAL=https://www.jmfinancialmf.com/downloads/Portfolio-Disclosure/Fortnightly-Portfolio-of-Schemes
LINK_BANDHAN=https://bandhanmutual.com/downloads/disclosures
LINK_AXIS=https://www.axismf.com/statutory-disclosures
LINK_MOTILAL=https://www.motilaloswalmf.com/download/month-end-portfolio
LINK_NJ=https://downloads.njmutualfund.com/njmf_download.php?nme=415
LINK_PPFAS=https://amc.ppfas.com/downloads/portfolio-disclosure/fortnightly-debt-portfolio-disclosure/
LINK_KOTAK=https://www.kotakmf.com/Information/forms-and-downloads
LINK_SAMCO=https://www.samcomf.com/StatutoryDisclosure
LINK_QUANTUM=https://www.quantumamc.com/portfolio/combined/-1/1/0/0
LINK_PGIM=https://www.pgimindiamf.com/statutory-disclosure/fortnightlyportfolio
LINK_NIPPON=https://www.amfiindia.com/investor-corner/online-center/portfoliodisclosure
LINK_NAVI=https://navi.com/mutual-fund/downloads/portfolio
LINK_MIRAE=https://www.miraeassetmf.co.in/downloads/portfolio
LINK_SBI=https://www.sbimf.com/portfolios
LINK_SUNDARAM=https://www.sundarammutual.com/Statutory-Disclosures?Goto=Fortnightly_Portfolios
LINK_TRUST=https://www.trustmf.com/disclosures
LINK_WHITEOAK=https://mf.whiteoakamc.com/regulatory-disclosures/scheme-portfolios
LINK_UNION=https://unionmf.com/about-us/downloads/fortnightly-portfolio
LINK_ZERODHA=https://www.zerodhafundhouse.com/resources/disclosures/
LINK_LIC=https://www.licmf.com/downloads/monthly-portfolio
LINK_MAHINDRA=https://www.mahindramanulife.com/downloads#MANDATORY-DISCLOSURES-+-MONTHLY-PORTFOLIO-DISCLOSURE
LINK_SHRIRAM=https://www.shriramamc.in/investor-statutory-disclosures#distributor-commission-disclosure
LINK_UTI=https://www.utimf.com/downloads/consolidate-debt-portfolio-disclosure
LINK_TATA=https://www.tatamutualfund.com/schemes-related
LINK_XLS_TO_XLSX=https://www.freeconvert.com/xls-to-xlsx
```
## Usage
**To run the script, use the following command:**
   ```bash
   python main_script.py
   ```

# 4. Indices Download Bot

This Python script automates the downloading of a CSV file containing the list of all indices from a specified URL. It then uses this list to download additional CSV files for each index. The script utilizes the TagUI library for web automation, pandas for data manipulation, and shutil for file operations.

## Installation

1. **Install Python:** Ensure Python is installed on your machine. Download it from [python.org](https://www.python.org/). The version used for this project is **3.12.4**.

2. **Navigate to the Project Directory:**
   ```bash
   cd stock-tracker/rpa_bots/indices_bot
   ```
3. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   ```

4. **Activate the Virtual Environment**
   **On Windows:**
      ```bash
      .\venv\Scripts\activate
      ```
   **On macOS and Linux:**
      ```bash
      source venv/bin/activate
      ```

5. **Install Dependencies: Use pip to install the required libraries.**
   ```bash
   pip install -r requirements.txt
   ```

6. **Create a .env file in the folder(indices_bot) with the following environment variables:**
   ```bash
   LINK_ALL_INDICES=https://www.nseindia.com/market-data/live-market-indices
   BASE_URL=https://www.nseindia.com/market-data/live-equity-market?symbol=
   ```
## Usage
**To run the script, use the following command:**
   ```bash
   python main.py
   ```

# Dropbox Installation Guide

## Steps

1. **Download and Install Dropbox**
   - Download from [Dropbox Installer](https://www.dropbox.com/install).
   - Run the installer and follow the instructions.

2. **Sign In or Sign Up**
   - Open Dropbox after installation.
   - Sign in with your account or sign up for a new account.

3. **Access Your Dropbox Folder**
   - The Dropbox folder is typically located at:
     ```
     C:\Users\YourUsername\Stock Dropbox
     ```
   - Access this folder via File Explorer.

4. **Access Shared Folders**
   - Contact admin for access to shared folder.