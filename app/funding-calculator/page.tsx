"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatIndianCurrency } from "@/lib/utils"
import { Minus, Plus, Trash2, RefreshCw, Calculator } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock IPO data with more details
const availableIPOs = [
  {
    id: 1,
    name: "TechSoft India Ltd",
    price: 1185,
    lotSize: 12,
    gmp: 250,
    gmpPercentage: 21.1,
    subscriptionRate: 4.25,
    type: "Mainboard",
    status: "Current",
    hasShareholderQuota: true,
    hasEmployeeQuota: true,
    categoryDetails: {
      retail: { lotSize: 1, applicationValue: 14220, maxApplications: 1, subscriptionRate: 3.2 },
      shareholder: { lotSize: 1, applicationValue: 14220, maxApplications: 1, subscriptionRate: 2.1, discount: 50 },
      employee: { lotSize: 1, applicationValue: 14220, maxApplications: 1, subscriptionRate: 1.5, discount: 100 },
      shni: { lotSize: 14, applicationValue: 199080, maxApplications: 5, subscriptionRate: 5.8 },
      bhni: { lotSize: 70, applicationValue: 995400, maxApplications: 10, subscriptionRate: 7.2 },
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
    type: "Mainboard",
    status: "Current",
    hasShareholderQuota: true,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: { lotSize: 1, applicationValue: 13500, maxApplications: 1, subscriptionRate: 2.1 },
      shareholder: { lotSize: 1, applicationValue: 13500, maxApplications: 1, subscriptionRate: 1.8 },
      employee: { lotSize: 1, applicationValue: 13500, maxApplications: 1, subscriptionRate: 1.2 },
      shni: { lotSize: 15, applicationValue: 202500, maxApplications: 5, subscriptionRate: 3.5 },
      bhni: { lotSize: 75, applicationValue: 1012500, maxApplications: 10, subscriptionRate: 4.2 },
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
    type: "Mainboard",
    status: "Current",
    hasShareholderQuota: false,
    hasEmployeeQuota: true,
    categoryDetails: {
      retail: { lotSize: 1, applicationValue: 11300, maxApplications: 1, subscriptionRate: 5.2 },
      shareholder: { lotSize: 1, applicationValue: 11300, maxApplications: 1, subscriptionRate: 3.8 },
      employee: { lotSize: 1, applicationValue: 11300, maxApplications: 1, subscriptionRate: 2.5, discount: 75 },
      shni: { lotSize: 18, applicationValue: 203400, maxApplications: 5, subscriptionRate: 7.8 },
      bhni: { lotSize: 90, applicationValue: 1017000, maxApplications: 10, subscriptionRate: 9.2 },
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
    type: "Mainboard",
    status: "Upcoming",
    hasShareholderQuota: false,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: { lotSize: 1, applicationValue: 14250, maxApplications: 1, subscriptionRate: null },
      shareholder: { lotSize: 1, applicationValue: 14250, maxApplications: 1, subscriptionRate: null },
      employee: { lotSize: 1, applicationValue: 14250, maxApplications: 1, subscriptionRate: null },
      shni: { lotSize: 14, applicationValue: 199500, maxApplications: 5, subscriptionRate: null },
      bhni: { lotSize: 70, applicationValue: 997500, maxApplications: 10, subscriptionRate: null },
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
    type: "Mainboard",
    status: "Upcoming",
    hasShareholderQuota: false,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: { lotSize: 1, applicationValue: 13600, maxApplications: 1, subscriptionRate: null },
      shareholder: { lotSize: 1, applicationValue: 13600, maxApplications: 1, subscriptionRate: null },
      employee: { lotSize: 1, applicationValue: 13600, maxApplications: 1, subscriptionRate: null },
      shni: { lotSize: 15, applicationValue: 204000, maxApplications: 5, subscriptionRate: null },
      bhni: { lotSize: 75, applicationValue: 1020000, maxApplications: 10, subscriptionRate: null },
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
    type: "SME",
    status: "Current",
    hasShareholderQuota: true,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: { lotSize: 1, applicationValue: 12000, maxApplications: 1, subscriptionRate: 7.2 },
      shareholder: { lotSize: 1, applicationValue: 12000, maxApplications: 1, subscriptionRate: 5.1 },
      employee: { lotSize: 1, applicationValue: 12000, maxApplications: 1, subscriptionRate: 3.5 },
      shni: { lotSize: 16, applicationValue: 192000, maxApplications: 5, subscriptionRate: 9.8 },
      bhni: { lotSize: 80, applicationValue: 960000, maxApplications: 10, subscriptionRate: 12.4 },
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
    type: "SME",
    status: "Current",
    hasShareholderQuota: false,
    hasEmployeeQuota: true,
    categoryDetails: {
      retail: { lotSize: 1, applicationValue: 12400, maxApplications: 1, subscriptionRate: 10.2 },
      shareholder: { lotSize: 1, applicationValue: 12400, maxApplications: 1, subscriptionRate: 8.1 },
      employee: { lotSize: 1, applicationValue: 12400, maxApplications: 1, subscriptionRate: 6.5 },
      shni: { lotSize: 16, applicationValue: 198400, maxApplications: 5, subscriptionRate: 14.8 },
      bhni: { lotSize: 80, applicationValue: 992000, maxApplications: 10, subscriptionRate: 18.4 },
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
    type: "SME",
    status: "Upcoming",
    hasShareholderQuota: false,
    hasEmployeeQuota: false,
    categoryDetails: {
      retail: { lotSize: 1, applicationValue: 13500, maxApplications: 1, subscriptionRate: null },
      shareholder: { lotSize: 1, applicationValue: 13500, maxApplications: 1, subscriptionRate: null },
      employee: { lotSize: 1, applicationValue: 13500, maxApplications: 1, subscriptionRate: null },
      shni: { lotSize: 15, applicationValue: 202500, maxApplications: 5, subscriptionRate: null },
      bhni: { lotSize: 75, applicationValue: 1012500, maxApplications: 10, subscriptionRate: null },
    },
  },
]

// Categories for IPO application
const categories = [
  { id: "retail", name: "Retail" },
  { id: "shni", name: "SHNI" },
  { id: "bhni", name: "BHNI" },
  { id: "shareholder", name: "Shareholder" },
  { id: "employee", name: "Employee" },
]

interface SelectedIPO {
  id: number
  name: string
  price: number
  lotSize: number
  gmp: number
  gmpPercentage: number
  subscriptionRate: number | null
  type: string
  status: string
  hasShareholderQuota: boolean
  hasEmployeeQuota: boolean
  categoryDetails: {
    [key: string]: {
      lotSize: number
      applicationValue: number
      maxApplications: number
      subscriptionRate: number | null
      discount?: number
    }
  }
  applications: {
    [key: string]: number // category: applications
  }
}

interface CalculationResult {
  totalInvestment: number
  interestCost: number
  totalCost: number
  returnedMoney: number
  totalLotsApplied: number
  sharesApplied: {
    [key: string]: number // category: shares
  }
  lotsApplied: {
    [key: string]: number // category: lots
  }
  expectedLotsAllocation: {
    [key: string]: number // category: expected lots
  }
  maxSharesAllotment: {
    [key: string]: number // category: max shares
  }
}

export default function FundingCalculator() {
  const [interestRate, setInterestRate] = useState<number>(10)
  const [loanPeriod, setLoanPeriod] = useState<number>(7)
  const [ipoApplications, setIpoApplications] = useState<{ [key: number]: { [category: string]: number } }>({})
  const [calculationResults, setCalculationResults] = useState<{ [key: number]: CalculationResult }>({})
  const [overallSummary, setOverallSummary] = useState<{
    totalInvestment: number
    totalInterestCost: number
    totalReturnedMoney: number
    totalCost: number
    totalLotsApplied: number
  } | null>(null)
  const [selectedIPOIds, setSelectedIPOIds] = useState<number[]>([])
  const [ipoTypeFilter, setIpoTypeFilter] = useState<string>("Both")
  const [ipoStatusFilter, setIpoStatusFilter] = useState<string>("Both")
  const [filteredIPOs, setFilteredIPOs] = useState<typeof availableIPOs>(availableIPOs)
  const [selectAll, setSelectAll] = useState<boolean>(false)

  // Effect to filter IPOs based on type and status
  useEffect(() => {
    let filtered = [...availableIPOs]

    if (ipoTypeFilter !== "Both") {
      filtered = filtered.filter((ipo) => ipo.type === ipoTypeFilter)
    }

    if (ipoStatusFilter !== "Both") {
      filtered = filtered.filter((ipo) => ipo.status === ipoStatusFilter)
    }

    setFilteredIPOs(filtered)

    // Reset selectAll when filters change
    setSelectAll(false)
  }, [ipoTypeFilter, ipoStatusFilter])

  // Handle select all toggle
  useEffect(() => {
    if (selectAll) {
      setSelectedIPOIds(filteredIPOs.map((ipo) => ipo.id))
    } else if (selectedIPOIds.length === filteredIPOs.length) {
      // Only clear if all were selected (to avoid clearing when filters change)
      setSelectedIPOIds([])
    }
  }, [selectAll, filteredIPOs])

  // Check if all filtered IPOs are selected
  useEffect(() => {
    if (filteredIPOs.length > 0 && selectedIPOIds.length === filteredIPOs.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }, [selectedIPOIds, filteredIPOs])

  // Initialize applications for a new IPO if not already present
  const ensureIpoApplicationsInitialized = (ipoId: number) => {
    if (!ipoApplications[ipoId]) {
      setIpoApplications(prev => ({
        ...prev,
        [ipoId]: {
          retail: 0,
          shni: 0,
          bhni: 0,
          shareholder: 0,
          employee: 0,
        }
      }));
    }
  };

  // Clear applications for a specific IPO
  const clearIpoApplications = (ipoId: number) => {
    setIpoApplications(prev => ({
      ...prev,
      [ipoId]: {
        retail: 0,
        shni: 0,
        bhni: 0,
        shareholder: 0,
        employee: 0,
      }
    }));

    // If this IPO has calculation results, remove them and update summary
    if (calculationResults[ipoId]) {
      const newResults = { ...calculationResults };
      delete newResults[ipoId];
      setCalculationResults(newResults);
      calculateOverallSummary(newResults);
    }
  };

  // Update the number of applications for a category in an IPO
  const updateApplications = (ipoId: number, category: string, applications: number) => {
    ensureIpoApplicationsInitialized(ipoId);
    
    setIpoApplications(prev => ({
      ...prev,
      [ipoId]: {
        ...prev[ipoId],
        [category]: applications
      }
    }));
  }

  // Calculate lots applied based on applications for each category
  const calculateLotsForCategory = (ipo: typeof availableIPOs[0], category: string): number => {
    const applications = ipoApplications[ipo.id]?.[category] || 0;
    const categoryDetail = ipo.categoryDetails[category as keyof typeof ipo.categoryDetails];
    return applications * categoryDetail.lotSize;
  }

  // Calculate results for all selected IPOs
  const calculateResults = () => {
    const results: { [key: number]: CalculationResult } = {}

    // Only calculate for selected IPOs
    selectedIPOIds.forEach((ipoId) => {
      const ipo = availableIPOs.find(i => i.id === ipoId);
      if (!ipo) return;
      
      ensureIpoApplicationsInitialized(ipoId);
      const applications = ipoApplications[ipoId];

      // Calculate total lots and investment for this IPO across all categories
      let totalShares = 0;
      let totalLotsApplied = 0;
      const lotsApplied: { [key: string]: number } = {};
      const sharesApplied: { [key: string]: number } = {};
      const expectedLotsAllocation: { [key: string]: number } = {};
      const maxSharesAllotment: { [key: string]: number } = {};
      let totalInvestment = 0;
      let returnedMoney = 0;

      Object.keys(applications).forEach((category) => {
        // Skip categories that don't apply (shareholder/employee)
        if (
          (category === "shareholder" && !ipo.hasShareholderQuota) ||
          (category === "employee" && !ipo.hasEmployeeQuota)
        ) {
          return;
        }

        const lots = calculateLotsForCategory(ipo, category);
        lotsApplied[category] = lots;
        totalLotsApplied += lots;

        const shares = lots * ipo.lotSize;
        sharesApplied[category] = shares;
        totalShares += shares;

        const investment = ipo.price * shares;
        totalInvestment += investment;

        // Calculate expected lots allocation based on subscription rate
        const subscriptionRate = ipo.categoryDetails[category as keyof typeof ipo.categoryDetails].subscriptionRate;
        if (subscriptionRate && subscriptionRate > 0) {
          expectedLotsAllocation[category] = Math.floor(lots / subscriptionRate);

          // Calculate max shares allotment
          maxSharesAllotment[category] = expectedLotsAllocation[category] * ipo.lotSize;

          // Calculate returned money
          const expectedInvestment = ipo.price * maxSharesAllotment[category];
          returnedMoney += investment - expectedInvestment;
        } else {
          expectedLotsAllocation[category] = lots;
          maxSharesAllotment[category] = shares;
        }
      });

      // Calculate interest cost
      const dailyInterestRate = interestRate / 365 / 100;
      const interestCost = totalInvestment * dailyInterestRate * loanPeriod;

      // Calculate total cost
      const totalCost = totalInvestment + interestCost - returnedMoney;

      results[ipoId] = {
        totalInvestment,
        interestCost,
        totalCost,
        returnedMoney,
        totalLotsApplied,
        sharesApplied,
        lotsApplied,
        expectedLotsAllocation,
        maxSharesAllotment,
      };
    });

    setCalculationResults(results);
    calculateOverallSummary(results);
  }

  // Calculate overall summary
  const calculateOverallSummary = (results: { [key: number]: CalculationResult }) => {
    const totalInvestment = Object.values(results).reduce((sum, result) => sum + result.totalInvestment, 0)
    const totalInterestCost = Object.values(results).reduce((sum, result) => sum + result.interestCost, 0)
    const totalReturnedMoney = Object.values(results).reduce((sum, result) => sum + result.returnedMoney, 0)
    const totalCost = totalInvestment + totalInterestCost - totalReturnedMoney
    const totalLotsApplied = Object.values(results).reduce((sum, result) => sum + result.totalLotsApplied, 0)

    setOverallSummary({
      totalInvestment,
      totalInterestCost,
      totalReturnedMoney,
      totalCost,
      totalLotsApplied,
    })
  }

  // Render category input component
  const renderCategoryInput = (ipo: typeof availableIPOs[0], category: string, label: string, isSelected: boolean) => {
    // Skip categories that don't apply (shareholder/employee)
    if (
      (category === "shareholder" && !ipo.hasShareholderQuota) ||
      (category === "employee" && !ipo.hasEmployeeQuota)
    ) {
      return null
    }

    // Ensure applications are initialized
    ensureIpoApplicationsInitialized(ipo.id);
    
    // Styling for all category inputs is now consistent
    let containerClassName = "category-input space-y-2 border rounded-md p-2"
    if (!isSelected) {
      containerClassName += " disabled opacity-60"
    }

    const typedCategory = category as keyof typeof ipo.categoryDetails;
    const categoryDetails = ipo.categoryDetails[typedCategory];
    
    // Check if discount property exists
    const hasDiscount = (category === "shareholder" || category === "employee") && 
                        'discount' in categoryDetails && 
                        categoryDetails.discount !== undefined;

    return (
      <div className={containerClassName}>
        <Label htmlFor={`${ipo.id}-${category}`} className="text-sm flex justify-between">
          <span>{label}</span>
          {hasDiscount && (
            <Badge variant="outline" className="text-xs">
              Discount: {categoryDetails.discount}
            </Badge>
          )}
        </Label>
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-r-none"
            onClick={() => {
              const currentValue = ipoApplications[ipo.id]?.[category] || 0
              if (currentValue > 0) {
                updateApplications(ipo.id, category, currentValue - 1)
              }
            }}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            id={`${ipo.id}-${category}`}
            type="number"
            className="h-7 rounded-none text-center text-xs"
            value={ipoApplications[ipo.id]?.[category] || 0}
            onChange={(e) => updateApplications(ipo.id, category, Number.parseInt(e.target.value) || 0)}
            min={0}
            max={ipo.categoryDetails[typedCategory].maxApplications}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-l-none"
            onClick={() => {
              const currentValue = ipoApplications[ipo.id]?.[category] || 0
              if (currentValue < ipo.categoryDetails[typedCategory].maxApplications) {
                updateApplications(ipo.id, category, currentValue + 1)
              }
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
          <div>Lots: {isSelected ? calculateLotsForCategory(ipo, category) : 0}</div>
          <div>
            Value:{" "}
            {formatIndianCurrency(
              isSelected ? calculateLotsForCategory(ipo, category) * ipo.lotSize * ipo.price : 0
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">IPO Funding Calculator</h1>
        <p className="text-muted-foreground">
          Calculate the capital required for applying to IPOs and estimate potential costs and gains
        </p>
      </div>

      {/* Input Form */}
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="bg-primary/5">
          <CardTitle>Loan Parameters</CardTitle>
          <CardDescription>Set the interest rate and loan period for your IPO funding</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number.parseFloat(e.target.value) || 0)}
                min={0}
                step={0.1}
                className="focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanPeriod">Loan Period (Days)</Label>
              <Input
                id="loanPeriod"
                type="number"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(Number.parseInt(e.target.value) || 0)}
                min={1}
                className="focus-visible:ring-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IPO Selection and Category Input */}
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="bg-primary/5">
          <CardTitle>IPO Selection</CardTitle>
          <CardDescription>Select IPOs and specify the number of applications for each category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* IPO Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>IPO Type</Label>
              <RadioGroup value={ipoTypeFilter} onValueChange={setIpoTypeFilter} className="flex flex-row space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Both" id="type-both" />
                  <Label htmlFor="type-both" className="cursor-pointer">
                    Both
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mainboard" id="type-mainboard" />
                  <Label htmlFor="type-mainboard" className="cursor-pointer">
                    Mainboard
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="SME" id="type-sme" />
                  <Label htmlFor="type-sme" className="cursor-pointer">
                    SME
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>IPO Status</Label>
              <RadioGroup
                value={ipoStatusFilter}
                onValueChange={setIpoStatusFilter}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Both" id="status-both" />
                  <Label htmlFor="status-both" className="cursor-pointer">
                    Both
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Current" id="status-current" />
                  <Label htmlFor="status-current" className="cursor-pointer">
                    Current
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Upcoming" id="status-upcoming" />
                  <Label htmlFor="status-upcoming" className="cursor-pointer">
                    Upcoming
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* IPO List with Integrated Category Inputs */}
          <div className="border rounded-md p-4 border-border/40">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Available IPOs</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="select-all" checked={selectAll} onCheckedChange={(checked) => setSelectAll(!!checked)} />
                  <Label htmlFor="select-all" className="text-sm cursor-pointer">
                    Select All
                  </Label>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Clear all applications
                    setIpoApplications({});
                    setCalculationResults({});
                    setOverallSummary(null);
                  }}
                  className="gap-1 text-xs h-8"
                  disabled={Object.keys(ipoApplications).length === 0}
                >
                  <RefreshCw className="h-3 w-3 mr-1" /> Reset All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredIPOs.map((ipo) => {
                const isSelected = selectedIPOIds.includes(ipo.id);
                
                return (
                  <div 
                    key={ipo.id} 
                    className={`ipo-card border rounded-md p-4 bg-card ${isSelected ? 'selected' : ''}`}
                  >
                    {/* IPO Details Section */}
                    <div className="flex items-start space-x-3 mb-4">
                      <Checkbox
                        id={`ipo-${ipo.id}`}
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedIPOIds([...selectedIPOIds, ipo.id])
                          } else {
                            setSelectedIPOIds(selectedIPOIds.filter((id) => id !== ipo.id))
                          }
                        }}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <label htmlFor={`ipo-${ipo.id}`} className="text-sm font-medium leading-none cursor-pointer">
                            {ipo.name}
                          </label>
                          <Badge variant="outline" className="text-xs">
                            {ipo.type}
                          </Badge>
                          <Badge variant={ipo.status === "Current" ? "default" : "secondary"} className="text-xs">
                            {ipo.status}
                          </Badge>
                          {ipo.hasShareholderQuota && (
                            <Badge variant="outline" className="text-xs bg-primary/20">
                              SH Quota
                            </Badge>
                          )}
                          {ipo.hasEmployeeQuota && (
                            <Badge variant="outline" className="text-xs bg-secondary/20">
                              Emp Quota
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 mt-2 text-xs text-muted-foreground">
                          <div className="flex flex-wrap gap-x-4">
                            <div>Price: {formatIndianCurrency(ipo.price)}/share</div>
                            <div>Lot Size: {ipo.lotSize} shares</div>
                            <div>Price per Lot: {formatIndianCurrency(ipo.price * ipo.lotSize)}</div>
                            <div>
                              GMP: +{ipo.gmp} ({ipo.gmpPercentage}%)
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-x-4">
                            {ipo.subscriptionRate && <div>Overall: {ipo.subscriptionRate}x</div>}
                            {ipo.categoryDetails.retail.subscriptionRate && (
                              <div>Retail: {ipo.categoryDetails.retail.subscriptionRate}x</div>
                            )}
                            {ipo.categoryDetails.shni.subscriptionRate && (
                              <div>SHNI: {ipo.categoryDetails.shni.subscriptionRate}x</div>
                            )}
                            {ipo.categoryDetails.bhni.subscriptionRate && (
                              <div>BHNI: {ipo.categoryDetails.bhni.subscriptionRate}x</div>
                            )}
                            {ipo.hasShareholderQuota && ipo.categoryDetails.shareholder.subscriptionRate && (
                              <div>SH: {ipo.categoryDetails.shareholder.subscriptionRate}x</div>
                            )}
                            {ipo.hasEmployeeQuota && ipo.categoryDetails.employee.subscriptionRate && (
                              <div>Emp: {ipo.categoryDetails.employee.subscriptionRate}x</div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Clear Input Button - Always visible */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => clearIpoApplications(ipo.id)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        title="Clear all inputs"
                        disabled={!Object.values(ipoApplications[ipo.id] || {}).some(value => value > 0)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Category Input Section */}
                    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3`}>
                      {renderCategoryInput(ipo, "retail", "Retail", isSelected)}
                      {renderCategoryInput(ipo, "shni", "SHNI", isSelected)}
                      {renderCategoryInput(ipo, "bhni", "BHNI", isSelected)}
                      {renderCategoryInput(ipo, "shareholder", "Shareholder", isSelected)}
                      {renderCategoryInput(ipo, "employee", "Employee", isSelected)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4 bg-muted/30">
          <div></div> {/* Empty div for spacing */}
          <Button 
            onClick={calculateResults} 
            disabled={selectedIPOIds.length === 0}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Calculator className="h-4 w-4" /> Calculate
          </Button>
        </CardFooter>
      </Card>

      {/* Results */}
      {overallSummary && (
        <Card className="border border-border/40 shadow-sm">
          <CardHeader className="bg-primary/5">
            <CardTitle>Calculation Results</CardTitle>
            <CardDescription>Detailed breakdown of your IPO applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            {/* Overall Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Overall Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{formatIndianCurrency(overallSummary.totalInvestment)}</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Interest Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-secondary">{formatIndianCurrency(overallSummary.totalInterestCost)}</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Returned Money</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{formatIndianCurrency(overallSummary.totalReturnedMoney)}</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-secondary">{formatIndianCurrency(overallSummary.totalCost)}</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Lots Applied</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{overallSummary.totalLotsApplied}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* IPO-wise Results */}
            {Object.entries(calculationResults).map(([ipoId, result]) => {
              const ipo = availableIPOs.find((i) => i.id === Number.parseInt(ipoId))
              if (!ipo) return null

              return (
                <div key={ipoId} className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">{ipo.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Card className="border border-border/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Investment Amount</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold text-primary">{formatIndianCurrency(result.totalInvestment)}</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-border/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Interest Cost</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold text-secondary">{formatIndianCurrency(result.interestCost)}</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-border/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Returned Money</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold text-primary">{formatIndianCurrency(result.returnedMoney)}</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-border/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Lots Applied</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold text-primary">{result.totalLotsApplied}</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-border/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Net Cost</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold text-secondary">{formatIndianCurrency(result.totalCost)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="overflow-x-auto">
                    <Table className="border p-3 shadow-hard">
                      <TableHeader className="bg-primary/5">
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Applications</TableHead>
                          <TableHead>Lots Applied</TableHead>
                          <TableHead>Shares Applied</TableHead>
                          <TableHead>Investment</TableHead>
                          <TableHead>Expected Lots Allocation</TableHead>
                          <TableHead>Max Shares Allotment</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.map((category) => {
                          // Skip categories that don't apply (shareholder/employee)
                          if (
                            (category.id === "shareholder" && !ipo.hasShareholderQuota) ||
                            (category.id === "employee" && !ipo.hasEmployeeQuota)
                          ) {
                            return null
                          }

                          return (
                            <TableRow key={category.id} className="hover:bg-muted/20">
                              <TableCell className="font-medium">{category.name}</TableCell>
                              <TableCell>{ipoApplications[ipo.id]?.[category.id] || 0}</TableCell>
                              <TableCell>{result.lotsApplied[category.id] || 0}</TableCell>
                              <TableCell>{result.sharesApplied[category.id] || 0}</TableCell>
                              <TableCell className="text-primary">
                                {formatIndianCurrency((result.sharesApplied[category.id] || 0) * ipo.price)}
                              </TableCell>
                              <TableCell>{result.expectedLotsAllocation[category.id] || 0}</TableCell>
                              <TableCell>{result.maxSharesAllotment[category.id] || 0}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

