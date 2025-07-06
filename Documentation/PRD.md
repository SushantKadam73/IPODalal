Of course. This is an excellent project, and your groundwork provides a fantastic starting point. I will now transform your detailed notes into a comprehensive Product Requirements Document (PRD).

This PRD is structured for clarity, breaking down the project into actionable phases and components. It incorporates engineering best practices, including detailed error handling, logging, edge case analysis, and sample code, to ensure a robust and scalable build.

***

## Product Requirements Document (PRD): IPO Dalal - Phase 1

**Document Version:** 1.0
**Date:** 19-May-2024
**Author:** IPO Dalal Product Team

### 1.0 Overview & Vision

#### 1.1 Project Vision
IPO Dalal aims to be the definitive one-stop platform for Indian IPO investors. Our mission is to empower retail and HNI investors by aggregating disparate IPO data, providing powerful analytical tools, and fostering a community around primary market investments. We will replace the need for investors to visit multiple websites by providing a clean, fast, and insightful user experience, enabling them to make well-informed, data-driven decisions.

#### 1.2 This Document's Purpose
This PRD outlines the requirements for **Phase 1** of the IPO Dalal project. The goal of Phase 1 is to launch a Minimum Viable Product (MVP) that delivers immediate core value to users. This includes a comprehensive data aggregation backend (scrapers), a centralized database, and key user-facing features: the IPO Dashboard, Funding Calculator, Allocation Optimizer, and a Docs page.

### 2.0 Project Goals & Objectives (Phase 1)

*   **Goal 1: Establish a Single Source of Truth for IPO Data.**
    *   **Objective:** Successfully build and deploy a robust, automated data ingestion pipeline that scrapes, cleans, and stores data from specified sources (NSE, IPO Watch, Chittorgarh, etc.).
*   **Goal 2: Provide Actionable IPO Information at a Glance.**
    *   **Objective:** Launch a user-friendly IPO Dashboard that clearly presents ongoing, upcoming, and past IPOs with critical data points.
*   **Goal 3: Deliver Powerful Capital Planning Tools.**
    *   **Objective:** Develop and deploy a Funding Calculator and an Allotment Optimizer to help users plan their investments and application strategies effectively.
*   **Goal 4: Build a Scalable Foundation.**
    *   **Objective:** Implement a clean architecture, well-documented code, and comprehensive logging/monitoring to support future feature expansion.

### 3.0 Target Audience

1.  **Retail Investors:** Individuals applying in the retail category (< ₹2 Lakhs), often looking for quick insights on GMP, subscription, and general sentiment.
2.  **High Net-Worth Individuals (HNIs):** Investors applying in sHNI (₹2-10 Lakhs) and bHNI (> ₹10 Lakhs) categories, who are more sophisticated and require tools for capital cost calculation and allocation optimization.
3.  **Financial Analysts & Bloggers:** Users who require aggregated historical and current data for research, analysis, and content creation.

### 4.0 Scope

#### 4.1 In-Scope for Phase 1

1.  **Data Ingestion Pipeline (Scrapers):** Fully functional scrapers for all specified data sources.
2.  **Database:** A well-structured database (Supabase/PostgreSQL) to store all aggregated data.
3.  **IPO Dashboard (Home Page):** With tables for Ongoing, Upcoming, and Past IPOs.
4.  **Funding Calculator:** With all specified features, including capital reuse.
5.  **Allotment Optimizer:** Initial version focusing on prediction and basic optimization.
6.  **Docs Page:** For changelogs and feature explanations.
7.  **Core UI/UX:** Light/dark theme, Indian numbering system, and responsive design.

#### 4.2 Out-of-Scope for Phase 1 (To be considered for future phases)

*   User Accounts & Authentication ("My Account")
*   Portfolio Tracking & Allotment Checker
*   Real-time Comments/Forum
*   AI Summary of Documents (DRHP/RHP)
*   Voting/Polling Feature
*   Good Reads/Cards (News/Video Aggregation)
*   Unlisted Shares Aggregator
*   Full Historical Data Analysis Page
*   Widgets, Sharable Images, Pre-Open Details, Memes

### 5.0 High-Level System Architecture

We will adopt a modern web architecture to ensure performance, scalability, and developer efficiency.

