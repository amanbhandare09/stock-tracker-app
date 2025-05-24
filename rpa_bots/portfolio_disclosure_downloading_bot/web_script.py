import time
import os
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from utility import *
from date_script import *
from config import *
from constants import *

# website functions           
def download_from_360(driver):
    driver.get(LINK_360)
    driver.maximize_window()
    time.sleep(2)
    link = driver.find_element(By.XPATH, '//*[@id="collapse0"]/div/ul[1]/li[1]/a')
    
    ActionChains(driver).move_to_element(link).click(link).perform()

    
def download_from_aditya_birla(driver):
    driver.get(LINK_ADITYA_BIRLA_CAPITAL)
    driver.maximize_window()
    time.sleep(2)
    try:
        element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//*[@id="nv_js-box-close-button_28363"]'))
        )
        element.click()
        time.sleep(5)
    except Exception as e:
        print(f"Element not found or not clickable: {e}")

    link1 = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, f'//a[normalize-space()="Monthly Portfolios as on {month} {date}, {year}"]'))
    )
    link1.click()
    
    time.sleep(2)
    page_source = driver.page_source
    keywords = [date,month,year,KEYWORD1.lower(),KEYWORD2.lower()]
    best_link = find_best_link(page_source, keywords, 'a', 'href')
    
    if best_link:
        download_link = best_link['href']
        print(f"Found link: {download_link}")
        
        link_element = driver.find_element(By.XPATH, f"//a[@href='{download_link}']")
        y_position = link_element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(2)
        ActionChains(driver).move_to_element(link_element).click(link_element).perform()

    else:
        print("Download link not found.")
    
    
def download_from_boimf(driver):
    driver.get(LINK_BOI)
    driver.maximize_window()
    time.sleep(5)
    link1 = driver.find_element(By.XPATH, f'//a[normalize-space()="{KEYWORD1} {KEYWORD2}"]')

    ActionChains(driver).move_to_element(link1).click(link1).perform()
    time.sleep(5)
    link = driver.find_element(By.XPATH, '//*[@id="Documents"]/tr[1]/td[3]/a')
    
    ActionChains(driver).move_to_element(link).click(link).perform()


def download_from_baroda_bnpparibas(driver):
    driver.get(LINK_BARODA)
    driver.maximize_window()
    time.sleep(2)
    link1 = driver.find_element(By.XPATH, '//*[@id="download_disclaimer"]/div/a[1]')

    ActionChains(driver).move_to_element(link1).click(link1).perform()
    time.sleep(2)

    page_source = driver.page_source
    keywords = [datehypen,KEYWORD1,KEYWORD2.lower()]
    best_link = find_best_link(page_source, keywords, 'a', 'href')
    
    if best_link:
        download_link = best_link['href']
        print(f"Found link: {download_link}")
        
        link_element = driver.find_element(By.XPATH, f"//a[@href='{download_link}']")
        y_position = link_element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(1)
        ActionChains(driver).move_to_element(link_element).click(link_element).perform()

    else:
        print("Download link not found.")
    

def download_from_canara_robeco(driver):
    driver.get(LINK_CANARA_ROBECO)
    driver.maximize_window()
    time.sleep(2)

    for i in range(1, 25):
        link = driver.find_element(By.XPATH, f'//*[@id="dynamicDiv"]/div[2]/div/div[2]/div/div[2]/div[2]/div[{i}]/a[2]')
        ActionChains(driver).move_to_element(link).click(link).perform()
        time.sleep(0.5)


def download_from_dsp_mutual_fund(driver):
    driver.get(LINK_DSP)
    driver.maximize_window()
    time.sleep(2)

    link = driver.find_element(By.XPATH, '/html/body/main/div[2]/div/div[2]/div[2]/a')
    ActionChains(driver).move_to_element(link).click(link).perform()



def download_from_edelweiss(driver):
    driver.get(LINK_EDELWEISS)
    driver.maximize_window()
    time.sleep(4)

    link1 = driver.find_element(By.XPATH, '//ion-col[@class="leftColDownloads md hydrated"]//li[2]')
    ActionChains(driver).move_to_element(link1).click(link1).perform()
    time.sleep(2)
    
    link2 = driver.find_element(By.XPATH, '//*[@id="content_1"]/div[1]/ul/li[3]')
    ActionChains(driver).move_to_element(link2).click(link2).perform()
    time.sleep(2)
    
    link3 = driver.find_element(By.XPATH, '//*[@id="content_1"]/div[3]/ul/li/a')
    ActionChains(driver).move_to_element(link3).click(link3).perform()


