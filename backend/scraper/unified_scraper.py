import os
import csv
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from lxml import html
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException, WebDriverException

# Create output directory if it doesn't exist
output_dir = "output"

def save_to_csv(data, filename):
    """Save data to CSV file in the output directory"""
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(data)

def scrape_ipopremium():
    """Scrape data from IPO Premium website"""
    url = "https://ipopremium.in/"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the table
        table = soup.find('table', {'id': 'table'})
        if not table:
            return
        
        # Extract headers and add new columns for links
        headers = []
        header_row = table.find('thead').find('tr')
        for th in header_row.find_all('th'):
            headers.append(th.text.strip())
        
        # Add new columns for links
        headers.append('Company URL')
        headers.append('Action URL')
        
        # Extract data
        data = [headers]
        for tr in table.find('tbody').find_all('tr'):
            row = []
            company_url = ""
            action_url = ""
            
            for idx, td in enumerate(tr.find_all('td')):
                # Extract text content
                if td.find('a'):
                    row.append(td.find('a').text.strip())
                    # Store the URL based on column position
                    if idx == 0:  # Company name column (assuming it's the first column)
                        company_url = td.find('a').get('href', '')
                    elif "Action" in header_row.find_all('th')[idx].text.strip():  # Action column
                        action_url = td.find('a').get('href', '')
                else:
                    row.append(td.text.strip())
            
            # Add the URLs to the row
            row.append(company_url)
            row.append(action_url)
            data.append(row)
        
        # Save data to CSV
        save_to_csv(data, "ipopremium_data.csv")
        
    except Exception as e:
        print(f"Error scraping IPO Premium: {str(e)}")

def scrape_ipowatch():
    """Scrape data from IPO Watch website"""
    url = "https://ipowatch.in/ipo-grey-market-premium-latest-ipo-gmp/"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        # Use lxml to parse the HTML and apply the XPath
        tree = html.fromstring(response.content)
        
        # Use the provided XPath to find the target table
        table_elements = tree.xpath('/html/body/div[1]/section/div/div[1]/div/div[5]/div/figure[1]/table')
        
        if not table_elements:
            # Fallback to BeautifulSoup method
            soup = BeautifulSoup(response.content, 'html.parser')
            tables = soup.find_all('table')
            if tables:
                target_table = tables[0]
            else:
                return
        else:
            # Convert lxml element to string and parse with BeautifulSoup for consistent processing
            target_table_html = html.tostring(table_elements[0])
            target_table = BeautifulSoup(target_table_html, 'html.parser')
        
        # Extract headers - FIX: use only the first row as header
        headers = []
        all_rows = target_table.find_all('tr')
        header_row = all_rows[0]
        
        for th in header_row.find_all(['th', 'td']):
            headers.append(th.text.strip())
        
        # Add new column for company URL
        headers.append('Company URL')
        
        # Extract data - FIX: start from the 2nd row to skip both header rows
        data = [headers]
        # Skip the first TWO rows as they contain duplicate headers
        for tr in all_rows[1:]:
            row = []
            company_url = ""
            
            for idx, td in enumerate(tr.find_all('td')):
                # Extract text content, handling links if present
                if td.find('a'):
                    row.append(td.find('a').text.strip())
                    # Store the URL from company name column (usually first column)
                    if idx == 0:  # Company name column (assuming it's the first column)
                        company_url = td.find('a').get('href', '')
                else:
                    row.append(td.text.strip())
            
            # Add the company URL to the row
            row.append(company_url)
            
            # Only add non-empty rows
            if any(cell.strip() for cell in row):
                data.append(row)
        
        # Save data to CSV
        save_to_csv(data, "ipowatch_gmp_data.csv")
        
    except Exception as e:
        print(f"Error scraping IPO Watch: {str(e)}")

def scrape_ipocentral():
    """Scrape data from IPO Central website"""
    url = "https://ipocentral.in/ipo-discussion/"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find tables using the provided CSS selectors
        mainboard_table = soup.find('table', {'id': 'tablepress-57'})
        sme_table = soup.find('table', {'id': 'tablepress-58'})
        
        if mainboard_table:
            # Extract mainboard headers
            mainboard_headers = []
            header_row = mainboard_table.find('thead').find('tr') if mainboard_table.find('thead') else mainboard_table.find_all('tr')[0]
            for th in header_row.find_all(['th', 'td']):
                mainboard_headers.append(th.text.strip())
            
            # Add new column for company URL
            mainboard_headers.append('Company URL')
            
            # Extract mainboard data
            mainboard_data = [mainboard_headers]
            tbody = mainboard_table.find('tbody') if mainboard_table.find('tbody') else mainboard_table
            rows = tbody.find_all('tr')
            
            # Skip header row if we're looking at tbody
            if mainboard_table.find('thead'):
                start_index = 0
            else:
                start_index = 1
                
            for tr in rows[start_index:]:
                row = []
                company_url = ""
                
                for idx, td in enumerate(tr.find_all('td')):
                    # Extract text from cell
                    if td.find('a'):
                        row.append(td.find('a').text.strip())
                        # Store the URL from company name column (usually first column)
                        if idx == 0:  # Company name column (assuming it's the first column)
                            company_url = td.find('a').get('href', '')
                    else:
                        row.append(td.text.strip())
                
                # Add the company URL to the row
                row.append(company_url)
                
                if row and not all(cell == '' for cell in row):  # Skip empty rows
                    mainboard_data.append(row)
            
            # Save mainboard data to CSV
            save_to_csv(mainboard_data, "ipocentral_mainboard_gmp_data.csv")
        
        if sme_table:
            # Extract SME headers
            sme_headers = []
            header_row = sme_table.find('thead').find('tr') if sme_table.find('thead') else sme_table.find_all('tr')[0]
            for th in header_row.find_all(['th', 'td']):
                sme_headers.append(th.text.strip())
            
            # Add new column for company URL
            sme_headers.append('Company URL')
            
            # Extract SME data
            sme_data = [sme_headers]
            tbody = sme_table.find('tbody') if sme_table.find('tbody') else sme_table
            rows = tbody.find_all('tr')
            
            # Skip header row if we're looking at tbody
            if sme_table.find('thead'):
                start_index = 0
            else:
                start_index = 1
                
            for tr in rows[start_index:]:
                row = []
                company_url = ""
                
                for idx, td in enumerate(tr.find_all('td')):
                    if td.find('a'):
                        row.append(td.find('a').text.strip())
                        # Store the URL from company name column (usually first column)
                        if idx == 0:  # Company name column (assuming it's the first column)
                            company_url = td.find('a').get('href', '')
                    else:
                        row.append(td.text.strip())
                
                # Add the company URL to the row
                row.append(company_url)
                
                if row and not all(cell == '' for cell in row):  # Skip empty rows
                    sme_data.append(row)
            
            # Save SME data to CSV
            save_to_csv(sme_data, "ipocentral_sme_gmp_data.csv")
        
    except Exception as e:
        print(f"Error scraping IPO Central: {str(e)}")

