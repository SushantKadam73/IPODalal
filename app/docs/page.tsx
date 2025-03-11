import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">IPO Dalal Documentation</h1>
        <p className="text-muted-foreground">Learn about the features, updates, and roadmap of the IPO Dalal project</p>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="changelog">Changelog</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="help">Help Guide</TabsTrigger>
        </TabsList>

        {/* Features Documentation */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Project Features</CardTitle>
              <CardDescription>Overview of the current features available in IPO Dalal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">IPO Dashboard</h3>
                <p className="text-muted-foreground">
                  The IPO Dashboard provides a comprehensive view of the IPO market, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Market summary with key indicators like Nifty 50, Bank Nifty, USD/INR, and more</li>
                  <li>Ongoing IPOs with details on price, GMP, subscription rates, and important dates</li>
                  <li>Upcoming IPOs to help you plan your investments</li>
                  <li>Past IPOs with listing performance and current market prices</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Funding Calculator</h3>
                <p className="text-muted-foreground">The Funding Calculator helps you plan your IPO investments by:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Calculating the total capital required for applying to multiple IPOs</li>
                  <li>Estimating interest costs based on your loan parameters</li>
                  <li>Computing expected returns and allocation based on subscription rates</li>
                  <li>Providing category-wise application details (Retail, HNI, etc.)</li>
                  <li>Filtering IPOs by type (Mainboard/SME) and status (Current/Upcoming)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Allocation Optimizer</h3>
                <p className="text-muted-foreground">
                  The Allocation Optimizer helps you make the most of your available capital by:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Implementing four distinct allocation strategies (GMP, Subscription Rate, Capital Utilization,
                    Optimize)
                  </li>
                  <li>Prioritizing IPOs based on your selected strategy</li>
                  <li>Recommending optimal lot allocations across multiple IPOs</li>
                  <li>Estimating potential returns based on current GMP</li>
                  <li>Accounting for different account types (Retail, Shareholder, Employee)</li>
                  <li>Calculating expected allotment based on subscription rates and allotment rules</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Changelog */}
        <TabsContent value="changelog">
          <Card>
            <CardHeader>
              <CardTitle>Changelog</CardTitle>
              <CardDescription>Version history and updates to the IPO Dalal project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-2 border-primary pl-4 space-y-2">
                <h3 className="text-lg font-semibold">Version 0.0.3 (March 09, 2025)</h3>
                <p className="text-sm text-muted-foreground">Added new features and improvements:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Enhanced Allocation Optimizer with four allocation strategies</li>
                  <li>Added GitHub and Twitter social links</li>
                  <li>Updated documentation with more detailed information</li>
                  <li>Improved UI consistency across all pages</li>
                  <li>Added tooltips for better user guidance</li>
                </ul>
              </div>

              <div className="border-l-2 border-primary pl-4 space-y-2">
                <h3 className="text-lg font-semibold">Version 0.0.2 (March 09, 2025)</h3>
                <p className="text-sm text-muted-foreground">Enhanced functionality and UI improvements:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Refined investor categories display in Funding Calculator</li>
                  <li>Added IPO selection filters (Mainboard/SME and Current/Upcoming)</li>
                  <li>Enhanced IPO selection with more detailed information (GMP %, subscription rates by category)</li>
                  <li>Added returned money calculation and total lots applied in results</li>
                  <li>Added expected lots allocation and max shares allotment columns</li>
                  <li>Added number of accounts parameter to Allocation Optimizer</li>
                  <li>Standardized unit formatting throughout the application</li>
                  <li>Fixed various UI inconsistencies and improved responsive design</li>
                </ul>
              </div>

              <div className="border-l-2 border-primary pl-4 space-y-2">
                <h3 className="text-lg font-semibold">Version 0.0.1 (February 25, 2025)</h3>
                <p className="text-sm text-muted-foreground">Initial release of IPO Dalal with core features:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>IPO Dashboard with market summary and IPO tables</li>
                  <li>Basic Funding Calculator with interest cost estimation</li>
                  <li>Simple Allocation Optimizer</li>
                  <li>Documentation and help guides</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roadmap */}
        <TabsContent value="roadmap">
          <Card>
            <CardHeader>
              <CardTitle>Future Feature Implementation (Roadmap)</CardTitle>
              <CardDescription>Planned features and enhancements for upcoming releases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Phase 2 (Planned)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>User accounts and personalized dashboards</li>
                  <li>IPO Calendar with visual timeline</li>
                  <li>GMP tracking with historical data and trends</li>
                  <li>Advanced allocation optimization algorithms</li>
                  <li>Email notifications for IPO events (opening, closing, allotment)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Phase 3 (Planned)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Portfolio tracking for IPO investments</li>
                  <li>Integration with broker APIs for direct applications</li>
                  <li>Advanced analytics and performance metrics</li>
                  <li>Community features for IPO discussions and insights</li>
                  <li>Mobile app for on-the-go IPO tracking</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Phase 4 (Planned)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-powered IPO success prediction</li>
                  <li>Comprehensive company research and analysis</li>
                  <li>Integration with tax planning tools</li>
                  <li>International IPO tracking and comparison</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Help Guide */}
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>How to Navigate/Help Guide</CardTitle>
              <CardDescription>Basic instructions on using the website and its features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">IPO Dashboard</h3>
                <p className="text-muted-foreground">The dashboard is your central hub for IPO information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the tabs to switch between Ongoing, Upcoming, and Past IPOs</li>
                  <li>Check the market summary at the top for key market indicators</li>
                  <li>Look for "Closing Today" tags to identify IPOs that are closing for subscription</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Funding Calculator</h3>
                <p className="text-muted-foreground">To use the Funding Calculator:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Set your interest rate and loan period</li>
                  <li>Use the IPO Type and IPO Status filters to narrow down your selection</li>
                  <li>Select IPOs from the available list</li>
                  <li>For each IPO, specify the number of applications for each category</li>
                  <li>Click "Calculate" to see the detailed breakdown of your investment</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Allocation Optimizer</h3>
                <p className="text-muted-foreground">To use the Allocation Optimizer:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Enter your available capital and number of accounts</li>
                  <li>Select an allocation strategy based on your investment goals</li>
                  <li>Use the IPO Type and IPO Status filters to narrow down your selection</li>
                  <li>Select the IPOs you want to consider</li>
                  <li>Click "Calculate" to get recommendations based on your selected strategy</li>
                </ol>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Need More Help?</h3>
                <p className="text-sm text-muted-foreground">
                  If you have any questions or need assistance, please visit our{" "}
                  <Link
                    href="https://github.com/SushantKadam73/IPODalal/issues"
                    className="text-primary hover:underline"
                  >
                    GitHub Issues
                  </Link>{" "}
                  page to report problems or request features.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-muted-foreground">
        <p>IPO Dalal v0.0.3 | Last Updated: March 09, 2025</p>
      </div>
    </div>
  )
}