def download_from_franklintempletonindia(driver):
    driver.get(LINK_FRANKLIN_TEMPLETON)
    driver.maximize_window()
    time.sleep(4)

    tab_button = driver.find_element(By.XPATH, '//*[@id="v-pills-tab"]/button[12]')
    ActionChains(driver).move_to_element(tab_button).click(tab_button).perform()
    time.sleep(4)
    
    report_link = driver.find_element(By.XPATH, '//*[@id="collapseOne"]/div/div/div/table/tbody/tr[1]/td[1]/a')
    ActionChains(driver).move_to_element(report_link).click(report_link).perform()
    

def download_from_grow(driver):
    driver.get(LINK_GROWW)
    driver.maximize_window()
    time.sleep(5)

    keywords = [month, KEYWORD1, year, KEYWORD2]

    download_files(driver, keywords)


def download_from_hdfc(driver):
    driver.get(LINK_HDFC)
    driver.maximize_window()
    time.sleep(3)

    page_source = driver.page_source
    keywords = [month, KEYWORD1, year]

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

def download_from_helios(driver):
    driver.get(LINK_HELIOS)
    driver.maximize_window()

    helios_url_template = "https://www.heliosmf.in/wp-content/uploads/2024/{current_month_number}/{fundname}-Fund-Monthly-Portfolio-as-on-{date}.xlsx"

    for fundname in HELIOS_FUND:
        url = helios_url_template.format(fundname=fundname,date=specific_date,current_month_number=current_month_number)
        driver.get(url)   
        time.sleep(2)  


def download_from_hsbc(driver):
    driver.get(LINK_HSBC)
    driver.maximize_window()
    time.sleep(2)

    driver.find_element(By.XPATH, '//*[@id="consent_prompt_submit"]').click()
    time.sleep(2)
    driver.find_element(By.XPATH, '//*[@id="terms-and-conditions-modal"]/div[3]/div/div[3]/a[2]').click()
    time.sleep(2)
    driver.find_element(By.XPATH, '//*[@id="tabinner-1797700734"]').click()
    time.sleep(2)

    elements = driver.find_elements(By.XPATH, f'//*[@id="tabpanelinner-1797700734"]//a[contains(text(), "{date} {month} {year}")]')

    for element in elements:
        y_position = element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});") 
        time.sleep(1)
        ActionChains(driver).move_to_element(element).click(element).perform()
        time.sleep(1)


def download_from_icici(driver):
    driver.get(LINK_ICICI)
    driver.maximize_window()
    time.sleep(2)

    page_source = driver.page_source
    keywords = [month,year,KEYWORD1.lower(),KEYWORD2.lower()]
    best_link = find_best_link(page_source, keywords, 'a', 'href')
    
    if best_link:
        download_link = best_link['href']
        print(f"Found link: {download_link}")
        
        link_element = driver.find_element(By.XPATH, f"//a[@href='{download_link}']")
        y_position = link_element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(1)
        ActionChains(driver).move_to_element(link_element).click(link_element).perform()
    else:
        print("Download link not found.")

def download_from_invescomutualfund(driver):
    driver.get(LINK_INVESCO)
    driver.maximize_window()
    time.sleep(2)
    
    for i in range(1, 14):
        element = driver.find_element(By.XPATH, f'//*[@id="tblCompleteMonthlyHoldings"]/tr[{i}]/td[{month_number+1}]/a')
        y_position = element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});") 
        time.sleep(1)
        ActionChains(driver).move_to_element(element).click(element).perform()
        time.sleep(1)


def download_from_itiamc(driver):
    driver.get(LINK_ITIAMC)
    driver.maximize_window()
    time.sleep(3)
    
    driver.find_element(By.XPATH, '/html/body/app-root/app-statuory/div/div/div[1]/div[3]/div/a').click()
    time.sleep(2)
    download_button_xpath = '/html/body/app-root/app-statuory/div/div/div[2]/div[2]/div/div[2]/div[2]/div[1]/div[2]/file-download/a/img'

    download_button = driver.find_element(By.XPATH, download_button_xpath)
    y_position = download_button.location['y']
    driver.execute_script(f"window.scrollTo(0, {y_position - 200});") 
    ActionChains(driver).move_to_element(download_button).click().perform()
    time.sleep(2)

