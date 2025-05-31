"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatIndianCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, RefreshCw, LineChart } from "lucide-react"
import { mockIPOData, type IPOData } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock GMP trend data for visualization
interface GMPTrendData {
  date: string
  gmp: number
  percentage: number
}

// Mock function to generate GMP trends (in real app, this would come from API)
const generateGMPTrends = (currentGMP: number, days: number = 7): GMPTrendData[] => {
  const trends: GMPTrendData[] = []
  const baseDate = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() - i)
    
    // Generate some realistic variation around current GMP
    const variation = (Math.random() - 0.5) * 0.3 // ±15% variation
    const gmp = Math.max(0, Math.round(currentGMP * (1 + variation)))
    const percentage = parseFloat(((gmp / (currentGMP - gmp)) * 100).toFixed(1))
    
    trends.push({
      date: date.toLocaleDateString('en-IN'),
      gmp,
      percentage: isFinite(percentage) ? percentage : 0
    })
  }
  
  return trends
}

// Enhanced IPO data with additional GMP metrics
interface EnhancedIPOData extends IPOData {
  estimatedListingPrice: number
  estimatedProfitRetail: number
  estimatedProfitSHNI: number
  estimatedProfitBHNI: number
  kostakRateRetail: number
  kostakRateHNI: number
  subject2SaudaRetail: number
  subject2SaudaHNI: number
  lastUpdated: string
  source: string
  gmpTrends: GMPTrendData[]
}

// Function to enhance IPO data with calculated metrics
const enhanceIPOData = (ipo: IPOData): EnhancedIPOData => {
  const estimatedListingPrice = ipo.price + ipo.gmp
  const estimatedProfitRetail = ipo.gmp * ipo.lotSize
  const estimatedProfitSHNI = ipo.gmp * ipo.categoryDetails.shni.lotSize * ipo.lotSize
  const estimatedProfitBHNI = ipo.gmp * ipo.categoryDetails.bhni.lotSize * ipo.lotSize
  
  // Mock rates for demonstration (in real app, these would come from data sources)
  const kostakRateRetail = Math.round(ipo.gmp * 0.7) // 70% of GMP typically
  const kostakRateHNI = Math.round(ipo.gmp * 0.8) // 80% of GMP typically
  const subject2SaudaRetail = Math.round(ipo.gmp * 0.85) // 85% of GMP typically
  const subject2SaudaHNI = Math.round(ipo.gmp * 0.9) // 90% of GMP typically
  
  // Mock sources rotation
  const sources = ["InvestorGain", "IPOCentral", "IPOWatch", "IPOPremium"]
  const source = sources[ipo.id % sources.length]
  
  const lastUpdated = new Date().toLocaleString('en-IN')
  const gmpTrends = generateGMPTrends(ipo.gmp)
  
  return {
    ...ipo,
    estimatedListingPrice,
    estimatedProfitRetail,
    estimatedProfitSHNI,
    estimatedProfitBHNI,
    kostakRateRetail,
    kostakRateHNI,
    subject2SaudaRetail,
    subject2SaudaHNI,
    lastUpdated,
    source,
    gmpTrends
  }
}

