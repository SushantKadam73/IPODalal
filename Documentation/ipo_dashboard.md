---
description: This document details the IPO Dashboard, which serves as the Home Page for the IPO Dalal project. It describes the purpose, sections, displayed information, and user benefits of this central page.
globs: 
---
# IPO Dalal Project Documentation: IPO Dashboard / Home Page

**File Description:** This document details the IPO Dashboard, which serves as the Home Page for the IPO Dalal project. It describes the purpose, sections, displayed information, and user benefits of this central page.

---

## 1. Overview

The IPO Dashboard is the central landing page and primary interface for users of the IPO Dalal project. It provides a comprehensive overview of the IPO market by presenting information on ongoing, upcoming, and past **Mainboard and SME** IPOs in a clear and organized manner. The dashboard aims to be a one-stop view for users to quickly grasp the current IPO landscape and navigate to more detailed information.

## 2. Purpose

The primary purposes of the IPO Dashboard are to:

*   **Provide a Centralized IPO Overview:** Offer a single page to view the status of all relevant **Mainboard and SME** IPOs (ongoing, upcoming, past).
*   **Facilitate Quick Information Access:** Present key IPO data points at a glance, enabling users to quickly assess IPO opportunities.
*   **Enhance Navigation:** Serve as a gateway to other features and detailed IPO information within the IPO Dalal platform.
*   **Highlight Important IPO Events:** Emphasize critical IPO events like openings, closings, and listings for user awareness.

## 3. Sections and Components

The IPO Dashboard is structured into the following key sections:

*   **Ongoing IPOs Table:**
    *   **Purpose:** To display information about **Mainboard and SME** IPOs that are currently open for subscription.
    *   **Data Source:** Dynamically fetched from the database, updated regularly via scrapers.
    *   **Columns:**
        *   **Name:** IPO Company Name.  Visually emphasized (e.g., with a button or box) if the IPO is "Opening Today" or "Closing Today" to highlight key events.
        *   **Price:** IPO Price Range (₹).
        *   **GMP:** Grey Market Premium (₹).
        *   **Subscription Rate:** Overall Subscription Rate (times).
        *   **Issue Size:** Total Issue Size (₹ Crores).
        *   **Close Date:** IPO Closing Date.
        *   **BoA Date:** Basis of Allotment Date.
        *   **Listing Date:** IPO Listing Date.
        *   **Status:**  Indicates "Ongoing" status.

*   **Upcoming IPOs Table:**
    *   **Purpose:** To display information about **Mainboard and SME** IPOs that are expected to open for subscription soon.
    *   **Data Source:** Dynamically fetched from the database.
    *   **Columns:**
        *   **Name:** IPO Company Name.
        *   **Price:** IPO Price Range (₹).
        *   **GMP:** Grey Market Premium (₹).
        *   **Issue Size:** Total Issue Size (₹ Crores).
        *   **Open Date:** IPO Opening Date.
        *   **Close Date:** IPO Closing Date.
        *   **BoA Date:** Basis of Allotment Date.
        *   **Listing Date:** IPO Listing Date.

*   **Past IPOs Table:**
    *   **Purpose:** To display information about **Mainboard and SME** IPOs that have already closed and been listed on the exchanges.
    *   **Data Source:** Dynamically fetched from the database.
    *   **Columns:**
        *   **Name:** IPO Company Name.
        *   **Symbol:** Stock Symbol after listing on the exchange.
        *   **Price Range:** IPO Price Range (₹) during the IPO period.
        *   **Issue Size:** Total Issue Size (₹ Crores).
        *   **Listing Date:** IPO Listing Date.
        *   **Listing Price:** Listing Price on the exchange on listing day (₹).
        *   **Current Price:** Current Market Price of the stock (₹). Visually emphasized (e.g., with a button or box) if the IPO is "Listing Today".

## 4. Data Display and Presentation

*   **Tables:** IPO information is primarily presented in tabular format for easy readability and comparison of both Mainboard and SME IPOs.
*   **Visual Emphasis:**  Small buttons, boxes, or distinct styling will be used within table cells to emphasize "Opening Today," "Closing Today," and "Listing Today" events, drawing user attention to time-sensitive IPOs.
*   **Links:** Company Names in the tables will likely be hyperlinked to dedicated "IPO Details" pages (future feature) for more in-depth information about each IPO.
*   **Real-time Data (Future):** In future phases, data will be updated in near real-time through background processes and scraper updates.

## 5. Target Users

The IPO Dashboard is designed for all users of the IPO Dalal platform, including:

*   Retail Investors
*   High Net Worth Individuals (HNIs)
*   Financial Analysts
*   Anyone interested in tracking and analyzing the Indian **Mainboard and SME** IPO market.

## 6. Benefits

Using the IPO Dashboard offers several key benefits:

*   **At-a-Glance IPO Status:** Users can quickly see the current status of ongoing, upcoming, and past **Mainboard and SME** IPOs.
*   **Efficient Information Gathering:** Provides essential IPO data points for both Mainboard and SME IPOs in a consolidated view, saving users time in searching for information across multiple sources.
*   **Improved Decision Making:** Facilitates informed investment decisions by presenting key metrics like GMP, subscription rates, and timelines for both Mainboard and SME IPOs.
*   **Timely Awareness of IPO Events:** Highlights critical IPO dates (opening, closing, listing) for both Mainboard and SME IPOs, ensuring users don't miss important deadlines.
*   **Easy Navigation:** Serves as a central point to access other features of the IPO Dalal platform.

This document provides a detailed description of the IPO Dashboard/Home Page for the IPO Dalal project. It outlines its purpose, components, data presentation, target users, and the benefits it offers as the central interface of the platform, specifically for both Mainboard and SME IPO tracking.