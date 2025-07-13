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
import { mockIPOData, categories as ipoCategories, type IPOData } from "@/lib/mock-data"

// Use centralized mock data
const availableIPOs = mockIPOData
const categories = ipoCategories

interface SelectedIPO extends IPOData {
  applications: {
    [key: string]: number // category: applications
  }
}

interface CalculationResult {
  totalInvestment: number
  interestCost: number
  totalCost: number
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

  // Get application limits based on IPO type and category
  const getApplicationLimits = (ipo: typeof availableIPOs[0], category: string) => {
    if (category === "shareholder" || category === "employee") {
      return { min: 0, max: 999999 }; // These can be 0 or any amount
    }

    if (ipo.type === "Mainboard") {
      switch (category) {
        case "retail":
          return { min: 0, max: 999999 };
        case "shni":
          // SHNI: minimum lot requirement to exceed ₹2L
          const shniMinLots = Math.ceil(200001 / (ipo.price * ipo.lotSize));
          return { min: 0, max: 999999, minLots: shniMinLots };
        case "bhni":
          // BHNI: minimum lot requirement to exceed ₹10L
          const bhniMinLots = Math.ceil(1000001 / (ipo.price * ipo.lotSize));
          return { min: 0, max: 999999, minLots: bhniMinLots };
        default:
          return { min: 0, max: 999999 };
      }
    } else { // SME
      switch (category) {
        case "retail":
          return { min: 0, max: 999999 };
        case "shni":
          // SME SHNI: minimum 3 lots
          return { min: 0, max: 999999, minLots: 3 };
        case "bhni":
          // SME BHNI: minimum lot requirement to exceed ₹10L
          const smeBhniMinLots = Math.ceil(1000001 / (ipo.price * ipo.lotSize));
          return { min: 0, max: 999999, minLots: smeBhniMinLots };
        default:
          return { min: 0, max: 999999 };
      }
    }
  };

  // Update the number of applications for a category in an IPO
  const updateApplications = (ipoId: number, category: string, applications: number) => {
    ensureIpoApplicationsInitialized(ipoId);
    
    const ipo = availableIPOs.find(i => i.id === ipoId);
    if (ipo) {
      const limits = getApplicationLimits(ipo, category);
      const clampedApplications = Math.max(limits.min, Math.min(limits.max, applications));
      
      setIpoApplications(prev => ({
        ...prev,
        [ipoId]: {
          ...prev[ipoId],
          [category]: clampedApplications
        }
      }));
    }
  }

  // Calculate lots applied based on applications for each category
  const calculateLotsForCategory = (ipo: typeof availableIPOs[0], category: string): number => {
    const applications = ipoApplications[ipo.id]?.[category] || 0;
    const categoryDetail = ipo.categoryDetails[category as keyof typeof ipo.categoryDetails];
    return applications * categoryDetail.lotSize;
  }

  // Validate if application meets minimum requirements for the category
  const validateApplicationRequirements = (ipo: typeof availableIPOs[0], category: string, applications: number) => {
    if (applications === 0) return true; // 0 is always valid (no application)
    
    const pricePerLot = ipo.price * ipo.lotSize;
    const totalValue = applications * pricePerLot;

    if (category === "shareholder" || category === "employee") {
      return true; // No specific value requirements
    }

    if (ipo.type === "Mainboard") {
      switch (category) {
        case "retail":
          // Retail: min 1 lot, max <₹2L
          return applications >= 1 && totalValue < 200000;
        case "shni":
          // SHNI: min >₹2L, max <₹10L
          return totalValue > 200000 && totalValue < 1000000;
        case "bhni":
          // BHNI: min >₹10L
          return totalValue > 1000000;
        default:
          return true;
      }
    } else { // SME
      switch (category) {
        case "retail":
          // SME Retail: exactly 2 lots
          return applications === 2;
        case "shni":
          // SME SHNI: min 3 lots, max <₹10L
          return applications >= 3 && totalValue < 1000000;
        case "bhni":
          // SME BHNI: min >₹10L
          return totalValue > 1000000;
        default:
          return true;
      }
    }
  };

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

      Object.keys(applications).forEach((category) => {
        // Skip categories that don't apply (shareholder/employee)
        if (
          (category === "shareholder" && !ipo.hasShareholderQuota) ||
          (category === "employee" && !ipo.hasEmployeeQuota)
        ) {
          return;
        }

        const applicationCount = applications[category];
        
        // Skip if no applications
        if (applicationCount === 0) {
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
        } else {
          expectedLotsAllocation[category] = lots;
          maxSharesAllotment[category] = shares;
        }
      });

      // Calculate interest cost
      const dailyInterestRate = interestRate / 365 / 100;
      const interestCost = totalInvestment * dailyInterestRate * loanPeriod;

      // Calculate total cost
      const totalCost = totalInvestment + interestCost;

