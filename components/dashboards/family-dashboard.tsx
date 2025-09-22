"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Shield, BookOpen, AlertCircle, Bell, Settings, LogOut, Users, HelpCircle, Phone } from "lucide-react"
import { GuidedReportFlow } from "@/components/family/guided-report-flow"
import { SafetyEducation } from "@/components/family/safety-education"
import { ReportSuccess } from "@/components/reporting/report-success"

interface FamilyDashboardProps {
  userInfo: {
    branch: string
    serviceNumber: string
    email: string
  }
}

export function FamilyDashboard({ userInfo }: FamilyDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showGuidedReport, setShowGuidedReport] = useState(false)
  const [showEducation, setShowEducation] = useState(false)
  const [showReportSuccess, setShowReportSuccess] = useState(false)
  const [reportId, setReportId] = useState("")

  const handleReportComplete = (id: string) => {
    setReportId(id)
    setShowGuidedReport(false)
    setShowReportSuccess(true)
  }

  const handleBackToDashboard = () => {
    setShowReportSuccess(false)
    setShowGuidedReport(false)
    setShowEducation(false)
    setActiveTab("overview")
  }

  if (showGuidedReport) {
    return <GuidedReportFlow onBack={() => setShowGuidedReport(false)} onComplete={handleReportComplete} />
  }

  if (showEducation) {
    return <SafetyEducation onBack={() => setShowEducation(false)} />
  }

  if (showReportSuccess) {
    return <ReportSuccess reportId={reportId} onBackToDashboard={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="./logo.png" alt="logo" className="w-10 h-10 rounded-xl" />
              <div>
                <h1 className="text-xl font-bold">QUANTUM KAVACH</h1>
                <p className="text-sm text-muted-foreground">Defence Family Cyber Safety</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="quantum-border">
                <Heart className="h-3 w-3 mr-1" />
                Family
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
            <TabsTrigger className="cursor-pointer" value="overview">Home</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="report">Report Issue</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="learn">Learn & Stay Safe</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Welcome Message */}
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-accent" />
                  Welcome to Family Cyber Safety
                </CardTitle>
                <CardDescription>
                  A safe space for defence families to report cyber incidents and learn about online safety.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                    <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
                    <p className="font-medium">Report Safely</p>
                    <p className="text-sm text-muted-foreground">Easy reporting with guidance</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                    <BookOpen className="h-8 w-8 text-accent mx-auto mb-2" />
                    <p className="font-medium">Learn Together</p>
                    <p className="text-sm text-muted-foreground">Family-friendly safety tips</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                    <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                    <p className="font-medium">Get Support</p>
                    <p className="text-sm text-muted-foreground">Help when you need it</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Alerts */}
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  Current Safety Alerts
                </CardTitle>
                <CardDescription>Important warnings for defence families</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">School Admission Scams</p>
                        <p className="text-xs text-muted-foreground">
                          Fake admission offers targeting military families. Always verify through official channels.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Social Media Safety</p>
                        <p className="text-xs text-muted-foreground">
                          Be careful about sharing family photos and location information online.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="classified-glow">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>Get assistance with cyber security concerns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full cursor-pointer" size="lg" onClick={() => setShowGuidedReport(true)}>
                    <Shield className="h-4 w-4 mr-2" />
                    Report an Issue
                  </Button>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent cursor-pointer"
                      size="sm"
                      onClick={() => setShowGuidedReport(true)}
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />I received a suspicious message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent cursor-pointer"
                      size="sm"
                      onClick={() => setShowGuidedReport(true)}
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Someone is asking for personal info
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent cursor-pointer"
                      size="sm"
                      onClick={() => setShowGuidedReport(true)}
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />I think I was scammed
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="classified-glow">
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>24/7 support for urgent cyber security issues</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <Phone className="h-8 w-8 text-destructive mx-auto mb-2" />
                    <p className="font-bold text-destructive">Emergency Hotline</p>
                    <p className="text-lg font-mono">1800-XXX-XXXX</p>
                    <p className="text-xs text-muted-foreground">Available 24/7</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent cursor-pointer">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>Report a Cyber Security Issue</CardTitle>
                <CardDescription>
                  Tell us about any suspicious activity or cyber security concerns. We're here to help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Guided Reporting</h3>
                  <p className="text-muted-foreground mb-4">Step-by-step assistance to report your concern safely</p>
                  <Button size="lg" onClick={() => setShowGuidedReport(true)} className="cursor-pointer">
                    <Shield className="h-4 w-4 mr-2" />
                    Start Guided Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learn" className="space-y-6">
            <Card className="classified-glow">
              <CardHeader>
                <CardTitle>Cyber Safety Education</CardTitle>
                <CardDescription>
                  Learn how to keep your family safe online with easy-to-understand guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Learning</h3>
                  <p className="text-muted-foreground mb-4">
                    Family-friendly courses designed specifically for military families
                  </p>
                  <Button size="lg" onClick={() => setShowEducation(true)} className="cursor-pointer">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Learning
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
