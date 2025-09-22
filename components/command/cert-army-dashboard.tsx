"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Activity,
  Bell,
  Settings,
  LogOut,
  Target,
  Zap,
  Eye,
  Download,
  Filter,
  Search,
  BarChart3,
  Globe,
  Network,
  FileText,
  CheckCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface CERTArmyDashboardProps {
  userInfo: {
    branch: string
    serviceNumber: string
    email: string
    clearanceLevel: string
  }
}

export function CERTArmyDashboard({ userInfo }: CERTArmyDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [selectedRegion, setSelectedRegion] = useState("all")

  // Mock data for demonstration
  const threatMetrics = {
    totalIncidents: 247,
    activeThreats: 12,
    resolvedToday: 35,
    criticalAlerts: 3,
    riskLevel: "AMBER",
  }

  const recentIncidents = [
    {
      id: "INC-2024-0156",
      type: "Advanced Persistent Threat",
      severity: "Critical",
      region: "Northern Command",
      time: "14 minutes ago",
      status: "Active",
      assignee: "Team Alpha",
      threatScore: 95,
    },
    {
      id: "INC-2024-0155",
      type: "Phishing Campaign",
      severity: "High",
      region: "Western Command",
      time: "1 hour ago",
      status: "Investigating",
      assignee: "Team Beta",
      threatScore: 78,
    },
    {
      id: "INC-2024-0154",
      type: "Malware Detection",
      severity: "Medium",
      region: "Eastern Command",
      time: "3 hours ago",
      status: "Contained",
      assignee: "Team Gamma",
      threatScore: 65,
    },
    {
      id: "INC-2024-0153",
      type: "OPSEC Violation",
      severity: "High",
      region: "Southern Command",
      time: "5 hours ago",
      status: "Resolved",
      assignee: "Team Delta",
      threatScore: 72,
    },
  ]

  const espionageNetworks = [
    {
      id: "NET-001",
      name: "Operation Shadowhawk",
      nodes: 23,
      regions: ["Northern", "Western"],
      confidence: 87,
      status: "Active Monitoring",
    },
    {
      id: "NET-002",
      name: "Digital Serpent",
      nodes: 15,
      regions: ["Eastern", "Central"],
      confidence: 72,
      status: "Under Investigation",
    },
    {
      id: "NET-003",
      name: "Ghost Protocol",
      nodes: 8,
      regions: ["Southern"],
      confidence: 94,
      status: "Neutralized",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "text-destructive"
      case "high":
        return "text-warning"
      case "medium":
        return "text-accent"
      case "low":
        return "text-success"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "destructive"
      case "investigating":
        return "default"
      case "contained":
        return "secondary"
      case "resolved":
        return "outline"
      default:
        return "secondary"
    }
  }

  const exportReport = () => {
    // Simulate PQC-encrypted PDF export
    console.log("Exporting PQC-encrypted classified report...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-destructive" />
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CERT-Army Command Center</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-destructive">CLASSIFIED</span>
                  <span>•</span>
                  <span>Clearance: {userInfo.clearanceLevel}</span>
                  <span>•</span>
                  <span>{userInfo.serviceNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="quantum-border border-destructive text-destructive">
                <Activity className="h-3 w-3 mr-1" />
                LIVE
              </Badge>
              <Badge
                variant="outline"
                className={`${threatMetrics.riskLevel === "AMBER" ? "border-warning text-warning" : ""}`}
              >
                {threatMetrics.riskLevel}
              </Badge>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Control Panel */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="northern">Northern Command</SelectItem>
                    <SelectItem value="western">Western Command</SelectItem>
                    <SelectItem value="eastern">Eastern Command</SelectItem>
                    <SelectItem value="southern">Southern Command</SelectItem>
                    <SelectItem value="central">Central Command</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={exportReport} className="quantum-border">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="classified-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{threatMetrics.totalIncidents}</div>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
                    <Target className="h-4 w-4 text-destructive" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{threatMetrics.activeThreats}</div>
                  <p className="text-xs text-muted-foreground">Requiring response</p>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{threatMetrics.resolvedToday}</div>
                  <p className="text-xs text-muted-foreground">Incidents closed</p>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">{threatMetrics.criticalAlerts}</div>
                  <p className="text-xs text-muted-foreground">Immediate attention</p>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
                    <Activity className="h-4 w-4 text-warning" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">{threatMetrics.riskLevel}</div>
                  <p className="text-xs text-muted-foreground">National threat level</p>
                </CardContent>
              </Card>
            </div>

            {/* Geographic Heatmap */}
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  Geographic Threat Distribution
                </CardTitle>
                <CardDescription>Real-time incident heatmap by command regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-destructive rounded-full"></div>
                        <span className="font-medium">Northern Command</span>
                      </div>
                      <Badge variant="destructive">23 Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-warning rounded-full"></div>
                        <span className="font-medium">Western Command</span>
                      </div>
                      <Badge variant="default">18 Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-accent rounded-full"></div>
                        <span className="font-medium">Eastern Command</span>
                      </div>
                      <Badge variant="secondary">12 Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-success rounded-full"></div>
                        <span className="font-medium">Southern Command</span>
                      </div>
                      <Badge variant="outline">8 Active</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-8 bg-card/50 rounded-lg border border-border">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Interactive Map</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time geographic visualization would be displayed here
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline and Networks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="classified-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    Attack Timeline
                  </CardTitle>
                  <CardDescription>Incident spikes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">00:00 - 06:00</span>
                      <div className="flex-1 mx-4">
                        <Progress value={25} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground">12 incidents</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">06:00 - 12:00</span>
                      <div className="flex-1 mx-4">
                        <Progress value={75} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground">36 incidents</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">12:00 - 18:00</span>
                      <div className="flex-1 mx-4">
                        <Progress value={90} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground">43 incidents</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">18:00 - 24:00</span>
                      <div className="flex-1 mx-4">
                        <Progress value={60} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground">29 incidents</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-accent" />
                    AI-Detected Networks
                  </CardTitle>
                  <CardDescription>Espionage network clusters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {espionageNetworks.map((network) => (
                      <div key={network.id} className="p-3 bg-card/50 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{network.name}</span>
                          <Badge variant={network.status === "Neutralized" ? "outline" : "destructive"}>
                            {network.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{network.nodes} nodes</span>
                          <span>{network.confidence}% confidence</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-6">
            {/* Incident Queue */}
            <Card className="classified-glow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Prioritized Threat Queue</CardTitle>
                    <CardDescription>Incidents ordered by severity and threat score</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search incidents..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="p-4 bg-card/50 rounded-lg border border-border hover:bg-card/70 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              incident.severity === "Critical"
                                ? "bg-destructive"
                                : incident.severity === "High"
                                  ? "bg-warning"
                                  : "bg-accent"
                            }`}
                          />
                          <div>
                            <p className="font-medium">{incident.id}</p>
                            <p className="text-sm text-muted-foreground">{incident.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Score: {incident.threatScore}
                          </Badge>
                          <Badge variant={getStatusColor(incident.status)}>{incident.status}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {incident.region} • {incident.time}
                        </span>
                        <span>Assigned: {incident.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>Threat Intelligence Feeds</CardTitle>
                <CardDescription>Real-time intelligence from multiple sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Intelligence Dashboard</h3>
                  <p className="text-muted-foreground">Live threat intelligence feeds and analysis tools</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Deep analysis and predictive modeling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Engine</h3>
                  <p className="text-muted-foreground">Advanced analytics and machine learning insights</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>Classified Reports</CardTitle>
                <CardDescription>Generate and export encrypted intelligence reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-24 flex-col quantum-border" onClick={exportReport}>
                    <Download className="h-6 w-6 mb-2" />
                    <span>Daily Intelligence Brief</span>
                    <span className="text-xs text-muted-foreground">PQC Encrypted</span>
                  </Button>
                  <Button className="h-24 flex-col quantum-border" onClick={exportReport}>
                    <Download className="h-6 w-6 mb-2" />
                    <span>Threat Assessment Report</span>
                    <span className="text-xs text-muted-foreground">PQC Encrypted</span>
                  </Button>
                  <Button className="h-24 flex-col quantum-border" onClick={exportReport}>
                    <Download className="h-6 w-6 mb-2" />
                    <span>Network Analysis</span>
                    <span className="text-xs text-muted-foreground">PQC Encrypted</span>
                  </Button>
                  <Button className="h-24 flex-col quantum-border" onClick={exportReport}>
                    <Download className="h-6 w-6 mb-2" />
                    <span>Incident Summary</span>
                    <span className="text-xs text-muted-foreground">PQC Encrypted</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
