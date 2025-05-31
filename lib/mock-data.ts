// Mock IPO Data - Centralized Database File
// This will serve as our database substitute until we implement a real database

// Bid Details Interfaces
export interface BidDetailPrice {
  price: number
  quantity: number
}

export interface DemandScheduleCategory {
  category: string
  subcategory?: string
  sharesOffered: number
  sharesBidFor: number
  subscriptionMultiple: number
}

export interface BidDetails {
  id: number
  companyName: string
  priceBand: {
    min: number
    max: number
  }
  cutOffPrice: number
  exchange: "BSE" | "NSE" | "Combined"
  bidPrices: BidDetailPrice[]
  cutOffBids: number
  demandSchedule: DemandScheduleCategory[]
  totalSharesOffered: number
  totalSharesBidFor: number
  overallSubscription: number
  lastUpdated: string
}

export interface IPOCategoryDetails {
  lotSize: number
  applicationValue: number
  maxApplications: number
  subscriptionRate: number | null
  discount?: number
  reservedPercentage?: number
}

export interface IPOData {
  id: number
  name: string
  price: number
  lotSize: number
  gmp: number
  gmpPercentage: number
  subscriptionRate: number | null
  issueSize: number
  type: "Mainboard" | "SME"
  status: "Current" | "Upcoming"
  sector?: string
  riskRating?: "Low" | "Medium" | "High"
  listingGains?: number | null
  hasShareholderQuota?: boolean
  hasEmployeeQuota?: boolean
  categoryDetails: {
    retail: IPOCategoryDetails
    shareholder: IPOCategoryDetails
    employee: IPOCategoryDetails
    shni: IPOCategoryDetails
    bhni: IPOCategoryDetails
  }
}

