// Mock IPO Data - Centralized Database File
// This will serve as our database substitute until we implement a real database

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