export default function GMPAggregator() {
  const [enhancedIPOs, setEnhancedIPOs] = useState<EnhancedIPOData[]>([])
  const [selectedIPOForTrend, setSelectedIPOForTrend] = useState<EnhancedIPOData | null>(null)
  const [lastRefresh, setLastRefresh] = useState<string>("")
  
  // Initialize enhanced IPO data
  useEffect(() => {
    const enhanced = mockIPOData.map(enhanceIPOData)
    setEnhancedIPOs(enhanced)
    setLastRefresh(new Date().toLocaleString('en-IN'))
  }, [])
  
  // Filter IPOs by type
  const mainboardIPOs = enhancedIPOs.filter(ipo => ipo.type === "Mainboard")
  const smeIPOs = enhancedIPOs.filter(ipo => ipo.type === "SME")
  
  // Refresh data function
  const refreshData = () => {
    const enhanced = mockIPOData.map(enhanceIPOData)
    setEnhancedIPOs(enhanced)
    setLastRefresh(new Date().toLocaleString('en-IN'))
  }
  
  // Render IPO table
  const renderIPOTable = (ipos: EnhancedIPOData[], title: string) => (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant="outline" className="text-xs">
            {ipos.length} IPOs
          </Badge>
        </CardTitle>
        <CardDescription>
          Latest GMP, Kostak rates, and Subject to Sauda prices from multiple sources
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="min-w-[200px]">IPO Details</TableHead>
                <TableHead className="text-center">IPO Price</TableHead>
                <TableHead className="text-center">GMP</TableHead>
                <TableHead className="text-center">Est. Listing Price</TableHead>
                <TableHead className="text-center">Est. Profit (₹)</TableHead>
                <TableHead className="text-center">Kostak Rates</TableHead>
                <TableHead className="text-center">Subject 2 Sauda</TableHead>
                <TableHead className="text-center">Source</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ipos.map((ipo) => (
                <TableRow key={ipo.id} className="hover:bg-muted/20">
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <div className="font-semibold">{ipo.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Lot Size: {ipo.lotSize} | {ipo.sector} | {ipo.status}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Updated: {ipo.lastUpdated}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="font-semibold">₹{ipo.price}</div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <div className="font-semibold text-green-600">₹{ipo.gmp}</div>
                      <Badge 
                        variant={ipo.gmpPercentage > 0 ? "default" : "destructive"} 
                        className="text-xs"
                      >
                        {ipo.gmpPercentage > 0 ? "+" : ""}{ipo.gmpPercentage}%
                      </Badge>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="font-semibold">₹{ipo.estimatedListingPrice}</div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="space-y-1 text-xs">
                      <div><span className="font-medium">Retail:</span> ₹{ipo.estimatedProfitRetail.toLocaleString('en-IN')}</div>
                      <div><span className="font-medium">SHNI:</span> ₹{ipo.estimatedProfitSHNI.toLocaleString('en-IN')}</div>
                      <div><span className="font-medium">BHNI:</span> ₹{ipo.estimatedProfitBHNI.toLocaleString('en-IN')}</div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="space-y-1 text-xs">
                      <div><span className="font-medium">Retail:</span> ₹{ipo.kostakRateRetail}</div>
                      <div><span className="font-medium">HNI:</span> ₹{ipo.kostakRateHNI}</div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <div className="space-y-1 text-xs">
                      <div><span className="font-medium">Retail:</span> ₹{ipo.subject2SaudaRetail}</div>
                      <div><span className="font-medium">HNI:</span> ₹{ipo.subject2SaudaHNI}</div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {ipo.source}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedIPOForTrend(ipo)}
                      className="text-xs"
                    >
                      <LineChart className="h-3 w-3 mr-1" />
                      Trends
                    </Button>
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
        <h1 className="text-3xl font-bold">GMP Aggregator</h1>
        <p className="text-muted-foreground">
          Real-time Grey Market Premium, Kostak rates, and Subject to Sauda prices from multiple sources
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border/40">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total IPOs</div>
              <div className="text-2xl font-bold">{enhancedIPOs.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Mainboard IPOs</div>
              <div className="text-2xl font-bold text-blue-600">{mainboardIPOs.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">SME IPOs</div>
              <div className="text-2xl font-bold text-green-600">{smeIPOs.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border/40">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Last Refresh</div>
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
      
      {/* IPO Tables */}
      <Tabs defaultValue="mainboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mainboard">Mainboard IPOs</TabsTrigger>
          <TabsTrigger value="sme">SME IPOs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mainboard" className="space-y-6">
          {renderIPOTable(mainboardIPOs, "Mainboard IPOs")}
        </TabsContent>
        
        <TabsContent value="sme" className="space-y-6">
          {renderIPOTable(smeIPOs, "SME IPOs")}
        </TabsContent>
      </Tabs>
      
      {/* GMP Trend Modal/Card */}
      {selectedIPOForTrend && (
        <Card className="border border-border/40 shadow-sm">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center justify-between">
              GMP Trends - {selectedIPOForTrend.name}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedIPOForTrend(null)}
              >
                Close
              </Button>
            </CardTitle>
            <CardDescription>
              7-day GMP fluctuation data from {selectedIPOForTrend.source}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Current Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-border/40">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Current GMP</div>
                      <div className="text-xl font-bold text-green-600">₹{selectedIPOForTrend.gmp}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-border/40">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">GMP %</div>
                      <div className="text-xl font-bold">{selectedIPOForTrend.gmpPercentage}%</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-border/40">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Est. Listing Price</div>
                      <div className="text-xl font-bold">₹{selectedIPOForTrend.estimatedListingPrice}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Trend Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">GMP (₹)</TableHead>
                      <TableHead className="text-center">GMP %</TableHead>
                      <TableHead className="text-center">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedIPOForTrend.gmpTrends.map((trend, index) => {
                      const previousTrend = index > 0 ? selectedIPOForTrend.gmpTrends[index - 1] : null
                      const isUp = previousTrend ? trend.gmp > previousTrend.gmp : false
                      const isDown = previousTrend ? trend.gmp < previousTrend.gmp : false
                      
                      return (
                        <TableRow key={trend.date}>
                          <TableCell className="font-medium">{trend.date}</TableCell>
                          <TableCell className="text-center font-semibold">₹{trend.gmp}</TableCell>
                          <TableCell className="text-center">{trend.percentage}%</TableCell>
                          <TableCell className="text-center">
                            {isUp && <TrendingUp className="h-4 w-4 text-green-600 mx-auto" />}
                            {isDown && <TrendingDown className="h-4 w-4 text-red-600 mx-auto" />}
                            {!isUp && !isDown && <div className="w-4 h-4 mx-auto">-</div>}
                          </TableCell>
                        </TableRow>
                      )
                    })}
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