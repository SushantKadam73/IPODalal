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
                  <li>Market summary with key indicators like Nifty 50, Bank Nifty, USD/INR, Bitcoin, and Market Mood Index</li>
                  <li>Ongoing IPOs with details on price, GMP, subscription rates, and important dates</li>
                  <li>Upcoming IPOs to help you plan your investments</li>
                  <li>Past IPOs with listing performance and current market prices</li>
                  <li>Separate tabs for Mainboard and SME IPOs for better organization</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">GMP Aggregator</h3>
                <p className="text-muted-foreground">The GMP Aggregator provides comprehensive Grey Market Premium tracking with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Real-time GMP data aggregated from multiple sources (InvestorGain, IPOCentral, IPOWatch, IPOPremium)</li>
                  <li>Estimated listing prices and profit calculations for different categories</li>
                  <li>Kostak rates for both retail and HNI investors</li>
                  <li>Subject to Sauda prices for grey market trading</li>
                  <li>Separate views for Mainboard and SME IPOs</li>
                  <li>Last updated timestamps for data freshness tracking</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Subscription Aggregator</h3>
                <p className="text-muted-foreground">The Subscription Aggregator offers detailed subscription tracking with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Exchange-wise subscription data (NSE, BSE, and Consolidated)</li>
                  <li>Category-wise subscription rates (QIB, NII SHNI, NII BHNI, Retail, Employee, Shareholder)</li>
                  <li>Interactive charts showing daily subscription patterns over the issue period</li>
                  <li>Money inflow charts displaying cumulative bid amounts over time</li>
                  <li>Total bid amounts and application counts for each IPO</li>
                  <li>Click-to-view detailed analytics for individual IPOs</li>
                  <li>Progress indicators for subscription visualization</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">IPO Selection Dashboard</h3>
                <p className="text-muted-foreground">
                  The IPO Selection Dashboard helps you discover and analyze IPOs with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Smart selection criteria with customizable GMP thresholds and risk tolerance</li>
                  <li>Advanced filtering by IPO type, status, sector, and risk rating</li>
                  <li>Automated smart selection based on your investment preferences</li>
                  <li>Integrated category input controls for each IPO (Retail, SHNI, BHNI, Shareholder, Employee)</li>
                  <li>Real-time calculation of lots and investment values</li>
                  <li>Discount highlighting for shareholder and employee categories</li>
                  <li>Bulk selection and reset functionality</li>
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
                  <li>Expected allotment calculations based on historical data</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Allocation Optimizer</h3>
                <p className="text-muted-foreground">
                  The Allocation Optimizer helps you make the most of your available capital by:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Implementing four distinct allocation strategies:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>GMP Strategy:</strong> Prioritizes IPOs with highest GMP percentage</li>
                      <li><strong>Subscription Strategy:</strong> Focuses on IPOs with lower subscription rates for better allotment chances</li>
                      <li><strong>Capital Utilization:</strong> Maximizes number of applications by prioritizing lower-cost IPOs</li>
                      <li><strong>Optimize Strategy:</strong> Combines GMP, subscription rate, and capital efficiency</li>
                    </ul>
                  </li>
                  <li>Multi-account support for Retail, Shareholder, and Employee categories</li>
                  <li>Intelligent allotment probability calculations based on subscription rates</li>
                  <li>Comprehensive results showing expected gains, ROI, and capital utilization</li>
                  <li>Support for discount pricing in shareholder and employee categories</li>
                  <li>Detailed account tracking and remaining capital management</li>
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
                <h3 className="text-lg font-semibold">Version 0.4.0 (Current Development)</h3>
                <p className="text-sm text-muted-foreground">Major feature additions and enhancements:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>NEW:</strong> Subscription Aggregator with comprehensive subscription tracking</li>
                  <li><strong>NEW:</strong> IPO Selection Dashboard with smart selection capabilities</li>
                  <li><strong>Enhanced:</strong> GMP Aggregator with multi-source data aggregation</li>
                  <li><strong>Enhanced:</strong> Allocation Optimizer with four distinct strategies</li>
                  <li>Added interactive charts and visualizations using Recharts</li>
                  <li>Improved user interface with better navigation and responsiveness</li>
                  <li>Added real-time data refresh capabilities</li>
                  <li>Enhanced category management with discount tracking</li>
                </ul>
              </div>

              <div className="border-l-2 border-muted pl-4 space-y-2">
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

              <div className="border-l-2 border-muted pl-4 space-y-2">
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

              <div className="border-l-2 border-muted pl-4 space-y-2">
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
                  <li>Real-time data integration with live IPO and GMP feeds</li>
                  <li>Database implementation to replace mock data</li>
                  <li>User accounts and personalized dashboards</li>
                  <li>Advanced analytics with historical trend analysis</li>
                  <li>Email notifications for IPO events (opening, closing, allotment)</li>
                  <li>Enhanced subscription tracking with minute-by-minute updates</li>
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
                  <li>Automated allocation suggestions based on market conditions</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Phase 4 (Planned)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-powered IPO success prediction</li>
                  <li>Comprehensive company research and analysis</li>
                  <li>Integration with tax planning tools</li>
                  <li>International IPO tracking and comparison</li>
                  <li>Advanced risk assessment models</li>
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
              <CardDescription>Comprehensive instructions on using the website and its features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">IPO Dashboard</h3>
                <p className="text-muted-foreground">The dashboard is your central hub for IPO information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the tabs to switch between Mainboard and SME IPOs</li>
                  <li>Check the market summary at the top for key market indicators</li>
                  <li>Look for "Closing Today" tags to identify IPOs that are closing for subscription</li>
                  <li>View ongoing, upcoming, and past IPOs in separate sections</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">GMP Aggregator</h3>
                <p className="text-muted-foreground">To use the GMP Aggregator:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Browse GMP data from multiple verified sources</li>
                  <li>Check estimated listing prices and profit calculations</li>
                  <li>Use the refresh button to get the latest GMP data</li>
                  <li>Switch between Mainboard and SME tabs for focused analysis</li>
                  <li>Monitor Kostak rates and Subject to Sauda prices for grey market insights</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Subscription Aggregator</h3>
                <p className="text-muted-foreground">To use the Subscription Aggregator:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>View real-time subscription data across all categories</li>
                  <li>Click on any IPO row to see detailed subscription analytics</li>
                  <li>Analyze daily subscription patterns using interactive charts</li>
                  <li>Monitor money inflow trends over the issue period</li>
                  <li>Compare NSE vs BSE subscription rates</li>
                  <li>Use the refresh button for the latest subscription data</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">IPO Selection Dashboard</h3>
                <p className="text-muted-foreground">To use the IPO Selection Dashboard:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Set your investment criteria (GMP threshold, risk tolerance)</li>
                  <li>Use advanced filters to narrow down IPOs by sector and risk</li>
                  <li>Click "Smart Selection" for automated IPO recommendations</li>
                  <li>Select individual IPOs using checkboxes</li>
                  <li>Configure applications for each category (Retail, SHNI, BHNI, etc.)</li>
                  <li>Use the integrated controls to adjust lot quantities</li>
                </ol>
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
                  <li>Review expected returns and allotment probabilities</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Allocation Optimizer</h3>
                <p className="text-muted-foreground">To use the Allocation Optimizer:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Enter your available capital in the top section</li>
                  <li>Choose your allocation strategy:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>GMP:</strong> For maximum profit potential</li>
                      <li><strong>Subscription:</strong> For higher allotment probability</li>
                      <li><strong>Capital:</strong> To maximize number of applications</li>
                      <li><strong>Optimize:</strong> For balanced approach</li>
                    </ul>
                  </li>
                  <li>Configure account numbers for each IPO (Retail, Shareholder, Employee)</li>
                  <li>Use filters to select IPO types and status</li>
                  <li>Select the IPOs you want to consider for optimization</li>
                  <li>Click "Calculate Allocation" to get intelligent recommendations</li>
                  <li>Review the detailed results including expected ROI and capital utilization</li>
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
                  page to report problems or request features. You can also follow us on{" "}
                  <Link
                    href="https://x.com/Sushant_Kadam73"
                    className="text-primary hover:underline"
                  >
                    Twitter
                  </Link>{" "}
                  for updates and announcements.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-muted-foreground">
        <p>IPO Dalal v0.4.0 | Last Updated: January 01, 2025</p>
      </div>
    </div>
  )
}
