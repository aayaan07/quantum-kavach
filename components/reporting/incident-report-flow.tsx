"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Upload, FileText, ImageIcon, Video, Music, Shield, Zap, Eye, Clock } from "lucide-react"

interface IncidentReportFlowProps {
  userRole: string
  onBack: () => void
  onComplete: (reportId: string) => void
}

export function IncidentReportFlow({ userRole, onBack, onComplete }: IncidentReportFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    threatType: "",
    description: "",
    dateTime: "",
    location: "",
    urgency: "",
    evidence: [] as File[],
    additionalInfo: "",
    contactConsent: false,
  })
  const [threatScore, setThreatScore] = useState<number | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const threatTypes = [
    {
      value: "phishing",
      label: "Phishing Attack",
      description: "Suspicious emails, messages, or websites trying to steal information",
      icon: "🎣",
      severity: "high",
    },
    {
      value: "honeytrap",
      label: "Honeytrap/Social Engineering",
      description: "Someone trying to build a relationship to extract sensitive information",
      icon: "🍯",
      severity: "critical",
    },
    {
      value: "malware",
      label: "Malware/Virus",
      description: "Suspicious software, infected files, or system compromise",
      icon: "🦠",
      severity: "high",
    },
    {
      value: "espionage",
      label: "Espionage Attempt",
      description: "Suspected intelligence gathering or surveillance activities",
      icon: "🕵️",
      severity: "critical",
    },
    {
      value: "opsec",
      label: "OPSEC Risk",
      description: "Operational security violations or information leaks",
      icon: "⚠️",
      severity: "medium",
    },
    {
      value: "other",
      label: "Other Cyber Threat",
      description: "Any other cyber security concern not listed above",
      icon: "🔒",
      severity: "medium",
    },
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData({ ...formData, evidence: [...formData.evidence, ...files] })

    // Simulate AI analysis
    if (files.length > 0) {
      setIsAnalyzing(true)
      setTimeout(() => {
        const score = Math.floor(Math.random() * 40) + 60 // Random score between 60-100
        setThreatScore(score)
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = formData.evidence.filter((_, i) => i !== index)
    setFormData({ ...formData, evidence: newFiles })
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />
    if (file.type.startsWith("audio/")) return <Music className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const getThreatScoreColor = (score: number) => {
    if (score >= 80) return "text-destructive"
    if (score >= 60) return "text-warning"
    return "text-success"
  }

  const getThreatScoreLabel = (score: number) => {
    if (score >= 80) return "HIGH RISK"
    if (score >= 60) return "MEDIUM RISK"
    return "LOW RISK"
  }

  const handleSubmit = () => {
    // Generate report ID
    const reportId = `RPT-${Date.now().toString().slice(-6)}`
    onComplete(reportId)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Select Threat Type</Label>
              <div className="grid grid-cols-1 gap-3">
                {threatTypes.map((threat) => (
                  <div
                    key={threat.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.threatType === threat.value
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                    }`}
                    onClick={() => setFormData({ ...formData, threatType: threat.value })}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{threat.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{threat.label}</h4>
                          <Badge
                            variant={
                              threat.severity === "critical"
                                ? "destructive"
                                : threat.severity === "high"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {threat.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{threat.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="description" className="text-base font-medium">
                Incident Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what happened in detail. Include any suspicious behavior, messages received, or unusual activities you noticed..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateTime" className="text-base font-medium">
                  When did this occur?
                </Label>
                <Input
                  id="dateTime"
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="urgency" className="text-base font-medium">
                  Urgency Level
                </Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                >
                  <SelectTrigger className="mt-2 cursor-pointer">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="low">Low - Can wait for review</SelectItem>
                    <SelectItem className="cursor-pointer" value="medium">Medium - Needs attention soon</SelectItem>
                    <SelectItem className="cursor-pointer" value="high">High - Urgent response needed</SelectItem>
                    <SelectItem className="cursor-pointer" value="critical">Critical - Immediate action required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-base font-medium">
                Location/Context
              </Label>
              <Input
                id="location"
                placeholder="Where did this happen? (Base, home, public network, etc.)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Upload Evidence</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-medium mb-2">Drag and drop files here</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Support for images, videos, audio, PDFs, and text files
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()} className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            {formData.evidence.length > 0 && (
              <div>
                <Label className="text-base font-medium mb-3 block">Uploaded Files</Label>
                <div className="space-y-2">
                  {formData.evidence.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(file)}
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="cursor-pointer">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-accent animate-pulse" />
                  <div>
                    <p className="font-medium">AI Analysis in Progress</p>
                    <p className="text-sm text-muted-foreground">Scanning files for threat indicators...</p>
                  </div>
                </div>
              </div>
            )}

            {threatScore !== null && (
              <div className="p-4 bg-card/50 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-5 w-5 text-accent" />
                  <span className="font-medium">AI Threat Analysis Complete</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold">
                    <span className={getThreatScoreColor(threatScore)}>{threatScore}/100</span>
                  </div>
                  <div>
                    <Badge variant={threatScore >= 80 ? "destructive" : threatScore >= 60 ? "default" : "secondary"}>
                      {getThreatScoreLabel(threatScore)}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      Threat confidence score based on uploaded evidence
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="additionalInfo" className="text-base font-medium">
                Additional Information
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any other details that might be helpful for the investigation..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="mt-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="contact-consent"
                  checked={formData.contactConsent}
                  onCheckedChange={(checked) => setFormData({ ...formData, contactConsent: checked as boolean })}
                />
                <div>
                  <Label htmlFor="contact-consent" className="text-sm font-medium">
                    I consent to be contacted for follow-up questions
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    CERT-Army may need to contact you for additional information about this incident
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card/50 rounded-lg border border-border">
              <h4 className="font-medium mb-2">Report Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Threat Type:</span>
                  <span>{threatTypes.find((t) => t.value === formData.threatType)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgency:</span>
                  <span className="capitalize">{formData.urgency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Evidence Files:</span>
                  <span>{formData.evidence.length} files</span>
                </div>
                {threatScore && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AI Threat Score:</span>
                    <span className={getThreatScoreColor(threatScore)}>{threatScore}/100</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Post-Quantum Encryption</p>
                  <p className="text-xs text-muted-foreground">
                    Your report will be encrypted using quantum-safe algorithms before submission
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">Incident Report</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps} • Secure Reporting
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4 mb-2">
          <Progress value={progress} className="flex-1 h-2" />
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Threat Type</span>
          <span>Details</span>
          <span>Evidence</span>
          <span>Review</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="classified-glow">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Select Threat Type"}
                {currentStep === 2 && "Incident Details"}
                {currentStep === 3 && "Upload Evidence"}
                {currentStep === 4 && "Review & Submit"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Choose the type of cyber threat you want to report"}
                {currentStep === 2 && "Provide detailed information about the incident"}
                {currentStep === 3 && "Upload any evidence files for AI analysis"}
                {currentStep === 4 && "Review your report before secure submission"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStep()}

              <div className="mt-8 flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                  {currentStep === 1 ? "Cancel" : "Previous"}
                </Button>
                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className="flex-1 cursor-pointer"
                    disabled={
                      (currentStep === 1 && !formData.threatType) ||
                      (currentStep === 2 && (!formData.description || !formData.urgency)) ||
                      (currentStep === 4 && !formData.contactConsent)
                    }
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="flex-1 quantum-border cursor-pointer">
                    <Shield className="h-4 w-4 mr-2" />
                    Submit Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-card/50 border border-border rounded-lg">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-accent">Secure Processing</p>
                <p className="text-xs text-muted-foreground text-pretty">
                  All reports are processed securely and reviewed by CERT-Army personnel. You will receive a
                  confirmation with your report ID once submitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
