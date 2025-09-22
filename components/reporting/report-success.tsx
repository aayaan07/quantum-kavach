"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield, Copy, ArrowRight, Clock, Eye } from "lucide-react"

interface ReportSuccessProps {
  reportId: string
  onBackToDashboard: () => void
}

export function ReportSuccess({ reportId, onBackToDashboard }: ReportSuccessProps) {
  const copyReportId = () => {
    navigator.clipboard.writeText(reportId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-success" />
            <div>
              <h1 className="text-xl font-bold">Report Submitted</h1>
              <p className="text-sm text-muted-foreground">Your incident report has been securely submitted</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="classified-glow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-success" />
              </div>
              <CardTitle className="text-2xl text-success">Report Successfully Submitted</CardTitle>
              <CardDescription>
                Your cyber incident report has been encrypted and submitted to CERT-Army for review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report ID */}
              <div className="p-4 bg-card/50 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Report ID</p>
                    <p className="text-2xl font-mono text-accent">{reportId}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyReportId} className="cursor-pointer">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Save this ID to track your report status</p>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4">
                <h3 className="font-medium">What happens next?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-success">Report Received</p>
                      <p className="text-sm text-muted-foreground">Your report has been securely submitted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">Under Review</p>
                      <p className="text-sm text-muted-foreground">CERT-Army analysts will review within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Investigation</p>
                      <p className="text-sm text-muted-foreground">Detailed analysis and response if required</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Confirmation */}
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-accent">Security Confirmation</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Report encrypted with post-quantum cryptography</li>
                      <li>• Evidence files scanned and secured</li>
                      <li>• Access logged and monitored</li>
                      <li>• Data handled per defence security protocols</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button onClick={onBackToDashboard} className="w-full cursor-pointer" size="lg">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Return to Dashboard
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="cursor-pointer" variant="outline">Track Report Status</Button>
                  <Button className="cursor-pointer" variant="outline">Submit Another Report</Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center text-sm text-muted-foreground">
                <p>Need immediate assistance? Contact CERT-Army at</p>
                <p className="font-mono text-accent">cert-army@gov.in</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
