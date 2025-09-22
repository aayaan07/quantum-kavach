"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  FileText,
  Users,
  Activity,
  Bell,
  Settings,
  LogOut,
  Target,
  Zap,
  Eye,
} from "lucide-react"
import { IncidentReportFlow } from "@/components/reporting/incident-report-flow"
import { ReportSuccess } from "@/components/reporting/report-success"

interface ServingDashboardProps {
  userInfo: {
    branch: string
    serviceNumber: string
    email: string
  }
}

export function ServingDashboard({ userInfo }: ServingDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showReportFlow, setShowReportFlow] = useState(false)
  const [showReportSuccess, setShowReportSuccess] = useState(false)
  const [reportId, setReportId] = useState("")

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
        return "Indian Army"
      case "navy":
        return "Indian Navy"
      case "airforce":
        return "Indian Air Force"
      case "coastguard":
        return "Coast Guard"
      case "drdo":
        return "DRDO"
      default:
        return "Defence Unit"
    }
  }

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
        userRole="serving"
        onBack={() => setShowReportFlow(false)}
        onComplete={handleReportComplete}
      />
    )
  }

  if (showReportSuccess) {
    return <ReportSuccess reportId={reportId} onBackToDashboard={handleBackToDashboard} />
  }

  const threatAlerts = [
    {
      id: 1,
      type: "Phishing Campaign",
      severity: "Critical",
      target: "Army WhatsApp Groups",
      time: "2 hours ago",
      status: "Active",
    },
    {
      id: 2,
      type: "Malware Detection",
      severity: "High",
      target: "Base Network",
      time: "6 hours ago",
      status: "Contained",
    },
    {
      id: 3,
      type: "OPSEC Violation",
      severity: "Medium",
      target: "Social Media",
      time: "1 day ago",
      status: "Investigating",
    },
  ]

  const recentComplaints = [
    {
      id: "CMP-2024-001",
      type: "Honeytrap Attempt",
      status: "Under Review",
      date: "2024-01-15",
      priority: "High",
    },
    {
      id: "CMP-2024-002",
      type: "Suspicious Email",
      status: "Resolved",
      date: "2024-01-14",
      priority: "Medium",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-accent" />
              <div>
                <h1 className="text-xl font-bold">Defence Cyber Command</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={getBranchColor(userInfo.branch)}>{getBranchName(userInfo.branch)}</span>
                  <span>•</span>
                  <span>{userInfo.serviceNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="quantum-border">
                <Activity className="h-3 w-3 mr-1" />
                Online
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger className="cursor-pointer" value="overview">Overview</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="threats">Threat Intel</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="reports">My Reports</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="classified-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Threat Level</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">AMBER</div>
                  <p className="text-xs text-muted-foreground">Base Security Status</p>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                    <Target className="h-4 w-4 text-destructive" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">3</div>
                  <p className="text-xs text-muted-foreground">Requiring attention</p>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">My Reports</CardTitle>
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">2</div>
                  <p className="text-xs text-muted-foreground">Submitted this month</p>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">LOW</div>
                  <p className="text-xs text-muted-foreground">Personal risk level</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Threats */}
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Active Threat Alerts
                </CardTitle>
                <CardDescription>Current cyber threats targeting defence personnel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            alert.severity === "Critical"
                              ? "bg-destructive"
                              : alert.severity === "High"
                                ? "bg-warning"
                                : "bg-accent"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{alert.type}</p>
                          <p className="text-sm text-muted-foreground">
                            Target: {alert.target} • {alert.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant={alert.status === "Active" ? "destructive" : "secondary"}>{alert.status}</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View All Threats
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="classified-glow">
                <CardHeader>
                  <CardTitle>Quick Report</CardTitle>
                  <CardDescription>Report a cyber incident immediately</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full cursor-pointer" size="lg" onClick={() => setShowReportFlow(true)}>
                    <Shield className="h-4 w-4 mr-2" />
                    Report Incident
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Phishing
                    </Button>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Malware
                    </Button>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      Honeytrap
                    </Button>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      OPSEC Risk
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader>
                  <CardTitle>Unit Risk Meter</CardTitle>
                  <CardDescription>Current cyber risk at your base/unit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Risk</span>
                      <span className="text-warning">Medium</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Network Security</span>
                      <span className="text-success">Good</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Personnel Awareness</span>
                      <span className="text-warning">Moderate</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>Threat Intelligence Dashboard</CardTitle>
                <CardDescription>Real-time cyber threat analysis and intelligence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Threat Intelligence</h3>
                  <p className="text-muted-foreground">
                    Detailed threat analysis and intelligence feeds will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>My Incident Reports</CardTitle>
                <CardDescription>Track your submitted cyber incident reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentComplaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border"
                    >
                      <div>
                        <p className="font-medium">{complaint.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {complaint.type} • {complaint.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={complaint.priority === "High" ? "destructive" : "secondary"}>
                          {complaint.priority}
                        </Badge>
                        <Badge variant={complaint.status === "Resolved" ? "default" : "outline"}>
                          {complaint.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>Cyber Security Training</CardTitle>
                <CardDescription>Mandatory and recommended training modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Training Modules</h3>
                  <p className="text-muted-foreground">
                    Interactive training content and assessments will be available here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