def download_from_jmfinancial(driver, download_dir):
    driver.get(LINK_JM_FINANCIAL)
    driver.maximize_window()
    time.sleep(8)
    
    before_files = set(os.listdir(download_dir))

    page_number = 2
    file_count = 1
    while True:
        download_links = driver.find_elements(By.XPATH, f'//a[contains(@data-head, "{month} {date}, {year}")]')
        
        if not download_links:
            print(f"No more '{month} {date}, {year}' links found. Exiting loop.")
            break
        
        for link in download_links:
            y_position = link.location['y']
            driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
            time.sleep(1)
            ActionChains(driver).move_to_element(link).click(link).perform()
            time.sleep(6)
            
            wait_for_download_to_complete(download_dir)
            
            # Rename the downloaded file
            for file in os.listdir(download_dir):
                if file not in before_files:
                    old_path = os.path.join(download_dir, file)
                    new_filename = f"{file_count}.xlsx"
                    new_path = os.path.join(download_dir, new_filename)
                    
                    # Ensure unique naming and start from 1
                    if os.path.exists(new_path):
                        os.remove(new_path)
                    
                    os.rename(old_path, new_path)
                    before_files.add(new_filename)
                    file_count += 1  

        # Try to navigate to the next page
        try:
            next_page = driver.find_element(By.XPATH, f'//a[normalize-space()="{page_number}"]')
            next_page.click()
            time.sleep(4)
            page_number += 1
        except Exception as e:
            print(f"Error navigating to page {page_number}: {e}")
            break



def download_from_bandhan(driver):
    driver.get(LINK_BANDHAN)
    driver.maximize_window()
    time.sleep(20)

    driver.find_element(By.XPATH, '//button[normalize-space()="I am not a US citizen"]').click()
    time.sleep(3)
    
    driver.find_element(By.XPATH, '//*[@id="app"]/div/div[4]/div/section[2]/div[2]/div/div[1]/button[2]').click()
    time.sleep(10)

    elements = driver.find_elements(By.XPATH, f'//span[contains(text(), "{date} {month} {year}")]')
    
    for element in elements:
        y_position = element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")  
        time.sleep(1)
        ActionChains(driver).move_to_element(element).click(element).perform()
        time.sleep(1)

def download_from_axis(driver):
    driver.get(LINK_AXIS)
    driver.maximize_window()
    time.sleep(8)
    
    disclosure_section = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, '//*[@id="6"]/div'))
    )

    driver.execute_script("arguments[0].scrollIntoView(true);", disclosure_section)
    time.sleep(1)  
    disclosure_section.click()
    time.sleep(3)  
    
    month_dropdown = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, '//*[@id="6"]/div[2]/app-year-month-filters/div/ion-row/ion-col[3]/ion-input'))
    )
    month_dropdown.click()
    time.sleep(5)

    month_option_xpath = f'//*[@id="popoverList"]/ion-item[{month_number}]'  
    month_option = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, month_option_xpath))
    )
    month_option.click()
    time.sleep(4)

    page_source = driver.page_source

    keywords = [KEYWORD1, year, KEYWORD2]

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
    

def download_from_motilal(driver):
    driver.get(LINK_MOTILAL)
    driver.maximize_window()
    time.sleep(3)  

    driver.find_element(By.XPATH, f'//div[div/p[contains(text(), "Month End Portfolio {month} {year}")]]//img').click()
    time.sleep(3)

    driver.find_element(By.XPATH, f'//div[div/p[contains(text(), "Month End Portfolio {month} {year}")]]//a').click()
    time.sleep(3)

    

def download_from_njmutualfund(driver):
    driver.get(LINK_NJ)
    driver.maximize_window()
    time.sleep(5)

    driver.find_element(By.XPATH, '/html/body/section[1]/div/div[2]/div/div[2]/div[2]/div[2]/div/div[1]/h2/button').click()
    time.sleep(2)

    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    
    keywords = [month, year, KEYWORD1]
    download_links = []
    
    for link in soup.find_all('a', href=True):
        href = link['href']
        keyword_count = sum(1 for keyword in keywords if keyword in href)
        if keyword_count > 0:
            download_links.append((link, keyword_count))
    
    # Sort the links by the number of matching keywords (highest first)
    download_links.sort(key=lambda x: x[1], reverse=True)
    
    if download_links:
        # Choose the link with the most matching keywords
        best_link = download_links[0][0]
        download_link = best_link['href']
        print(f"Found link: {download_link}")
        
        link_element = driver.find_element(By.XPATH, f"//a[@href='{download_link}']")
        y_position = link_element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(1)
        ActionChains(driver).move_to_element(link_element).click(link_element).perform()
        time.sleep(2)
    else:
        print("Download link not found.")
    

def download_from_old_bridge_asset_management(driver):
    driver.get(LINK_OLD_BRIDGE_ASSET)
    driver.maximize_window()
    time.sleep(4)

    driver.find_element(By.CSS_SELECTOR, '.ui-button-text').click()
    
    time.sleep(1)
    
    driver.find_element(By.CSS_SELECTOR, '#ui-id-3').click()
    time.sleep(4)
    
    driver.find_element(By.XPATH, '/html/body/div[2]/div[5]/div/div[5]/table/tbody/tr[7]/td[4]/a/img').click()
    time.sleep(2)

