import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatIndianValue } from "@/lib/utils"
import { ArrowDown, ArrowUp, TrendingUp, DollarSign, Bitcoin, Landmark, Gauge } from "lucide-react"

// Mock data for IPOs
const mainboardOngoingIPOs = [
  {
    id: 1,
    name: "TechSoft India Ltd",
    price: "₹1,125 - ₹1,185",
    gmp: 250,
    subscriptionRate: 4.25,
    issueSize: 1250,
    closeDate: "15 Mar 2025",
    boaDate: "18 Mar 2025",
    listingDate: "20 Mar 2025",
    status: "Closing Today",
  },
  {
    id: 2,
    name: "Green Energy Solutions",
    price: "₹215 - ₹225",
    gmp: 45,
    subscriptionRate: 2.8,
    issueSize: 850,
    closeDate: "18 Mar 2025",
    boaDate: "21 Mar 2025",
    listingDate: "23 Mar 2025",
    status: "Ongoing",
  },
  {
    id: 3,
    name: "Bharat Pharma Ltd",
    price: "₹535 - ₹565",
    gmp: 120,
    subscriptionRate: 6.5,
    issueSize: 1500,
    closeDate: "16 Mar 2025",
    boaDate: "19 Mar 2025",
    listingDate: "21 Mar 2025",
    status: "Ongoing",
  },
]

const mainboardUpcomingIPOs = [
  {
    id: 1,
    name: "Digital Payments Ltd",
    price: "₹450 - ₹475",
    gmp: 85,
    issueSize: 1800,
    openDate: "20 Mar 2025",
    closeDate: "22 Mar 2025",
    boaDate: "25 Mar 2025",
    listingDate: "28 Mar 2025",
  },
  {
    id: 2,
    name: "Infra Projects India",
    price: "₹320 - ₹340",
    gmp: 65,
    issueSize: 2200,
    openDate: "22 Mar 2025",
    closeDate: "24 Mar 2025",
    boaDate: "27 Mar 2025",
    listingDate: "30 Mar 2025",
  },
]

const mainboardPastIPOs = [
  {
    id: 1,
    name: "Cloud Services Ltd",
    symbol: "CLOUDSERV",
    priceRange: "₹850 - ₹900",
    issueSize: 1650,
    listingDate: "10 Mar 2025",
    listingPrice: 1050,
    currentPrice: 1120,
  },
  {
    id: 2,
    name: "Consumer Retail Ltd",
    symbol: "CONRETAIL",
    priceRange: "₹380 - ₹400",
    issueSize: 950,
    listingDate: "05 Mar 2025",
    listingPrice: 450,
    currentPrice: 435,
  },
]

const smeOngoingIPOs = [
  {
    id: 1,
    name: "Tech Micro Solutions",
    price: "₹95 - ₹100",
    gmp: 25,
    subscriptionRate: 8.5,
    issueSize: 50,
    closeDate: "16 Mar 2025",
    boaDate: "19 Mar 2025",
    listingDate: "21 Mar 2025",
    status: "Ongoing",
  },
  {
    id: 2,
    name: "Specialty Chemicals SME",
    price: "₹145 - ₹155",
    gmp: 35,
    subscriptionRate: 12.4,
    issueSize: 45,
    closeDate: "17 Mar 2025",
    boaDate: "20 Mar 2025",
    listingDate: "22 Mar 2025",
    status: "Closing Today",
  },
]

const smeUpcomingIPOs = [
  {
    id: 1,
    name: "Precision Tools Ltd",
    price: "₹125 - ₹135",
    gmp: 30,
    issueSize: 35,
    openDate: "20 Mar 2025",
    closeDate: "22 Mar 2025",
    boaDate: "25 Mar 2025",
    listingDate: "28 Mar 2025",
  },
]

const smePastIPOs = [
  {
    id: 1,
    name: "Healthcare SME Ltd",
    symbol: "HEALTHSME",
    priceRange: "₹110 - ₹120",
    issueSize: 40,
    listingDate: "08 Mar 2025",
    listingPrice: 140,
    currentPrice: 155,
  },
]

