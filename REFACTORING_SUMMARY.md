# IPO Application Platform - Data Centralization Refactoring

## Overview
Successfully centralized all mock IPO data into a single source of truth and refactored all components to use the centralized data structure.

## Changes Made

### 1. Created Centralized Mock Data (`lib/mock-data.ts`)
- **IPOData Interface**: Comprehensive TypeScript interface defining the structure of IPO data
- **IPOCategoryDetails Interface**: Detailed category-specific information including lot sizes, application values, subscription rates, discounts, and reserved percentages
- **Mock Dataset**: 8 comprehensive IPO entries covering both Mainboard and SME categories
- **Helper Functions**: Utility functions for filtering and retrieving IPO data by various criteria
- **Categories**: Centralized definition of IPO application categories

### 2. Updated Allocation Optimizer (`app/allocation-optimizer/page.tsx`)
- Replaced local mock data with imports from centralized data
- Updated interfaces to extend the central IPOData type
- Fixed all TypeScript type errors
- Maintained all existing functionality

### 3. Updated Funding Calculator (`app/funding-calculator/page.tsx`)
- Replaced extensive local mock data with centralized imports
- Simplified interface definitions using inheritance
- Resolved naming conflicts with categories
- Maintained all calculation logic and UI components

### 4. Updated IPO Selection (`app/ipo-selection/page.tsx`)
- Removed duplicate mock data definitions
- Updated to use centralized helper functions for sectors and risk ratings
- Fixed TypeScript errors related to optional properties
- Enhanced null safety checks

## Key Benefits

### 1. **Data Consistency**
- Single source of truth for all IPO data
- Consistent data structure across all components
- Eliminates data synchronization issues

### 2. **Maintainability**
- Easy to add, modify, or remove IPO entries in one place
- Changes automatically propagate to all components
- Reduced code duplication

### 3. **Type Safety**
- Comprehensive TypeScript interfaces
- Better IntelliSense and compile-time error checking
- Consistent property types across the application

### 4. **Scalability**
- Easy to extend with additional IPO properties
- Helper functions make data filtering and retrieval efficient
- Prepared for future database integration

## Data Structure Features

### IPO Categories Supported
- **Retail**: Individual investor category
- **SHNI**: Small HNI (₹2L - ₹10L investment)
- **BHNI**: Big HNI (₹10L+ investment)
- **Shareholder**: Existing company shareholders
- **Employee**: Company employee quota

### IPO Types
- **Mainboard**: Large companies with higher investment requirements
- **SME**: Small and Medium Enterprises with different allocation rules

### Data Points Included
- Basic IPO information (name, price, lot size, issue size)
- Market sentiment (GMP, subscription rates)
- Risk assessment (risk rating, sector classification)
- Category-specific details (lot sizes, application limits, discounts)
- Reserved percentages for each category

## Future Enhancements
1. **Database Integration**: Easy migration path to replace mock data with API calls
2. **Real-time Updates**: Structure supports dynamic data updates
3. **Additional Filters**: Framework in place for more complex filtering options
4. **Data Validation**: Type system ensures data integrity

## Files Modified
- `lib/mock-data.ts` (NEW)
- `app/allocation-optimizer/page.tsx`
- `app/funding-calculator/page.tsx`
- `app/ipo-selection/page.tsx`

## Testing Recommendations
1. Test all three pages to ensure functionality is preserved
2. Verify data consistency across components
3. Test filtering and selection features
4. Confirm calculation accuracy with centralized data

This refactoring provides a solid foundation for the IPO application platform with improved maintainability, consistency, and scalability.