// Main IPO data array
export const mockIPOData: IPOData[] = [
  {
    id: 1,
    name: "TechSoft India Ltd",
    price: 1185,
    lotSize: 12,
    gmp: 250,
    gmpPercentage: 21.1,
    subscriptionRate: 4.25,
    issueSize: 1250,
    type: "Mainboard",
    status: "Current",
    sector: "Technology",
    riskRating: "Medium",
    listingGains: 18.5,
    hasShareholderQuota: true,
    hasEmployeeQuota: true,
    categoryDetails: {
      retail: {
        lotSize: 1,
        applicationValue: 14220,
        maxApplications: 1,
        subscriptionRate: 3.2,
        reservedPercentage: 35,
      },
      shareholder: {
        lotSize: 1,
        applicationValue: 14220,
        maxApplications: 1,
        subscriptionRate: 2.1,
        discount: 50,
        reservedPercentage: 5,
      },
      employee: {
        lotSize: 1,
        applicationValue: 14220,
        maxApplications: 1,
        subscriptionRate: 1.5,
        discount: 100,
        reservedPercentage: 5,
      },
      shni: {
        lotSize: 14,
        applicationValue: 199080,
        maxApplications: 5,
        subscriptionRate: 5.8,
        reservedPercentage: 15,
      },
      bhni: {
        lotSize: 70,
        applicationValue: 995400,
        maxApplications: 10,
        subscriptionRate: 7.2,
        reservedPercentage: 40,
      },
    },
  },
  {
    id: 2,
    name: "Green Energy Solutions",
    price: 225,
    lotSize: 60,
    gmp: 45,
    gmpPercentage: 20.0,
    subscriptionRate: 2.8,
    issueSize: 850,
    type: "Mainboard",
    status: "Current",
    sector: "Energy",
    riskRating: "Low",
    listingGains: 22.3,
    hasShareholderQuota: true,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: {
        lotSize: 1,
        applicationValue: 13500,
        maxApplications: 1,
        subscriptionRate: 2.1,
        reservedPercentage: 35,
      },
      shareholder: {
        lotSize: 1,
        applicationValue: 13500,
        maxApplications: 1,
        subscriptionRate: 1.8,
        reservedPercentage: 5,
      },
      employee: {
        lotSize: 1,
        applicationValue: 13500,
        maxApplications: 1,
        subscriptionRate: 1.2,
        discount: 20,
        reservedPercentage: 5,
      },
      shni: {
        lotSize: 15,
        applicationValue: 202500,
        maxApplications: 5,
        subscriptionRate: 3.5,
        reservedPercentage: 15,
      },
      bhni: {
        lotSize: 75,
        applicationValue: 1012500,
        maxApplications: 10,
        subscriptionRate: 4.2,
        reservedPercentage: 40,
      },
    },
  },
  {
    id: 3,
    name: "Bharat Pharma Ltd",
    price: 565,
    lotSize: 20,
    gmp: 120,
    gmpPercentage: 21.2,
    subscriptionRate: 6.5,
    issueSize: 1500,
    type: "Mainboard",
    status: "Current",
    sector: "Healthcare",
    riskRating: "Medium",
    listingGains: 19.8,
    hasShareholderQuota: false,
    hasEmployeeQuota: true,
    categoryDetails: {
      retail: {
        lotSize: 1,
        applicationValue: 11300,
        maxApplications: 1,
        subscriptionRate: 5.2,
        reservedPercentage: 35,
      },
      shareholder: {
        lotSize: 1,
        applicationValue: 11300,
        maxApplications: 1,
        subscriptionRate: 3.8,
        reservedPercentage: 5,
      },
      employee: {
        lotSize: 1,
        applicationValue: 11300,
        maxApplications: 1,
        subscriptionRate: 2.5,
        discount: 75,
        reservedPercentage: 5,
      },
      shni: {
        lotSize: 18,
        applicationValue: 203400,
        maxApplications: 5,
        subscriptionRate: 7.8,
        reservedPercentage: 15,
      },
      bhni: {
        lotSize: 90,
        applicationValue: 1017000,
        maxApplications: 10,
        subscriptionRate: 9.2,
        reservedPercentage: 40,
      },
    },
  },
  {
    id: 4,
    name: "Digital Payments Ltd",
    price: 475,
    lotSize: 30,
    gmp: 85,
    gmpPercentage: 17.9,
    subscriptionRate: null,
    issueSize: 1800,
    type: "Mainboard",
    status: "Upcoming",
    sector: "Fintech",
    riskRating: "High",
    listingGains: null,
    hasShareholderQuota: false,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: {
        lotSize: 1,
        applicationValue: 14250,
        maxApplications: 1,
        subscriptionRate: null,
        reservedPercentage: 35,
      },
      shareholder: {
        lotSize: 1,
        applicationValue: 14250,
        maxApplications: 1,
        subscriptionRate: null,
        reservedPercentage: 5,
      },
      employee: {
        lotSize: 1,
        applicationValue: 14250,
        maxApplications: 1,
        subscriptionRate: null,
        discount: 50,
        reservedPercentage: 5,
      },
      shni: {
        lotSize: 14,
        applicationValue: 199500,
        maxApplications: 5,
        subscriptionRate: null,
        reservedPercentage: 15,
      },
      bhni: {
        lotSize: 70,
        applicationValue: 997500,
        maxApplications: 10,
        subscriptionRate: null,
        reservedPercentage: 40,
      },
    },
  },
  {
    id: 5,
    name: "Infra Projects India",
    price: 340,
    lotSize: 40,
    gmp: 65,
    gmpPercentage: 19.1,
    subscriptionRate: null,
    issueSize: 2200,
    type: "Mainboard",
    status: "Upcoming",
    sector: "Infrastructure",
    riskRating: "Medium",
    listingGains: null,
    hasShareholderQuota: false,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: {
        lotSize: 1,
        applicationValue: 13600,
        maxApplications: 1,
        subscriptionRate: null,
        reservedPercentage: 35,
      },
      shareholder: {
        lotSize: 1,
        applicationValue: 13600,
        maxApplications: 1,
        subscriptionRate: null,
        reservedPercentage: 5,
      },
      employee: {
        lotSize: 1,
        applicationValue: 13600,
        maxApplications: 1,
        subscriptionRate: null,
        reservedPercentage: 5,
      },
      shni: {
        lotSize: 15,
        applicationValue: 204000,
        maxApplications: 5,
        subscriptionRate: null,
        reservedPercentage: 15,
      },
      bhni: {
        lotSize: 75,
        applicationValue: 1020000,
        maxApplications: 10,
        subscriptionRate: null,
        reservedPercentage: 40,
      },
    },
  },
  {
    id: 6,
    name: "Tech Micro Solutions",
    price: 100,
    lotSize: 120,
    gmp: 25,
    gmpPercentage: 25.0,
    subscriptionRate: 8.5,
    issueSize: 50,
    type: "SME",
    status: "Current",
    sector: "Technology",
    riskRating: "High",
    listingGains: 28.7,
    hasShareholderQuota: true,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: {
        lotSize: 1,
        applicationValue: 12000,
        maxApplications: 1,
        subscriptionRate: 7.2,
        reservedPercentage: 50,
      },
      shareholder: {
        lotSize: 1,
        applicationValue: 12000,
        maxApplications: 1,
        subscriptionRate: 5.1,
        reservedPercentage: 5,
      },
      employee: {
        lotSize: 1,
        applicationValue: 12000,
        maxApplications: 1,
        subscriptionRate: 3.5,
        discount: 10,
        reservedPercentage: 5,
      },
      shni: {
        lotSize: 2,
        applicationValue: 24000,
        maxApplications: 5,
        subscriptionRate: 9.8,
        reservedPercentage: 0,
      },
      bhni: {
        lotSize: 10,
        applicationValue: 120000,
        maxApplications: 10,
        subscriptionRate: 12.4,
        reservedPercentage: 40,
      },
    },
  },
  {
    id: 7,
    name: "Specialty Chemicals SME",
    price: 155,
    lotSize: 80,
    gmp: 35,
    gmpPercentage: 22.6,
    subscriptionRate: 12.4,
    issueSize: 45,
    type: "SME",
    status: "Current",
    sector: "Chemicals",
    riskRating: "Medium",
    listingGains: 24.1,
    hasShareholderQuota: false,
    hasEmployeeQuota: true,
    categoryDetails: {
      retail: {
        lotSize: 1,
        applicationValue: 12400,
        maxApplications: 1,
        subscriptionRate: 10.2,
        reservedPercentage: 50,
      },
      shareholder: {
        lotSize: 1,
        applicationValue: 12400,
        maxApplications: 1,
        subscriptionRate: 8.1,
        reservedPercentage: 5,
      },
      employee: {
        lotSize: 1,
        applicationValue: 12400,
        maxApplications: 1,
        subscriptionRate: 6.5,
        discount: 15,
        reservedPercentage: 5,
      },
      shni: {
        lotSize: 2,
        applicationValue: 24800,
        maxApplications: 5,
        subscriptionRate: 14.8,
        reservedPercentage: 0,
      },
      bhni: {
        lotSize: 10,
        applicationValue: 124000,
        maxApplications: 10,
        subscriptionRate: 18.4,
        reservedPercentage: 40,
      },
    },
  },
  {
    id: 8,
    name: "Precision Tools Ltd",
    price: 135,
    lotSize: 100,
    gmp: 30,
    gmpPercentage: 22.2,
    subscriptionRate: null,
    issueSize: 35,
    type: "SME",
    status: "Upcoming",
    sector: "Manufacturing",
    riskRating: "Medium",
    listingGains: null,
    hasShareholderQuota: false,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: {
        lotSize: 1,
        applicationValue: 13500,
        maxApplications: 1,
        subscriptionRate: null,
        reservedPercentage: 50,
      },
      shareholder: {
        lotSize: 1,
        applicationValue: 13500,
        maxApplications: 1,
        subscriptionRate: null,
        reservedPercentage: 5,
      },
      employee: {
        lotSize: 1,
        applicationValue: 13500,
        maxApplications: 1,
        subscriptionRate: null,
        discount: 10,
        reservedPercentage: 5,
      },
      shni: {
        lotSize: 2,
        applicationValue: 27000,
        maxApplications: 5,
        subscriptionRate: null,
        reservedPercentage: 0,
      },
      bhni: {
        lotSize: 10,
        applicationValue: 135000,
        maxApplications: 10,
        subscriptionRate: null,
        reservedPercentage: 40,
      },
    },
  },
];