def download_from_ppfas(driver):
    driver.get(LINK_PPFAS)
    driver.maximize_window()
    time.sleep(4)
    

    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    
    keywords = [month, year, KEYWORD1]
    download_links = []
    
    for link in soup.find_all('a', href=True):
        href = link['href']
        keyword_count = sum(1 for keyword in keywords if keyword in href)
        if keyword_count > 0:
            download_links.append((link, keyword_count))
    
    download_links.sort(key=lambda x: x[1], reverse=True)
    
    if download_links:
        best_link = download_links[0][0]
        download_link = best_link['href']
        print(f"Found link: {download_link}")
        
        link_element = driver.find_element(By.XPATH, f"//a[@href='{download_link}']")
        y_position = link_element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(1)
        ActionChains(driver).move_to_element(link_element).click(link_element).perform()
        time.sleep(2)
    else:
        print("Download link not found.")

def download_from_kotak(driver):
    driver.get(LINK_KOTAK)
    driver.maximize_window()

    xpath = '//div[@class="card cardshadow removePaddingFormDownload custom-min-height-forms"]//div[1]//div[5]//div[1]//div[1]//div[2]//div[1]//div[1]//div[1]//select[1]'

    try:
        pclick = WebDriverWait(driver, 60).until(
            EC.element_to_be_clickable((By.XPATH, xpath))
        )
        y_position = pclick.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        ActionChains(driver).move_to_element(pclick).click().perform()
        time.sleep(2)
    except Exception as e:
        print(f"An error occurred: {e}")

    dropdown_element = driver.find_element(By.XPATH, '//div[@class="card cardshadow removePaddingFormDownload custom-min-height-forms"]//div[1]//div[5]//div[1]//div[1]//div[2]//div[1]//div[1]//div[1]//select[1]')
    select = Select(dropdown_element)
    select.select_by_visible_text('Consolidated & Fortnightly Portfolio')
    
    try:
        wait = WebDriverWait(driver, 60)
        download_button_xpath = f'//a[contains(text(), "Consolidated Portfolio as on {month} {date}, {year}")]/following-sibling::span[contains(text(), "Download ")]'
        download_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, download_button_xpath))
        )
        y_position = download_button.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        ActionChains(driver).move_to_element(download_button).click().perform()
    except Exception as e:
        print(f"An error occurred: {e}")

def download_from_samco(driver):
    driver.get(LINK_SAMCO)
    driver.maximize_window()
    time.sleep(4)

    # Navigate through the webpage
    driver.find_element(By.XPATH, '/html/body/section[2]/div/div/div[3]/div/ul/li[2]/a').click()
    time.sleep(3)
    driver.find_element(By.XPATH, '/html/body/section[2]/div/div/div[3]/div/div/div[2]/ul/li[3]/a').click()
    time.sleep(3)
    
    keywords = [month, KEYWORD1.upper(), KEYWORD2.upper(), year]

    download_files(driver,keywords)


def download_from_quant(driver):
    driver.get(LINK_QUANT)
    driver.maximize_window()
    time.sleep(5)
    driver.find_element(By.XPATH, '/html/body/form/div[5]/div[3]/div/div[3]/span[2]').click()
    time.sleep(2)
    
    driver.find_element(By.XPATH, '/html/body/form/div[5]/div[3]/div/div[4]/ul/li[@class="yearurl active1"]').click()
    time.sleep(2)
    
    driver.find_element(By.XPATH, f'//*[@id="{month_number}"]').click()
    time.sleep(2)

    for i in range(1, 28):
        xpath = f'/html/body/form/div[5]/div[3]/div/div[4]/div/ul/div/ul/li[{i}]/a'
        try:
            link_element = driver.find_element(By.XPATH, xpath)
            href = link_element.get_attribute('href')
            
            print(f"Found link: {href}")

            driver.execute_script("arguments[0].click();", link_element)
            time.sleep(3)  
        except Exception as e:
            print(f"Error occurred while clicking link {i}: {e}")

def download_from_quantum(driver):
    driver.get('https://www.quantumamc.com/portfolio/combined/-1/1/0/0')
    driver.maximize_window()
    time.sleep(2)

    select_year = Select(driver.find_element(By.XPATH, '//*[@id="ddlYear"]'))
    select_year.select_by_visible_text(year)
    time.sleep(2)
    
    select_month = Select(driver.find_element(By.XPATH, '//*[@id="ddlMonth"]'))
    select_month.select_by_value(f'{month_number}')  
    time.sleep(3)

    driver.find_element(By.XPATH, '//*[@id="btnSearchPortfolio"]').click()
    time.sleep(3)  
    
    driver.find_element(By.XPATH, '/html/body/div[1]/section[1]/section/div[1]/ul/li[1]/a').click()
    