*   **Frontend:** A modern JavaScript framework like **Next.js (React)**. This is ideal for its performance, static site generation (SSG) capabilities for SEO, and server-side rendering (SSR).
*   **Backend:** **Node.js with Express.js** or **Serverless Functions** (e.g., Vercel Functions, Supabase Edge Functions). Serverless is recommended for scalability and cost-efficiency.
*   **Database:** **Supabase (PostgreSQL)**. It provides a robust relational database, authentication, storage, and serverless functions in one platform.
*   **Data Ingestion Pipeline:** A set of scheduled **cron jobs** running Node.js scripts. These can be hosted on a separate server or using services like Vercel Cron or GitHub Actions schedulers.
*   **Web Scraping Libraries:**
    *   **Puppeteer/Playwright:** For websites that heavily rely on JavaScript to render content (like NSE).
    *   **Axios & Cheerio:** For static HTML websites, which is faster and less resource-intensive.

---

### 6.0 Detailed Feature Requirements: Phase 1

#### 6.1 IPO Dashboard (Home Page)

**Objective:** To provide users with a comprehensive, at-a-glance view of the entire IPO market.

**Functional Requirements:**

1.  **Market Ticker Bar:** A sticky or fixed bar at the top of the page displaying:
    *   Nifty 50 & Bank Nifty (Value & Change)
    *   USD/INR
    *   Gold Price
    *   Market Mood Index
    *   *Data Source: To be sourced from a reliable financial data API (e.g., a free tier from an external provider).*

2.  **IPO Tables Container:** The main section will contain three distinct, tabbed or segmented tables.

3.  **Ongoing IPOs Table:**
    *   **Columns:** Company Name, Price Band, GMP (Avg.), Subscription (Total), Issue Size, Close Date, BoA Date, Listing Date, Status.
    *   **Special Emphasis Tags:** A small, colored tag/chip next to the company name for "Opens Today" or "Closes Today".
    *   **Interactivity:** Clicking on a row will navigate to the `IPO Details` page (to be built in a future phase). For Phase 1, links can be disabled.

4.  **Upcoming IPOs Table:**
    *   **Columns:** Company Name, Price Band, GMP (Avg.), Issue Size, Open Date, Close Date.
    *   **Data Sourcing:** Data will come from DRHP/RHP filings and aggregator sites. Many fields might be "TBA" (To Be Announced).

5.  **Past/Listed IPOs Table:**
    *   **Columns:** Company Name, Symbol, Price Band, Issue Size, Listing Date, Listing Price, LTP (Last Traded Price), Listing Gain (%), Current Gain/Loss (%).

**Technical Implementation & Edge Cases:**

*   **Data Fetching:** The frontend will fetch data from dedicated API endpoints (e.g., `/api/ipos?status=ongoing`, `/api/ipos?status=upcoming`). These endpoints will query the master database table.
*   **UI:** Use a component-based library like ShadCN/UI or Material-UI for tables and tags. Implement client-side sorting and filtering for each table.
*   **Number Formatting:** All monetary values (**₹**) and large numbers must use the Indian numbering system (Lakhs, Crores).
    *   *Sample Code (JavaScript):*
        ```javascript
        function formatIndianCurrency(num) {
          if (num === null || num === undefined) return 'N/A';
          const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
          });
          return formatter.format(num);
        }
        ```
*   **Edge Cases:**
    *   **Null/Missing Data:** If GMP or Subscription data is not available, the cell should display "N/A" or "-". The backend should ensure `null` is returned instead of causing an error.
    *   **API Failure:** If the API fails to return data, the frontend should display a skeleton loader initially, followed by a user-friendly error message ("Failed to load IPO data. Please refresh.") with a retry button.
*   **Logging:**
    *   `INFO`: Log every request to the API endpoints.
    *   `WARN`: Log if a significant number of IPOs are missing critical data like `issuePrice` or `gmp`.
    *   `ERROR`: Log any 5xx server errors when fetching IPO data, including the request parameters.

---

#### 6.2 Funding Calculator

**Objective:** To help users calculate the total capital required, interest costs, and breakeven points for IPO applications, especially when using loans.

**Component Breakdown:**

1.  **IPO Selection Component:**
    *   A multi-select dropdown or checklist populated with all "Ongoing" IPOs from the database.
    *   Users can select one or more IPOs they wish to apply for.