      results[ipoId] = {
        totalInvestment,
        interestCost,
        totalCost,
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
    const totalCost = totalInvestment + totalInterestCost
    const totalLotsApplied = Object.values(results).reduce((sum, result) => sum + result.totalLotsApplied, 0)

    setOverallSummary({
      totalInvestment,
      totalInterestCost,
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
    const limits = getApplicationLimits(ipo, category);
    
    // Check if discount property exists
    const hasDiscount = (category === "shareholder" || category === "employee") && 
                        'discount' in categoryDetails && 
                        categoryDetails.discount !== undefined;

    // Get the actual application value regardless of selection state
    const applicationValue = ipoApplications[ipo.id]?.[category] || 0;
    const lots = calculateLotsForCategory(ipo, category);
    const value = lots * ipo.lotSize * ipo.price;

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
              if (currentValue > limits.min) {
                updateApplications(ipo.id, category, currentValue - 1)
              }
            }}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            id={`${ipo.id}-${category}`}
            type="number"
            className="h-7 rounded-none text-center text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={applicationValue}
            onChange={(e) => updateApplications(ipo.id, category, Number.parseInt(e.target.value) || 0)}
            min={limits.min}
            max={limits.max}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-l-none"
            onClick={() => {
              const currentValue = ipoApplications[ipo.id]?.[category] || 0
              if (currentValue < limits.max) {
                updateApplications(ipo.id, category, currentValue + 1)
              }
            }}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
          <div>Lots: {lots}</div>
          <div>
            Value: {formatIndianCurrency(value)}
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
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => {
                    if (interestRate > 0.1) {
                      setInterestRate(Number((interestRate - 0.1).toFixed(1)))
                    }
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number.parseFloat(e.target.value) || 0)}
                  min={0}
                  step={0.1}
                  className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => {
                    setInterestRate(Number((interestRate + 0.1).toFixed(1)))
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanPeriod">Loan Period (Days)</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => {
                    if (loanPeriod > 1) {
                      setLoanPeriod(loanPeriod - 1)
                    }
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="loanPeriod"
                  type="number"
                  value={loanPeriod}
                  onChange={(e) => setLoanPeriod(Number.parseInt(e.target.value) || 0)}
                  min={1}
                  className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => {
                    setLoanPeriod(loanPeriod + 1)
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <CardTitle className="text-sm">Total Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-secondary">{formatIndianCurrency(overallSummary.totalCost)}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* New Application Summary Table: Categories as rows, Companies as columns */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Application Summary</h3>
              <div className="overflow-x-auto">
                <Table className="border shadow-sm">
                  <TableHeader className="bg-primary/5">
                    <TableRow>
                      <TableHead className="font-semibold">Category</TableHead>
                      {selectedIPOIds.map(ipoId => {
                        const ipo = availableIPOs.find(i => i.id === ipoId);
                        return (
                          <TableHead key={ipoId} className="text-center font-semibold">
                            {ipo?.name}
                          </TableHead>
                        );
                      })}
                      <TableHead className="text-center font-semibold bg-primary/10">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map(category => {
                      // Check if this category is applicable for any selected IPO
                      const isApplicable = selectedIPOIds.some(ipoId => {
                        const ipo = availableIPOs.find(i => i.id === ipoId);
                        if (!ipo) return false;
                        
                        if (category.id === "shareholder" && !ipo.hasShareholderQuota) return false;
                        if (category.id === "employee" && !ipo.hasEmployeeQuota) return false;
                        
                        return true;
                      });

                      if (!isApplicable) return null;

                      let categoryTotal = 0;

                      return (
                        <TableRow key={category.id} className="hover:bg-muted/20">
                          <TableCell className="font-medium">{category.name}</TableCell>
                          {selectedIPOIds.map(ipoId => {
                            const ipo = availableIPOs.find(i => i.id === ipoId);
                            if (!ipo) return <TableCell key={ipoId}>-</TableCell>;

                            // Check if this category applies to this IPO
                            if (category.id === "shareholder" && !ipo.hasShareholderQuota) {
                              return <TableCell key={ipoId} className="text-center text-muted-foreground">N/A</TableCell>;
                            }
                            if (category.id === "employee" && !ipo.hasEmployeeQuota) {
                              return <TableCell key={ipoId} className="text-center text-muted-foreground">N/A</TableCell>;
                            }

                            const applications = ipoApplications[ipoId]?.[category.id] || 0;
                            if (applications === 0) {
                              return <TableCell key={ipoId} className="text-center text-muted-foreground">-</TableCell>;
                            }

                            const lots = calculateLotsForCategory(ipo, category.id);
                            const amount = lots * ipo.lotSize * ipo.price;
                            categoryTotal += amount;

                            return (
                              <TableCell key={ipoId} className="text-center">
                                {formatIndianCurrency(amount)}
                              </TableCell>
                            );
                          })}
                          <TableCell className="text-center font-semibold bg-primary/5">
                            {categoryTotal > 0 ? formatIndianCurrency(categoryTotal) : '-'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    
                    {/* Total Row */}
                    <TableRow className="border-t-2 bg-primary/5 font-semibold">
                      <TableCell className="font-bold">Total</TableCell>
                      {selectedIPOIds.map(ipoId => {
                        const ipo = availableIPOs.find(i => i.id === ipoId);
                        if (!ipo) return <TableCell key={ipoId}>-</TableCell>;

                        const result = calculationResults[ipoId];
                        const total = result?.totalInvestment || 0;

                        return (
                          <TableCell key={ipoId} className="text-center font-bold">
                            {total > 0 ? formatIndianCurrency(total) : '-'}
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center font-bold bg-primary/10">
                        {formatIndianCurrency(overallSummary.totalInvestment)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
