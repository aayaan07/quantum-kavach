"use client"

import { CERTArmyDashboard } from "@/components/command/cert-army-dashboard"

export default function CERTArmyPage() {
  // Mock CERT-Army user data
  const userInfo = {
    branch: "cert-army",
    serviceNumber: "CERT-001",
    email: "analyst@cert-army.gov.in",
    clearanceLevel: "TOP SECRET",
  }

  return <CERTArmyDashboard userInfo={userInfo} />
}