def download_from_pgim(driver):
    driver.get(LINK_PGIM)
    driver.maximize_window()
    time.sleep(5)

    pclick = driver.find_element(By.XPATH, f'//*[@id="MpData2024"]/div/div[{month_number}]/div[1]/p')
    y_position = pclick.location['y']
    driver.execute_script(f"window.scrollTo(0, {y_position - 200});") 
    ActionChains(driver).move_to_element(pclick).click(pclick).perform()
    time.sleep(2)

    page_source = driver.page_source

    keywords = [month.lower(),KEYWORD1.lower(),year]
    time.sleep(5)
    matching_links = find_links_with_keywords(page_source, keywords)
    
    if not matching_links:
        print("Download links not found.")
        return

    for link in matching_links:
        download_link = link['href']
        print(f"Found link: {download_link}")
        
        link_element = driver.find_element(By.XPATH, f"//a[@href='{download_link}']")
        y_position = link_element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(1)
        ActionChains(driver).move_to_element(link_element).click(link_element).perform()
        time.sleep(2)

def download_from_nippon(driver):
    driver.get(LINK_NIPPON)
    driver.maximize_window()
    time.sleep(5)

    driver.find_element(By.CSS_SELECTOR, '.ui-button-text').click()
    time.sleep(3)
    
    driver.find_element(By.CSS_SELECTOR, '#ui-id-3').click()
    time.sleep(5)
    
    driver.find_element(By.XPATH, '/html/body/div[2]/div[5]/div/div[5]/table/tbody/tr[7]/td[2]').click()

def download_from_navi(driver):
    driver.get(LINK_NAVI)
    driver.maximize_window()
    time.sleep(5)

    WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, '/html/body/div[1]/div/section/section[1]/div/div[3]/div/div/div[1]/div[1]/div[1]'))
    )

    button = driver.find_element(By.XPATH, '/html/body/div[1]/div/section/section[1]/div/div[3]/div/div/div[1]/div[1]/div[1]')
    y_position = button.location['y']
    driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
    time.sleep(2)
    ActionChains(driver).move_to_element(button).click(button).perform()
    time.sleep(3)

    driver.find_element(By.XPATH, '//*[@id="panel-contentMonthly"]/div/div[1]/div[2]/div/div').click()
    time.sleep(2)
    driver.find_element(By.XPATH,f'//*[@id="menu-monthly"]/div[3]/ul/li[{month_number+1}]').click()
    time.sleep(2)
    # Iterate over the download links
    for i in range(1, 18):
        xpath = f'/html/body/div[1]/div/section/section[1]/div/div[3]/div/div/div[1]/div[2]/div/div/div/div/ul/div[{i}]/div[2]/div'
        link_element = driver.find_element(By.XPATH, xpath)
        y_position = link_element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(1)
        ActionChains(driver).move_to_element(link_element).click(link_element).perform()
        time.sleep(2)
    
def download_from_mirae(driver):
    driver.get(LINK_MIRAE)
    driver.maximize_window()
    time.sleep(5)  
    driver.find_element(By.XPATH, '/html/body/div[3]/div/div[8]/div/div/div[2]/a/span[1]').click()
    
    processed_links = set() 

    while True:
        page_source = driver.page_source

        keywords = [month.lower()+year]
        matching_links = find_links_with_keywords(page_source, keywords)

        if matching_links:
            for link in matching_links:
                download_link = link.get('href')
                
                if download_link in processed_links:
                    print(f"Skipping already processed link: {download_link}")
                    continue
                
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

                    # Add the link to the processed set
                    processed_links.add(download_link)
                except Exception as e:
                    print(f"Error occurred: {e}")

        else:
            print("No matching download links found on this page. Stopping.")
            break

        time.sleep(5)
        
        # try to go to the next page
        try:
            next_button = driver.find_element(By.XPATH, '//*[@id="nav-portfolio-tab1"]/section/nav/div/ul/li[7]/a')
            if next_button:
                driver.execute_script("arguments[0].click();", next_button)
                time.sleep(5)  
                print('Navigated to the next page')
            else:
                print("No more pages to navigate.")
                break
        except Exception as e:
            print(f"Error navigating to the next page: {e}")
            break



def download_from_sbi(driver):
    driver.get(LINK_SBI)
    driver.maximize_window()
    time.sleep(5)

    page_source = driver.page_source
    keywords = [KEYWORD1.lower(), KEYWORD2.lower(),month.lower(),year]
    best_link = find_best_link(page_source, keywords, 'a', 'href')
    time.sleep(4)
    if best_link:
        download_link = best_link['href']
        print(f"Found link: {download_link}")
        
        link_element = driver.find_element(By.XPATH, f"//a[@href='{download_link}']")
        y_position = link_element.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(1)
        ActionChains(driver).move_to_element(link_element).click(link_element).perform()
        time.sleep(3)
    else:
        print("Download link not found.")

