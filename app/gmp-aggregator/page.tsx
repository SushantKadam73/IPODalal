"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatIndianCurrency } from "@/lib/utils"
import { RefreshCw } from "lucide-react"
import { mockIPOData, type IPOData } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    source
  }
}

export default function GMPAggregator() {
  const [enhancedIPOs, setEnhancedIPOs] = useState<EnhancedIPOData[]>([])
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
    </div>
  )
}
