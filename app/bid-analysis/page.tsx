"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatIndianValue } from "@/lib/utils"
import { mockBidDetailsData, BidDetails } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Users, Building2, Calculator, Clock } from "lucide-react"

export default function BidAnalysisPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>(mockBidDetailsData[0]?.id.toString() || "1")
  const [selectedExchange, setSelectedExchange] = useState<"BSE" | "NSE" | "Combined">("BSE")

  const currentBidData = mockBidDetailsData.find(bid => bid.id.toString() === selectedCompany) || mockBidDetailsData[0]

  // Prepare chart data for bid prices
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

  const formatCurrency = (value: number) => {
    return `₹${formatIndianValue(value)}`
  }

  const formatQuantity = (value: number) => {
    return formatIndianValue(value)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">IPO Bid Analysis</h1>
        </div>
        <p className="text-muted-foreground">
          Comprehensive bid details and demand schedule analysis for IPOs
        </p>
      </div>

      {/* Company and Exchange Selection */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
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

      {/* Main Content Tabs */}
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
    </div>
  )
}