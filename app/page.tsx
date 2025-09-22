"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, UserCheck, Heart, Lock, Zap } from "lucide-react"
import { AuthenticationFlow } from "@/components/auth/authentication-flow"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showAuth, setShowAuth] = useState(false)

  const roles = [
    {
      id: "serving",
      title: "Serving Defence Personnel",
      description: "Active duty military personnel across all branches",
      icon: Shield,
      color: "branch-army",
      bgColor: "bg-branch-army",
      access: "Full complaint reporting + threat awareness dashboard",
    },
    {
      id: "veteran",
      title: "Veteran/Ex-Serviceman",
      description: "Retired or former defence personnel",
      icon: UserCheck,
      color: "branch-navy",
      bgColor: "bg-branch-navy",
      access: "Reporting + limited access to analytics",
    },
    {
      id: "family",
      title: "Family Member/Relative",
      description: "Immediate family of defence personnel",
      icon: Heart,
      color: "branch-airforce",
      bgColor: "bg-branch-airforce",
      access: "Guided reporting with educational resources",
    },
  ]

  if (showAuth && selectedRole) {
    return <AuthenticationFlow role={selectedRole} onBack={() => setShowAuth(false)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="./logo.png" alt="logo" className="w-10 h-10 rounded-xl" />
                <div>
                  <h1 className="text-2xl font-bold text-balance">QUANTUM KAVACH</h1>
                  <p className="text-sm text-muted-foreground">Defence Cyber Incident & Safety Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="quantum-border">
                <Lock className="h-3 w-3 mr-1" />
                PQC Secured
              </Badge>
              <Badge variant="outline" className="text-accent border-accent/30">
                <Zap className="h-3 w-3 mr-1" />
                CERT-Army
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-balance">Secure Access Control</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Multi-layered authentication for verified defence personnel and their families
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-accent">
              <Shield className="h-4 w-4" />
              <span>Post-Quantum Cryptography • Biometric Verification • Role-Based Access</span>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Select Your Role</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role) => {
                const Icon = role.icon
                return (
                  <Card
                    key={role.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 classified-glow ${
                      selectedRole === role.id ? "ring-2 ring-accent" : ""
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardHeader className="text-center">
                      <div
                        className={`w-16 h-16 rounded-full ${role.bgColor}/20 flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icon className={`h-8 w-8 ${role.color}-text`} />
                      </div>
                      <CardTitle className="text-lg text-balance">{role.title}</CardTitle>
                      <CardDescription className="text-pretty">{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="font-medium text-accent">Access Level:</span>
                          <p className="text-muted-foreground mt-1 text-pretty">{role.access}</p>
                        </div>
                        <Badge variant="secondary" className="w-full justify-center">
                          {selectedRole === role.id ? "Selected" : "Select Role"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Continue Button */}
          {selectedRole && (
            <div className="text-center">
              <Button size="lg" className="px-8 py-3 text-lg quantum-border cursor-pointer" onClick={() => setShowAuth(true)}>
                <Shield className="h-5 w-5 mr-2" />
                Begin Secure Authentication
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                You will be redirected to multi-factor authentication
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-12 p-6 bg-card border border-border rounded-lg">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-accent mb-2">Security Notice</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  This portal uses post-quantum cryptography and multi-layered verification. All communications are
                  encrypted and monitored for security purposes. Unauthorized access attempts will be logged and
                  reported to CERT-Army.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