def download_from_sundaram(driver):
    driver.get(LINK_SUNDARAM)
    driver.maximize_window()
    time.sleep(5)
    
    modal_close_xpath = '//*[@id="USNotUSClientsModal"]/div/div/div[2]/button[2]'
    modal_close_button = driver.find_element(By.XPATH, modal_close_xpath)
    ActionChains(driver).move_to_element(modal_close_button).click(modal_close_button).perform()
    time.sleep(3)

    modal_close_xpath2 = '//*[@id="Mnthlist"]/ul[1]/li/label'
    modal_close_button2 = driver.find_element(By.XPATH, modal_close_xpath2)
    ActionChains(driver).move_to_element(modal_close_button2).click(modal_close_button2).perform()
    time.sleep(3)

    modal_close_xpath3 = '//*[@id="Mnthlist"]/ul[1]/li/ul/li[1]/label'
    modal_close_button3 = driver.find_element(By.XPATH, modal_close_xpath3)
    ActionChains(driver).move_to_element(modal_close_button3).click(modal_close_button3).perform()
    time.sleep(4)

    download_links = driver.find_elements(By.XPATH, f'//*[@id="Mnthlist"]/ul[1]/li/ul/li[1]//a[contains(text(), "{month[:3]}")]')
    if not download_links:
        print('no download links')
    for link in download_links:
        y_position = link.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(1)
        ActionChains(driver).move_to_element(link).click(link).perform()
        time.sleep(4)
        

def download_from_trust(driver):
    driver.get(LINK_TRUST)
    driver.maximize_window()
    time.sleep(5)  

    tab_button_xpath = '/html/body/div[2]/div[2]/div/div[1]/div/button[4]'
    WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, tab_button_xpath))
    )
    driver.find_element(By.XPATH, tab_button_xpath).click()
    time.sleep(5)
    
    dropdown_button_xpath = '//p[normalize-space()="Portfolio Disclosures"]'
    dropdown_button = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, dropdown_button_xpath))
    )
    
    driver.execute_script("arguments[0].scrollIntoView(true);", dropdown_button)
    time.sleep(2)  
    
    driver.execute_script("arguments[0].click();", dropdown_button)
    time.sleep(10)

    disclosure_link_xpath = f'/html/body/div[2]/div[2]/div/div[2]/div[3]/div[2]//p'
    disclosure_link = driver.find_element(By.XPATH, disclosure_link_xpath)
    y_position = disclosure_link.location['y']
    driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
    time.sleep(2)
    ActionChains(driver).move_to_element(disclosure_link).click(disclosure_link).perform()
    time.sleep(4)
    download_files

def download_from_whiteoak(driver):
    driver.get(LINK_WHITEOAK)
    driver.maximize_window()
    time.sleep(5)  

    label_xpath = '/html/body/div/div[2]/div[4]/div/div[2]/div/div[2]/div/div[1]/div[2]/div/label[2]'
    label_element = driver.find_element(By.XPATH, label_xpath)
    ActionChains(driver).move_to_element(label_element).click(label_element).perform()
    time.sleep(2)
    
    while True:
        keywords = [f"{month} {year}", f"{KEYWORD1} {KEYWORD2}"]

        container_xpath = '/html/body/div/div[2]/div[4]/div/div[2]/div/div[2]/div/ul'
        container = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, container_xpath))
        )
        li_elements = container.find_elements(By.XPATH, './/li')
        elements_found = False

        for li in li_elements:
            li_text = li.text
            if all(keyword in li_text for keyword in keywords):
                elements_found = True
                print(f"Found matching <li> with text: {li_text}")
                y_position = li.location['y']
                driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
                time.sleep(2)
                
                try:
                    download_div = li.find_element(By.XPATH, './/div[contains(@class, "DisclosuresPage_download__iFeAa")]')
                    download_div.click()
                    print(f"Clicked on download div inside <li> with text: {li_text}")
                    time.sleep(5)
                except Exception as e:
                    print(f"Failed to click on download div inside <li> with text: {li_text}: {e}")

        if not elements_found:
            print("No matching elements found on this page. Exiting loop.")
            break

        try:
            next_button = driver.find_element(By.XPATH, '/html/body/div/div[2]/div[4]/div/div[2]/div/div[2]/div/div[2]/div/ul/li[11]/a')
            if next_button:
                driver.execute_script("arguments[0].click();", next_button)
                time.sleep(5) 
            else:
                print("No more pages to navigate.")
                break
        except Exception as e:
            print(f"Error navigating to the next page: {e}")
            break