2.  **Funding Parameters Component:**
    *   **Funding Type:** Radio buttons: "Own Funds", "Loan", "Partial Loan".
        *   If "Partial Loan" is selected, an input field for "Own Capital Contribution (₹)" appears.
    *   **Interest Rate (% p.a.):** Input field, enabled only if "Loan" or "Partial Loan" is selected. Default: 10%.
    *   **Capital Reuse/Rotation:** A checkbox labeled "Optimize Capital Rotation".

3.  **Application Details Component:**
    *   For each IPO selected in Step 1, a card will be displayed.
    *   Each card will contain input fields for the number of lots for each category: Retail, sHNI, bHNI, Shareholder, Employee.
    *   Relevant data like Lot Size, Price Band, and Discounts will be auto-filled from the database.

4.  **Results/Summary Component:**
    *   **Per-IPO Breakdown:** A table showing: Total Investment, Interest Cost, Total Cost, Shares Applied, Breakeven Price.
    *   **Consolidated Summary:** A card showing: Total Capital Required, Peak Funding Date Range, Total Interest Cost.
    *   **Export Buttons:** "Export as CSV", "Export as Image".

**Logic & Formulas:**

1.  **Capital Calculation:**
    *   `Lot Value = Upper Price Band * Lot Size`
    *   `Discounted Lot Value = (Upper Price Band - Discount) * Lot Size`
    *   `Total Investment (per IPO) = (RetailLots + sHNILots + bHNILots) * LotValue + (ShareholderLots * ShareholderDiscountedLotValue) + (EmployeeLots * EmployeeDiscountedLotValue)`
    *   `Total Capital Required = SUM(Total Investment for all selected IPOs)` (Without capital rotation).

2.  **Capital Rotation Logic (If "Optimize Capital Rotation" is checked):**
    *   **Step 1:** Create a timeline of events for all selected IPOs: `Close Date` and `Refund Initiation Date`.
    *   **Step 2:** Sort all selected IPOs by `Close Date`.
    *   **Step 3:** Iterate through the timeline. The `Peak Capital Required` is the maximum capital needed at any single point in time.
        *   Initialize `currentCapital = 0` and `peakCapital = 0`.
        *   For each date on the timeline:
            *   If it's a `Close Date`, add the IPO's `Total Investment` to `currentCapital`.
            *   If it's a `Refund Initiation Date`, subtract the IPO's `Total Investment` from `currentCapital`.
            *   After each operation, update `peakCapital = max(peakCapital, currentCapital)`.
    *   The `Total Capital Required` in the summary will now be this `peakCapital`.

3.  **Interest Calculation:**
    *   `Loan Amount = Total Capital Required - Own Capital Contribution`
    *   `Loan Period (days)` = Date of last refund initiation - Date of first IPO closure.
    *   `Interest Cost = Loan Amount * (Interest Rate / 100) * (Loan Period / 365)`

**Edge Cases & Error Handling:**

*   **State Preservation:** The user's input (lots, interest rate) must be preserved if they de-select and re-select an IPO. Use a state management library (Zustand, Redux) for this.
*   **Invalid Input:** Use form validation to ensure numbers are entered for lots, interest rates, etc. Prevent negative numbers.
*   **Missing Dates:** If a `Refund Initiation Date` is missing for an IPO, the capital rotation logic cannot be applied for that IPO. Display a warning to the user: "Cannot optimize capital rotation for [IPO Name] as refund date is not available."
*   **Logging:**
    *   `INFO`: Log when a calculation is successfully performed, anonymizing the input values.
    *   `WARN`: Log if a user tries to calculate with missing critical data (e.g., lot size).

---

#### 6.3 Allotment Optimizer

**Objective:** To help users strategize their applications to maximize potential allotment and gains. This feature will be split into two clear parts.

**Part 1: Allotment Predictor**

*   **UI:**
    1.  A dropdown to select a single "Ongoing" IPO.
    2.  Inputs for "Applied Lots" for each category (Retail, sHNI, etc.).
    3.  A display area for current subscription figures for that IPO, fetched from the DB.
    4.  A "Predict Allotment" button.
*   **Logic:**
    *   The prediction is based on the simple formula: `Expected Allotment (Lots) = Applied Lots / Subscription Rate (for that category)`.
    *   For the retail category, if the result is < 1, explain that allotment is by lottery. If > 1, the user will get 1 lot for sure, with the rest being lottery-based.
    *   *Future Enhancement:* Build a predictive model based on historical subscription trends (e.g., subscription on Day 1 vs. Day 3) to forecast the final subscription rate.
