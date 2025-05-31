---
description: This document outlines the technology stack chosen for the Database, API, and Scraper components of the IPO Dalal project, focusing on data management, access, and collection.
globs: 
alwaysApply: true
---
# IPO Dalal Project Documentation: Database, API, and Scraper Tech Stack

**File Description:** This document outlines the technology stack chosen for the Database, API, and Scraper components of the IPO Dalal project, focusing on data management, access, and collection.

---

## 1. Database

*   **Database System:** **PostgreSQL**
    *   **Purpose:** To serve as the primary database for storing all IPO-related data, company information, and potentially user data in future phases. PostgreSQL is a robust, scalable, and open-source relational database system known for its reliability, data integrity, and advanced features.
    *   **Rationale:** PostgreSQL is chosen for its proven track record in production environments, strong SQL compliance, JSON support (useful for semi-structured data), and suitability for web applications. It is a core component of the PERN stack, aligning with the project's technology preferences.

*   **Managed Database Service (Optional):** **Supabase**
    *   **Purpose:** To potentially leverage Supabase as a managed PostgreSQL service. Supabase offers a Backend-as-a-Service (BaaS) platform built on top of PostgreSQL, providing features like:
        *   Managed PostgreSQL database hosting.
        *   Realtime database capabilities.
        *   Authentication and authorization.
        *   Auto-generated APIs.
    *   **Consideration:** Supabase can simplify database setup, management, and backend development.  While PostgREST is mentioned for API, Supabase provides a broader set of backend functionalities. The project can choose to use Supabase directly for database hosting and backend services, or use a self-hosted PostgreSQL and potentially PostgREST/Express.js for API layers depending on project complexity and desired control.

## 2. API (Application Programming Interface)

*   **API Layer (Option 1 - Simplified):** **PostgREST**
    *   **Purpose:** To automatically create a RESTful API directly from the PostgreSQL database schema. PostgREST dynamically generates a complete REST API based on the database tables and relationships, minimizing backend coding for basic CRUD operations.
    *   **Rationale:** PostgREST offers a very rapid way to expose the database data as an API, reducing development time for basic data access. It aligns well with PostgreSQL and can be highly performant for data-centric APIs.

*   **API Layer (Option 2 - Flexible):** **Express.js (as documented in UI/Frontend/Backend Tech Stack)**
    *   **Purpose:** To build a more customized and flexible API using Express.js (Node.js). Express.js allows for implementing complex business logic, data transformations, custom endpoints, and more sophisticated API functionalities beyond what PostgREST directly provides.
    *   **Rationale:** If the project requires more than basic CRUD operations or needs custom API logic, Express.js offers the necessary flexibility. It can also integrate with PostgreSQL using Node.js PostgreSQL libraries.

*   **API Choice Decision:** The choice between PostgREST and Express.js for the API layer depends on the project's complexity. For Phase 1, if the API primarily needs to serve database data with minimal custom logic, PostgREST could be a faster and simpler option. If more complex API logic or backend processing is required, Express.js provides greater control and flexibility.

## 3. Scraper

*   **Language:** **Python**
    *   **Purpose:** To develop web scrapers for collecting IPO data from various online sources. Python is chosen for its rich ecosystem of web scraping libraries and ease of use.

*   **HTML Parsing Library:** **Beautiful Soup (Python)**
    *   **Purpose:** To efficiently parse HTML content extracted from web pages. Beautiful Soup simplifies navigating and searching the HTML structure to extract relevant IPO data points. It is well-suited for parsing relatively static HTML content.

*   **Browser Automation & JS Heavy Scraping Library:** **Playwright (Python)**
    *   **Purpose:** To handle scraping of dynamic websites that heavily rely on JavaScript to load content. Playwright allows for browser automation, enabling the scraper to interact with web pages, execute JavaScript, and scrape data that is rendered client-side. This is crucial for scraping modern websites and potentially for handling interactions on sites like NSE India.

*   **Data Storage:** **Supabase (PostgreSQL) - via Python Supabase Library**
    *   **Purpose:** Scraped data, after being parsed and cleaned in Python, will be stored in the PostgreSQL database (potentially hosted on Supabase). The Python Supabase library will be used to connect to the Supabase database and insert the scraped IPO data.

This tech stack for Database, API, and Scraper is designed to be robust, efficient, and scalable for collecting, managing, and providing access to IPO data for the IPO Dalal project.