def download_from_taurus(driver):
    driver.get(LINK_TAURUS)
    driver.maximize_window()
    time.sleep(5)
    
    select_year = driver.find_element(By.XPATH, '/html/body/div[1]/div[1]/div[2]/div/div/div/div/div[1]/form/div/div[2]/div/div[1]/div/select')
    select_year.click()
    time.sleep(2)

    year_dropdown = Select(select_year)
    year_dropdown.select_by_visible_text(year)
    time.sleep(2)

    select_month = driver.find_element(By.XPATH, '/html/body/div[1]/div[1]/div[2]/div/div/div/div/div[1]/form/div/div[2]/div/div[2]/div/select')
    select_month.click()
    time.sleep(2)

    month_dropdown = Select(select_month)
    month_dropdown.select_by_visible_text(month)
    time.sleep(2)

    for i in range(1, 9):
        xpath = f'/html/body/div[1]/div[1]/div[2]/div/div/div/div/div[2]/div/div[{i}]/a'
        link = driver.find_element(By.XPATH, xpath)
        y_position = link.location['y']
        driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
        time.sleep(0.5)
        ActionChains(driver).move_to_element(link).click(link).perform()
        time.sleep(1)  

def download_from_union(driver):
    driver.get(LINK_UNION)
    driver.maximize_window()
    time.sleep(5)
    
    month_filter = driver.find_element(By.XPATH, '//*[@id="Body_C003_Col00"]/div/div[1]/div[2]/div/div/button/div')
    month_filter.click()
    time.sleep(0.5)

    # Select June from the dropdown options
    june_option = driver.find_element(By.XPATH, f'//*[@id="bs-select-2"]/ul/li[{month_number+1}]')
    june_option.click()
    time.sleep(2)  

    while True:
        page_source = driver.page_source

        keywords = [month.lower(),KEYWORD1.lower(),KEYWORD2.lower(),year]

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
            break

        # Try to go to the next page
        try:
            next_button = driver.find_element(By.XPATH, '//*[@id="Body_C003_Col00"]/div/section/ul/li[7]/a')
            if next_button:
                driver.execute_script("arguments[0].click();", next_button)
                time.sleep(5)  
            else:
                print("No more pages to navigate.")
                break
        except Exception as e:
            print(f"Error navigating to the next page: {e}")
            break

def download_from_zerodha(driver):
    driver.get(LINK_ZERODHA)
    driver.maximize_window()
    time.sleep(5)

    month_filter = driver.find_element(By.XPATH, '//*[@id="__next"]/main/main/section/div/div/div[2]/div[2]/div/div[1]/button/div')
    month_filter.click()
    time.sleep(1)

    june_option = driver.find_element(By.XPATH, f'//button//h4[contains(text(), "{KEYWORD1}")]')
    june_option.click()
    time.sleep(2) 
    
    page_source = driver.page_source
    keywords = [month, KEYWORD1, year, KEYWORD2]

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
        
def download_from_lic(driver):
    driver.get(LINK_LIC)
    driver.maximize_window()
    time.sleep(5)
    
    WebDriverWait(driver, 30).until(
        EC.element_to_be_clickable((By.XPATH, '//select[@class="fund_category"]'))
    )
    category_select = Select(driver.find_element(By.XPATH, '//select[@class="fund_category"]'))
    category_select.select_by_visible_text(CATEGORY)
    time.sleep(2)

    for value in LIC_OPTIONS:
        WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, '//select[@class="fund_name"]'))
        )
        fund_select = Select(driver.find_element(By.XPATH, '//select[@class="fund_name"]'))
        fund_select.select_by_value(value)
        time.sleep(3)

        WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, '/html/body/section[2]/div/div/div/div/div/div[1]/div/div/div[3]/div/select'))
        )
        year_select = Select(driver.find_element(By.XPATH, '/html/body/section[2]/div/div/div/div/div/div[1]/div/div/div[3]/div/select'))
        year_select.select_by_visible_text(year)
        time.sleep(3)

        WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, '/html/body/section[2]/div/div/div/div/div/div[1]/div/div/div[4]/div/select'))
        )
        month_select = Select(driver.find_element(By.XPATH, '/html/body/section[2]/div/div/div/div/div/div[1]/div/div/div[4]/div/select'))
        month_select.select_by_value(str(month_number))
        time.sleep(3)

        WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, '/html/body/section[2]/div/div/div/div/div/div[1]/div/div/div[5]/button'))
        ).click()
        time.sleep(3)

        WebDriverWait(driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, '/html/body/section[2]/div/div/div/div/div/div[1]/div/div/div[6]/div/div/div/div/a/span'))
        ).click()
        time.sleep(2)

def download_from_mahindra(driver):
    driver.get(LINK_MAHINDRA)
    driver.maximize_window()
    
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH, '/html/body/form/div[6]/main/div[6]/div/div/div[3]/div/div/a[1]'))
    )

    driver.find_element(By.XPATH, '/html/body/form/div[6]/main/div[6]/div/div/div[3]/div/div/a[1]').click()
    time.sleep(5) 
    
    driver.find_element(By.XPATH, '/html/body/form/div[6]/main/div[2]/div/div[2]/div[1]/div/div/div[4]/div/ul/li[8]/div[2]/ul/li[1]/div[1]').click()
    time.sleep(5) 

    driver.find_element(By.XPATH, '/html/body/form/div[6]/main/div[2]/div/div[2]/div[1]/div/div/div[4]/div/ul/li[8]/div[2]/ul/li[1]/div[2]/p/a[1]/span/i').click()
    time.sleep(5) 

