---
description: This document details the website structure for Phase One of the IPO Dalal project. It outlines the four core pages and their components planned for the initial release.
globs: 
---
# IPO Dalal Project Documentation: Phase One - Website Structure

**File Description:** This document details the website structure for Phase One of the IPO Dalal project. It outlines the four core pages and their components planned for the initial release.

---

## Phase 1 Website Structure (4 Pages)

Phase 1 of the IPO Dalal project will consist of four essential pages to provide core functionality.

### 1. IPO Dashboard/Home Page

**Purpose:** To provide a central dashboard for users to view and access information about IPOs across different stages (Ongoing, Upcoming, Past).

**Sections:**

*   **Market Summary (Top of Page):**
    *   Display key market indicators (Planned for future enhancement, initially may be simple static indicators or placeholders).
        *   Nifty 50 Value & Change
        *   Bank Nifty Value & Change
        *   USD/INR Exchange Rate
        *   Bitcoin Price (Optional)
        *   Gold Price (Optional)
        *   NASDAQ (Optional)
        *   Market Mood Index/Fear & Greed Index (Optional)
        *   Nifty P/E Ratio (Optional)
        *   Total Market Capitalization of Indian Equity Market (Optional)



*   **Calendar (Optional - Phase 1):**
    *   IPO Calendar view (May be added in Phase 1 or deferred to later phases).

*   **Ongoing IPOs Table:**
    *   Displays currently active IPOs.
    *   Columns:
        *   **Name:** IPO Company Name (with potential emphasis for "Opening Today," "Closing Today" using visual cues like boxes/buttons).
        *   **Price:** IPO Price Range (₹).
        *   **GMP:** Grey Market Premium (₹).
        *   **Subscription Rate:** Overall Subscription Rate (times).
        *   **Issue Size:** Total Issue Size (₹ Crores).
        *   **Close Date:** IPO Closing Date.
        *   **BoA Date:** Basis of Allotment Date.
        *   **Listing Date:** IPO Listing Date.
        *   **Status:** Current IPO Status (Ongoing).

*   **Upcoming IPOs Table:**
    *   Displays IPOs that are yet to open for subscription.
    *   Columns:
        *   **Name:** IPO Company Name.
        *   **Price:** IPO Price Range (₹).
        *   **GMP:** Grey Market Premium (₹).
        *   **Issue Size:** Total Issue Size (₹ Crores).
        *   **Open Date:** IPO Opening Date.
        *   **Close Date:** IPO Closing Date.
        *   **BoA Date:** Basis of Allotment Date.
        *   **Listing Date:** IPO Listing Date.

*   **Past IPOs Table:**
    *   Displays IPOs that have already closed and been listed.
    *   Columns:
        *   **Name:** IPO Company Name.
        *   **Symbol:** Stock Symbol after listing.
        *   **Price Range:** IPO Price Range (₹).
        *   **Issue Size:** Total Issue Size (₹ Crores).
        *   **Listing Date:** IPO Listing Date.
        *   **Listing Price:** Listing Price on Exchange (₹).
        *   **Current Price:** Current Market Price (₹).

detailed dashboard documentation page is - [ipo_dashboard.mdc](mdc:.cursor/rules/ipo_dashboard.mdc)

### 2. Funding Calculator Page

**Purpose:** To allow users to calculate the capital required for applying to selected IPOs and estimate potential interest costs and expected gains.

**Sections:**

*   **Input Form:**
    *   **Interest Rate (per annum):** User input for annual interest rate (default: 10%).
    *   **Loan Period (Days):** User input for loan duration in days (default: 7 days).
    *   **IPO Selection:**
        *   Option to select from a list of current/upcoming IPOs (dynamically populated).
        *   "Custom IPO" option to manually input IPO details if not in the list.
    *   **IPO Details Input (for each selected IPO or Custom IPO):**
        *   **Category-wise Application Details:**
            *   Retail: Number of Lots to Apply
            *   SHNI: Number of Lots to Apply
            *   BHNI: Number of Lots to Apply
            *   Shareholder: Number of Lots to Apply
            *   Employee: Number of Lots to Apply
        *   *(Pre-filled data fetched from database when IPO is selected - Share Price, Lot Size, etc.)*

*   **Calculation & Output Display:**
    *   Dynamically calculated results based on user inputs.
    *   **For each IPO:**
        *   Total Investment
        *   Interest Cost (allocated to the IPO)
        *   Total Cost
        *   Shares Applied (per category and total)
        *   Lots Applied (per category and total)
        *   Breakeven Price
    *   **Overall Summary:**
        *   Total Investment (across all selected IPOs)
        *   Total Interest Cost (across all selected IPOs)
        *   Total Cost (across all selected IPOs)
        *   Capital Requirement Date Range (based on IPO closing dates)

detailed Funding calculator documentation page is - [funding_calculator_documentation.mdc](mdc:.cursor/rules/funding_calculator_documentation.mdc)
and formulae documentation is - [formulae_documentation.mdc](mdc:.cursor/rules/formulae_documentation.mdc)
 
### 3. Allocation Optimizer Page

**Purpose:** (Basic Functionality in Phase 1) To provide a simple tool for users to optimize IPO applications based on limited criteria.

**Sections:**

*   **Input Form:**
    *   **Available Capital:** User input for total capital available for IPO applications.
    *   **IPO Selection:** List of current/upcoming IPOs (dynamically populated).
    *   **Prioritization Criteria:**
        *   Dropdown or selectable options to prioritize based on:
            *   GMP
            *   Subscription Rate
            *   Capital (Maximize utilization)
        *   Option to rank the criteria in order of importance.

*   **Output/Recommendation:**
    *   Suggested IPO allocation strategy based on chosen priorities and available capital.
    *   *(In Phase 1, this will be a basic recommendation. Advanced optimization will be implemented later.)*

### 4. Docs Page

**Purpose:** To provide project documentation and user assistance.

**Sections:**

*   **Project Features Documentation:**
    *   Description of existing features in Phase 1.
*   **Change Log:**
    *   Version history and updates to the project.
*   **Future Feature Implementation (Roadmap):**
    *   Outline of planned features for future phases.
*   **How to Navigate/Help Guide:**
    *   Basic instructions on using the website and its features.
*   **Version Number:**
    *   Display the current project version number (aligned with GitHub versioning).


This document outlines the planned website structure for Phase 1 of the IPO Dalal project. It serves as a blueprint for front-end development and feature implementation in the initial phase.

The project is based on the ipos in indian markets and thus all the related information is present in the condensed knowledgebase - [Condensed-Knowledgebase.mdc](mdc:.cursor/rules/Condensed-Knowledgebase.mdc)

