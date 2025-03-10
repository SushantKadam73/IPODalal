"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatIndianCurrency } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"
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
  const [selectedIPOs, setSelectedIPOs] = useState<SelectedIPO[]>([])
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

  // Effect to update selected IPOs when selectedIPOIds changes
  useEffect(() => {
    const newSelectedIPOs = selectedIPOIds
      .map((id) => {
        const ipo = availableIPOs.find((i) => i.id === id)
        if (!ipo) return null

        // Check if this IPO is already in the selectedIPOs array
        const existingIPO = selectedIPOs.find((i) => i.id === id)

        // If it exists, keep its applications data
        if (existingIPO) {
          return existingIPO
        }

        // Otherwise create a new entry with empty applications
        return {
          id: ipo.id,
          name: ipo.name,
          price: ipo.price,
          lotSize: ipo.lotSize,
          gmp: ipo.gmp,
          gmpPercentage: ipo.gmpPercentage,
          subscriptionRate: ipo.subscriptionRate,
          type: ipo.type,
          status: ipo.status,
          hasShareholderQuota: ipo.hasShareholderQuota,
          hasEmployeeQuota: ipo.hasEmployeeQuota,
          categoryDetails: ipo.categoryDetails,
          applications: {
            retail: 0,
            shni: 0,
            bhni: 0,
            shareholder: 0,
            employee: 0,
          },
        }
      })
      .filter(Boolean) as SelectedIPO[]

    setSelectedIPOs(newSelectedIPOs)
  }, [selectedIPOIds])

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

  // Remove an IPO from the selection
  const removeIPO = (ipoId: number) => {
    setSelectedIPOIds(selectedIPOIds.filter((id) => id !== ipoId))

    // Remove calculation results for this IPO
    const newResults = { ...calculationResults }
    delete newResults[ipoId]
    setCalculationResults(newResults)

    // Recalculate overall summary
    calculateOverallSummary(newResults)
  }

  // Update the number of applications for a category in an IPO
  const updateApplications = (ipoId: number, category: string, applications: number) => {
    setSelectedIPOs(
      selectedIPOs.map((ipo) => {
        if (ipo.id === ipoId) {
          return {
            ...ipo,
            applications: {
              ...ipo.applications,
              [category]: applications,
            },
          }
        }
        return ipo
      }),
    )
  }

  // Calculate lots applied based on applications for each category
  const calculateLotsForCategory = (ipo: SelectedIPO, category: string): number => {
    const applications = ipo.applications[category] || 0
    const categoryDetail = ipo.categoryDetails[category]
    return applications * categoryDetail.lotSize
  }

  // Calculate results for all selected IPOs
  const calculateResults = () => {
    const results: { [key: number]: CalculationResult } = {}

    selectedIPOs.forEach((ipo) => {
      // Calculate total lots and investment for this IPO across all categories
      let totalShares = 0
      let totalLotsApplied = 0
      const lotsApplied: { [key: string]: number } = {}
      const sharesApplied: { [key: string]: number } = {}
      const expectedLotsAllocation: { [key: string]: number } = {}
      const maxSharesAllotment: { [key: string]: number } = {}
      let totalInvestment = 0
      let returnedMoney = 0

      Object.keys(ipo.applications).forEach((category) => {
        // Skip categories that don't apply (shareholder/employee)
        if (
          (category === "shareholder" && !ipo.hasShareholderQuota) ||
          (category === "employee" && !ipo.hasEmployeeQuota)
        ) {
          return
        }

        const lots = calculateLotsForCategory(ipo, category)
        lotsApplied[category] = lots
        totalLotsApplied += lots

        const shares = lots * ipo.lotSize
        sharesApplied[category] = shares
        totalShares += shares

        const investment = ipo.price * shares
        totalInvestment += investment

        // Calculate expected lots allocation based on subscription rate
        const subscriptionRate = ipo.categoryDetails[category].subscriptionRate
        if (subscriptionRate && subscriptionRate > 0) {
          expectedLotsAllocation[category] = Math.floor(lots / subscriptionRate)

          // Calculate max shares allotment
          maxSharesAllotment[category] = expectedLotsAllocation[category] * ipo.lotSize

          // Calculate returned money
          const expectedInvestment = ipo.price * maxSharesAllotment[category]
          returnedMoney += investment - expectedInvestment
        } else {
          expectedLotsAllocation[category] = lots
          maxSharesAllotment[category] = shares
        }
      })

      // Calculate interest cost
      const dailyInterestRate = interestRate / 365 / 100
      const interestCost = totalInvestment * dailyInterestRate * loanPeriod

      // Calculate total cost
      const totalCost = totalInvestment + interestCost - returnedMoney

      results[ipo.id] = {
        totalInvestment,
        interestCost,
        totalCost,
        returnedMoney,
        totalLotsApplied,
        sharesApplied,
        lotsApplied,
        expectedLotsAllocation,
        maxSharesAllotment,
      }
    })

    setCalculationResults(results)
    calculateOverallSummary(results)
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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">IPO Funding Calculator</h1>
        <p className="text-muted-foreground">
          Calculate the capital required for applying to IPOs and estimate potential costs and gains
        </p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Parameters</CardTitle>
          <CardDescription>Set the interest rate and loan period for your IPO funding</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
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
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IPO Selection */}
      <Card>
        <CardHeader>
          <CardTitle>IPO Selection</CardTitle>
          <CardDescription>Select IPOs and specify the number of applications for each category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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

          {/* IPO List */}
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Available IPOs</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="select-all" checked={selectAll} onCheckedChange={(checked) => setSelectAll(!!checked)} />
                <Label htmlFor="select-all" className="text-sm cursor-pointer">
                  Select All
                </Label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {filteredIPOs.map((ipo) => (
                <div key={ipo.id} className="flex items-start space-x-3 p-3 border rounded-md bg-card">
                  <Checkbox
                    id={`ipo-${ipo.id}`}
                    checked={selectedIPOIds.includes(ipo.id)}
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
                </div>
              ))}
            </div>
          </div>

          {selectedIPOs.length > 0 && (
            <div className="space-y-6">
              {selectedIPOs.map((ipo) => (
                <Card key={ipo.id} className="border border-secondary">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{ipo.name}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => removeIPO(ipo.id)} className="text-destructive">
                        Remove
                      </Button>
                    </div>
                    <CardDescription>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">{ipo.type}</Badge>
                        <Badge variant={ipo.status === "Current" ? "default" : "secondary"}>{ipo.status}</Badge>
                        {ipo.hasShareholderQuota && (
                          <Badge variant="outline" className="bg-primary/20">
                            SH Quota
                          </Badge>
                        )}
                        {ipo.hasEmployeeQuota && (
                          <Badge variant="outline" className="bg-secondary/20">
                            Emp Quota
                          </Badge>
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {/* Always show Retail category */}
                      <div className="space-y-2 border rounded-md p-2">
                        <Label htmlFor={`${ipo.id}-retail`} className="text-sm">
                          Retail
                        </Label>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-r-none"
                            onClick={() => {
                              const currentValue = ipo.applications.retail || 0
                              if (currentValue > 0) {
                                updateApplications(ipo.id, "retail", currentValue - 1)
                              }
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            id={`${ipo.id}-retail`}
                            type="number"
                            className="h-7 rounded-none text-center text-xs"
                            value={ipo.applications.retail || 0}
                            onChange={(e) => updateApplications(ipo.id, "retail", Number.parseInt(e.target.value) || 0)}
                            min={0}
                            max={ipo.categoryDetails.retail.maxApplications}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-l-none"
                            onClick={() => {
                              const currentValue = ipo.applications.retail || 0
                              if (currentValue < ipo.categoryDetails.retail.maxApplications) {
                                updateApplications(ipo.id, "retail", currentValue + 1)
                              }
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                          <div>Lots: {calculateLotsForCategory(ipo, "retail")}</div>
                          <div>
                            Value:{" "}
                            {formatIndianCurrency(calculateLotsForCategory(ipo, "retail") * ipo.lotSize * ipo.price)}
                          </div>
                        </div>
                      </div>

                      {/* SHNI category */}
                      <div className="space-y-2 border rounded-md p-2">
                        <Label htmlFor={`${ipo.id}-shni`} className="text-sm">
                          SHNI
                        </Label>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-r-none"
                            onClick={() => {
                              const currentValue = ipo.applications.shni || 0
                              if (currentValue > 0) {
                                updateApplications(ipo.id, "shni", currentValue - 1)
                              }
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            id={`${ipo.id}-shni`}
                            type="number"
                            className="h-7 rounded-none text-center text-xs"
                            value={ipo.applications.shni || 0}
                            onChange={(e) => updateApplications(ipo.id, "shni", Number.parseInt(e.target.value) || 0)}
                            min={0}
                            max={ipo.categoryDetails.shni.maxApplications}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-l-none"
                            onClick={() => {
                              const currentValue = ipo.applications.shni || 0
                              if (currentValue < ipo.categoryDetails.shni.maxApplications) {
                                updateApplications(ipo.id, "shni", currentValue + 1)
                              }
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                          <div>Lots: {calculateLotsForCategory(ipo, "shni")}</div>
                          <div>
                            Value:{" "}
                            {formatIndianCurrency(calculateLotsForCategory(ipo, "shni") * ipo.lotSize * ipo.price)}
                          </div>
                        </div>
                      </div>

                      {/* BHNI category */}
                      <div className="space-y-2 border rounded-md p-2">
                        <Label htmlFor={`${ipo.id}-bhni`} className="text-sm">
                          BHNI
                        </Label>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-r-none"
                            onClick={() => {
                              const currentValue = ipo.applications.bhni || 0
                              if (currentValue > 0) {
                                updateApplications(ipo.id, "bhni", currentValue - 1)
                              }
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            id={`${ipo.id}-bhni`}
                            type="number"
                            className="h-7 rounded-none text-center text-xs"
                            value={ipo.applications.bhni || 0}
                            onChange={(e) => updateApplications(ipo.id, "bhni", Number.parseInt(e.target.value) || 0)}
                            min={0}
                            max={ipo.categoryDetails.bhni.maxApplications}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-l-none"
                            onClick={() => {
                              const currentValue = ipo.applications.bhni || 0
                              if (currentValue < ipo.categoryDetails.bhni.maxApplications) {
                                updateApplications(ipo.id, "bhni", currentValue + 1)
                              }
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                          <div>Lots: {calculateLotsForCategory(ipo, "bhni")}</div>
                          <div>
                            Value:{" "}
                            {formatIndianCurrency(calculateLotsForCategory(ipo, "bhni") * ipo.lotSize * ipo.price)}
                          </div>
                        </div>
                      </div>

                      {/* Shareholder category - only if applicable */}
                      {ipo.hasShareholderQuota && (
                        <div className="space-y-2 border rounded-md p-2 border-primary/50 bg-primary/5">
                          <Label htmlFor={`${ipo.id}-shareholder`} className="text-sm flex justify-between">
                            <span>Shareholder</span>
                            {ipo.categoryDetails.shareholder.discount && (
                              <Badge variant="outline" className="text-xs">
                                Discount: {ipo.categoryDetails.shareholder.discount}
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
                                const currentValue = ipo.applications.shareholder || 0
                                if (currentValue > 0) {
                                  updateApplications(ipo.id, "shareholder", currentValue - 1)
                                }
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              id={`${ipo.id}-shareholder`}
                              type="number"
                              className="h-7 rounded-none text-center text-xs"
                              value={ipo.applications.shareholder || 0}
                              onChange={(e) =>
                                updateApplications(ipo.id, "shareholder", Number.parseInt(e.target.value) || 0)
                              }
                              min={0}
                              max={ipo.categoryDetails.shareholder.maxApplications}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-l-none"
                              onClick={() => {
                                const currentValue = ipo.applications.shareholder || 0
                                if (currentValue < ipo.categoryDetails.shareholder.maxApplications) {
                                  updateApplications(ipo.id, "shareholder", currentValue + 1)
                                }
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                            <div>Lots: {calculateLotsForCategory(ipo, "shareholder")}</div>
                            <div>
                              Value:{" "}
                              {formatIndianCurrency(
                                calculateLotsForCategory(ipo, "shareholder") * ipo.lotSize * ipo.price,
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Employee category - only if applicable */}
                      {ipo.hasEmployeeQuota && (
                        <div className="space-y-2 border rounded-md p-2 border-secondary/50 bg-secondary/5">
                          <Label htmlFor={`${ipo.id}-employee`} className="text-sm flex justify-between">
                            <span>Employee</span>
                            {ipo.categoryDetails.employee.discount && (
                              <Badge variant="outline" className="text-xs">
                                Discount: {ipo.categoryDetails.employee.discount}
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
                                const currentValue = ipo.applications.employee || 0
                                if (currentValue > 0) {
                                  updateApplications(ipo.id, "employee", currentValue - 1)
                                }
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              id={`${ipo.id}-employee`}
                              type="number"
                              className="h-7 rounded-none text-center text-xs"
                              value={ipo.applications.employee || 0}
                              onChange={(e) =>
                                updateApplications(ipo.id, "employee", Number.parseInt(e.target.value) || 0)
                              }
                              min={0}
                              max={ipo.categoryDetails.employee.maxApplications}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-l-none"
                              onClick={() => {
                                const currentValue = ipo.applications.employee || 0
                                if (currentValue < ipo.categoryDetails.employee.maxApplications) {
                                  updateApplications(ipo.id, "employee", currentValue + 1)
                                }
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                            <div>Lots: {calculateLotsForCategory(ipo, "employee")}</div>
                            <div>
                              Value:{" "}
                              {formatIndianCurrency(
                                calculateLotsForCategory(ipo, "employee") * ipo.lotSize * ipo.price,
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={calculateResults} disabled={selectedIPOs.length === 0}>
            Calculate
          </Button>
        </CardFooter>
      </Card>

      {/* Results */}
      {overallSummary && (
        <Card>
          <CardHeader>
            <CardTitle>Calculation Results</CardTitle>
            <CardDescription>Detailed breakdown of your IPO applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Overall Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Overall Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatIndianCurrency(overallSummary.totalInvestment)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Interest Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatIndianCurrency(overallSummary.totalInterestCost)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Returned Money</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatIndianCurrency(overallSummary.totalReturnedMoney)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatIndianCurrency(overallSummary.totalCost)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Lots Applied</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{overallSummary.totalLotsApplied}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* IPO-wise Results */}
            {Object.entries(calculationResults).map(([ipoId, result]) => {
              const ipo = selectedIPOs.find((i) => i.id === Number.parseInt(ipoId))
              if (!ipo) return null

              return (
                <div key={ipoId} className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">{ipo.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Investment Amount</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold">{formatIndianCurrency(result.totalInvestment)}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Interest Cost</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold">{formatIndianCurrency(result.interestCost)}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Returned Money</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold">{formatIndianCurrency(result.returnedMoney)}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Lots Applied</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold">{result.totalLotsApplied}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Net Cost</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold">{formatIndianCurrency(result.totalCost)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="overflow-x-auto">
                    <Table className="border p-3 shadow-hard">
                      <TableHeader>
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
                            <TableRow key={category.id}>
                              <TableCell>{category.name}</TableCell>
                              <TableCell>{ipo.applications[category.id] || 0}</TableCell>
                              <TableCell>{result.lotsApplied[category.id] || 0}</TableCell>
                              <TableCell>{result.sharesApplied[category.id] || 0}</TableCell>
                              <TableCell>
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