// Bid Details Data - Based on Ather Energy Limited example
export const mockBidDetailsData: BidDetails[] = [
  {
    id: 1,
    companyName: "Ather Energy Limited",
    priceBand: { min: 304, max: 321 },
    cutOffPrice: 321,
    exchange: "BSE",
    bidPrices: [
      { price: 304, quantity: 55582996 },
      { price: 305, quantity: 55481704 },
      { price: 306, quantity: 55453092 },
      { price: 307, quantity: 55447296 },
      { price: 308, quantity: 55445456 },
      { price: 309, quantity: 55441178 },
      { price: 310, quantity: 55439522 },
      { price: 311, quantity: 55408288 },
      { price: 312, quantity: 55401572 },
      { price: 313, quantity: 55396926 },
      { price: 314, quantity: 55394810 },
      { price: 315, quantity: 55393016 },
      { price: 316, quantity: 55363070 },
      { price: 317, quantity: 55361184 },
      { price: 318, quantity: 55360264 },
      { price: 319, quantity: 55354882 },
      { price: 320, quantity: 55347430 },
      { price: 321, quantity: 55328892 },
    ],
    cutOffBids: 6566914,
    demandSchedule: [
      {
        category: "Qualified Institutional Buyers (QIBs)",
        sharesOffered: 2748241,
        sharesBidFor: 21983883,
        subscriptionMultiple: 8.00
      },
      {
        category: "Foreign Institutional Investors (FIIs)",
        subcategory: "QIBs",
        sharesOffered: 0,
        sharesBidFor: 3802751,
        subscriptionMultiple: 0
      },
      {
        category: "Domestic Financial Institutions",
        subcategory: "QIBs",
        sharesOffered: 0,
        sharesBidFor: 2276034,
        subscriptionMultiple: 0
      },
      {
        category: "Mutual funds",
        subcategory: "QIBs",
        sharesOffered: 0,
        sharesBidFor: 15887595,
        subscriptionMultiple: 0
      },
      {
        category: "Others",
        subcategory: "QIBs",
        sharesOffered: 0,
        sharesBidFor: 17503,
        subscriptionMultiple: 0
      },
      {
        category: "Non Institutional Investors",
        sharesOffered: 1947222,
        sharesBidFor: 2594262,
        subscriptionMultiple: 1.33
      },
      {
        category: "Corporates",
        subcategory: "Non Institutional",
        sharesOffered: 0,
        sharesBidFor: 632592,
        subscriptionMultiple: 0
      },
      {
        category: "Individuals (Other than RIIs)",
        subcategory: "Non Institutional",
        sharesOffered: 0,
        sharesBidFor: 1928918,
        subscriptionMultiple: 0
      },
      {
        category: "Others",
        subcategory: "Non Institutional",
        sharesOffered: 0,
        sharesBidFor: 32752,
        subscriptionMultiple: 0
      },
      {
        category: "Retail Individual Investors (RIIs)",
        sharesOffered: 4543517,
        sharesBidFor: 2667379,
        subscriptionMultiple: 0.59
      },
      {
        category: "Cut Off",
        subcategory: "RIIs",
        sharesOffered: 0,
        sharesBidFor: 2231713,
        subscriptionMultiple: 0
      },
      {
        category: "Price bids",
        subcategory: "RIIs",
        sharesOffered: 0,
        sharesBidFor: 435666,
        subscriptionMultiple: 0
      },
      {
        category: "Employees",
        sharesOffered: 117213,
        sharesBidFor: 11201,
        subscriptionMultiple: 0.10
      },
      {
        category: "Cut Off",
        subcategory: "Employees",
        sharesOffered: 0,
        sharesBidFor: 5819,
        subscriptionMultiple: 0
      },
      {
        category: "Price Bids",
        subcategory: "Employees",
        sharesOffered: 0,
        sharesBidFor: 5382,
        subscriptionMultiple: 0
      }
    ],
    totalSharesOffered: 9356193,
    totalSharesBidFor: 27256725,
    overallSubscription: 2.91,
    lastUpdated: "2025-01-06T14:30:00.000Z"
  },
  {
    id: 2,
    companyName: "TechSoft India Ltd",
    priceBand: { min: 1125, max: 1185 },
    cutOffPrice: 1185,
    exchange: "BSE",
    bidPrices: [
      { price: 1125, quantity: 2456789 },
      { price: 1130, quantity: 2434567 },
      { price: 1135, quantity: 2423456 },
      { price: 1140, quantity: 2412345 },
      { price: 1145, quantity: 2401234 },
      { price: 1150, quantity: 2390123 },
      { price: 1155, quantity: 2389012 },
      { price: 1160, quantity: 2378901 },
      { price: 1165, quantity: 2367890 },
      { price: 1170, quantity: 2356789 },
      { price: 1175, quantity: 2345678 },
      { price: 1180, quantity: 2334567 },
      { price: 1185, quantity: 2323456 }
    ],
    cutOffBids: 1234567,
    demandSchedule: [
      {
        category: "Qualified Institutional Buyers (QIBs)",
        sharesOffered: 876543,
        sharesBidFor: 3506172,
        subscriptionMultiple: 4.00
      },
      {
        category: "Non Institutional Investors",
        sharesOffered: 621234,
        sharesBidFor: 1863702,
        subscriptionMultiple: 3.00
      },
      {
        category: "Retail Individual Investors (RIIs)",
        sharesOffered: 1450987,
        sharesBidFor: 1450987,
        subscriptionMultiple: 1.00
      },
      {
        category: "Employees",
        sharesOffered: 50000,
        sharesBidFor: 25000,
        subscriptionMultiple: 0.50
      }
    ],
    totalSharesOffered: 2998764,
    totalSharesBidFor: 6845861,
    overallSubscription: 2.28,
    lastUpdated: "2025-01-06T16:00:00.000Z"
  }
];