*   **Output:** Display a simple text result: "Based on current subscription, you may be allotted approximately X lots in the sHNI category. Retail allotment is subject to a lottery."

**Part 2: Allotment Optimizer (Basic Version for Phase 1)**

*   **UI:**
    1.  Dropdown to select an IPO.
    2.  Input for "Total Available Capital (₹)".
    3.  Dropdown for "Optimization Strategy": "Maximize Gain (GMP)", "Maximize Allotment Chance (Subscription)".
*   **Logic:**
    *   The optimizer will suggest an application structure.
    *   **"Maximize Gain (GMP)" Strategy:** Prioritize applying in categories with the highest potential gain, factoring in discounts. This usually means filling shareholder/employee quotas first, then bHNI/sHNI.
    *   **"Maximize Allotment Chance" Strategy:** Prioritize applying in categories with lower subscription rates.
*   **Output:** A table suggesting the number of lots to apply in each category. E.g., "Apply 1 Lot in Retail, 1 Lot in Shareholder, and 14 Lots in sHNI."

**Edge Cases & Error Handling:**

*   **Zero Capital:** If the user enters 0 capital, show a message "Please enter a valid capital amount."
*   **Insufficient Capital:** If the capital is not enough for even one lot, display "Capital is insufficient to apply for a single lot."
*   **Disclaimer:** Always display a clear disclaimer: "This is a theoretical calculation based on available data. Allotment is not guaranteed and subject to market dynamics."
*   **Logging:**
    *   `INFO`: Log the optimization strategy chosen and the input capital (anonymized range, e.g., 5-10L) to understand user preferences.

---

#### 6.4 Docs Page

**Objective:** To provide users with clear information about the platform.

**Functional Requirements:**

1.  **Static Content Page:** This page will be simple, static, and well-formatted.
2.  **Sections:**
    *   **About IPO Dalal:** A brief of the mission and vision.
    *   **Features Guide:** A short explanation of how to use the Dashboard, Funding Calculator, and Allotment Optimizer.
    *   **Changelog:** A list of updates and new features, with version numbers and dates. The version number should be manually synced with the GitHub release/tag for simplicity in Phase 1.
    *   **Data Sources:** A list of all websites and sources from which data is aggregated, providing transparency.

---

### 7.0 Data Ingestion Pipeline (Scrapers)

**Objective:** To create a reliable, automated system to populate the IPO Dalal database. This is the most critical backend component.

**General Strategy:**

1.  **Scheduler:** A cron job will trigger the master scraper script at regular intervals.
    *   **High Frequency (Every 15-30 mins during market hours):** For ongoing IPO subscription data & GMP.
    *   **Medium Frequency (Once every few hours):** For upcoming IPOs and changes to existing data.
    *   **Low Frequency (Once daily):** For past IPO data and SEBI filings.
2.  **Master Script:** Orchestrates the execution of individual scraper modules.
3.  **Individual Scrapers:** One script per data source (e.g., `nse_scraper.js`, `ipowatch_scraper.js`).
4.  **Data Consolidation:** After all scrapers run, a consolidation script will merge the data into a final, clean format before inserting/updating it in the database. The primary key for merging will be the company `symbol` or a normalized `companyName`.
5.  **Error Handling & Alerting:** Use a service like Sentry or a custom solution to get alerts when a scraper fails repeatedly.

#### 7.1 NSE Scraper

*   **Method:** Use **Puppeteer/Playwright**. The NSE website is dynamic and requires browser automation to simulate clicks and handle cookies. The "rough plan" APIs are the correct approach.
*   **Workflow:**
    1.  Launch a browser instance.
    2.  "Warm up" by visiting the main IPO page (`https://www.nseindia.com/market-data/all-upcoming-issues-ipo`) to acquire necessary cookies.
    3.  Programmatically call the API endpoints you've identified (e.g., `/api/ipo-current-issue`).
    4.  Set the correct `Referer` header in the API requests.
    5.  Parse the JSON response.
    6.  **Calculate BSE Data:** For subscription, `BSE_Data = Consolidated_Data - NSE_Data`. This must be done carefully, handling potential negative results if data is inconsistent by logging a warning and defaulting BSE data to 0.
