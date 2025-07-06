"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, TrendingUp, Users, Building2, Target, Calculator, Clock } from "lucide-react"
import { mockIPOData, type IPOData, mockBidDetailsData, type BidDetails } from "@/lib/mock-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatIndianValue } from "@/lib/utils"

// Enhanced subscription data interface
interface SubscriptionData extends IPOData {
  exchanges: {
    nse: {
      totalBids: number
      timesSubscribed: number
      applications: number
    }
    bse: {
      totalBids: number
      timesSubscribed: number
      applications: number
    }
    consolidated: {
      totalBids: number
      timesSubscribed: number
      applications: number
    }
  }
  dailySubscription: Array<{
    day: number
    qib: number
    nii: number
    retail: number
    employee: number
    shareholder: number
    overall: number
    cumulativeBidAmount: number
  }>
  categorySubscription: {
    qib: { subscribed: number; bidAmount: number; applications: number }
    nii_shni: { subscribed: number; bidAmount: number; applications: number }
    nii_bhni: { subscribed: number; bidAmount: number; applications: number }
    retail: { subscribed: number; bidAmount: number; applications: number }
    employee: { subscribed: number; bidAmount: number; applications: number }
    shareholder: { subscribed: number; bidAmount: number; applications: number }
  }
}

// Function to enhance IPO data with subscription details
const enhanceWithSubscriptionData = (ipo: IPOData): SubscriptionData => {
  // Generate mock subscription data
  const baseSubscription = ipo.subscriptionRate || 1
  
  // Generate daily subscription pattern (3 days)
  const dailySubscription = [
    {
      day: 1,
      qib: baseSubscription * 0.3,
      nii: baseSubscription * 0.5,
      retail: baseSubscription * 0.8,
      employee: baseSubscription * 0.4,
      shareholder: baseSubscription * 0.6,
      overall: baseSubscription * 0.6,
      cumulativeBidAmount: ipo.issueSize * 0.6 * 10000000
    },
    {
      day: 2,
      qib: baseSubscription * 0.7,
      nii: baseSubscription * 0.9,
      retail: baseSubscription * 1.2,
      employee: baseSubscription * 0.8,
      shareholder: baseSubscription * 1.0,
      overall: baseSubscription * 0.9,
      cumulativeBidAmount: ipo.issueSize * 0.9 * 10000000
    },
    {
      day: 3,
      qib: baseSubscription || 1,
      nii: baseSubscription * 1.2,
      retail: baseSubscription * 1.5,
      employee: baseSubscription || 1,
      shareholder: baseSubscription * 1.3,
      overall: baseSubscription || 1,
      cumulativeBidAmount: ipo.issueSize * 1.2 * 10000000
    }
  ]

  return {
    ...ipo,
    exchanges: {
      nse: {
        totalBids: Math.round(ipo.issueSize * 0.6 * 1000),
        timesSubscribed: (baseSubscription || 1) * 1.1,
        applications: Math.round(ipo.issueSize * 0.6 * 100)
      },
      bse: {
        totalBids: Math.round(ipo.issueSize * 0.4 * 1000),
        timesSubscribed: (baseSubscription || 1) * 0.9,
        applications: Math.round(ipo.issueSize * 0.4 * 100)
      },
      consolidated: {
        totalBids: Math.round(ipo.issueSize * 1000),
        timesSubscribed: baseSubscription || 1,
        applications: Math.round(ipo.issueSize * 100)
      }
    },
    dailySubscription,
    categorySubscription: {
      qib: {
        subscribed: (baseSubscription || 1) * 0.8,
        bidAmount: ipo.issueSize * 0.4 * 10000000,
        applications: Math.round(ipo.issueSize * 20)
      },
      nii_shni: {
        subscribed: (baseSubscription || 1) * 1.2,
        bidAmount: ipo.issueSize * 0.15 * 10000000,
        applications: Math.round(ipo.issueSize * 30)
      },
      nii_bhni: {
        subscribed: (baseSubscription || 1) * 1.5,
        bidAmount: ipo.issueSize * 0.25 * 10000000,
        applications: Math.round(ipo.issueSize * 15)
      },
      retail: {
        subscribed: (baseSubscription || 1) * 1.8,
        bidAmount: ipo.issueSize * 0.35 * 10000000,
        applications: Math.round(ipo.issueSize * 200)
      },
      employee: {
        subscribed: ipo.hasEmployeeQuota ? (baseSubscription || 1) * 0.6 : 0,
        bidAmount: ipo.hasEmployeeQuota ? ipo.issueSize * 0.05 * 10000000 : 0,
        applications: ipo.hasEmployeeQuota ? Math.round(ipo.issueSize * 10) : 0
      },
      shareholder: {
        subscribed: ipo.hasShareholderQuota ? (baseSubscription || 1) * 0.4 : 0,
        bidAmount: ipo.hasShareholderQuota ? ipo.issueSize * 0.05 * 10000000 : 0,
        applications: ipo.hasShareholderQuota ? Math.round(ipo.issueSize * 5) : 0
      }
    }
  }
}

