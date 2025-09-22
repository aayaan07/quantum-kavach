"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Fingerprint, Smartphone } from "lucide-react"
import { ServingDashboard } from "@/components/dashboards/serving-dashboard"
import { VeteranDashboard } from "@/components/dashboards/veteran-dashboard"
import { FamilyDashboard } from "@/components/dashboards/family-dashboard"

interface AuthenticationFlowProps {
  role: string
  onBack: () => void
}

export function AuthenticationFlow({ role, onBack }: AuthenticationFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    branch: "",
    serviceNumber: "",
    email: "",
    phone: "",
    otp: "",
    securityAnswer: "",
  })
  const [showDashboard, setShowDashboard] = useState(false)

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const branches = [
    { value: "army", label: "Indian Army", color: "branch-army" },
    { value: "navy", label: "Indian Navy", color: "branch-navy" },
    { value: "airforce", label: "Indian Air Force", color: "branch-airforce" },
    { value: "coastguard", label: "Coast Guard", color: "branch-navy" },
    { value: "drdo", label: "DRDO", color: "branch-airforce" },
    { value: "other", label: "Other Defence Unit", color: "text-muted-foreground" },
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="branch" className="text-base font-medium">
                Service Branch
              </Label>
              <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
                <SelectTrigger className="mt-2 cursor-pointer">
                  <SelectValue placeholder="Select your service branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.value} value={branch.value} className="cursor-pointer">
                      <span className={branch.color}>{branch.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="serviceNumber" className="text-base font-medium">
                Service Number
              </Label>
              <Input
                id="serviceNumber"
                placeholder="Enter your official service number"
                value={formData.serviceNumber}
                onChange={(e) => setFormData({ ...formData, serviceNumber: e.target.value })}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Army Number / Air Force Number / Navy ID / Official ID
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-success">Service Number Verified</h3>
              <p className="text-sm text-muted-foreground">Cross-verification completed successfully</p>
            </div>
            <div>
              <Label htmlFor="email" className="text-base font-medium">
                Official Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@indianarmy.nic.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-base font-medium">
                Registered Mobile
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Defence registered mobile number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Smartphone className="h-12 w-12 text-accent mx-auto mb-3" />
              <h3 className="text-lg font-semibold">OTP Verification</h3>
              <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your registered mobile</p>
            </div>
            <div>
              <Label htmlFor="otp" className="text-base font-medium">
                Verification Code
              </Label>
              <Input
                id="otp"
                placeholder="000000"
                maxLength={6}
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                className="mt-2 text-center text-2xl tracking-widest"
              />
            </div>
            <div className="text-center">
              <Button variant="outline" size="sm" className="cursor-pointer">
                Resend OTP
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Security Question</Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">What is your unit code from your joining year?</p>
              <Input
                placeholder="Enter your answer"
                value={formData.securityAnswer}
                onChange={(e) => setFormData({ ...formData, securityAnswer: e.target.value })}
              />
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Fingerprint className="h-5 w-5 text-accent" />
                <span className="font-medium">Biometric Verification</span>
                <Badge variant="secondary">Optional</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Enable biometric authentication for enhanced security
              </p>
              <Button variant="outline" size="sm" className="cursor-pointer">
                Enable Biometric Scan
              </Button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6 text-center">
            <div>
              <Shield className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-success mb-2">Authentication Complete</h3>
              <p className="text-muted-foreground mb-6">Post-quantum cryptography handshake successful</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Service verification completed</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Multi-factor authentication verified</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Quantum-safe encryption enabled</span>
              </div>
            </div>
            <Button size="lg" className="px-8 quantum-border cursor-pointer" onClick={() => setShowDashboard(true)}>
              Access Dashboard
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  if (showDashboard) {
    if (role === "serving") return <ServingDashboard userInfo={formData} />
    if (role === "veteran") return <VeteranDashboard userInfo={formData} />
    if (role === "family") return <FamilyDashboard userInfo={formData} />
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
              <h1 className="text-xl font-bold">Secure Authentication</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps} • {role.charAt(0).toUpperCase() + role.slice(1)} Personnel
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="container mx-auto px-4 py-4">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="classified-glow">
            <CardHeader>
              <CardTitle className="text-center">
                {currentStep === 1 && "Branch & ID Verification"}
                {currentStep === 2 && "Contact Information"}
                {currentStep === 3 && "OTP Verification"}
                {currentStep === 4 && "Security Verification"}
                {currentStep === 5 && "Authentication Complete"}
              </CardTitle>
              <CardDescription className="text-center">
                {currentStep < 5 && "Complete all steps to access the portal"}
                {currentStep === 5 && "Welcome to the Defence Cyber Portal"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStep()}

              {currentStep < 5 && (
                <div className="mt-8 flex gap-3">
                  <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent cursor-pointer">
                    {currentStep === 1 ? "Cancel" : "Previous"}
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 cursor-pointer"
                    disabled={
                      (currentStep === 1 && (!formData.branch || !formData.serviceNumber)) ||
                      (currentStep === 2 && (!formData.email || !formData.phone)) ||
                      (currentStep === 3 && formData.otp.length !== 6) ||
                      (currentStep === 4 && !formData.securityAnswer)
                    }
                  >
                    {currentStep === 4 ? "Complete" : "Continue"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-card/50 border border-border rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground text-pretty">
                  All authentication attempts are logged and monitored. Ensure you are on a secure network before
                  proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
