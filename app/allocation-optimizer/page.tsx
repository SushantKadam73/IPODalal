"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatIndianCurrency, formatIndianValue } from "@/lib/utils"
import { Minus, Plus, RefreshCw, Calculator, Trash2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { mockIPOData, allocationStrategies, type IPOData } from "@/lib/mock-data"

interface SelectedIPO extends IPOData {
  selected: boolean
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
  roi: number
}

export default function AllocationOptimizer() {
  const [availableCapital, setAvailableCapital] = useState<number>(100000)
  const [ipoAccountConfigs, setIpoAccountConfigs] = useState<{ [key: number]: { retail: number, shareholder: number, employee: number } }>({})
  const [selectedStrategy, setSelectedStrategy] = useState<string>("gmp")
  const [ipoTypeFilter, setIpoTypeFilter] = useState<string>("Both")
  const [ipoStatusFilter, setIpoStatusFilter] = useState<string>("Both")
  const [filteredIPOs, setFilteredIPOs] = useState<IPOData[]>(mockIPOData)
  const [selectedIPOs, setSelectedIPOs] = useState<SelectedIPO[]>(
    mockIPOData.map((ipo) => ({ ...ipo, selected: false })),
  )
  const [allocationResults, setAllocationResults] = useState<AllocationResult[]>([])
  const [summaryResults, setSummaryResults] = useState<{
    totalInvestment: number
    totalAllotted: number
    totalReturned: number
    totalExpectedGain: number
    totalROI: number
    remainingCapital: number
    remainingRetailAccounts: number
    remainingShareholderAccounts: number
    remainingEmployeeAccounts: number
  } | null>(null)
  const [priorityCriteria, setPriorityCriteria] = useState<string[]>(["gmp", "subscriptionRate", "capital"])
  const [selectAll, setSelectAll] = useState<boolean>(false)

  // Effect to filter IPOs based on type and status
  useEffect(() => {
    let filtered = [...mockIPOData]

    if (ipoTypeFilter !== "Both") {
      filtered = filtered.filter((ipo) => ipo.type === ipoTypeFilter)
    }

    if (ipoStatusFilter !== "Both") {
      filtered = filtered.filter((ipo) => ipo.status === ipoStatusFilter)
    }

    setFilteredIPOs(filtered)

    // Reset selectAll when filters change
    setSelectAll(false)

    // Update selected IPOs based on filtered IPOs
    setSelectedIPOs((prev) => {
      const updatedIPOs = prev.map((ipo) => {
        const isInFiltered = filtered.some((f) => f.id === ipo.id)
        return {
          ...ipo,
          selected: isInFiltered ? ipo.selected : false,
        }
      })
      return updatedIPOs
    })
  }, [ipoTypeFilter, ipoStatusFilter])

  // Handle select all toggle
  useEffect(() => {
    if (selectAll) {
      setSelectedIPOs(prev => prev.map(ipo => {
        const isInFiltered = filteredIPOs.some(f => f.id === ipo.id)
        return { ...ipo, selected: isInFiltered }
      }))
    } else {
      const selectedCount = selectedIPOs.filter(ipo => ipo.selected && filteredIPOs.some(f => f.id === ipo.id)).length
      if (selectedCount === filteredIPOs.length && filteredIPOs.length > 0) {
        // Only clear if all were selected (to avoid clearing when filters change)
        setSelectedIPOs(prev => prev.map(ipo => ({ ...ipo, selected: false })))
      }
    }
  }, [selectAll, filteredIPOs])

  // Check if all filtered IPOs are selected
  useEffect(() => {
    const selectedInFiltered = selectedIPOs.filter(ipo => ipo.selected && filteredIPOs.some(f => f.id === ipo.id))
    if (filteredIPOs.length > 0 && selectedInFiltered.length === filteredIPOs.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }, [selectedIPOs, filteredIPOs])

  // Initialize account configuration for an IPO
  const ensureIpoAccountConfigInitialized = (ipoId: number) => {
    if (!ipoAccountConfigs[ipoId]) {
      setIpoAccountConfigs(prev => ({
        ...prev,
        [ipoId]: {
          retail: 1,
          shareholder: 0,
          employee: 0,
        }
      }));
    }
  };

  // Update account configuration for an IPO
  const updateIpoAccountConfig = (ipoId: number, accountType: string, value: number) => {
    ensureIpoAccountConfigInitialized(ipoId);
    setIpoAccountConfigs(prev => ({
      ...prev,
      [ipoId]: {
        ...prev[ipoId],
        [accountType]: value
      }
    }));
  };

  // Toggle IPO selection
  const toggleIPOSelection = (ipoId: number) => {
    setSelectedIPOs(selectedIPOs.map((ipo) => (ipo.id === ipoId ? { ...ipo, selected: !ipo.selected } : ipo)))
  }

  // Handle drag end for priority reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(priorityCriteria)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setPriorityCriteria(items)
  }

  // Calculate allotment probability based on subscription rate and category
  const calculateAllotmentProbability = (
    subscriptionRate: number | null,
    category: string,
    ipoType: string,
  ): number => {
    if (!subscriptionRate || subscriptionRate <= 0) return 0

    // For under-subscribed IPOs, full allotment is expected
    if (subscriptionRate <= 1) {
      return 1
    }

    // For Mainboard IPOs
    if (ipoType === "Mainboard") {
      // For retail category in over-subscribed IPOs, the probability is based on lottery system
      if (category === "retail") {
        return 1 / subscriptionRate
      }

      // For shareholder and employee categories, similar to retail
      if (category === "shareholder" || category === "employee") {
        return 1 / subscriptionRate
      }

      // For NII categories in over-subscribed IPOs, proportionate allotment
      if (category === "shni" || category === "bhni") {
        return 1 / subscriptionRate
      }
    }

    // For SME IPOs
    if (ipoType === "SME") {
      // For retail category in SME IPOs, only 1 lot is allowed and allotment is by lottery
      if (category === "retail") {
        return 1 / subscriptionRate
      }

      // For shareholder and employee categories, similar to retail
      if (category === "shareholder" || category === "employee") {
        return 1 / subscriptionRate
      }

      // For NII categories in SME IPOs, minimum 2 lots and proportionate allotment
      if (category === "shni" || category === "bhni") {
        return 1 / subscriptionRate
      }
    }

    return 1 / subscriptionRate // Default fallback
  }

  // Calculate allocation based on GMP strategy
  const calculateGMPAllocation = () => {
    // Filter selected IPOs
    const iposToConsider = selectedIPOs.filter((ipo) => ipo.selected)
    if (iposToConsider.length === 0) return {
      results: [],
      remainingCapital: availableCapital,
      remainingRetailAccounts: 0,
      remainingShareholderAccounts: 0,
      remainingEmployeeAccounts: 0,
    }

    // Sort IPOs by GMP percentage (highest first)
    const sortedIPOs = [...iposToConsider].sort((a, b) => b.gmpPercentage - a.gmpPercentage)

    return calculateAllocation(sortedIPOs)
  }

  // Calculate allocation based on Subscription Rate strategy
  const calculateSubscriptionAllocation = () => {
    // Filter selected IPOs
    const iposToConsider = selectedIPOs.filter((ipo) => ipo.selected)
    if (iposToConsider.length === 0) return {
      results: [],
      remainingCapital: availableCapital,
      remainingRetailAccounts: 0,
      remainingShareholderAccounts: 0,
      remainingEmployeeAccounts: 0,
    }

    // Sort IPOs by inverse of subscription rate (lowest subscription first for higher chance of allotment)
    const sortedIPOs = [...iposToConsider].sort((a, b) => {
      const aAvgSub = a.subscriptionRate || Number.POSITIVE_INFINITY
      const bAvgSub = b.subscriptionRate || Number.POSITIVE_INFINITY

      return aAvgSub - bAvgSub
    })

    return calculateAllocation(sortedIPOs)
  }

  // Calculate allocation based on Capital Utilization strategy
  const calculateCapitalAllocation = () => {
    // Filter selected IPOs
    const iposToConsider = selectedIPOs.filter((ipo) => ipo.selected)
    if (iposToConsider.length === 0) return {
      results: [],
      remainingCapital: availableCapital,
      remainingRetailAccounts: 0,
      remainingShareholderAccounts: 0,
      remainingEmployeeAccounts: 0,
    }

    // Sort IPOs by lot cost (lowest first to maximize number of applications)
    const sortedIPOs = [...iposToConsider].sort((a, b) => a.price * a.lotSize - b.price * b.lotSize)

    return calculateAllocation(sortedIPOs)
  }

  // Calculate allocation based on Optimize strategy (combination of GMP, subscription, and capital)
  const calculateOptimizedAllocation = () => {
    // Filter selected IPOs
    const iposToConsider = selectedIPOs.filter((ipo) => ipo.selected)
    if (iposToConsider.length === 0) return {
      results: [],
      remainingCapital: availableCapital,
      remainingRetailAccounts: 0,
      remainingShareholderAccounts: 0,
      remainingEmployeeAccounts: 0,
    }

    // Calculate a score for each IPO based on GMP, subscription rate, and lot cost
    const scoredIPOs = [...iposToConsider]
      .map((ipo) => {
        // Normalize values between 0 and 1
        const normalizedGMP = ipo.gmpPercentage / 100
        const normalizedSubscription = ipo.subscriptionRate ? 1 / ipo.subscriptionRate : 1
        const maxLotCost = Math.max(...iposToConsider.map((i) => i.price * i.lotSize))
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
    
    // Calculate total accounts across all IPOs
    let totalRetailAccounts = 0
    let totalShareholderAccounts = 0
    let totalEmployeeAccounts = 0
    
    prioritizedIPOs.forEach(ipo => {
      ensureIpoAccountConfigInitialized(ipo.id);
      const config = ipoAccountConfigs[ipo.id];
      totalRetailAccounts += config?.retail || 1;
      totalShareholderAccounts += config?.shareholder || 0;
      totalEmployeeAccounts += config?.employee || 0;
    });

    let remainingRetailAccounts = totalRetailAccounts
    let remainingShareholderAccounts = totalShareholderAccounts
    let remainingEmployeeAccounts = totalEmployeeAccounts

    const results: AllocationResult[] = []

    // First pass: Allocate to each IPO based on priority
    for (const ipo of prioritizedIPOs) {
      ensureIpoAccountConfigInitialized(ipo.id);
      const accountConfig = ipoAccountConfigs[ipo.id];
      
      // Check if we have retail accounts available for this IPO
      if (accountConfig?.retail > 0 && remainingRetailAccounts > 0) {
        const retailDetail = ipo.categoryDetails.retail
        const retailLotCost = ipo.price * ipo.lotSize * retailDetail.lotSize

        // Check if we have enough capital for retail application
        if (retailLotCost <= remainingCapital) {
          const lotsApplied = retailDetail.lotSize
          const sharesApplied = lotsApplied * ipo.lotSize
          const investmentAmount = retailLotCost

          // Calculate allotment probability and expected allotment
          const allotmentProbability = calculateAllotmentProbability(
            retailDetail.subscriptionRate || ipo.subscriptionRate,
            "retail",
            ipo.type,
          )

          const lotsAllotted = Math.min(lotsApplied, Math.max(0, Math.floor(lotsApplied * allotmentProbability)))
          const sharesAllotted = lotsAllotted * ipo.lotSize
          const allottedAmount = sharesAllotted * ipo.price
          const returnedAmount = investmentAmount - allottedAmount

          // Calculate expected gain based on GMP
          const expectedGain = sharesAllotted * ipo.gmp
          const roi = investmentAmount > 0 ? (expectedGain / investmentAmount) * 100 : 0

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
            roi,
          })

          remainingCapital -= investmentAmount
          remainingRetailAccounts--
        }
      }

      // Check if we have shareholder accounts available for this IPO and if the IPO has shareholder quota
      if (
        accountConfig?.shareholder > 0 &&
        remainingShareholderAccounts > 0 &&
        ipo.categoryDetails.shareholder &&
        (ipo.categoryDetails.shareholder.reservedPercentage || 0) > 0
      ) {
        const shareholderDetail = ipo.categoryDetails.shareholder
        const shareholderPrice = ipo.price - (shareholderDetail.discount || 0)
        const shareholderLotCost = shareholderPrice * ipo.lotSize * shareholderDetail.lotSize

        // Check if we have enough capital for shareholder application
        if (shareholderLotCost <= remainingCapital) {
          const lotsApplied = shareholderDetail.lotSize
          const sharesApplied = lotsApplied * ipo.lotSize
          const investmentAmount = shareholderLotCost

          // Calculate allotment probability and expected allotment
          const allotmentProbability = calculateAllotmentProbability(
            shareholderDetail.subscriptionRate || ipo.subscriptionRate,
            "shareholder",
            ipo.type,
          )

          const lotsAllotted = Math.min(lotsApplied, Math.max(0, Math.floor(lotsApplied * allotmentProbability)))
          const sharesAllotted = lotsAllotted * ipo.lotSize
          const allottedAmount = sharesAllotted * shareholderPrice
          const returnedAmount = investmentAmount - allottedAmount

          // Calculate expected gain based on GMP plus discount
          const expectedGain = sharesAllotted * (ipo.gmp + (shareholderDetail.discount || 0))
          const roi = investmentAmount > 0 ? (expectedGain / investmentAmount) * 100 : 0

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
            roi,
          })

          remainingCapital -= investmentAmount
          remainingShareholderAccounts--
        }
      }

      // Check if we have employee accounts available for this IPO and if the IPO has employee quota
      if (
        accountConfig?.employee > 0 &&
        remainingEmployeeAccounts > 0 &&
        ipo.categoryDetails.employee &&
        (ipo.categoryDetails.employee.reservedPercentage || 0) > 0
      ) {
        const employeeDetail = ipo.categoryDetails.employee
        const employeePrice = ipo.price - (employeeDetail.discount || 0)
        const employeeLotCost = employeePrice * ipo.lotSize * employeeDetail.lotSize

        // Check if we have enough capital for employee application
        if (employeeLotCost <= remainingCapital) {
          const lotsApplied = employeeDetail.lotSize
          const sharesApplied = lotsApplied * ipo.lotSize
          const investmentAmount = employeeLotCost

          // Calculate allotment probability and expected allotment
          const allotmentProbability = calculateAllotmentProbability(
            employeeDetail.subscriptionRate || ipo.subscriptionRate,
            "employee",
            ipo.type,
          )

          const lotsAllotted = Math.min(lotsApplied, Math.max(0, Math.floor(lotsApplied * allotmentProbability)))
          const sharesAllotted = lotsAllotted * ipo.lotSize
          const allottedAmount = sharesAllotted * employeePrice
          const returnedAmount = investmentAmount - allottedAmount

          // Calculate expected gain based on GMP plus discount
          const expectedGain = sharesAllotted * (ipo.gmp + (employeeDetail.discount || 0))
          const roi = investmentAmount > 0 ? (expectedGain / investmentAmount) * 100 : 0

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
            roi,
          })

          remainingCapital -= investmentAmount
          remainingEmployeeAccounts--
        }
      }
    }

    // Second pass: Try to allocate remaining capital to HNI categories if possible
    if (remainingCapital > 0) {
      for (const ipo of prioritizedIPOs) {
        // For Mainboard IPOs, try SHNI category first
        if (ipo.type === "Mainboard" && ipo.categoryDetails.shni && (ipo.categoryDetails.shni.reservedPercentage || 0) > 0) {
          const shniDetail = ipo.categoryDetails.shni
          const shniLotCost = ipo.price * ipo.lotSize * shniDetail.lotSize

          if (shniLotCost <= remainingCapital) {
            const lotsApplied = shniDetail.lotSize
            const sharesApplied = lotsApplied * ipo.lotSize
            const investmentAmount = shniLotCost

            // Calculate allotment probability and expected allotment
            const allotmentProbability = calculateAllotmentProbability(
              shniDetail.subscriptionRate || ipo.subscriptionRate,
              "shni",
              ipo.type,
            )

            const lotsAllotted = Math.min(lotsApplied, Math.max(0, Math.floor(lotsApplied * allotmentProbability)))
            const sharesAllotted = lotsAllotted * ipo.lotSize
            const allottedAmount = sharesAllotted * ipo.price
            const returnedAmount = investmentAmount - allottedAmount

            // Calculate expected gain based on GMP
            const expectedGain = sharesAllotted * ipo.gmp
            const roi = investmentAmount > 0 ? (expectedGain / investmentAmount) * 100 : 0

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
              roi,
            })

            remainingCapital -= investmentAmount
          }
        }

        // If we still have capital, try BHNI category for Mainboard IPOs
        if (
          remainingCapital > 0 &&
          ipo.type === "Mainboard" &&
          ipo.categoryDetails.bhni &&
          (ipo.categoryDetails.bhni.reservedPercentage || 0) > 0
        ) {
          const bhniDetail = ipo.categoryDetails.bhni
          const bhniLotCost = ipo.price * ipo.lotSize * bhniDetail.lotSize

          if (bhniLotCost <= remainingCapital) {
            const lotsApplied = bhniDetail.lotSize
            const sharesApplied = lotsApplied * ipo.lotSize
            const investmentAmount = bhniLotCost

            // Calculate allotment probability and expected allotment
            const allotmentProbability = calculateAllotmentProbability(
              bhniDetail.subscriptionRate || ipo.subscriptionRate,
              "bhni",
              ipo.type,
            )

            const lotsAllotted = Math.min(lotsApplied, Math.max(0, Math.floor(lotsApplied * allotmentProbability)))
            const sharesAllotted = lotsAllotted * ipo.lotSize
            const allottedAmount = sharesAllotted * ipo.price
            const returnedAmount = investmentAmount - allottedAmount

            // Calculate expected gain based on GMP
            const expectedGain = sharesAllotted * ipo.gmp
            const roi = investmentAmount > 0 ? (expectedGain / investmentAmount) * 100 : 0

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
              roi,
            })

            remainingCapital -= investmentAmount
          }
        }

        // For SME IPOs, handle NII category (minimum 2 lots)
        if (ipo.type === "SME" && remainingCapital > 0 && ipo.categoryDetails.shni) {
          const niiDetail = ipo.categoryDetails.shni
          const niiLotCost = ipo.price * ipo.lotSize * niiDetail.lotSize

          if (niiLotCost <= remainingCapital) {
            const lotsApplied = niiDetail.lotSize
            const sharesApplied = lotsApplied * ipo.lotSize
            const investmentAmount = niiLotCost

            // Calculate allotment probability and expected allotment
            const allotmentProbability = calculateAllotmentProbability(
              niiDetail.subscriptionRate || ipo.subscriptionRate,
              "shni",
              ipo.type,
            )

            const lotsAllotted = Math.min(lotsApplied, Math.max(0, Math.floor(lotsApplied * allotmentProbability)))
            const sharesAllotted = lotsAllotted * ipo.lotSize
            const allottedAmount = sharesAllotted * ipo.price
            const returnedAmount = investmentAmount - allottedAmount

            // Calculate expected gain based on GMP
            const expectedGain = sharesAllotted * ipo.gmp
            const roi = investmentAmount > 0 ? (expectedGain / investmentAmount) * 100 : 0

            results.push({
              ipoId: ipo.id,
              name: ipo.name,
              type: ipo.type,
              category: "shni (NII)",
              lotsApplied,
              lotsAllotted,
              sharesApplied,
              sharesAllotted,
              investmentAmount,
              allottedAmount,
              returnedAmount,
              expectedGain,
              allotmentProbability,
              roi,
            })

            remainingCapital -= investmentAmount
          }
        }
      }
    }

    return {
      results,
      remainingCapital,
      remainingRetailAccounts,
      remainingShareholderAccounts,
      remainingEmployeeAccounts,
    }
  }

  // Calculate allocation based on selected strategy
  const calculateAllocation_strategy = () => {
    let allocationData: {
      results: AllocationResult[]
      remainingCapital: number
      remainingRetailAccounts: number
      remainingShareholderAccounts: number
      remainingEmployeeAccounts: number
    } = {
      results: [],
      remainingCapital: availableCapital,
      remainingRetailAccounts: 0,
      remainingShareholderAccounts: 0,
      remainingEmployeeAccounts: 0,
    }

    switch (selectedStrategy) {
      case "gmp":
        allocationData = calculateGMPAllocation()
        break
      case "subscription":
        allocationData = calculateSubscriptionAllocation()
        break
      case "capital":
        allocationData = calculateCapitalAllocation()
        break
      case "optimize":
        allocationData = calculateOptimizedAllocation()
        break
      default:
        allocationData = calculateGMPAllocation()
    }

    const results = allocationData.results

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
      remainingCapital: allocationData.remainingCapital,
      remainingRetailAccounts: allocationData.remainingRetailAccounts,
      remainingShareholderAccounts: allocationData.remainingShareholderAccounts,
      remainingEmployeeAccounts: allocationData.remainingEmployeeAccounts,
    })

    setAllocationResults(results)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">IPO Allocation Optimizer</h1>
        <p className="text-muted-foreground">
          Optimize your IPO applications based on different strategies and estimate potential returns
        </p>
      </div>

      {/* Allocation Strategy */}
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="bg-primary/5">
          <CardTitle>Allocation Strategy</CardTitle>
          <CardDescription>Enter your available capital and select a strategy for allocating across IPOs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capital">Available Capital (₹)</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => {
                    if (availableCapital > 1000) {
                      setAvailableCapital(availableCapital - 1000)
                    }
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="capital"
                  type="number"
                  value={availableCapital}
                  onChange={(e) => setAvailableCapital(Number.parseFloat(e.target.value) || 0)}
                  min={0}
                  step={1000}
                  className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => setAvailableCapital(availableCapital + 1000)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
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
                {selectedStrategy === "gmp" && "Prioritize IPOs with highest Grey Market Premium percentages"}
                {selectedStrategy === "subscription" && "Focus on IPOs with lower subscription rates for better allotment chances"}
                {selectedStrategy === "capital" && "Maximize number of applications by selecting lower-cost IPOs first"}
                {selectedStrategy === "optimize" && "Balanced approach considering GMP, subscription rates, and capital efficiency"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IPO Selection and Category Input */}
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="bg-primary/5">
          <CardTitle>IPO Selection</CardTitle>
          <CardDescription>Select IPOs and specify the number of accounts for each category</CardDescription>
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

          {/* IPO List with Integrated Selection */}
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
                    setSelectedIPOs(selectedIPOs.map(ipo => ({ ...ipo, selected: false })));
                    setAllocationResults([]);
                    setSummaryResults(null);
                  }}
                  className="gap-1 text-xs h-8"
                  disabled={!selectedIPOs.some(ipo => ipo.selected)}
                >
                  <RefreshCw className="h-3 w-3 mr-1" /> Reset All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredIPOs.map((ipo) => {
                const selectedIpo = selectedIPOs.find((s) => s.id === ipo.id)
                const isSelected = selectedIpo?.selected || false;
                
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
                        onCheckedChange={() => toggleIPOSelection(ipo.id)}
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
                          {ipo.categoryDetails.shareholder && (ipo.categoryDetails.shareholder.reservedPercentage || 0) > 0 && (
                            <Badge variant="outline" className="text-xs bg-primary/20">
                              SH Quota
                            </Badge>
                          )}
                          {ipo.categoryDetails.employee && (ipo.categoryDetails.employee.reservedPercentage || 0) > 0 && (
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
                            <div>Issue Size: {formatIndianValue(ipo.issueSize)} Cr</div>
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
                            {ipo.categoryDetails.shareholder && ipo.categoryDetails.shareholder.subscriptionRate && (
                              <div>SH: {ipo.categoryDetails.shareholder.subscriptionRate}x</div>
                            )}
                            {ipo.categoryDetails.employee && ipo.categoryDetails.employee.subscriptionRate && (
                              <div>Emp: {ipo.categoryDetails.employee.subscriptionRate}x</div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Clear Selection Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleIPOSelection(ipo.id)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        title="Toggle selection"
                        disabled={false}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Category Input Section */}
                    <div className="mt-4 border-t pt-4">
                      <h4 className="text-sm font-medium mb-3">Category Applications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Retail Accounts - Always available */}
                        <div className="space-y-2">
                          <Label htmlFor={`retail-${ipo.id}`} className="text-sm">Retail</Label>
                          <div className="flex items-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-r-none"
                              onClick={() => {
                                ensureIpoAccountConfigInitialized(ipo.id);
                                const currentValue = ipoAccountConfigs[ipo.id]?.retail || 1;
                                if (currentValue > 0) {
                                  updateIpoAccountConfig(ipo.id, 'retail', currentValue - 1);
                                }
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              id={`retail-${ipo.id}`}
                              type="number"
                              className="h-7 rounded-none text-center text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              value={ipoAccountConfigs[ipo.id]?.retail || 1}
                              onChange={(e) => updateIpoAccountConfig(ipo.id, 'retail', Number.parseInt(e.target.value) || 0)}
                              min={0}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 rounded-l-none"
                              onClick={() => {
                                ensureIpoAccountConfigInitialized(ipo.id);
                                const currentValue = ipoAccountConfigs[ipo.id]?.retail || 1;
                                updateIpoAccountConfig(ipo.id, 'retail', currentValue + 1);
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Shareholder Accounts - Only if available */}
                        {ipo.categoryDetails.shareholder && (ipo.categoryDetails.shareholder.reservedPercentage || 0) > 0 && (
                          <div className="space-y-2">
                            <Label htmlFor={`shareholder-${ipo.id}`} className="text-sm">Shareholder</Label>
                            <div className="flex items-center">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-r-none"
                                onClick={() => {
                                  ensureIpoAccountConfigInitialized(ipo.id);
                                  const currentValue = ipoAccountConfigs[ipo.id]?.shareholder || 0;
                                  if (currentValue > 0) {
                                    updateIpoAccountConfig(ipo.id, 'shareholder', currentValue - 1);
                                  }
                                }}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                id={`shareholder-${ipo.id}`}
                                type="number"
                                className="h-7 rounded-none text-center text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={ipoAccountConfigs[ipo.id]?.shareholder || 0}
                                onChange={(e) => updateIpoAccountConfig(ipo.id, 'shareholder', Number.parseInt(e.target.value) || 0)}
                                min={0}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-l-none"
                                onClick={() => {
                                  ensureIpoAccountConfigInitialized(ipo.id);
                                  const currentValue = ipoAccountConfigs[ipo.id]?.shareholder || 0;
                                  updateIpoAccountConfig(ipo.id, 'shareholder', currentValue + 1);
                                }}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Employee Accounts - Only if available */}
                        {ipo.categoryDetails.employee && (ipo.categoryDetails.employee.reservedPercentage || 0) > 0 && (
                          <div className="space-y-2">
                            <Label htmlFor={`employee-${ipo.id}`} className="text-sm">Employee</Label>
                            <div className="flex items-center">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-r-none"
                                onClick={() => {
                                  ensureIpoAccountConfigInitialized(ipo.id);
                                  const currentValue = ipoAccountConfigs[ipo.id]?.employee || 0;
                                  if (currentValue > 0) {
                                    updateIpoAccountConfig(ipo.id, 'employee', currentValue - 1);
                                  }
                                }}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                id={`employee-${ipo.id}`}
                                type="number"
                                className="h-7 rounded-none text-center text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={ipoAccountConfigs[ipo.id]?.employee || 0}
                                onChange={(e) => updateIpoAccountConfig(ipo.id, 'employee', Number.parseInt(e.target.value) || 0)}
                                min={0}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 rounded-l-none"
                                onClick={() => {
                                  ensureIpoAccountConfigInitialized(ipo.id);
                                  const currentValue = ipoAccountConfigs[ipo.id]?.employee || 0;
                                  updateIpoAccountConfig(ipo.id, 'employee', currentValue + 1);
                                }}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
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
            onClick={calculateAllocation_strategy}
            disabled={!selectedIPOs.some((ipo) => ipo.selected)}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Calculator className="h-4 w-4" /> Calculate Allocation
          </Button>
        </CardFooter>
      </Card>

      {/* Results */}
      {summaryResults && (
        <Card className="border border-border/40 shadow-sm">
          <CardHeader className="bg-primary/5">
            <CardTitle>Allocation Results</CardTitle>
            <CardDescription>
              Recommended IPO allocation based on {allocationStrategies.find((s) => s.id === selectedStrategy)?.name}{" "}
              strategy
            </CardDescription>
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
                    <p className="text-2xl font-bold text-primary">{formatIndianCurrency(summaryResults.totalInvestment)}</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Expected Allotment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{formatIndianCurrency(summaryResults.totalAllotted)}</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Expected Return</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{formatIndianCurrency(summaryResults.totalReturned)}</p>
                  </CardContent>
                </Card>
                <Card className="border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Expected Gain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-secondary">{formatIndianCurrency(summaryResults.totalExpectedGain)}</p>
                  </CardContent>
                </Card>
               <Card className="border border-border/40">
                 <CardHeader className="pb-2">
                   <CardTitle className="text-sm">Expected ROI</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-2xl font-bold text-secondary">{summaryResults.totalROI.toFixed(2)}%</p>
                 </CardContent>
               </Card>
               <Card className="border border-border/40">
                 <CardHeader className="pb-2">
                   <CardTitle className="text-sm">Remaining Capital</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-2xl font-bold text-primary">{formatIndianCurrency(summaryResults.remainingCapital)}</p>
                 </CardContent>
               </Card>
             </div>
           </div>

           {/* Detailed Results Table */}
            <div className="overflow-x-auto">
              <Table className="border p-3 shadow-hard">
                <TableHeader className="bg-primary/5">
                  <TableRow>
                    <TableHead>IPO Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Lots Applied</TableHead>
                    <TableHead>Expected Allotment</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Expected Return</TableHead>
                    <TableHead>Expected Gain</TableHead>
                    <TableHead>ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocationResults.map((result, index) => (
                    <TableRow key={`${result.ipoId}-${result.category}-${index}`} className="hover:bg-muted/20">
                      <TableCell className="font-medium">{result.name}</TableCell>
                      <TableCell>{result.type}</TableCell>
                      <TableCell>{result.category.charAt(0).toUpperCase() + result.category.slice(1)}</TableCell>
                      <TableCell>{result.lotsApplied}</TableCell>
                      <TableCell>
                        {result.lotsAllotted} ({(result.allotmentProbability * 100).toFixed(1)}%)
                      </TableCell>
                      <TableCell className="text-primary">{formatIndianCurrency(result.investmentAmount)}</TableCell>
                      <TableCell className="text-primary">{formatIndianCurrency(result.returnedAmount)}</TableCell>
                      <TableCell className="text-green-600">{formatIndianCurrency(result.expectedGain)}</TableCell>
                      <TableCell className="text-green-600">{result.roi.toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-muted/30 p-4 rounded-md border">
              <h3 className="font-medium mb-2 text-foreground">Allocation Notes</h3>
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

