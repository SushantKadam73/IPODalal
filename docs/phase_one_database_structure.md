---
description: This document outlines the database schema for Phase One of the IPO Dalal project. It defines the tables, columns, data types, and relationships required to store and manage IPO data scraped from various sources.
globs: 
---
# IPO Dalal Project Documentation: Phase One - Database Structure

**File Description:** This document outlines the database schema for Phase One of the IPO Dalal project. It defines the tables, columns, data types, and relationships required to store and manage IPO data scraped from various sources.

---

## Phase 1 Database Schema

For Phase 1, the database will primarily focus on storing IPO information scraped from NSE, IPO Premium, IPO Central, IPO Watch, and InvestorGain. The schema is designed to be relational and efficiently store the required data for the website's core features.

**Tables:**

### 1. `companies` Table

**Purpose:** Stores core information about IPO companies.

**Columns:**

| Column Name         | Data Type     | Constraints          | Description                                                                 |
| ------------------- | ------------- | -------------------- | --------------------------------------------------------------------------- |
| `company_id`        | INT           | PRIMARY KEY AUTO_INCREMENT | Unique identifier for each company                                          |
| `company_name`      | VARCHAR(255)  | NOT NULL             | Name of the IPO company                                                     |
| `symbol`            | VARCHAR(50)   | UNIQUE               | Stock symbol/ticker (after listing)                                         |
| `exchange_board`    | VARCHAR(50)   |                      | Exchange board (Mainboard, BSE SME, NSE SME)                                |
| `issue_type`        | VARCHAR(50)   |                      | Type of issue (IPO, FPO, InvIT)                                            |
| `price_range`       | VARCHAR(100)  |                      | IPO price range (string representation)                                     |
| `upper_price_band`  | DECIMAL(10, 2)|                      | Upper price band (numeric)                                                  |
| `lower_price_band`  | DECIMAL(10, 2)|                      | Lower price band (numeric)                                                  |
| `lot_size`          | INT           |                      | Number of shares per lot                                                    |
| `issue_size`        | DECIMAL(20, 2)|                      | Total issue size in ₹ Crores                                                |
| `open_date`         | DATE          |                      | IPO opening date                                                            |
| `close_date`        | DATE          |                      | IPO closing date                                                            |
| `basis_of_allotment_date` | DATE          |                      | Basis of Allotment date                                                    |
| `listing_date`      | DATE          |                      | IPO listing date                                                            |
| `listing_price`     | DECIMAL(10, 2)|                      | Listing price on exchange                                                    |
| `current_price`     | DECIMAL(10, 2)|                      | Current market price                                                        |
| `status`            | VARCHAR(50)   |                      | IPO status (Upcoming, Open, Closed, Listed, Withdrawn)                      |
| `actions`           | VARCHAR(100)  |                      | Recommended action (Wait to Apply, Apply, Check Allotment, No Allotment)    |
| `allotment_link`    | VARCHAR(255)  |                      | Link to check allotment status                                               |
| `remark`            | TEXT          |                      | Additional remarks or notes                                                  |
| `created_at`        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Timestamp of record creation                                                |
| `updated_at`        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of record update                                                    |

### 2. `gmp_data` Table

**Purpose:** Stores Grey Market Premium (GMP) data from different sources.

**Columns:**

| Column Name        | Data Type     | Constraints                      | Description                                                                 |
| ------------------ | ------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `gmp_data_id`      | INT           | PRIMARY KEY AUTO_INCREMENT         | Unique identifier for each GMP data record                               |
| `company_id`       | INT           | NOT NULL, FOREIGN KEY (`companies`.`company_id`) | Foreign key referencing the `companies` table                               |
| `source_website`   | VARCHAR(100)  | NOT NULL                         | Source website of the GMP data (e.g., IPO Premium, IPO Central, IPO Watch, InvestorGain) |
| `gmp_rs`           | DECIMAL(10, 2)|                                    | GMP value in Rupees                                                         |
| `gmp_percentage`   | DECIMAL(5, 2) |                                    | GMP value in Percentage                                                     |
| `subject_to`       | DECIMAL(10, 2)|                                    | Subject to rate                                                             |
| `kostak`           | DECIMAL(10, 2)|                                    | Kostak rate                                                                 |
| `gmp_updated_date` | DATETIME      |                                    | Date and time when GMP data was last updated on the source website         |
| `created_at`       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP          | Timestamp of record creation                                                |
| `updated_at`       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of record update                                                    |

### 3. `nse_subscription_data` Table

**Purpose:** Stores subscription data scraped from NSE for different categories.

**Columns:**

| Column Name             | Data Type     | Constraints                      | Description                                                                    |
| ----------------------- | ------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `subscription_data_id`  | INT           | PRIMARY KEY AUTO_INCREMENT         | Unique identifier for each subscription data record                           |
| `company_id`            | INT           | NOT NULL, FOREIGN KEY (`companies`.`company_id`) | Foreign key referencing the `companies` table                                   |
| `category`              | VARCHAR(50)   | NOT NULL                         | Subscription category (Retail, SHNI, BHNI, Employee, Shareholder, etc.)      |
| `exchange_type`         | VARCHAR(50)   | NOT NULL                         | Exchange type (NSE, Consolidated)                                            |
| `subscription_times`    | DECIMAL(10, 2)|                                    | Subscription rate in times                                                      |
| `bid_date_time`         | DATETIME      |                                    | Date and time of bid data                                                      |
| `created_at`            | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP          | Timestamp of record creation                                                   |
| `updated_at`            | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Timestamp of record update                                                       |


**Relationships:**

*   `companies` table is the central table.
*   `gmp_data` table has a **one-to-many** relationship with `companies` (one company can have multiple GMP data points from different sources).
*   `nse_subscription_data` table has a **one-to-many** relationship with `companies` (one company can have multiple subscription data points for different categories and times).

**Primary Key & Foreign Key Constraints:**

*   Primary keys are defined for each table to uniquely identify records.
*   Foreign keys are used to establish relationships between tables and ensure data integrity (e.g., `company_id` in `gmp_data` and `nse_subscription_data` tables referencing `companies` table).

**Data Types:**

*   Appropriate data types are chosen for each column to efficiently store and manage data (INT, VARCHAR, DECIMAL, DATE, DATETIME, TIMESTAMP, TEXT).

**Future Enhancements (Database):**

*   Additional tables for storing detailed issue information, financial data, news, and user-related data will be added in later phases.
*   Indexing strategies will be implemented to optimize query performance as the database grows.

This document outlines the initial database schema for Phase 1 of the IPO Dalal project. It is designed to be scalable and adaptable for future feature additions and data expansion.