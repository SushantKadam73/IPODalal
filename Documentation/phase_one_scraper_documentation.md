---
description: scraping strategy for Phase One of the IPO Dalal project. It outlines the target websites, data to be scraped, CSS selectors, and XPath expressions for data extraction.
globs: 
---
# IPO Dalal Project Documentation: Phase One - Scraper Documentation

**File Description:** This document details the web scraping strategy for Phase One of the IPO Dalal project. It outlines the target websites, data to be scraped, CSS selectors, and XPath expressions for data extraction.

---

## Phase 1 Scraper Strategy

Phase 1 of the IPO Dalal project involves scraping data from various websites to populate the database and provide real-time IPO information. The primary sources are NSE, BSE, SEBI (indirectly through aggregators), and various IPO information websites.

**Target Websites & Data Points:**

This section details the websites to be scraped and the specific data points to extract from each.

### 1. NSE India (National Stock Exchange of India) -  https://www.nseindia.com/market-data/all-upcoming-issues-ipo

**Purpose:** To gather official IPO data, subscription details, and issue information directly from the exchange.

**Data Categories to Scrape:**

*   **Current/Ongoing IPOs:**
    *   Table data from the "Current Issues" tab (#Ipo_current).
        *   **Required Data Points (from Table):** Name, Price, Issue Size, Close Date, BoA Date, Listing Date, Status.
        *   **CSS Selector (Table):** `#publicIssuesCurrent`
    *   **Issue Information (for each IPO):** Tab - #IssueInformation
        *   **Required Data Points (from Table):**  Detailed issue information (various fields in the table - needs further parsing and structuring).
        *   **CSS Selector (Table):** `#issueInfo > div > div > table`
    *   **Bid Details (for each IPO):** Tab - #bidDetails
        *   **NSE Category:**
            *   **Required Data Points (from Table):** Subscription details by category (Retail, SHNI, BHNI, etc.).
            *   **CSS Selector (Table):** `#publicIssuesBidTable`
        *   **Consolidated Category (All Exchanges):**
            *   **Required Data Points (from Table):** Consolidated subscription details.
            *   **CSS Selector (Table):** `#publicIssuesBidConsolidatedTable`
    *   **Demand Graph (for each IPO):** Tab - #demand_Graph
        *   **NSE Category:**
            *   **Required Data Points (from Tables):** Demand details from tables below the graph.
            *   **CSS Selector (Table 1):** `#nseDemandGraph > div > table`
            *   **CSS Selector (Table 2):** `#nseDemandGraphSeries > div:nth-child(2) > table`
        *   **All Category (Consolidated):** (Same CSS Selectors as NSE Category for tables below graph).
    *   **Demand Data (for each IPO):** Tab - #demand_Data
        *   **NSE Category:**
            *   **Required Data Points (from Table):** Bid data details.
            *   **CSS Selector (Table):** `#nseBidDataTable`
        *   **All Exchange Category:**
            *   **Required Data Points (from Table):** Consolidated bid data.
            *   **CSS Selector (Table):** `#exchangeBidDataTable`

*   **Upcoming IPOs:**
    *   Table data from the "Upcoming Issues" tab (#ipo_upcomingIssue).
        *   **Required Data Points (from Table):** Name, Price, Issue Size, Open Date, Close Date, BoA Date, Listing Date.
        *   **CSS Selector (Table):** `#upcomingIpoTable`
    *   **Issue Information (for each IPO):** Tab - #issueInfo (Same CSS selector as for Current IPOs).

*   **Past IPOs:**
    *   Table data from the "Past Issues" tab (#ipo_pastissue).
        *   **Required Data Points (from Table):** Name, Symbol, Price Range, Issue Size, Listing Date, Links to IPO Details and Company Trade Details.
        *   **CSS Selector (Table):** `#publicIssuePastTable`
    *   **Issue Information & Bid Details (for each IPO):** Tabs - #IssueInformation, #bidDetails (Same CSS selectors as for Current/Upcoming IPOs if needed for historical data).

**Navigation & Interaction Notes for NSE Scraping:**

*   **Tab Switching:** Use tab selectors (`#Ipo_current`, `#ipo_pastissue`, `#ipo_upcomingIssue`) to navigate between IPO categories.
*   **Refresh Button:**  Click refresh buttons (`#refresh`, `.refreshIcon.refreshFiling.mb-2 > a`) after changing categories or tabs to ensure data updates.
*   **Category Dropdown (Bid Details, Demand Graph):** Use dropdowns (`#bidDetailsDropdown`, `#demandGraphSelect`) to switch between NSE and Consolidated data views.

### 2. IPO Premium -  https://ipopremium.in/

**Purpose:** To gather Grey Market Premium (GMP), Kostak, and Subject to Sauda data.

*   **IPO Premium Table:**
    *   **Required Data Points (from Table):** Company Name, Company Link, Exchange Board, Issue Type, Premium (GMP), Open Date, Close Date, Price Range, Lot Size, Allotment Date, Listing Date, Action (Apply/Check Allotment), Action Link, Remark, Cutoff Price, Upper Price Band, Lower Price Band, Allotment Link.
    *   **CSS Selector (Table):** `body > div > div > section.content > div:nth-child(5) > div > div > div.box-body.no-padding.table-responsive > table`
    *   **XPath (Table):** `/html/body/div[1]/div/section[2]/div[4]/div/div/div[2]/table`

### 3. IPO Central -  https://ipocentral.in/ipo-discussion/

**Purpose:** To gather GMP, Subject to, and Kostak data, particularly from discussion forums.

*   **Mainboard IPO Table:**
    *   **Required Data Points (from Table):** Company Name, Company Link, Price (Upper Band), GMP (₹), GMP (%), Subject to, Date, Exchange Board, Remarks.
    *   **CSS Selector (Table):** `#tablepress-57`
    *   **XPath (Table):** `//*[@id="tablepress-57"]`

*   **SME IPO Table:**
    *   **Required Data Points (from Table):** (Same as Mainboard IPO Table).
    *   **CSS Selector (Table):** `#tablepress-58`
    *   **XPath (Table):** `//*[@id="tablepress-58"]`

### 4. IPO Watch -  https://ipowatch.in/ipo-grey-market-premium-latest-ipo-gmp/

**Purpose:** To gather GMP, Subject to, and other market sentiment data.

*   **IPO GMP Table:**
    *   **Required Data Points (from Table):** Company Name, Company Link, GMP, Price, Gain, Date, Subject, Type (Exchange Board).
    *   **CSS Selector (Table):** `body > div.elementor.elementor-4483.elementor-location-single.post-3445.page.type-page.status-publish.has-post-thumbnail.hentry > section > div > div.elementor-column.elementor-col-50.elementor-top-column.elementor-element.elementor-element-36a48a19 > div > div.elementor-element.elementor-element-1f27a874.elementor-widget.elementor-widget-theme-post-content > div > figure.wp-block-table.is-style-regular > table`
    *   **XPath (Table):** `/html/body/div[1]/section/div/div[1]/div/div[5]/div/figure[1]/table`

### 5. Chittorgarh/InvestorGain -  https://www.investorgain.com/report/live-ipo-gmp/331/all/

**Purpose:** To gather GMP, Kostak, Subject to Sauda, and IPO status information.

*   **IPO GMP Table:**
    *   **Required Data Points (from Table):** Company Name, Company Link (construct base URL + href), Status, Price, GMP, Estimated Listing Gain, IPO Size, Lot Size, Open Date, Close Date, Basis of Allotment Date, Listing Date, GMP Updated Date.
    *   **CSS Selector (Table):** `#report_table`
    *   **XPath (Table):** `//*[@id="report_table"]`

*   **Company Specific Data (from Company Link):**
    *   **Retail Subject to Sauda:**
        *   **CSS Selector (Option 1):** `#main > div:nth-child(5) > div > div.float-none.mb-2.ms-2 > div:nth-child(1) > p > span`
        *   **CSS Selector (Option 2):** `#main > div:nth-child(5) > div > div.float-none.mb-2.ms-2 > div:nth-child(1) > p > span:nth-child(5)`
        *   **CSS Selector (Option 3):** `#main > div:nth-child(5) > div > div.float-none.mb-2.ms-2 > div:nth-child(1) > p > span:nth-child(6)`
        *   **XPath (Option 1):** `//*[@id="main"]/div[3]/div/div[2]/div[1]/p/span`
        *   **XPath (Option 2):** `//*[@id="main"]/div[3]/div/div[2]/div[1]/p/span[1]`
        *   **XPath (Option 3):** `//*[@id="main"]/div[3]/div/div[2]/div[1]/p/span[2]`
    *   **Small HNI Subject to Sauda:** (Selectors and XPath similar to Retail Subject to Sauda, may require inspecting page source for specific variations).

**Data Processing & Storage:**

*   Scraped data will be cleaned, transformed, and structured for database insertion.
*   Error handling and data validation will be implemented to ensure data integrity.
*   Data will be stored in a database (schema defined in the Database Structure Document).

This document provides a detailed plan for web scraping in Phase 1 of the IPO Dalal project. It includes target websites, data points, and selectors for efficient data extraction. Regular review and updates will be necessary as website structures may change.