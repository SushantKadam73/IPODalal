import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Send } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">IPO Dalal Documentation</h1>
        <p className="text-muted-foreground">Learn about the updates and provide feedback for the IPO Dalal project</p>
      </div>

      <Tabs defaultValue="changelog" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="changelog">Changelog</TabsTrigger>
          <TabsTrigger value="feedback">Send Feedback</TabsTrigger>
        </TabsList>

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
                  <li>Documentation and help guides</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Form */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Send Feedback or Report a Problem</CardTitle>
              <CardDescription>Help us improve IPO Dalal by sharing your thoughts or reporting issues</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback-type">Feedback Type</Label>
                  <select 
                    id="feedback-type" 
                    className="w-full p-2 rounded-md border border-input bg-background"
                  >
                    <option value="suggestion">Feature Suggestion</option>
                    <option value="bug">Bug Report</option>
                    <option value="question">Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your feedback or issue in detail..." 
                    className="min-h-[150px]"
                  />
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <p>You can also report issues directly on our <Link href="https://github.com/SushantKadam73/IPODalal/issues" className="text-primary hover:underline">GitHub Issues</Link> page.</p>
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </Button>
              </form>
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