export default function SubscriptionAggregator() {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData[]>([])
  const [lastRefresh, setLastRefresh] = useState<string>("")
  const [selectedIPO, setSelectedIPO] = useState<SubscriptionData | null>(null)
  const [selectedBidCompany, setSelectedBidCompany] = useState<string>(mockBidDetailsData[0]?.id.toString() || "1")
  const [selectedExchange, setSelectedExchange] = useState<"BSE" | "NSE" | "Combined">("BSE")

  // Get current bid data for bid analysis
  const currentBidData = mockBidDetailsData.find(bid => bid.id.toString() === selectedBidCompany) || mockBidDetailsData[0]

  // Prepare chart data for bid analysis
  const bidChartData = currentBidData.bidPrices.map(bid => ({
    price: `₹${bid.price}`,
    quantity: bid.quantity,
    quantityInLakhs: Math.round(bid.quantity / 100000)
  }))

  // Prepare demand schedule chart data
  const demandChartData = currentBidData.demandSchedule
    .filter(item => !item.subcategory) // Only main categories
    .map(item => ({
      category: item.category.replace("Qualified Institutional Buyers (QIBs)", "QIBs")
        .replace("Non Institutional Investors", "NIIs")
        .replace("Retail Individual Investors (RIIs)", "RIIs"),
      offered: item.sharesOffered,
      bidFor: item.sharesBidFor,
      subscription: item.subscriptionMultiple
    }))

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const formatNumber = (num: number) => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)}Cr`
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const formatQuantity = (value: number) => {
    return formatIndianValue(value)
  }

  // Initialize enhanced subscription data
  useEffect(() => {
    const enhanced = mockIPOData
      .filter(ipo => ipo.status === "Current")
      .map(enhanceWithSubscriptionData)
    setSubscriptionData(enhanced)
    setSelectedIPO(enhanced[0] || null)
    setLastRefresh(new Date().toLocaleString('en-IN'))
  }, [])

  // Filter data by type
  const mainboardIPOs = subscriptionData.filter(ipo => ipo.type === "Mainboard")
  const smeIPOs = subscriptionData.filter(ipo => ipo.type === "SME")

  // Refresh data function
  const refreshData = () => {
    const enhanced = mockIPOData
      .filter(ipo => ipo.status === "Current")
      .map(enhanceWithSubscriptionData)
    setSubscriptionData(enhanced)
    setLastRefresh(new Date().toLocaleString('en-IN'))
  }

  // Calculate aggregate metrics
  const totalBidAmount = subscriptionData.reduce((sum, ipo) => 
    sum + ipo.categorySubscription.qib.bidAmount + 
    ipo.categorySubscription.nii_shni.bidAmount + 
    ipo.categorySubscription.nii_bhni.bidAmount + 
    ipo.categorySubscription.retail.bidAmount + 
    ipo.categorySubscription.employee.bidAmount + 
    ipo.categorySubscription.shareholder.bidAmount, 0
  )

  const totalApplications = subscriptionData.reduce((sum, ipo) => 
    sum + ipo.exchanges.consolidated.applications, 0
  )

  // Render IPO subscription table
  const renderSubscriptionTable = (ipos: SubscriptionData[], title: string) => (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant="outline" className="text-xs">
            {ipos.length} Active IPOs
          </Badge>
        </CardTitle>
        <CardDescription>
          Real-time subscription data across all categories and exchanges
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="min-w-[200px]">IPO Details</TableHead>
                <TableHead className="text-center">Overall Subscription</TableHead>
                <TableHead className="text-center">QIB</TableHead>
                <TableHead className="text-center">NII (SHNI)</TableHead>
                <TableHead className="text-center">NII (BHNI)</TableHead>
                <TableHead className="text-center">Retail</TableHead>
                <TableHead className="text-center">Total Bid Amount</TableHead>
                <TableHead className="text-center">Applications</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ipos.map((ipo) => (
                <TableRow 
                  key={ipo.id} 
                  className="hover:bg-muted/20 cursor-pointer"
                  onClick={() => setSelectedIPO(ipo)}
                >
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div className="font-semibold">{ipo.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Price: ₹{ipo.price} | Lot: {ipo.lotSize} | {ipo.sector}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">NSE: {ipo.exchanges.nse.timesSubscribed.toFixed(1)}x</Badge>
                        <Badge variant="outline" className="text-xs">BSE: {ipo.exchanges.bse.timesSubscribed.toFixed(1)}x</Badge>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-bold text-lg">
                        {ipo.exchanges.consolidated.timesSubscribed.toFixed(1)}x
                      </div>
                      <Progress 
                        value={Math.min(ipo.exchanges.consolidated.timesSubscribed * 10, 100)} 
                        className="h-2 w-16 mx-auto"
                      />
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-semibold">{ipo.categorySubscription.qib.subscribed.toFixed(1)}x</div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(ipo.categorySubscription.qib.bidAmount)}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-semibold">{ipo.categorySubscription.nii_shni.subscribed.toFixed(1)}x</div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(ipo.categorySubscription.nii_shni.bidAmount)}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-semibold">{ipo.categorySubscription.nii_bhni.subscribed.toFixed(1)}x</div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(ipo.categorySubscription.nii_bhni.bidAmount)}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-semibold">{ipo.categorySubscription.retail.subscribed.toFixed(1)}x</div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(ipo.categorySubscription.retail.bidAmount)}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="font-semibold">
                      {formatCurrency(
                        ipo.categorySubscription.qib.bidAmount +
                        ipo.categorySubscription.nii_shni.bidAmount +
                        ipo.categorySubscription.nii_bhni.bidAmount +
                        ipo.categorySubscription.retail.bidAmount +
                        ipo.categorySubscription.employee.bidAmount +
                        ipo.categorySubscription.shareholder.bidAmount
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="font-semibold">
                      {formatNumber(ipo.exchanges.consolidated.applications)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Subscription Aggregator</h1>
        <p className="text-muted-foreground">
          Comprehensive subscription tracking across all IPO categories and exchanges with real-time analytics
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscription">Subscription Analysis</TabsTrigger>
          <TabsTrigger value="bid-analysis">Bid Analysis</TabsTrigger>
        </TabsList>

        {/* Subscription Analysis Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Subscription Tables */}
            <div className="xl:col-span-2 space-y-6">
              <Tabs defaultValue="mainboard" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mainboard">Mainboard IPOs</TabsTrigger>
                  <TabsTrigger value="sme">SME IPOs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="mainboard" className="space-y-6">
                  {renderSubscriptionTable(mainboardIPOs, "Mainboard IPO Subscriptions")}
                </TabsContent>
                
                <TabsContent value="sme" className="space-y-6">
                  {renderSubscriptionTable(smeIPOs, "SME IPO Subscriptions")}
                </TabsContent>
              </Tabs>
            </div>

            {/* Charts Section */}
            <div className="space-y-6">
              {selectedIPO && (
                <>
                  {/* IPO Selection Header */}
                  <Card className="border border-border/40">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{selectedIPO.name}</CardTitle>
                      <CardDescription>Subscription Analytics</CardDescription>
                    </CardHeader>
                  </Card>

                  {/* Daily Subscription Pattern */}
                  <Card className="border border-border/40">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Daily Subscription Pattern</CardTitle>
                      <CardDescription>Subscription rate progression over issue period</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={selectedIPO.dailySubscription}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis 
                            dataKey="day" 
                            axisLine={false}
                            tickLine={false}
                            className="text-xs"
                          />
                          <YAxis className="text-xs" />
                          <Tooltip />
                          <Line type="monotone" dataKey="overall" stroke="#2563eb" strokeWidth={2} />
                          <Line type="monotone" dataKey="retail" stroke="#22c55e" strokeWidth={2} />
                          <Line type="monotone" dataKey="qib" stroke="#a21caf" strokeWidth={2} />
                          <Line type="monotone" dataKey="nii" stroke="#f59e42" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Cumulative Bid Amount */}
                  <Card className="border border-border/40">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Cumulative Bid Amount</CardTitle>
                      <CardDescription>Total bid amount progression over issue period</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={selectedIPO.dailySubscription}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="day" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip />
                          <Area type="monotone" dataKey="cumulativeBidAmount" stroke="#2563eb" fill="#2563eb33" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Category-wise Subscription */}
                  <Card className="border border-border/40">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Category-wise Subscription</CardTitle>
                      <CardDescription>Breakdown of subscription by investor category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                          { name: "QIB", value: selectedIPO.categorySubscription.qib.subscribed },
                          { name: "SHNI", value: selectedIPO.categorySubscription.nii_shni.subscribed },
                          { name: "BHNI", value: selectedIPO.categorySubscription.nii_bhni.subscribed },
                          { name: "Retail", value: selectedIPO.categorySubscription.retail.subscribed },
                          { name: "Employee", value: selectedIPO.categorySubscription.employee.subscribed },
                          { name: "Shareholder", value: selectedIPO.categorySubscription.shareholder.subscribed },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="name" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#2563eb" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Bid Analysis Tab */}
        <TabsContent value="bid-analysis" className="space-y-6">
          {/* Company and Exchange Selection */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedBidCompany} onValueChange={setSelectedBidCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {mockBidDetailsData.map((bid) => (
                    <SelectItem key={bid.id} value={bid.id.toString()}>
                      {bid.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedExchange} onValueChange={(value: "BSE" | "NSE" | "Combined") => setSelectedExchange(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Exchange" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BSE">BSE</SelectItem>
                  <SelectItem value="NSE">NSE</SelectItem>
                  <SelectItem value="Combined">Combined (NSE + BSE)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Price Band</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{currentBidData.priceBand.min} - ₹{currentBidData.priceBand.max}
                </div>
                <p className="text-xs text-muted-foreground">
                  Cut-off: ₹{currentBidData.cutOffPrice}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Subscription</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentBidData.overallSubscription}x</div>
                <p className="text-xs text-muted-foreground">
                  Total subscription rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatQuantity(currentBidData.totalSharesBidFor)}</div>
                <p className="text-xs text-muted-foreground">
                  Shares bid for
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cut-off Bids</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatQuantity(currentBidData.cutOffBids)}</div>
                <p className="text-xs text-muted-foreground">
                  At cut-off price
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bid Analysis Content */}
          <Tabs defaultValue="bid-details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bid-details">Bid Details</TabsTrigger>
              <TabsTrigger value="demand-schedule">Demand Schedule</TabsTrigger>
              <TabsTrigger value="charts">Visual Analysis</TabsTrigger>
            </TabsList>

            {/* Bid Details Tab */}
            <TabsContent value="bid-details">
              <Card>
                <CardHeader>
                  <CardTitle>Bid Details ({selectedExchange})</CardTitle>
                  <CardDescription>
                    Price-wise bid distribution for {currentBidData.companyName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Price (₹)</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>Cumulative</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentBidData.bidPrices.map((bid, index) => {
                          const percentage = ((bid.quantity / currentBidData.totalSharesBidFor) * 100).toFixed(2)
                          const cumulative = currentBidData.bidPrices
                            .slice(0, index + 1)
                            .reduce((sum, b) => sum + b.quantity, 0)
                          const cumulativePercentage = ((cumulative / currentBidData.totalSharesBidFor) * 100).toFixed(2)

                          return (
                            <TableRow key={bid.price}>
                              <TableCell className="font-medium">
                                {bid.price === currentBidData.cutOffPrice && (
                                  <Badge variant="secondary" className="mr-2">Cut-off</Badge>
                                )}
                                ₹{bid.price}
                              </TableCell>
                              <TableCell>{formatQuantity(bid.quantity)}</TableCell>
                              <TableCell>{percentage}%</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress value={parseFloat(cumulativePercentage)} className="w-20" />
                                  {cumulativePercentage}%
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                        <TableRow className="border-t-2">
                          <TableCell className="font-bold">Cut-off Bids</TableCell>
                          <TableCell className="font-bold">{formatQuantity(currentBidData.cutOffBids)}</TableCell>
                          <TableCell className="font-bold">
                            {((currentBidData.cutOffBids / currentBidData.totalSharesBidFor) * 100).toFixed(2)}%
                          </TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Demand Schedule Tab */}
            <TabsContent value="demand-schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Demand Schedule ({selectedExchange})</CardTitle>
                  <CardDescription>
                    Category-wise subscription details for {currentBidData.companyName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Shares Offered/Reserved</TableHead>
                          <TableHead>Shares Bid For</TableHead>
                          <TableHead>Subscription Multiple</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentBidData.demandSchedule.map((item, index) => (
                          <TableRow key={index} className={item.subcategory ? "text-sm text-muted-foreground" : ""}>
                            <TableCell>
                              <div className={item.subcategory ? "ml-4" : "font-medium"}>
                                {item.subcategory ? `${item.category} (${item.subcategory})` : item.category}
                              </div>
                            </TableCell>
                            <TableCell>
                              {item.sharesOffered > 0 ? formatQuantity(item.sharesOffered) : "-"}
                            </TableCell>
                            <TableCell>{formatQuantity(item.sharesBidFor)}</TableCell>
                            <TableCell>
                              {item.subscriptionMultiple > 0 ? (
                                <Badge 
                                  variant={item.subscriptionMultiple >= 1 ? "default" : "secondary"}
                                  className={item.subscriptionMultiple >= 1 ? "bg-green-500" : "bg-orange-500"}
                                >
                                  {item.subscriptionMultiple.toFixed(2)}x
                                </Badge>
                              ) : "-"}
                            </TableCell>
                            <TableCell>
                              {item.subscriptionMultiple > 0 && (
                                <Badge variant={item.subscriptionMultiple >= 1 ? "default" : "outline"}>
                                  {item.subscriptionMultiple >= 1 ? "Oversubscribed" : "Undersubscribed"}
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="border-t-2 font-bold">
                          <TableCell>Total</TableCell>
                          <TableCell>{formatQuantity(currentBidData.totalSharesOffered)}</TableCell>
                          <TableCell>{formatQuantity(currentBidData.totalSharesBidFor)}</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-500">
                              {currentBidData.overallSubscription.toFixed(2)}x
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={currentBidData.overallSubscription >= 1 ? "default" : "outline"}>
                              {currentBidData.overallSubscription >= 1 ? "Oversubscribed" : "Undersubscribed"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Charts Tab */}
            <TabsContent value="charts">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Bid Distribution Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Bid Distribution by Price</CardTitle>
                    <CardDescription>
                      Quantity of bids at each price level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bidChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="price" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                          />
                          <YAxis 
                            tickFormatter={(value) => `${value}L`}
                          />
                          <Tooltip 
                            formatter={(value: number) => [`${formatQuantity(value * 100000)}`, 'Quantity']}
                            labelFormatter={(label) => `Price: ${label}`}
                          />
                          <Bar dataKey="quantityInLakhs" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Demand Distribution Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Demand Distribution by Category</CardTitle>
                    <CardDescription>
                      Share of bids from each investor category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={demandChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(1)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="bidFor"
                          >
                            {demandChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => [formatQuantity(value), 'Shares Bid']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription Rate Comparison */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Subscription Rate by Category</CardTitle>
                    <CardDescription>
                      Comparison of subscription multiples across investor categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={demandChartData} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 'dataMax']} />
                          <YAxis dataKey="category" type="category" width={100} />
                          <Tooltip 
                            formatter={(value: number) => [`${value.toFixed(2)}x`, 'Subscription']}
                          />
                          <Bar dataKey="subscription" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last updated: {new Date(currentBidData.lastUpdated).toLocaleString()}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}