// Allocation strategies
export const allocationStrategies = [
  { id: "gmp", name: "Grey Market Premium (GMP)" },
  { id: "subscription", name: "Subscription Rate" },
  { id: "capital", name: "Capital Utilization" },
  { id: "optimize", name: "Optimize Allocation" },
];

// Categories for IPO application
export const categories = [
  { id: "retail", name: "Retail" },
  { id: "shni", name: "SHNI" },
  { id: "bhni", name: "BHNI" },
  { id: "shareholder", name: "Shareholder" },
  { id: "employee", name: "Employee" },
];

// Helper functions to get data
export const getIPOById = (id: number): IPOData | undefined => {
  return mockIPOData.find(ipo => ipo.id === id);
};

export const getIPOsByType = (type: "Mainboard" | "SME" | "Both"): IPOData[] => {
  if (type === "Both") return mockIPOData;
  return mockIPOData.filter(ipo => ipo.type === type);
};

export const getIPOsByStatus = (status: "Current" | "Upcoming" | "Both"): IPOData[] => {
  if (status === "Both") return mockIPOData;
  return mockIPOData.filter(ipo => ipo.status === status);
};

export const getIPOsBySector = (sector: string | "All"): IPOData[] => {
  if (sector === "All") return mockIPOData;
  return mockIPOData.filter(ipo => ipo.sector === sector);
};

