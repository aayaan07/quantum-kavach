"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, TrendingUp, Bell, Settings, LogOut, Award, BookOpen, AlertCircle } from "lucide-react"
import { IncidentReportFlow } from "../reporting/incident-report-flow"
import { ReportSuccess } from "../reporting/report-success"

interface VeteranDashboardProps {
  userInfo: {
    branch: string
    serviceNumber: string
    email: string
  }
}

export function VeteranDashboard({ userInfo }: VeteranDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showReportFlow, setShowReportFlow] = useState(false)
  const [showReportSuccess, setShowReportSuccess] = useState(false)
  const [reportId, setReportId] = useState("")


  const handleReportComplete = (id: string) => {
      setReportId(id)
      setShowReportFlow(false)
      setShowReportSuccess(true)
    }
  
    const handleBackToDashboard = () => {
      setShowReportSuccess(false)
      setActiveTab("reports")
    }
  
    if (showReportFlow) {
      return (
        <IncidentReportFlow
          userRole="veteran"
          onBack={() => setShowReportFlow(false)}
          onComplete={handleReportComplete}
        />
      )
    }
  
    if (showReportSuccess) {
      return <ReportSuccess reportId={reportId} onBackToDashboard={handleBackToDashboard} />
    }

  const getBranchColor = (branch: string) => {
    switch (branch) {
      case "army":
        return "branch-army"
      case "navy":
        return "branch-navy"
      case "airforce":
        return "branch-airforce"
      default:
        return "text-accent"
    }
  }

  const getBranchName = (branch: string) => {
    switch (branch) {
      case "army":
        return "Indian Army (Retd.)"
      case "navy":
        return "Indian Navy (Retd.)"
      case "airforce":
        return "Indian Air Force (Retd.)"
      case "coastguard":
        return "Coast Guard (Retd.)"
      case "drdo":
        return "DRDO (Former)"
      default:
        return "Defence Unit (Former)"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Award className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-xl font-bold">Veteran Cyber Portal</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={getBranchColor(userInfo.branch)}>{getBranchName(userInfo.branch)}</span>
                  <span>•</span>
                  <span>{userInfo.serviceNumber}</span>
                </div>
              </div>
            </div>  
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="quantum-border">
                <Award className="h-3 w-3 mr-1" />
                Veteran
              </Badge>
              <Button className="cursor-pointer" variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button className="cursor-pointer" variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button className="cursor-pointer" variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger className="cursor-pointer" value="overview">Overview</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="reports">My Reports</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Message */}
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Welcome, Veteran
                </CardTitle>
                <CardDescription>
                  Thank you for your service. Report cyber incidents and access limited analytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                    <FileText className="h-8 w-8 text-accent mx-auto mb-2" />
                    <p className="font-medium">Report Incidents</p>
                    <p className="text-sm text-muted-foreground">Submit cyber security reports</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                    <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
                    <p className="font-medium">View Analytics</p>
                    <p className="text-sm text-muted-foreground">Limited threat intelligence</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                    <BookOpen className="h-8 w-8 text-accent mx-auto mb-2" />
                    <p className="font-medium">Resources</p>
                    <p className="text-sm text-muted-foreground">Cyber security guidance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="classified-glow">
                <CardHeader>
                  <CardTitle>Report Cyber Incident</CardTitle>
                  <CardDescription>Submit a cyber security incident report</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full cursor-pointer" size="lg" onClick={() => setShowReportFlow(true)}>
                    <Shield className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Phishing
                    </Button>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Scam
                    </Button>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Identity Theft
                    </Button>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Other
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader>
                  <CardTitle>Threat Awareness</CardTitle>
                  <CardDescription>Current threats targeting veterans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-2 bg-warning/10 rounded border border-warning/20">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      <span className="text-sm">Pension fraud attempts increasing</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-accent/10 rounded border border-accent/20">
                      <AlertCircle className="h-4 w-4 text-accent" />
                      <span className="text-sm">Fake job offer scams targeting veterans</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent cursor-pointer" size="sm">
                    View All Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>My Incident Reports</CardTitle>
                <CardDescription>Track your submitted reports and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
                  <p className="text-muted-foreground mb-4">You haven't submitted any incident reports yet.</p>
                  <Button className="cursor-pointer" onClick={() => setShowReportFlow(true)}>
                    <Shield className="h-4 w-4 mr-2" />
                    Submit First Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>Cyber Security Resources</CardTitle>
                <CardDescription>Educational materials and best practices for veterans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <h4 className="font-medium mb-2">Pension Security</h4>
                    <p className="text-sm text-muted-foreground mb-3">Protect your pension and benefits from fraud</p>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <h4 className="font-medium mb-2">Online Safety</h4>
                    <p className="text-sm text-muted-foreground mb-3">Safe browsing and email practices</p>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <h4 className="font-medium mb-2">Identity Protection</h4>
                    <p className="text-sm text-muted-foreground mb-3">Safeguard your personal information</p>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                  <div className="p-4 bg-card/50 rounded-lg border border-border">
                    <h4 className="font-medium mb-2">Reporting Guide</h4>
                    <p className="text-sm text-muted-foreground mb-3">How to report cyber incidents effectively</p>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
