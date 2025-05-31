"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, TrendingUp, Users, Building2, Target } from "lucide-react"
import { mockIPOData, type IPOData } from "@/lib/mock-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts"

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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border/40">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div className="text-sm text-muted-foreground">Active IPOs</div>
              </div>
              <div className="text-2xl font-bold">{subscriptionData.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-green-600" />
                <div className="text-sm text-muted-foreground">Total Bid Amount</div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalBidAmount)}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <div className="text-sm text-muted-foreground">Total Applications</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(totalApplications)}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Last Updated</div>
              <div className="text-sm font-medium">{lastRefresh}</div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshData}
                className="w-full text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
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
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        className="text-xs"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                      />
                      <Line type="monotone" dataKey="retail" stroke="#3b82f6" strokeWidth={2} name="Retail" />
                      <Line type="monotone" dataKey="nii" stroke="#ef4444" strokeWidth={2} name="NII" />
                      <Line type="monotone" dataKey="qib" stroke="#10b981" strokeWidth={2} name="QIB" />
                      <Line type="monotone" dataKey="overall" stroke="#8b5cf6" strokeWidth={2} name="Overall" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Money Inflow Chart */}
              <Card className="border border-border/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Cumulative Bid Amount</CardTitle>
                  <CardDescription>Money inflow over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={selectedIPO.dailySubscription}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false}
                        tickLine={false}
                        className="text-xs"
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        className="text-xs"
                        tickFormatter={(value) => formatCurrency(value)}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px'
                        }}
                        formatter={(value) => [formatCurrency(Number(value)), "Bid Amount"]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="cumulativeBidAmount" 
                        stroke="#6366f1" 
                        fill="#6366f1" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <Card className="border border-border/40">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Category-wise Subscription</CardTitle>
                  <CardDescription>Current subscription rates by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(selectedIPO.categorySubscription).map(([category, data]) => {
                      if (data.subscribed === 0) return null
                      const categoryName = category.replace('_', ' ').toUpperCase()
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{categoryName}</span>
                            <span className="text-muted-foreground">{data.subscribed.toFixed(1)}x</span>
                          </div>
                          <Progress value={Math.min(data.subscribed * 20, 100)} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{formatCurrency(data.bidAmount)}</span>
                            <span>{formatNumber(data.applications)} apps</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}