// Market indicators data
const marketIndicators = [
  {
    name: "Nifty 50",
    value: "24,825.30",
    change: "+0.75%",
    isPositive: true,
    icon: TrendingUp,
  },
  {
    name: "Bank Nifty",
    value: "48,350.15",
    change: "-0.25%",
    isPositive: false,
    icon: Landmark,
  },
  {
    name: "USD/INR",
    value: "82.45",
    change: "-0.15%",
    isPositive: false,
    icon: DollarSign,
  },
  {
    name: "Bitcoin",
    value: "₹45,25,000",
    change: "+1.2%",
    isPositive: true,
    icon: Bitcoin,
  },
  {
    name: "Market Mood Index",
    value: "67 - Greed",
    change: "+2",
    isPositive: true,
    icon: Gauge,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Market Summary */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {marketIndicators.map((indicator, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{indicator.name}</CardTitle>
              <indicator.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{indicator.value}</div>
              <p className={`text-xs ${indicator.isPositive ? "text-green-500" : "text-red-500"} flex items-center`}>
                {indicator.isPositive ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                {indicator.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* IPO Tabs - Mainboard vs SME */}
      <Tabs defaultValue="mainboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mainboard">Mainboard IPOs</TabsTrigger>
          <TabsTrigger value="sme">SME IPOs</TabsTrigger>
        </TabsList>

        {/* Mainboard IPOs Content */}
        <TabsContent value="mainboard">
          <div className="flex flex-col gap-8">
            {/* Ongoing Mainboard IPOs */}
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Mainboard IPOs</CardTitle>
                <CardDescription>IPOs that are currently open for subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="border p-3 shadow-hard">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>GMP (₹)</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Issue Size (Cr)</TableHead>
                        <TableHead>Close Date</TableHead>
                        <TableHead>BoA Date</TableHead>
                        <TableHead>Listing Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mainboardOngoingIPOs.map((ipo) => (
                        <TableRow key={ipo.id}>
                          <TableCell className="font-medium">{ipo.name}</TableCell>
                          <TableCell>{ipo.price}</TableCell>
                          <TableCell className="text-green-600">+{ipo.gmp}</TableCell>
                          <TableCell>{ipo.subscriptionRate}x</TableCell>
                          <TableCell>{formatIndianValue(ipo.issueSize)}</TableCell>
                          <TableCell>{ipo.closeDate}</TableCell>
                          <TableCell>{ipo.boaDate}</TableCell>
                          <TableCell>{ipo.listingDate}</TableCell>
                          <TableCell>
                            {ipo.status === "Closing Today" ? (
                              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                Closing Today
                              </span>
                            ) : (
                              ipo.status
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Mainboard IPOs */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Mainboard IPOs</CardTitle>
                <CardDescription>IPOs that are scheduled to open for subscription soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="border p-3 shadow-hard">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>GMP (₹)</TableHead>
                        <TableHead>Issue Size (Cr)</TableHead>
                        <TableHead>Open Date</TableHead>
                        <TableHead>Close Date</TableHead>
                        <TableHead>BoA Date</TableHead>
                        <TableHead>Listing Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mainboardUpcomingIPOs.map((ipo) => (
                        <TableRow key={ipo.id}>
                          <TableCell className="font-medium">{ipo.name}</TableCell>
                          <TableCell>{ipo.price}</TableCell>
                          <TableCell className="text-green-600">+{ipo.gmp}</TableCell>
                          <TableCell>{formatIndianValue(ipo.issueSize)}</TableCell>
                          <TableCell>{ipo.openDate}</TableCell>
                          <TableCell>{ipo.closeDate}</TableCell>
                          <TableCell>{ipo.boaDate}</TableCell>
                          <TableCell>{ipo.listingDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Past Mainboard IPOs */}
            <Card>
              <CardHeader>
                <CardTitle>Past Mainboard IPOs</CardTitle>
                <CardDescription>IPOs that have been listed on the stock exchanges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="border p-3 shadow-hard">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Price Range</TableHead>
                        <TableHead>Issue Size (Cr)</TableHead>
                        <TableHead>Listing Date</TableHead>
                        <TableHead>Listing Price (₹)</TableHead>
                        <TableHead>Current Price (₹)</TableHead>
                        <TableHead>Gain/Loss</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mainboardPastIPOs.map((ipo) => {
                        const listingGain = ((ipo.currentPrice - ipo.listingPrice) / ipo.listingPrice) * 100
                        const isPositive = listingGain >= 0

                        return (
                          <TableRow key={ipo.id}>
                            <TableCell className="font-medium">{ipo.name}</TableCell>
                            <TableCell>{ipo.symbol}</TableCell>
                            <TableCell>{ipo.priceRange}</TableCell>
                            <TableCell>{formatIndianValue(ipo.issueSize)}</TableCell>
                            <TableCell>{ipo.listingDate}</TableCell>
                            <TableCell>{ipo.listingPrice}</TableCell>
                            <TableCell>{ipo.currentPrice}</TableCell>
                            <TableCell className={isPositive ? "text-green-600" : "text-red-600"}>
                              {isPositive ? "+" : ""}
                              {listingGain.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SME IPOs Content */}
        <TabsContent value="sme">
          <div className="flex flex-col gap-8">
            {/* Ongoing SME IPOs */}
            <Card>
              <CardHeader>
                <CardTitle>Ongoing SME IPOs</CardTitle>
                <CardDescription>SME IPOs that are currently open for subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="border p-3 shadow-hard">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>GMP (₹)</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Issue Size (Cr)</TableHead>
                        <TableHead>Close Date</TableHead>
                        <TableHead>BoA Date</TableHead>
                        <TableHead>Listing Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {smeOngoingIPOs.map((ipo) => (
                        <TableRow key={ipo.id}>
                          <TableCell className="font-medium">{ipo.name}</TableCell>
                          <TableCell>{ipo.price}</TableCell>
                          <TableCell className="text-green-600">+{ipo.gmp}</TableCell>
                          <TableCell>{ipo.subscriptionRate}x</TableCell>
                          <TableCell>{formatIndianValue(ipo.issueSize)}</TableCell>
                          <TableCell>{ipo.closeDate}</TableCell>
                          <TableCell>{ipo.boaDate}</TableCell>
                          <TableCell>{ipo.listingDate}</TableCell>
                          <TableCell>
                            {ipo.status === "Closing Today" ? (
                              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                Closing Today
                              </span>
                            ) : (
                              ipo.status
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming SME IPOs */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming SME IPOs</CardTitle>
                <CardDescription>SME IPOs that are scheduled to open for subscription soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="border p-3 shadow-hard">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>GMP (₹)</TableHead>
                        <TableHead>Issue Size (Cr)</TableHead>
                        <TableHead>Open Date</TableHead>
                        <TableHead>Close Date</TableHead>
                        <TableHead>BoA Date</TableHead>
                        <TableHead>Listing Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {smeUpcomingIPOs.map((ipo) => (
                        <TableRow key={ipo.id}>
                          <TableCell className="font-medium">{ipo.name}</TableCell>
                          <TableCell>{ipo.price}</TableCell>
                          <TableCell className="text-green-600">+{ipo.gmp}</TableCell>
                          <TableCell>{formatIndianValue(ipo.issueSize)}</TableCell>
                          <TableCell>{ipo.openDate}</TableCell>
                          <TableCell>{ipo.closeDate}</TableCell>
                          <TableCell>{ipo.boaDate}</TableCell>
                          <TableCell>{ipo.listingDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Past SME IPOs */}
            <Card>
              <CardHeader>
                <CardTitle>Past SME IPOs</CardTitle>
                <CardDescription>SME IPOs that have been listed on the stock exchanges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="border p-3 shadow-hard">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Price Range</TableHead>
                        <TableHead>Issue Size (Cr)</TableHead>
                        <TableHead>Listing Date</TableHead>
                        <TableHead>Listing Price (₹)</TableHead>
                        <TableHead>Current Price (₹)</TableHead>
                        <TableHead>Gain/Loss</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {smePastIPOs.map((ipo) => {
                        const listingGain = ((ipo.currentPrice - ipo.listingPrice) / ipo.listingPrice) * 100
                        const isPositive = listingGain >= 0

                        return (
                          <TableRow key={ipo.id}>
                            <TableCell className="font-medium">{ipo.name}</TableCell>
                            <TableCell>{ipo.symbol}</TableCell>
                            <TableCell>{ipo.priceRange}</TableCell>
                            <TableCell>{formatIndianValue(ipo.issueSize)}</TableCell>
                            <TableCell>{ipo.listingDate}</TableCell>
                            <TableCell>{ipo.listingPrice}</TableCell>
                            <TableCell>{ipo.currentPrice}</TableCell>
                            <TableCell className={isPositive ? "text-green-600" : "text-red-600"}>
                              {isPositive ? "+" : ""}
                              {listingGain.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