*   **Error Handling:**
    *   Wrap API calls in `try...catch` blocks.
    *   Implement a retry mechanism (e.g., 3 retries with exponential backoff) for network errors or 5xx responses.
    *   Log an `ERROR` if an API endpoint returns an unexpected structure or fails after all retries.

#### 7.2 GMP/Other Aggregator Scrapers (IPO Watch, Chittorgarh, etc.)

*   **Method:** Use **Axios (for fetching HTML) + Cheerio (for parsing)** where possible, as it's much faster. If a site requires JavaScript rendering, fall back to Puppeteer.
*   **Workflow:**
    1.  Fetch the HTML of the target page.
    2.  Load the HTML into Cheerio.
    3.  Use the CSS selectors you've identified to traverse the DOM and extract data from table rows (`tr`).
    4.  **Data Cleaning:**
        *   Remove currency symbols, commas, and extraneous text (e.g., "Rs.", "(%)").
        *   Convert date strings into a standard ISO 8601 format (`YYYY-MM-DD`).
        *   Parse numbers into numeric types.
    *   **Example (Chittorgarh - extracting Sauda rates):**
        *   After scraping the main GMP table, for each company, navigate to its detail page URL.
        *   On the detail page, use the specified selectors to find the "Retail Subject to Sauda" and "Small HNI Subject to Sauda" values. Handle cases where these elements don't exist for a particular IPO (e.g., SME vs. Mainboard).
*   **Edge Cases:**
    *   **Selector Changes:** This is the most common point of failure. The scraper must be designed to fail gracefully. If a selector does not find an element, it should log a `CRITICAL` error with the URL and the failed selector, and skip that data point without crashing the entire script.
    *   **Data Formatting Changes:** A site might change "₹50" to "50 INR". The cleaning logic needs to be robust or have tests to catch this.

#### 7.3 SEBI Scraper (DRHP/RHP)

*   **Method:** Axios + Cheerio. The SEBI website tables are standard HTML.
*   **Workflow:**
    1.  Scrape the tables for DRHP, RHP, etc.
    2.  Extract the company name and the link to the PDF document.
    3.  Store the company name and the PDF link in the database. The actual AI summary of the PDF is out of scope for Phase 1.

---

### 8.0 Database Schema

A single primary table will store the consolidated data for all IPOs. Historical data for GMP and subscriptions should be stored in separate tables to track trends.

### 9.0 Non-Functional Requirements

*   **Performance:** API responses should be < 200ms. Use caching (e.g., Redis or database-level caching) for frequently accessed data.
*   **Usability:** The website must be fully responsive and functional on mobile, tablet, and desktop devices.
*   **Theme:** Implement both a light and dark theme, with a toggle for the user.
*   **Accessibility:** Use semantic HTML and ensure the site is navigable via keyboard.
*   **Security:** Sanitize all user inputs on the calculators to prevent XSS attacks. All external links should use `rel="noopener noreferrer"`.

### 10.0 Error Handling, Logging, & Monitoring

*   **Logging Framework:** Use a structured logging library like **Winston** or **Pino** for the Node.js backend/scrapers.
*   **Log Levels:**
    *   `INFO`: Standard operations (API requests, scraper run started/finished).
    *   `WARN`: Non-critical issues (missing non-essential data, data format inconsistencies).
    *   `ERROR`: Critical application errors (API crashes, database connection failure).
    *   `CRITICAL/FATAL`: Scraper failures (site layout changed, IP blocked).
*   **Monitoring/Alerting:** Integrate a service like **Sentry** or **Logtail**. Configure alerts for all `ERROR` and `CRITICAL` level logs to be sent to a dedicated developer channel (e.g., Slack or email).

### 11.0 Future Phases Roadmap

This PRD focuses on Phase 1. The following features, based on your original plan, are earmarked for future development:

*   **Phase 2:** User Accounts, Portfolio Tracking, Allotment Status Auto-checker.
*   **Phase 3:** Community Forum, "Good Reads" content aggregation.
*   **Phase 4:** AI-powered summaries, Sharable Image generator, Advanced Analytics pages.
*   **Ongoing Enhancements:** Unlisted shares, OFS, Buybacks, etc.

***

This document provides a detailed blueprint for building Phase 1 of IPO Dalal. By focusing on a strong data foundation and core user tools, we can launch a valuable product and iterate quickly based on user feedback.