def download_from_shriram(driver):
    driver.get(LINK_SHRIRAM)
    driver.maximize_window()
    time.sleep(5)  
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="monthly-fortnightly-portfolio"]/div[1]/h4'))
    )

    element = driver.find_element(By.XPATH, '//*[@id="monthly-fortnightly-portfolio"]/div[1]/h4')
    driver.execute_script("arguments[0].scrollIntoView(true);", element)
    time.sleep(1)  
    
    element.click()
    time.sleep(5) 

    driver.find_element(By.XPATH, '//*[@id="monthly-fortnightly-portfolio"]/div[2]/div[1]/div[1]/button[1]').click()
    time.sleep(5)  
    
    driver.find_element(By.XPATH, '//*[@id="filter_274"]/div[2]/div[1]/div/div/a').click()
    time.sleep(5)  

def download_from_uti(driver):
    driver.get(LINK_UTI)
    driver.maximize_window()
    time.sleep(5) 
    
    # for pop up
    try:
        close_button = driver.find_elements(By.XPATH, '//*[@id="nv_js-pwa-close-button-88x44ais"]')
        if close_button:
            close_button[0].click()
            time.sleep(2)  
    except Exception as e:
        print(f"Close button not found or could not be clicked: {e}")

    # portfolio disclosure chose
    driver.find_element(By.XPATH, '/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[1]/div/div/input').click()
    time.sleep(2)
    driver.find_element(By.XPATH, '/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[1]/div/div/div/genesis-investor-custom-select/cdk-virtual-scroll-viewport/div[1]/div[7]').click()
    time.sleep(2)
    
    #scheme
    element = driver.find_element(By.XPATH, '/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div')
    y_position = element.location['y']
    driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
    time.sleep(1)
    element.click()
    time.sleep(2)

    #chose equity
    driver.find_element(By.XPATH, '/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[1]/div/div/genesis-investor-custom-select/div/div/div[2]').click()
    time.sleep(2) 

    for fund in UTI_OPTIONS:
        # Click the dropdown to open it
        driver.find_element(By.XPATH, '/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[2]/div/input').click()
        time.sleep(1)

        dropdown = driver.find_element(By.XPATH, '/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[2]/div[1]/div[2]/div/div/genesis-investor-custom-select/cdk-virtual-scroll-viewport')
        
        while True:
            try:
                option = driver.find_element(By.XPATH, f'//div[contains(text(), "{fund}")]')
                option.click()
                break
            except:
                driver.execute_script("arguments[0].scrollBy(0, 100);", dropdown)
                time.sleep(1)

        time.sleep(1)
            
        # year
        driver.find_element(By.XPATH, '/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[2]/div[2]/div[1]/div/input').click()
        time.sleep(1) 
        driver.find_element(By.XPATH, f'//div[normalize-space()="{year}"]').click()
        time.sleep(1) 

        #month
        driver.find_element(By.XPATH, '//input[@placeholder="select "]').click()
        time.sleep(1) 
        driver.find_element(By.XPATH, f'/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[2]/div[2]/div[2]/div/div/genesis-investor-custom-select/div/div/div[{month_number}]').click()
        time.sleep(1) 

        #button 
        driver.find_element(By.XPATH, '/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[2]/div[3]/div/button').click()
        time.sleep(3)  

        #download
        driver.find_element(By.XPATH, '/html/body/genesis-investor-root/div/genesis-investor-download/div/div/div/div[3]/div[2]/div/div[3]/div/label').click()
        time.sleep(2) 

def download_from_tata(driver):
    driver.get(LINK_TATA)
    driver.maximize_window()

    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH, '//button[@class="continue-btn cursor-pointer primary-btn"]'))
    )
    time.sleep(5)
    
    driver.find_element(By.XPATH, '//button[@class="continue-btn cursor-pointer primary-btn"]').click()
    time.sleep(4) 
    
    driver.find_element(By.XPATH, '//a[normalize-space()="Portfolio"]').click()
    time.sleep(4)  

    link_element = driver.find_element(By.XPATH,'/html[1]/body[1]/app-root[1]/app-layout[1]/div[1]/div[1]/app-schemes-related[1]/div[1]/div[2]/div[4]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/button[1]/img[1]')
                
    y_position = link_element.location['y']
    driver.execute_script(f"window.scrollTo(0, {y_position - 200});")
    time.sleep(4)
    link_element.click()
    time.sleep(5) 