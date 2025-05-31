---
description: This document provides a comprehensive overview of the IPO Dalal project, outlining its goals, inspiration, features, and overall structure.
globs: 
---
# IPO Dalal Project Documentation: Project Structure

**File Description:** This document provides a comprehensive overview of the IPO Dalal project, outlining its goals, inspiration, features, and overall structure.

---

## 1. Project Overview

IPO Dalal is an IPO Tracking project designed to be a one-stop platform for comprehensive information and analysis related to Initial Public Offerings (IPOs). It aims to provide users with valuable insights into upcoming, current, and past IPOs in the Indian stock market, catering to both Mainboard and SME IPOs.

The project is based on the ipos in indian mark information is present in the condensed knowledgebase - [Condensed-Knowledgebase.mdc](mdc:.cursor/rules/Condensed-Knowledgebase.mdc)


**Inspiration and Data Sources:**

The project draws inspiration and data from various reputable sources, including:

*   **Official Exchanges & Regulatory Bodies:**
    *   NSE (National Stock Exchange of India)
    *   BSE (Bombay Stock Exchange)
    *   SEBI (Securities and Exchange Board of India)
*   **IPO Information Aggregator Websites:**
    *   InvestorGain
    *   IPO Watch
    *   IPO Premium
    *   IPO Central
    *   Chittorgarh
    *   IPO Platform

## 2. Key Features

IPO Dalal is envisioned to offer a wide array of features, categorized to provide a user-friendly and informative experience for IPO enthusiasts and investors.

**Core Features:**

1.  **Home Page/Dashboard:**
    *   Centralized view of upcoming, ongoing, and past Mainboard and SME IPOs presented in tabular format.
    *   Quick access to key IPO information at a glance.

2.  **Calculator Suite:**
    *   **Funding Calculator:**
        *   Calculates the capital required to apply for selected IPOs based on user-defined preferences (categories, lots, etc.).
        *   Potentially projects expected gains based on basic probability and GMP.
    *   **Allotment Optimizer:**
        *   Aids users in optimizing IPO applications based on capital availability and multiple accounts.
        *   Prioritizes allotment strategies based on GMP, subscription levels, and available capital.
        *   Advanced features (future): Capital rotation strategies across IPOs within a specific timeframe.

3.  **GMP (Grey Market Premium) Aggregator:**
    *   Consolidated dashboard displaying GMP, Kostak, and Subject to Sauda rates from diverse sources.
    *   Visual representation (graphs) of GMP fluctuations and potential manipulation.

4.  **Subscription Aggregator:**
    *   Aggregated dashboard presenting subscription details across all IPO categories and issues.

5.  **IPO Details Page:**
    *   Comprehensive information hub for individual IPOs.
    *   Details encompassing company financials, issue specifics, timelines, and more.

6.  **IPO Performance Analytics:**
    *   Statistical analysis of IPO performance, including money raised, listing performance, and monthly IPO trends.
    *   Yearly performance summaries and key IPO metrics.

7.  **My Account/Portfolio:**
    *   Personalized portfolio to track applied and allotted IPOs.
    *   Return tracking and application management features.
    *   Automated allotment status checker.
    *   Potential future integration for IPO application and bidding functionalities.

8.  **Real-time Comments/Forum:**
    *   Discussion forum for IPO-specific conversations and company analysis.
    *   Focus on primary market discussions, unlisted shares, emerging technologies, and companies.
    *   Emphasis on new and upcoming industries, differentiating from forums focused on established companies.

9.  **Historical Data Analysis:**
    *   In-depth analysis of historical IPO data.
    *   Analysis categories: Application category, industry sector, IPO count, lead banker performance, registrar analysis, IPO valuation & size trends, yearly IPO patterns, anchor investor impact, and more.

10. **Good Reads/Cards:**
    *   Curated collection of relevant news articles, research reports, YouTube videos, tweets, and influencer analysis related to IPOs and the primary market.

11. **About Us:**
    *   Project introduction, mission statement, vision, development journey, and team information.
    *   Potential section for advertisement and pricing details.

12. **Documentation (Docs):**
    *   Project change logs, new feature announcements, navigation guides, and help documentation.
    *   Version tracking aligned with GitHub releases.

13. **Unlisted Shares Aggregator:**
    *   Information repository for unlisted companies anticipated to go public soon.
    *   Real-time updates on companies filing DRHPs with SEBI and listings on NSE SME/BSE SME platforms.

14. **New Issues & Corporate Actions Tracking:**
    *   Immediate updates on SEBI approvals, DRHP/RHP filings, shareholder quotas, and other critical IPO milestones.
    *   Potential future expansion to track OFS, Buybacks, Splits, Bonus issues, Bonds, REITs, InvITs, MFs, and SGBs (subject to prioritization).

**Additional Features (Planned):**

*   **Calendar Integration:** IPO Calendar on the Home Page for timeline visibility.
*   **AI-Powered Summaries:** AI-generated summaries of DRHP, RHP, Basis of Allotment documents, and Research Reports for quick insights.
*   **Buy/Not Buy Polls:** User voting and polling feature for IPO sentiment analysis.
*   **Market Dashboard:** Real-time market indicators at the top of the website (Nifty, Bank Nifty, Forex rates, Global Indices, Market Mood Index, P/E ratio, Market Cap).
*   **Social Media Sharable Images:** Feature to convert IPO data into visually appealing, shareable images for social media platforms.
*   **Influencer Analysis Cards:** Integration of analysis from prominent financial influencers (YouTube, Twitter, Websites) presented in card format.
*   **Widget Feature:** Personalized widget to track specific IPOs or companies of interest directly on the home page (requires user login).
*   **Pre-Open Trade Details:** Information on pre-open trading activity for IPOs.

**Unimportant & Unrelated Additional Features (For future consideration/fun):**

*   **Meme Integration:** Humorous memes displayed alongside subscription meters, triggered by subscription milestones for user engagement.

## 3. Phase 1 Focus 

Phase 1 of the IPO Dalal project will concentrate on establishing the foundational elements of the platform. It will include:

*   **Website Structure (4 Pages):**
    1.  IPO Dashboard/Home Page
    2.  Funding Calculator
    3.  Allocation Optimizer (Basic Functionality)
    4.  Documentation (Docs)
*   **Data Infrastructure:**
    1. Development of web scrapers to collect IPO data from target websites.
    2. Database setup to store and manage the scraped data.
*   **The phase 1 docs as as follows:**
    1. phase one database structure documentation - [phase_one_database_structure.mdc](mdc:.cursor/rules/phase_one_database_structure.mdc)
    2. phase one Scraper structure documentation - [phase_one_scraper_documentation.mdc](mdc:.cursor/rules/phase_one_scraper_documentation.mdc)
    3. phase one website structure documentation - [phase_one_website_structure.mdc](mdc:.cursor/rules/phase_one_website_structure.mdc)
    4. Techstack used for UI, frontend and backend - [ui_frontend_backend_tech_stack.mdc](mdc:.cursor/rules/ui_frontend_backend_tech_stack.mdc) 
    5. techstack used for api, scraper, and database - [database_api_scraper_tech_stack.mdc](mdc:.cursor/rules/database_api_scraper_tech_stack.mdc)


This document outlines the overall vision and scope of the IPO Dalal project. Subsequent documentation will delve into the specifics of Phase 1 implementation, including website structure, scraper design, and database schema.