def extract_from_report_table(driver):
    """Extract data from the table with ID 'report_table'"""
    # Find the table by ID
    table = driver.find_element(By.ID, "report_table")
    
    # Extract headers
    headers = []
    header_row = table.find_element(By.TAG_NAME, "thead").find_element(By.TAG_NAME, "tr")
    header_cells = header_row.find_elements(By.TAG_NAME, "th")
    
    for cell in header_cells:
        # Try different ways to get the header text
        try:
            # First try to get the span with sort label
            span = cell.find_element(By.CSS_SELECTOR, "span[aria-label^='Sort by'] span")
            headers.append(span.text.strip())
        except NoSuchElementException:
            try:
                # Try any span
                span = cell.find_element(By.TAG_NAME, "span")
                headers.append(span.text.strip())
            except NoSuchElementException:
                # Use cell text
                headers.append(cell.text.strip())
    
    # Add column for company URL
    headers.append('Company URL')
    
    # Extract data
    data = [headers]
    
    # Try different selectors for tbody
    tbody_selectors = [
        By.CSS_SELECTOR, "tbody[role='rowgroup']",
        By.TAG_NAME, "tbody"
    ]
    
    tbody = None
    for i in range(0, len(tbody_selectors), 2):
        try:
            tbody = table.find_element(tbody_selectors[i], tbody_selectors[i+1])
            break
        except NoSuchElementException:
            continue
    
    if not tbody:
        rows = table.find_elements(By.TAG_NAME, "tr")[1:]  # Skip header row
    else:
        rows = tbody.find_elements(By.TAG_NAME, "tr")
    
    for row in rows:
        row_data = []
        company_url = ""
        
        cells = row.find_elements(By.TAG_NAME, "td")
        for idx, cell in enumerate(cells):
            # For company name column (usually first column)
            if idx == 0:
                try:
                    # Find the anchor element
                    link = cell.find_element(By.TAG_NAME, "a")
                    row_data.append(link.text.strip())
                    company_url = link.get_attribute("href")
                except NoSuchElementException:
                    row_data.append(cell.text.strip())
            else:
                # For other columns
                try:
                    # Try to get the text from div inside the td
                    div = cell.find_element(By.TAG_NAME, "div")
                    row_data.append(div.text.strip())
                except NoSuchElementException:
                    row_data.append(cell.text.strip())
        
        # Add the company URL to the row
        row_data.append(company_url)
        
        # Only add non-empty rows
        if any(cell for cell in row_data if cell and cell.strip()):
            data.append(row_data)
    
    return data

def scrape_investorgain():
    """Scrape data from Investor Gain website using Selenium"""
    url = "https://www.investorgain.com/report/live-ipo-gmp/331/"
    driver = None
    
    try:
        # Set up Chrome options for headless browsing
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--enable-unsafe-swiftshader")
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36")
        
        # Initialize WebDriver
        driver = webdriver.Chrome(options=chrome_options)
        
        # Navigate to the URL
        driver.get(url)
        
        # Wait for page to load completely
        time.sleep(5)
        
        # Wait for table to be present on the page
        try:
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.ID, "report_table"))
            )
        except TimeoutException:
            if driver:
                driver.quit()
            return None
            
        # Extract data from report_table
        try:
            data = extract_from_report_table(driver)
            if not data or len(data) <= 1:  # Only headers or no data
                return None
        except Exception as e:
            print(f"Error extracting data from report_table: {str(e)}")
            return None
        
        # Save data to CSV
        save_to_csv(data, "investorgain_gmp_data.csv")
        
        return data
        
    except WebDriverException as e:
        print(f"WebDriver error: {str(e)}")
        return None
        
    except Exception as e:
        print(f"Error scraping Investor Gain: {str(e)}")
        return None
        
    finally:
        # Always close the browser
        if driver:
            driver.quit()

def main():
    """Main function to run all scrapers"""
    # Create timestamp for this run
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    global output_dir
    output_dir = os.path.join("output", timestamp)
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Starting IPO data scraping, output will be saved to {output_dir}")
    
    # Run all scrapers
    print("Scraping IPO Premium...")
    scrape_ipopremium()
    print("Scraping IPO Watch...")
    scrape_ipowatch()
    print("Scraping IPO Central...")
    scrape_ipocentral()
    print("Scraping Investor Gain...")
    scrape_investorgain()
    
    print("IPO data scraping completed")

if __name__ == "__main__":
    main()