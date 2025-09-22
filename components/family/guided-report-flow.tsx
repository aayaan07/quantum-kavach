"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Heart, Shield, HelpCircle, Phone } from "lucide-react"

interface GuidedReportFlowProps {
  onBack: () => void
  onComplete: (reportId: string) => void
}

export function GuidedReportFlow({ onBack, onComplete }: GuidedReportFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    whenHappened: "",
    needsHelp: "",
    contactInfo: "",
    urgency: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const issueTypes = [
    {
      value: "suspicious-message",
      title: "I received a suspicious message",
      description: "Email, text, or social media message that seems fake or dangerous",
      icon: "📱",
      help: "This could be a phishing attempt. Don't click any links or share personal information.",
    },
    {
      value: "personal-info-request",
      title: "Someone is asking for personal information",
      description: "Someone wants my family details, address, or financial information",
      icon: "🔒",
      help: "Never share personal information with unknown people, especially about military family.",
    },
    {
      value: "scam-attempt",
      title: "I think I was scammed",
      description: "I may have fallen for a fake offer or given information to the wrong person",
      icon: "⚠️",
      help: "Don't worry, we can help. The important thing is to report it quickly.",
    },
    {
      value: "online-harassment",
      title: "Someone is bothering me online",
      description: "Unwanted contact, threats, or harassment on social media or messaging",
      icon: "🛡️",
      help: "Online harassment is serious. We'll help you stay safe and report this properly.",
    },
    {
      value: "fake-job-offer",
      title: "I got a suspicious job offer",
      description: "Job offer that seems too good to be true or asks for money upfront",
      icon: "💼",
      help: "Fake job offers often target military families. Let's help you verify if it's real.",
    },
    {
      value: "other",
      title: "Something else",
      description: "Other cyber security concern not listed above",
      icon: "❓",
      help: "No problem! We'll help you figure out what happened and what to do next.",
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

  const handleSubmit = () => {
    const reportId = `FAM-${Date.now().toString().slice(-6)}`
    onComplete(reportId)
  }

  const selectedIssue = issueTypes.find((issue) => issue.value === formData.issueType)

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="h-12 w-12 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-semibold">What happened?</h3>
              <p className="text-sm text-muted-foreground">Choose the option that best describes your situation</p>
            </div>
            <div className="space-y-3">
              {issueTypes.map((issue) => (
                <div
                  key={issue.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.issueType === issue.value
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => setFormData({ ...formData, issueType: issue.value })}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{issue.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{issue.title}</h4>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            {selectedIssue && (
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-accent mb-1">Quick Help</p>
                    <p className="text-sm text-muted-foreground">{selectedIssue.help}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="description" className="text-base font-medium">
                Tell us what happened
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what happened in your own words. Don't worry about technical details - just tell us what you experienced..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-2 min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Take your time. The more details you can provide, the better we can help you.
              </p>
            </div>

            <div>
              <Label htmlFor="whenHappened" className="text-base font-medium">
                When did this happen?
              </Label>
              <Input
                id="whenHappened"
                placeholder="For example: Yesterday evening, This morning, Last week..."
                value={formData.whenHappened}
                onChange={(e) => setFormData({ ...formData, whenHappened: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">How urgent is this?</Label>
              <div className="space-y-3">
                <div
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.urgency === "emergency"
                      ? "border-destructive bg-destructive/10"
                      : "border-border hover:border-destructive/50"
                  }`}
                  onClick={() => setFormData({ ...formData, urgency: "emergency" })}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <div>
                      <p className="font-medium">Emergency - I need help right now</p>
                      <p className="text-sm text-muted-foreground">
                        I'm in immediate danger or someone is threatening me
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.urgency === "soon"
                      ? "border-warning bg-warning/10"
                      : "border-border hover:border-warning/50"
                  }`}
                  onClick={() => setFormData({ ...formData, urgency: "soon" })}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div>
                      <p className="font-medium">Soon - I need help today</p>
                      <p className="text-sm text-muted-foreground">
                        This is worrying me and I'd like help as soon as possible
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    formData.urgency === "normal"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => setFormData({ ...formData, urgency: "normal" })}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <div>
                      <p className="font-medium">Normal - I can wait a few days</p>
                      <p className="text-sm text-muted-foreground">I want to report this but it's not urgent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {formData.urgency === "emergency" && (
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive mb-2">Emergency Support</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      If you're in immediate danger, please call our emergency hotline:
                    </p>
                    <p className="text-lg font-mono text-destructive">1800-XXX-XXXX</p>
                    <Button variant="destructive" size="sm" className="mt-2">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="needsHelp" className="text-base font-medium">
                What kind of help do you need?
              </Label>
              <Textarea
                id="needsHelp"
                placeholder="For example: I want to know if this is a scam, I need help securing my accounts, I want to report this person..."
                value={formData.needsHelp}
                onChange={(e) => setFormData({ ...formData, needsHelp: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="contactInfo" className="text-base font-medium">
                How can we contact you?
              </Label>
              <Input
                id="contactInfo"
                placeholder="Phone number or email address"
                value={formData.contactInfo}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                We'll only use this to help you with your report. Your information is kept safe and private.
              </p>
            </div>

            <div className="p-4 bg-card/50 rounded-lg border border-border">
              <h4 className="font-medium mb-3">Your Report Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issue Type:</span>
                  <span>{selectedIssue?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">When:</span>
                  <span>{formData.whenHappened || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgency:</span>
                  <span className="capitalize">{formData.urgency}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-accent mb-1">Your Safety Comes First</p>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your report and contact you with guidance and support. All information is kept
                    confidential and secure.
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
              <h1 className="text-xl font-bold">Get Help - Step by Step</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps} • We're here to help you
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
          <span>What happened?</span>
          <span>Tell us more</span>
          <span>How urgent?</span>
          <span>Contact info</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="classified-glow">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "What happened to you?"}
                {currentStep === 2 && "Tell us more details"}
                {currentStep === 3 && "How can we help?"}
                {currentStep === 4 && "Almost done!"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Choose the situation that matches what you experienced"}
                {currentStep === 2 && "Help us understand what happened so we can help you better"}
                {currentStep === 3 && "Let us know how urgent this is and what help you need"}
                {currentStep === 4 && "Review your information and submit your report"}
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
                    className="flex-1"
                    disabled={
                      (currentStep === 1 && !formData.issueType) ||
                      (currentStep === 2 && (!formData.description || !formData.whenHappened)) ||
                      (currentStep === 3 && (!formData.urgency || !formData.needsHelp)) ||
                      (currentStep === 4 && !formData.contactInfo)
                    }
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="flex-1 quantum-border">
                    <Shield className="h-4 w-4 mr-2" />
                    Submit Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Help Notice */}
          <div className="mt-6 p-4 bg-card/50 border border-border rounded-lg">
            <div className="flex items-start gap-2">
              <Heart className="h-4 w-4 text-accent mt-0.5" />
              <div>
                <p className="text-sm font-medium text-accent">You're not alone</p>
                <p className="text-xs text-muted-foreground text-pretty">
                  Our team is specially trained to help military families with cyber security issues. We understand your
                  unique situation and we're here to support you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
