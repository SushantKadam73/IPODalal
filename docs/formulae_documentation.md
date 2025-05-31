---
description: This document details the formulas and mathematical logic used within the IPO Dalal project, specifically for the Funding Calculator and Allocation Optimizer modules.
globs: 
---
# IPO Dalal Project Documentation: Formulae

**File Description:** This document details the formulas and mathematical logic used within the IPO Dalal project, specifically for the Funding Calculator and Allocation Optimizer modules.

---

## 1. Funding Calculator Formulas

The Funding Calculator is designed to help users estimate the capital required for IPO applications and project potential returns.

**1.1. Variables:**

The following variables are used in the Funding Calculator.  User-configurable fields are marked with **(User Input)**.

*   **IPO Name (User Input):** Name of the IPO. Can be custom or selected from a list of current/upcoming IPOs.
    *   **Default:** Custom (User manually inputs share price, lot size, etc.)
*   **Share Price (₹) (User Input):**  Price per share of the IPO.
    *   **Default:** share price will be autofetched form the db for the corresponding company. it will be '0' for custom
*   **Shares per Lot (User Input):** Number of shares in one lot.
    *   **Default:** shares per lot will be autofetched form the db for the corresponding company. it will be '0' for custom
*   **Shareholder Discount (₹) (User Input):** Discount offered to shareholders (if applicable).
    *   **Default:** Shareholder Discount will be autofetched form the db for the corresponding company. it will be '0' for custom
*   **Employee Discount (₹) (User Input):** Discount offered to employees (if applicable).
    *   **Default:** will be autofetched form the db for the corresponding company. it will be '0' for custom
*   **Number of Lots (User Input):** Number of lots to apply for in each category (Retail, SHNI, BHNI, Shareholder, Employee).
    *   **Default:** 0 for all categories
*   **Category (User Input):** Application categories (Retail, SHNI, BHNI, Shareholder, Employee).
*   **Subscription Rate (Fetched Data/User Input - optional):** Subscription rate for each category.
    *   **Default:** 0 for all categories (If 'Use live subscription' is No)
*   **Interest Rate (%) (per annum) (User Input):** Annual interest rate for borrowed capital.
    *   **Default:** 10%
*   **Loan Period (Days) (User Input):** Number of days for which capital is borrowed.
    *   **Default:** 7 days
*   **Application Applied Through (User Input):** Single or Multiple Accounts.
    *   **Default:** Single
*   **Use Live Subscription Data (User Input):** Yes/No. If 'Yes', subscription rates are fetched (future feature). 
    *   **Default:** No
*   **Shareholder Quota Eligible (User Input):** Yes/No.
    *   **Default:** No
*   **Employee Quota Eligible (User Input):** Yes/No.
    *   **Default:** No
*   **GMP (Grey Market Premium) (₹) (User Input):** Grey Market Premium for the IPO.
    *   **Default:** will be autofetched form the db for the corresponding company. it will be '0' for custom

**1.2. Derived Values & Formulas:**

*   **Price/Value of One Lot:**
    ```
    Lot Value = Share Price * Shares per Lot
    ```

*   **Shareholder Price:**
    ```
    Shareholder Price = Share Price - Shareholder Discount
    ```

*   **Employee Price:**
    ```
    Employee Price = Share Price - Employee Discount
    ```

*   **Capital/Principle Required:**
    ```
    Capital Required = ∑ (Lots Applied in Category * Applicable Share Price for Category)
    ```
    Where:
        *   Applicable Share Price for Retail, SHNI, BHNI = Share Price
        *   Applicable Share Price for Shareholder = Shareholder Price
        *   Applicable Share Price for Employee = Employee Price

*   **Interest Cost:**
    ```
    Interest Cost = Capital Required * (Interest Rate / 100) * (Loan Period / 365)
    ```

*   **Total Cost:**
    ```
    Total Cost = Capital Required + Interest Cost
    ```

*   **Expected Gain (Simplified Calculation based on GMP):**
    ```
    Expected Gain = ∑ ( (Lots Applied in Category / Subscription Rate of Category) * (GMP + Category Discount) )
    ```
    Where:
        *   Category Discount for Retail, SHNI, BHNI = 0
        *   Category Discount for Shareholder = Shareholder Discount
        *   Category Discount for Employee = Employee Discount
        *   If Subscription Rate for a category is 0, assume Probability of Allotment = 0 for simplified calculation in Phase 1. (This basically means the category is not present. this may happen only in shareholder and employee categoty. ).
        
*   **Breakeven Price (per share):**
    ```
    Breakeven Price = (Share Price * Shares per Lot + (Interest Cost for all IPOs / Total Shares Applied across all IPOs)) / Shares per Lot
    ```
    *(Note: This is a simplified breakeven calculation assuming interest cost is distributed across all applied shares. More refined allocation methods can be implemented).*

**1.3. Output Metrics:**

The Funding Calculator will output the following:

*   **For Each IPO:**
    *   Shares Applied (per category and total)
    *   Lots Applied (per category and total)
    *   Capital Required (per category and total)
    *   Interest Cost (allocated to the IPO, if applicable)
    *   Total Cost (per IPO)
    *   Breakeven Price (per share)
    *   Expected Gain (per IPO, simplified calculation)
*   **Overall Summary (Across All Selected IPOs):**
    *   Total Investment (Capital Required)
    *   Total Interest Cost
    *   Total Cost
    *   Date Range for Capital Requirement (based on IPO closing dates)


## 2. Allocation Optimizer Formulas (Work In Progress - Basic Functionality in Phase 1)

The Allocation Optimizer aims to suggest optimal IPO application strategies based on user inputs and IPO parameters.  Phase 1 will implement basic functionality. More advanced optimization strategies will be developed in later phases.

**2.1. Basic Functionality (Phase 1) - Prioritization based on User-Selected Criteria:**

In Phase 1, the Allocation Optimizer will primarily focus on allowing users to prioritize IPO applications based on:

*   **GMP (Grey Market Premium)**
*   **Subscription Rate**
*   **Available Capital**

Users will be able to rank these criteria in order of importance. The system will then suggest an allocation strategy based on these priorities.

**Example - Prioritization Logic (Illustrative):**

1.  **Rank IPOs by GMP (Highest to Lowest).**
2.  **Filter IPOs based on Subscription Rate (e.g., only consider IPOs with Subscription Rate < X).**
3.  **Allocate Capital based on remaining IPOs, starting with the highest GMP IPO, until Capital is exhausted.**

**More Advanced Features (Future Phases - Not detailed in this document):**

*   Optimization based on probabilistic allotment models.
*   Capital rotation strategies across multiple IPOs based on timelines.
*   Risk assessment and diversification considerations in allocation strategies.

Detailed formulas for advanced optimization and allocation strategies will be documented in future iterations of this document.

This document outlines the core formulas for the Funding Calculator and the basic framework for the Allocation Optimizer in Phase 1. As the project evolves, these formulas and functionalities will be refined and expanded.