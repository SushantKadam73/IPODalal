"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatIndianCurrency } from "@/lib/utils"
import { Minus, Plus, Trash2, RefreshCw, Calculator, Filter, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockIPOData, categories as ipoCategories, getUniqueSectors, getUniqueRiskRatings, type IPOData } from "@/lib/mock-data"

// Use centralized mock data
const availableIPOs = mockIPOData
const categories = ipoCategories

interface SelectedIPO extends IPOData {
  applications: {
    [key: string]: number // category: applications
  }
}

interface SelectionCriteria {
  gmpThreshold: number
  riskTolerance: string
  sectorPreference: string[]
  maxInvestmentPerIPO: number
  prioritizeListingGains: boolean
}

export default function IPOSelection() {
  const [selectedIPOIds, setSelectedIPOIds] = useState<number[]>([])
  const [ipoApplications, setIpoApplications] = useState<{ [key: number]: { [category: string]: number } }>({})
  const [ipoTypeFilter, setIpoTypeFilter] = useState<string>("Both")
  const [ipoStatusFilter, setIpoStatusFilter] = useState<string>("Both")
  const [sectorFilter, setSectorFilter] = useState<string>("All")
  const [riskFilter, setRiskFilter] = useState<string>("All")
  const [filteredIPOs, setFilteredIPOs] = useState<typeof availableIPOs>(availableIPOs)
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectionCriteria, setSelectionCriteria] = useState<SelectionCriteria>({
    gmpThreshold: 15,
    riskTolerance: "Medium",
    sectorPreference: [],
    maxInvestmentPerIPO: 50000,
    prioritizeListingGains: true
  })
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false)

  // Get unique sectors and risk ratings
  const sectors = getUniqueSectors()
  const riskRatings = getUniqueRiskRatings()

  // Effect to filter IPOs based on various criteria
  useEffect(() => {
    let filtered = [...availableIPOs]

    if (ipoTypeFilter !== "Both") {
      filtered = filtered.filter((ipo) => ipo.type === ipoTypeFilter)
    }

    if (ipoStatusFilter !== "Both") {
      filtered = filtered.filter((ipo) => ipo.status === ipoStatusFilter)
    }

    if (sectorFilter !== "All") {
      filtered = filtered.filter((ipo) => ipo.sector === sectorFilter)
    }

    if (riskFilter !== "All") {
      filtered = filtered.filter((ipo) => ipo.riskRating === riskFilter)
    }

    // Apply advanced filters
    if (selectionCriteria.gmpThreshold > 0) {
      filtered = filtered.filter((ipo) => ipo.gmpPercentage >= selectionCriteria.gmpThreshold)
    }

    setFilteredIPOs(filtered)
    setSelectAll(false)
  }, [ipoTypeFilter, ipoStatusFilter, sectorFilter, riskFilter, selectionCriteria])

  // Handle select all toggle
  useEffect(() => {
    if (selectAll) {
      setSelectedIPOIds(filteredIPOs.map((ipo) => ipo.id))
    } else if (selectedIPOIds.length === filteredIPOs.length) {
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

  // Apply smart selection based on criteria
  const applySmartSelection = () => {
    let smartSelected: number[] = []
    
    // Filter IPOs based on criteria
    let qualifiedIPOs = filteredIPOs.filter(ipo => {
      // GMP threshold
      if (ipo.gmpPercentage < selectionCriteria.gmpThreshold) return false
      
      // Risk tolerance
      if (selectionCriteria.riskTolerance === "Low" && ipo.riskRating === "High") return false
      if (selectionCriteria.riskTolerance === "Medium" && ipo.riskRating === "High") return false
      
      // Sector preference
      if (selectionCriteria.sectorPreference.length > 0 &&
          ipo.sector &&
          !selectionCriteria.sectorPreference.includes(ipo.sector)) return false
      
      return true
    })

    // Sort by priority criteria
    if (selectionCriteria.prioritizeListingGains) {
      qualifiedIPOs = qualifiedIPOs.sort((a, b) => {
        // First prioritize by listing gains (if available)
        if (a.listingGains && b.listingGains) {
          return b.listingGains - a.listingGains
        }
        // Then by GMP percentage
        return b.gmpPercentage - a.gmpPercentage
      })
    } else {
      qualifiedIPOs = qualifiedIPOs.sort((a, b) => b.gmpPercentage - a.gmpPercentage)
    }

    smartSelected = qualifiedIPOs.map(ipo => ipo.id)
    setSelectedIPOIds(smartSelected)
  }

  // Render category input component (similar to funding calculator)
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
              Discount: ₹{categoryDetails.discount}
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
            disabled={!isSelected}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            id={`${ipo.id}-${category}`}
            type="number"
            className="h-7 rounded-none text-center text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={applicationValue}
            onChange={(e) => updateApplications(ipo.id, category, Number.parseInt(e.target.value) || 0)}
            min={0}
            max={ipo.categoryDetails[typedCategory].maxApplications}
            disabled={!isSelected}
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
            disabled={!isSelected}
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
        <h1 className="text-3xl font-bold">IPO Selection Dashboard</h1>
        <p className="text-muted-foreground">
          Discover, analyze, and select IPOs based on comprehensive criteria and market insights
        </p>
      </div>

      {/* Selection Criteria */}
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="bg-primary/5">
          <CardTitle>Selection Criteria</CardTitle>
          <CardDescription>Set your investment preferences and risk tolerance for IPO selection</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gmpThreshold">Minimum GMP Threshold (%)</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => {
                    if (selectionCriteria.gmpThreshold > 0) {
                      setSelectionCriteria(prev => ({ ...prev, gmpThreshold: prev.gmpThreshold - 1 }))
                    }
                  }}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="gmpThreshold"
                  type="number"
                  value={selectionCriteria.gmpThreshold}
                  onChange={(e) => setSelectionCriteria(prev => ({ ...prev, gmpThreshold: Number.parseFloat(e.target.value) || 0 }))}
                  min={0}
                  step={1}
                  className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => {
                    setSelectionCriteria(prev => ({ ...prev, gmpThreshold: prev.gmpThreshold + 1 }))
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="riskTolerance">Risk Tolerance</Label>
              <Select value={selectionCriteria.riskTolerance} onValueChange={(value) => setSelectionCriteria(prev => ({ ...prev, riskTolerance: value }))}>
                <SelectTrigger id="riskTolerance">
                  <SelectValue placeholder="Select Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Conservative (Low Risk)</SelectItem>
                  <SelectItem value="Medium">Balanced (Medium Risk)</SelectItem>
                  <SelectItem value="High">Aggressive (High Risk)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              {showAdvancedFilters ? "Hide" : "Show"} Advanced Filters
            </Button>
            <Button 
              onClick={applySmartSelection}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <TrendingUp className="h-4 w-4" />
              Smart Selection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* IPO Selection and Application */}
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="bg-primary/5">
          <CardTitle>IPO Selection & Application</CardTitle>
          <CardDescription>Filter, select IPOs and specify the number of applications for each category</CardDescription>
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

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-md bg-muted/20">
              <div className="space-y-2">
                <Label htmlFor="sectorFilter">Sector</Label>
                <Select value={sectorFilter} onValueChange={setSectorFilter}>
                  <SelectTrigger id="sectorFilter">
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Sectors</SelectItem>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="riskFilterAdvanced">Risk Rating</Label>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger id="riskFilterAdvanced">
                    <SelectValue placeholder="Select Risk Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Risk Levels</SelectItem>
                    {riskRatings.map((risk) => (
                      <SelectItem key={risk} value={risk}>{risk} Risk</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* IPO List with Integrated Category Inputs */}
          <div className="border rounded-md p-4 border-border/40">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Available IPOs ({filteredIPOs.length})</h3>
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
                    setSelectedIPOIds([]);
                  }}
                  className="gap-1 text-xs h-8"
                  disabled={Object.keys(ipoApplications).length === 0 && selectedIPOIds.length === 0}
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
                          <Badge variant="outline" className="text-xs">
                            {ipo.sector}
                          </Badge>
                          <Badge variant={
                            ipo.riskRating === "Low" ? "default" : 
                            ipo.riskRating === "Medium" ? "secondary" : "destructive"
                          } className="text-xs">
                            {ipo.riskRating} Risk
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
                            <div>Issue Size: ₹{ipo.issueSize} Cr</div>
                            {ipo.subscriptionRate && <div>Overall: {ipo.subscriptionRate}x</div>}
                            {ipo.listingGains && <div>Listing Gains: {ipo.listingGains}%</div>}
                            {ipo.categoryDetails.retail.subscriptionRate && (
                              <div>Retail: {ipo.categoryDetails.retail.subscriptionRate}x</div>
                            )}
                            {ipo.categoryDetails.shni.subscriptionRate && (
                              <div>SHNI: {ipo.categoryDetails.shni.subscriptionRate}x</div>
                            )}
                            {ipo.categoryDetails.bhni.subscriptionRate && (
                              <div>BHNI: {ipo.categoryDetails.bhni.subscriptionRate}x</div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Clear Input Button */}
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
          <div className="text-sm text-muted-foreground">
            {selectedIPOIds.length} IPO{selectedIPOIds.length !== 1 ? 's' : ''} selected
          </div>
          <Button 
            onClick={() => {
              // Calculate totals and show summary
              const totalApplications = Object.values(ipoApplications).reduce((total, ipoApps) => {
                return total + Object.values(ipoApps).reduce((sum, apps) => sum + apps, 0)
              }, 0)
              
              if (totalApplications > 0) {
                alert(`Summary:\n${selectedIPOIds.length} IPOs selected\n${totalApplications} total applications`)
              }
            }}
            disabled={selectedIPOIds.length === 0}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Calculator className="h-4 w-4" /> View Summary
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}