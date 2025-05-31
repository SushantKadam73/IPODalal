---
description: This document describes the Funding Calculator feature of the IPO Dalal project. It outlines its purpose, functionality, inputs, outputs, and benefits for users
globs: 
---
# IPO Dalal Project Documentation: Funding Calculator

**File Description:** This document describes the Funding Calculator feature of the IPO Dalal project. It outlines its purpose, functionality, inputs, outputs, and benefits for users.

---

## 1. Overview

The Funding Calculator is a tool designed to help users estimate the capital required to invest in Initial Public Offerings (IPOs). It allows users to select IPOs they are interested in applying for and calculate the total investment, including potential interest costs if borrowing capital. The calculator also provides an estimated breakeven price and projected gains based on simplified calculations.

## 2. Functionality

The Funding Calculator provides the following key functionalities:

*   **IPO Selection:**
    *   Allows users to select IPOs from a dynamic list of current and upcoming IPOs.
    *   Offers a "Custom IPO" option for manual entry of IPO details if the desired IPO is not listed.

*   **Category-wise Application Input:**
    *   For each selected IPO, users can specify the number of lots they intend to apply for in different investor categories:
        *   Retail Individual Investor (RII)
        *   Small Non-Institutional Investor (sNII)
        *   Big Non-Institutional Investor (bNII)
        *   Shareholder
        *   Employee

*   **Interest Rate and Loan Period Input:**
    *   Users can input an annual interest rate (in percentage) and a loan period (in days) to calculate potential interest costs if they plan to borrow capital for IPO investment.

*   **Data Prefetching:**
    *   When an IPO is selected from the dynamic list, the calculator automatically prefetches relevant IPO details from the database, such as:
        *   Share Price
        *   Shares per Lot
        *   (Future Enhancement: Shareholder/Employee discounts, Subscription Rates)
    *   For "Custom IPO," users must manually input these details.

*   **Capital Requirement Calculation:**
    *   Calculates the total capital (principle) required for applying to the selected IPOs based on the number of lots and the applicable share price for each category.
    *   Calculates the interest cost based on the input interest rate and loan period.
    *   Determines the total cost, which is the sum of the capital required and the interest cost.

*   **Output Display (Per IPO and Summary):**
    *   **Per IPO Output:**
        *   Total Investment for the IPO
        *   Interest Cost allocated to the IPO
        *   Total Cost for the IPO
        *   Shares Applied (per category and total)
        *   Lots Applied (per category and total)
        *   Breakeven Price per share for the IPO
        *   Estimated Expected Gain (simplified calculation based on GMP - *Refer Formulae Documentation*)

    *   **Overall Summary Output (Across all selected IPOs):**
        *   Total Investment across all selected IPOs
        *   Total Interest Cost across all selected IPOs
        *   Total Cost across all selected IPOs
        *   Date Range for Capital Requirement (based on IPO closing dates)

## 3. Inputs

The Funding Calculator requires the following user inputs:

*   **Interest Rate (per annum %):**  Annual interest rate for borrowed funds (Default: 10%).
*   **Loan Period (Days):** Duration for which capital is borrowed (Default: 7 days).
*   **IPO Selection:** Selection of IPOs from a list or "Custom IPO" option.
*   **Category-wise Lots Applied (per IPO):** Number of lots to apply for each category (Retail, sNII, bNII, Shareholder, Employee).
*   **(For Custom IPO):**
    *   Share Price
    *   Shares per Lot
    *   (Optional: Shareholder Discount, Employee Discount)

## 4. Outputs

The Funding Calculator provides the following outputs:

*   **Per IPO Details:** Investment, Interest Cost, Total Cost, Shares/Lots Applied, Breakeven Price, Expected Gain (per IPO).
*   **Overall Summary:** Total Investment, Total Interest Cost, Total Cost, Capital Requirement Date Range (across all selected IPOs).

## 5. Formulae

The detailed formulas used in the Funding Calculator are documented in the separate **`formulae_documentation.md`** file. Key formulas include:

*   Capital Required Calculation
*   Interest Cost Calculation
*   Total Cost Calculation
*   Breakeven Price Calculation
*   Simplified Expected Gain Calculation (based on GMP)

## 6. Target Users

The Funding Calculator is primarily intended for:

*   Retail investors
*   High Net Worth Individuals (HNIs)
*   Anyone planning to invest in IPOs and wanting to estimate capital needs and potential costs.

## 7. Benefits

Using the Funding Calculator offers several benefits:

*   **Financial Planning:** Helps users plan their finances and understand the capital outlay required for IPO investments.
*   **Cost Estimation:**  Provides a clear estimate of the total cost, including potential interest expenses if borrowing capital.
*   **Breakeven Analysis:** Calculates the breakeven price, aiding in investment decision-making.
*   **Simplified Gain Projection:** Offers a basic projection of potential gains based on GMP, allowing for a quick assessment of potential returns.
*   **Organized Summary:** Presents a consolidated summary of investment requirements and costs across multiple IPO applications.

This document provides a comprehensive overview of the Funding Calculator feature. It helps users understand its purpose, functionalities, and how it can assist in IPO investment planning.