export const getIPOsByRiskRating = (riskRating: "Low" | "Medium" | "High" | "All"): IPOData[] => {
  if (riskRating === "All") return mockIPOData;
  return mockIPOData.filter(ipo => ipo.riskRating === riskRating);
};

export const getUniqueSectors = (): string[] => {
  return [...new Set(mockIPOData.map(ipo => ipo.sector).filter(Boolean))] as string[];
};

export const getUniqueRiskRatings = (): string[] => {
  return [...new Set(mockIPOData.map(ipo => ipo.riskRating).filter(Boolean))] as string[];
};

// Export the data for backward compatibility
export const availableIPOs = mockIPOData;
// Helper functions for bid details
export const getBidDetailsById = (id: number): BidDetails | undefined => {
  return mockBidDetailsData.find(bid => bid.id === id);
};

export const getBidDetailsByCompany = (companyName: string): BidDetails | undefined => {
  return mockBidDetailsData.find(bid => bid.companyName.toLowerCase().includes(companyName.toLowerCase()));
};

export const getAllBidDetails = (): BidDetails[] => {
  return mockBidDetailsData;
};

export const getBidDetailsByExchange = (exchange: "BSE" | "NSE" | "Combined"): BidDetails[] => {
  return mockBidDetailsData.filter(bid => bid.exchange === exchange);
};