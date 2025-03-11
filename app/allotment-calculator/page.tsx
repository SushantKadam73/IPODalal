"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatIndianCurrency, formatIndianValue } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Mock IPO data with more details
const availableIPOs = [
  {
    id: 1,
    name: "TechSoft India Ltd",
    price: 1185,
    lotSize: 12,
    gmp: 250,
    gmpPercentage: 21.1,
    type: "Mainboard",
    status: "Current",
    issueSize: 1250,
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
    type: "Mainboard",
    status: "Current",
    issueSize: 850,
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
    type: "Mainboard",
    status: "Current",
    issueSize: 1500,
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
    type: "Mainboard",
    status: "Upcoming",
    issueSize: 1800,
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
    type: "Mainboard",
    status: "Upcoming",
    issueSize: 2200,
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
    type: "SME",
    status: "Current",
    issueSize: 50,
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
    type: "SME",
    status: "Current",
    issueSize: 45,
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
    type: "SME",
    status: "Upcoming",
    issueSize: 35,
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
]

// Categories for IPO application
const categories = [
  { id: "retail", name: "Retail" },
  { id: "shni", name: "SHNI" },
  { id: "bhni", name: "BHNI" },
  { id: "shareholder", name: "Shareholder" },
  { id: "employee", name: "Employee" },
]

// Allocation strategies
const allocationStrategies = [
  { id: "gmp", name: "Grey Market Premium (GMP)" },
  { id: "subscription", name: "Subscription Rate" },
  { id: "capital", name: "Capital Utilization" },
  { id: "optimize", name: "Optimize Allocation" },
]

interface SelectedIPO {
  id: number
  name: string
  price: number
  lotSize: number
  gmp: number
  gmpPercentage: number
  type: string
  status: string
  issueSize: number
  categoryDetails: {
    [key: string]: {
      lotSize: number
      applicationValue: number
      maxApplications: number
      subscriptionRate: number | null
      discount?: number
      reservedPercentage: number
    }
  }
}

interface AllocationResult {
  ipoId: number
  name: string
  type: string
  category: string
  lotsApplied: number
  lotsAllotted: number
  sharesApplied: number
  sharesAllotted: number
  investmentAmount: number
  allottedAmount: number
  returnedAmount: number
  expectedGain: number
  allotmentProbability: number
}

export default function AllotmentCalculator() {
  const [availableCapital, setAvailableCapital] = useState<number>(100000)
  const [retailAccounts, setRetailAccounts] = useState<number>(1)
  const [shareholderAccounts, setShareholderAccounts] = useState<number>(0)
  const [employeeAccounts, setEmployeeAccounts] = useState<number>(0)
  const [selectedStrategy, setSelectedStrategy] = useState<string>("gmp")
  const [ipoTypeFilter, setIpoTypeFilter] = useState<string>("Both")
  const [ipoStatusFilter, setIpoStatusFilter] = useState<string>("Both")
  const [filteredIPOs, setFilteredIPOs] = useState<typeof availableIPOs>(availableIPOs)
  const [selectedIPOIds, setSelectedIPOIds] = useState<number[]>([])
  const [selectedIPOs, setSelectedIPOs] = useState<SelectedIPO[]>([])
  const [allocationResults, setAllocationResults] = useState<AllocationResult[]>([])
  const [summaryResults, setSummaryResults] = useState<{
    totalInvestment: number
    totalAllotted: number
    totalReturned: number
    totalExpectedGain: number
    totalROI: number
  } | null>(null)

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
  }, [ipoTypeFilter, ipoStatusFilter])

  // Effect to update selected IPOs when selectedIPOIds changes
  useEffect(() => {
    const newSelectedIPOs = selectedIPOIds
      .map((id) => {
        const ipo = availableIPOs.find((i) => i.id === id)
        if (!ipo) return null
        return ipo
      })
      .filter(Boolean) as SelectedIPO[]

    setSelectedIPOs(newSelectedIPOs)
  }, [selectedIPOIds])

  // Calculate allotment probability based on subscription rate
  const calculateAllotmentProbability = (subscriptionRate: number | null, category: string): number => {
    if (!subscriptionRate || subscriptionRate <= 0) return 0

    // For retail category in over-subscribed IPOs, the probability is based on lottery system
    if (category === "retail" && subscriptionRate > 1) {
      return 1 / subscriptionRate
    }

    // For other categories or under-subscribed IPOs, full allotment is expected
    if (subscriptionRate <= 1) {
      return 1
    }

    // For NII categories in over-subscribed IPOs, proportionate allotment
    return 1 / subscriptionRate
  }

  // Calculate allocation based on GMP strategy
  const calculateGMPAllocation = () => {
    if (selectedIPOs.length === 0) return []

    // Sort IPOs by GMP percentage (highest first)
    const sortedIPOs = [...selectedIPOs].sort((a, b) => b.gmpPercentage - a.gmpPercentage)

    return calculateAllocation(sortedIPOs)
  }

  // Calculate allocation based on Subscription Rate strategy
  const calculateSubscriptionAllocation = () => {
    if (selectedIPOs.length === 0) return []

    // Sort IPOs by inverse of subscription rate (lowest subscription first for higher chance of allotment)
    const sortedIPOs = [...selectedIPOs].sort((a, b) => {
      const aAvgSub =
        Object.values(a.categoryDetails).reduce((sum, cat) => sum + (cat.subscriptionRate || 0), 0) /
        Object.keys(a.categoryDetails).length
      const bAvgSub =
        Object.values(b.categoryDetails).reduce((sum, cat) => sum + (cat.subscriptionRate || 0), 0) /
        Object.keys(b.categoryDetails).length

      return aAvgSub - bAvgSub
    })

    return calculateAllocation(sortedIPOs)
  }

  // Calculate allocation based on Capital Utilization strategy
  const calculateCapitalAllocation = () => {
    if (selectedIPOs.length === 0) return []

    // Sort IPOs by lot cost (lowest first to maximize number of applications)
    const sortedIPOs = [...selectedIPOs].sort((a, b) => a.price * a.lotSize - b.price * b.lotSize)

    return calculateAllocation(sortedIPOs)
  }

  // Calculate allocation based on Optimize strategy (combination of GMP, subscription, and capital)
  const calculateOptimizedAllocation = () => {
    if (selectedIPOs.length === 0) return []

    // Calculate a score for each IPO based on GMP, subscription rate, and lot cost
    const scoredIPOs = [...selectedIPOs]
      .map((ipo) => {
        const avgSubscription =
          Object.values(ipo.categoryDetails).reduce((sum, cat) => sum + (cat.subscriptionRate || 0), 0) /
          Object.keys(ipo.categoryDetails).length

        // Normalize values between 0 and 1
        const normalizedGMP = ipo.gmpPercentage / 100
        const normalizedSubscription = avgSubscription > 0 ? 1 / avgSubscription : 0
        const maxLotCost = Math.max(...selectedIPOs.map((i) => i.price * i.lotSize))
        const normalizedLotCost = 1 - (ipo.price * ipo.lotSize) / maxLotCost

        // Calculate weighted score (higher is better)
        const score = normalizedGMP * 0.5 + normalizedSubscription * 0.3 + normalizedLotCost * 0.2

        return { ...ipo, score }
      })
      .sort((a, b) => (b as any).score - (a as any).score)

    return calculateAllocation(scoredIPOs)
  }

  // Common allocation calculation logic
  const calculateAllocation = (prioritizedIPOs: SelectedIPO[]) => {
    let remainingCapital = availableCapital
    let remainingRetailAccounts = retailAccounts
    let remainingShareholderAccounts = shareholderAccounts
    let remainingEmployeeAccounts = employeeAccounts

    const results: AllocationResult[] = []

    // First pass: Allocate to each IPO based on priority
    for (const ipo of prioritizedIPOs) {
      // Check if we have retail accounts available
      if (remainingRetailAccounts > 0) {
        const retailDetail = ipo.categoryDetails.retail
        const retailLotCost = ipo.price * ipo.lotSize * retailDetail.lotSize

        // Check if we have enough capital for retail application
        if (retailLotCost <= remainingCapital) {
          const lotsApplied = retailDetail.lotSize
          const sharesApplied = lotsApplied * ipo.lotSize
          const investmentAmount = retailLotCost

          // Calculate allotment probability and expected allotment
          const allotmentProbability = calculateAllotmentProbability(retailDetail.subscriptionRate, "retail")
          const lotsAllotted = Math.floor(lotsApplied * allotmentProbability)
          const sharesAllotted = lotsAllotted * ipo.lotSize
          const allottedAmount = sharesAllotted * ipo.price
          const returnedAmount = investmentAmount - allottedAmount

          // Calculate expected gain based on GMP
          const expectedGain = sharesAllotted * ipo.gmp

          results.push({
            ipoId: ipo.id,
            name: ipo.name,
            type: ipo.type,
            category: "retail",
            lotsApplied,
            lotsAllotted,
            sharesApplied,
            sharesAllotted,
            investmentAmount,
            allottedAmount,
            returnedAmount,
            expectedGain,
            allotmentProbability,
          })

          remainingCapital -= investmentAmount
          remainingRetailAccounts--
        }
      }

      // Check if we have shareholder accounts available
      if (remainingShareholderAccounts > 0 && ipo.categoryDetails.shareholder) {
        const shareholderDetail = ipo.categoryDetails.shareholder
        const shareholderPrice = ipo.price - (shareholderDetail.discount || 0)
        const shareholderLotCost = shareholderPrice * ipo.lotSize * shareholderDetail.lotSize

        // Check if we have enough capital for shareholder application
        if (shareholderLotCost <= remainingCapital) {
          const lotsApplied = shareholderDetail.lotSize
          const sharesApplied = lotsApplied * ipo.lotSize
          const investmentAmount = shareholderLotCost

          // Calculate allotment probability and expected allotment
          const allotmentProbability = calculateAllotmentProbability(shareholderDetail.subscriptionRate, "shareholder")
          const lotsAllotted = Math.floor(lotsApplied * allotmentProbability)
          const sharesAllotted = lotsAllotted * ipo.lotSize
          const allottedAmount = sharesAllotted * shareholderPrice
          const returnedAmount = investmentAmount - allottedAmount

          // Calculate expected gain based on GMP plus discount
          const expectedGain = sharesAllotted * (ipo.gmp + (shareholderDetail.discount || 0))

          results.push({
            ipoId: ipo.id,
            name: ipo.name,
            type: ipo.type,
            category: "shareholder",
            lotsApplied,
            lotsAllotted,
            sharesApplied,
            sharesAllotted,
            investmentAmount,
            allottedAmount,
            returnedAmount,
            expectedGain,
            allotmentProbability,
          })

          remainingCapital -= investmentAmount
          remainingShareholderAccounts--
        }
      }

      // Check if we have employee accounts available
      if (remainingEmployeeAccounts > 0 && ipo.categoryDetails.employee) {
        const employeeDetail = ipo.categoryDetails.employee
        const employeePrice = ipo.price - (employeeDetail.discount || 0)
        const employeeLotCost = employeePrice * ipo.lotSize * employeeDetail.lotSize

        // Check if we have enough capital for employee application
        if (employeeLotCost <= remainingCapital) {
          const lotsApplied = employeeDetail.lotSize
          const sharesApplied = lotsApplied * ipo.lotSize
          const investmentAmount = employeeLotCost

          // Calculate allotment probability and expected allotment
          const allotmentProbability = calculateAllotmentProbability(employeeDetail.subscriptionRate, "employee")
          const lotsAllotted = Math.floor(lotsApplied * allotmentProbability)
          const sharesAllotted = lotsAllotted * ipo.lotSize
          const allottedAmount = sharesAllotted * employeePrice
          const returnedAmount = investmentAmount - allottedAmount

          // Calculate expected gain based on GMP plus discount
          const expectedGain = sharesAllotted * (ipo.gmp + (employeeDetail.discount || 0))

          results.push({
            ipoId: ipo.id,
            name: ipo.name,
            type: ipo.type,
            category: "employee",
            lotsApplied,
            lotsAllotted,
            sharesApplied,
            sharesAllotted,
            investmentAmount,
            allottedAmount,
            returnedAmount,
            expectedGain,
            allotmentProbability,
          })

          remainingCapital -= investmentAmount
          remainingEmployeeAccounts--
        }
      }
    }

    // Second pass: Try to allocate remaining capital to HNI categories if possible
    if (remainingCapital > 0) {
      for (const ipo of prioritizedIPOs) {
        // Try SHNI category first
        const shniDetail = ipo.categoryDetails.shni
        const shniLotCost = ipo.price * ipo.lotSize * shniDetail.lotSize

        if (shniLotCost <= remainingCapital) {
          const lotsApplied = shniDetail.lotSize
          const sharesApplied = lotsApplied * ipo.lotSize
          const investmentAmount = shniLotCost

          // Calculate allotment probability and expected allotment
          const allotmentProbability = calculateAllotmentProbability(shniDetail.subscriptionRate, "shni")
          const lotsAllotted = Math.floor(lotsApplied * allotmentProbability)
          const sharesAllotted = lotsAllotted * ipo.lotSize
          const allottedAmount = sharesAllotted * ipo.price
          const returnedAmount = investmentAmount - allottedAmount

          // Calculate expected gain based on GMP
          const expectedGain = sharesAllotted * ipo.gmp

          results.push({
            ipoId: ipo.id,
            name: ipo.name,
            type: ipo.type,
            category: "shni",
            lotsApplied,
            lotsAllotted,
            sharesApplied,
            sharesAllotted,
            investmentAmount,
            allottedAmount,
            returnedAmount,
            expectedGain,
            allotmentProbability,
          })

          remainingCapital -= investmentAmount
        }

        // If we still have capital, try BHNI category
        if (remainingCapital > 0) {
          const bhniDetail = ipo.categoryDetails.bhni
          const bhniLotCost = ipo.price * ipo.lotSize * bhniDetail.lotSize

          if (bhniLotCost <= remainingCapital) {
            const lotsApplied = bhniDetail.lotSize
            const sharesApplied = lotsApplied * ipo.lotSize
            const investmentAmount = bhniLotCost

            // Calculate allotment probability and expected allotment
            const allotmentProbability = calculateAllotmentProbability(bhniDetail.subscriptionRate, "bhni")
            const lotsAllotted = Math.floor(lotsApplied * allotmentProbability)
            const sharesAllotted = lotsAllotted * ipo.lotSize
            const allottedAmount = sharesAllotted * ipo.price
            const returnedAmount = investmentAmount - allottedAmount

            // Calculate expected gain based on GMP
            const expectedGain = sharesAllotted * ipo.gmp

            results.push({
              ipoId: ipo.id,
              name: ipo.name,
              type: ipo.type,
              category: "bhni",
              lotsApplied,
              lotsAllotted,
              sharesApplied,
              sharesAllotted,
              investmentAmount,
              allottedAmount,
              returnedAmount,
              expectedGain,
              allotmentProbability,
            })

            remainingCapital -= investmentAmount
          }
        }
      }
    }

    return results
  }

  // Calculate allocation based on selected strategy
  const calculateAllocation_strategy = () => {
    let results: AllocationResult[] = []

    switch (selectedStrategy) {
      case "gmp":
        results = calculateGMPAllocation()
        break
      case "subscription":
        results = calculateSubscriptionAllocation()
        break
      case "capital":
        results = calculateCapitalAllocation()
        break
      case "optimize":
        results = calculateOptimizedAllocation()
        break
      default:
        results = calculateGMPAllocation()
    }

    // Calculate summary statistics
    const totalInvestment = results.reduce((sum, result) => sum + result.investmentAmount, 0)
    const totalAllotted = results.reduce((sum, result) => sum + result.allottedAmount, 0)
    const totalReturned = results.reduce((sum, result) => sum + result.returnedAmount, 0)
    const totalExpectedGain = results.reduce((sum, result) => sum + result.expectedGain, 0)
    const totalROI = totalInvestment > 0 ? (totalExpectedGain / totalInvestment) * 100 : 0

    setSummaryResults({
      totalInvestment,
      totalAllotted,
      totalReturned,
      totalExpectedGain,
      totalROI,
    })

    setAllocationResults(results)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">IPO Allotment Calculator</h1>
        <p className="text-muted-foreground">
          Calculate optimal IPO allocations based on different strategies and estimate potential returns
        </p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Available Resources</CardTitle>
          <CardDescription>Enter your available capital and number of accounts for IPO applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capital">Available Capital (₹)</Label>
              <Input
                id="capital"
                type="number"
                value={availableCapital}
                onChange={(e) => setAvailableCapital(Number.parseFloat(e.target.value) || 0)}
                min={0}
                step={1000}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retailAccounts">Number of Retail Accounts</Label>
              <Input
                id="retailAccounts"
                type="number"
                value={retailAccounts}
                onChange={(e) => setRetailAccounts(Number.parseInt(e.target.value) || 0)}
                min={0}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shareholderAccounts">Number of Shareholder Accounts</Label>
              <Input
                id="shareholderAccounts"
                type="number"
                value={shareholderAccounts}
                onChange={(e) => setShareholderAccounts(Number.parseInt(e.target.value) || 0)}
                min={0}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeAccounts">Number of Employee Accounts</Label>
              <Input
                id="employeeAccounts"
                type="number"
                value={employeeAccounts}
                onChange={(e) => setEmployeeAccounts(Number.parseInt(e.target.value) || 0)}
                min={0}
                step={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allocation Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>Allocation Strategy</CardTitle>
          <CardDescription>Select a strategy for allocating your capital across IPOs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strategy">Allocation Strategy</Label>
              <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                <SelectTrigger id="strategy">
                  <SelectValue placeholder="Select Strategy" />
                </SelectTrigger>
                <SelectContent>
                  {allocationStrategies.map((strategy) => (
                    <SelectItem key={strategy.id} value={strategy.id}>
                      {strategy.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {selectedStrategy === "gmp" &&
                  "Prioritizes IPOs with higher Grey Market Premium for potentially higher returns"}
                {selectedStrategy === "subscription" &&
                  "Prioritizes IPOs with lower subscription rates for higher chances of allotment"}
                {selectedStrategy === "capital" &&
                  "Prioritizes IPOs with lower lot costs to maximize the number of applications"}
                {selectedStrategy === "optimize" &&
                  "Balances GMP, subscription rates, and capital utilization for optimal allocation"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IPO Selection */}
      <Card>
        <CardHeader>
          <CardTitle>IPO Selection</CardTitle>
          <CardDescription>Select the IPOs you want to consider for allocation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* IPO Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ipoTypeFilter">IPO Type</Label>
              <Select value={ipoTypeFilter} onValueChange={setIpoTypeFilter}>
                <SelectTrigger id="ipoTypeFilter">
                  <SelectValue placeholder="Select IPO Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Both">Both</SelectItem>
                  <SelectItem value="Mainboard">Mainboard</SelectItem>
                  <SelectItem value="SME">SME</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ipoStatusFilter">IPO Status</Label>
              <Select value={ipoStatusFilter} onValueChange={setIpoStatusFilter}>
                <SelectTrigger id="ipoStatusFilter">
                  <SelectValue placeholder="Select IPO Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Both">Both</SelectItem>
                  <SelectItem value="Current">Current IPOs</SelectItem>
                  <SelectItem value="Upcoming">Upcoming IPOs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* IPO List */}
          <div className="border rounded-md p-4">
            <h3 className="text-sm font-medium mb-3">Available IPOs</h3>
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                      <div>Price: {formatIndianCurrency(ipo.price)}/share</div>
                      <div>Lot Size: {ipo.lotSize} shares</div>
                      <div>Price per Lot: {formatIndianCurrency(ipo.price * ipo.lotSize)}</div>
                      <div>
                        GMP: +{ipo.gmp} ({ipo.gmpPercentage}%)
                      </div>
                      <div>Issue Size: {formatIndianValue(ipo.issueSize)} Cr</div>
                      <div>
                        Category Subscription:{" "}
                        {Object.entries(ipo.categoryDetails)
                          .filter(([_, details]) => details.subscriptionRate)
                          .map(([category, details]) => (
                            <span key={category} className="mr-1">
                              {category.charAt(0).toUpperCase()}: {details.subscriptionRate}x
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculateAllocation_strategy} disabled={selectedIPOs.length === 0}>
            Calculate
          </Button>
        </CardFooter>
      </Card>

      {/* Results */}
      {summaryResults && (
        <Card>
          <CardHeader>
            <CardTitle>Allocation Results</CardTitle>
            <CardDescription>
              Recommended IPO allocation based on {allocationStrategies.find((s) => s.id === selectedStrategy)?.name}{" "}
              strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatIndianCurrency(summaryResults.totalInvestment)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Expected Allotment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatIndianCurrency(summaryResults.totalAllotted)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Expected Return</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatIndianCurrency(summaryResults.totalReturned)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Expected Gain</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatIndianCurrency(summaryResults.totalExpectedGain)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Expected ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{summaryResults.totalROI.toFixed(2)}%</p>
                </CardContent>
              </Card>
            </div>

            <div className="overflow-x-auto">
              <Table className="border p-3 shadow-hard">
                <TableHeader>
                  <TableRow>
                    <TableHead>IPO Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Lots Applied</TableHead>
                    <TableHead>Expected Allotment</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Expected Return</TableHead>
                    <TableHead>Expected Gain</TableHead>
                    <TableHead>Allotment Probability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocationResults.map((result, index) => (
                    <TableRow key={`${result.ipoId}-${result.category}-${index}`}>
                      <TableCell className="font-medium">{result.name}</TableCell>
                      <TableCell>{result.type}</TableCell>
                      <TableCell>{result.category.charAt(0).toUpperCase() + result.category.slice(1)}</TableCell>
                      <TableCell>{result.lotsApplied}</TableCell>
                      <TableCell>
                        {result.lotsAllotted} ({(result.allotmentProbability * 100).toFixed(1)}%)
                      </TableCell>
                      <TableCell className="rupee">{result.investmentAmount}</TableCell>
                      <TableCell className="rupee">{result.returnedAmount}</TableCell>
                      <TableCell className="text-green-600 rupee">{result.expectedGain}</TableCell>
                      <TableCell>{(result.allotmentProbability * 100).toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Allocation Notes</h3>
              <p className="text-sm text-muted-foreground">
                This allocation is based on the {allocationStrategies.find((s) => s.id === selectedStrategy)?.name}{" "}
                strategy. The expected allotment is calculated based on historical subscription rates and allotment
                patterns. Actual allotment may vary based on market conditions and the final subscription rates.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Retail Category:</strong> Allotment is based on a lottery system when oversubscribed. Each
                successful applicant receives at least one lot.
                <br />
                <strong>HNI Categories:</strong> Allotment is done on a proportionate basis when oversubscribed.
                <br />
                <strong>Shareholder/Employee Categories:</strong> These have separate quotas and may offer discounts on
                the issue price.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

