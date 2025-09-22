"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Play, Users, Shield, Smartphone, Lock } from "lucide-react"

interface SafetyEducationProps {
  onBack: () => void
}

export function SafetyEducation({ onBack }: SafetyEducationProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [completedModules, setCompletedModules] = useState<string[]>([])

  const educationModules = [
    {
      id: "kids-online-safety",
      title: "Online Safety for Kids",
      description: "Teach children about safe internet use and recognizing dangers",
      duration: "15 minutes",
      difficulty: "Beginner",
      icon: Users,
      topics: [
        "Age-appropriate internet rules",
        "Recognizing stranger danger online",
        "Safe social media practices",
        "What to do if something feels wrong",
        "Password basics for kids",
      ],
      completed: false,
    },
    {
      id: "password-safety",
      title: "Password Safety",
      description: "Create strong passwords and keep accounts secure",
      duration: "10 minutes",
      difficulty: "Beginner",
      icon: Lock,
      topics: [
        "Creating strong passwords",
        "Using password managers",
        "Two-factor authentication",
        "What not to share online",
        "Securing family accounts",
      ],
      completed: false,
    },
    {
      id: "social-media-safety",
      title: "Social Media Safety",
      description: "Safe sharing and privacy settings for the whole family",
      duration: "20 minutes",
      difficulty: "Intermediate",
      icon: Smartphone,
      topics: [
        "Privacy settings on popular platforms",
        "What's safe to share about military life",
        "Protecting location information",
        "Dealing with unwanted contact",
        "Teaching kids about oversharing",
      ],
      completed: false,
    },
    {
      id: "recognizing-scams",
      title: "Recognizing Scams",
      description: "Identify and avoid common online scams and fraud",
      duration: "25 minutes",
      difficulty: "Intermediate",
      icon: Shield,
      topics: [
        "Common scams targeting military families",
        "Red flags in emails and messages",
        "Fake job offers and opportunities",
        "Romance scams and catfishing",
        "What to do if you've been scammed",
      ],
      completed: false,
    },
  ]

  const handleStartModule = (moduleId: string) => {
    setSelectedModule(moduleId)
    // Simulate module completion after a delay
    setTimeout(() => {
      setCompletedModules([...completedModules, moduleId])
      setSelectedModule(null)
    }, 3000)
  }

  const selectedModuleData = educationModules.find((m) => m.id === selectedModule)

  if (selectedModule && selectedModuleData) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedModule(null)}>
                Back to Modules
              </Button>
              <div>
                <h1 className="text-xl font-bold">{selectedModuleData.title}</h1>
                <p className="text-sm text-muted-foreground">Interactive Learning Module</p>
              </div>
            </div>
          </div>
        </header>

        {/* Learning Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="classified-glow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <selectedModuleData.icon className="h-16 w-16 text-accent" />
                </div>
                <CardTitle className="text-2xl">{selectedModuleData.title}</CardTitle>
                <CardDescription>Learning in progress...</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Progress value={66} className="h-3 mb-4" />
                  <p className="text-sm text-muted-foreground">Module Progress: 66%</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">What you're learning:</h3>
                    <ul className="space-y-2">
                      {selectedModuleData.topics.map((topic, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-center p-8 bg-card/50 rounded-lg border border-border">
                    <div className="text-center">
                      <Play className="h-12 w-12 text-accent mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Interactive Content</h4>
                      <p className="text-sm text-muted-foreground">Videos, quizzes, and practical exercises</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    This is a simulation. In the real application, interactive learning content would be displayed here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-bold">Cyber Safety Education</h1>
              <p className="text-sm text-muted-foreground">Learn to keep your family safe online</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Overview */}
          <Card className="classified-glow mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                Your Learning Progress
              </CardTitle>
              <CardDescription>Track your family's cyber safety education</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-accent">{completedModules.length}</div>
                  <p className="text-sm text-muted-foreground">Modules Completed</p>
                </div>
                <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-accent">
                    {Math.round((completedModules.length / educationModules.length) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
                <div className="text-center p-4 bg-card/50 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-accent">{completedModules.length * 15}</div>
                  <p className="text-sm text-muted-foreground">Minutes Learned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationModules.map((module) => {
              const Icon = module.icon
              const isCompleted = completedModules.includes(module.id)

              return (
                <Card key={module.id} className="classified-glow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${isCompleted ? "bg-success/20" : "bg-accent/20"}`}>
                          <Icon className={`h-6 w-6 ${isCompleted ? "text-success" : "text-accent"}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {module.duration}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {module.difficulty}
                            </Badge>
                            {isCompleted && (
                              <Badge variant="default" className="text-xs bg-success">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-3">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">What you'll learn:</h4>
                        <ul className="space-y-1">
                          {module.topics.slice(0, 3).map((topic, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-accent rounded-full"></div>
                              {topic}
                            </li>
                          ))}
                          {module.topics.length > 3 && (
                            <li className="text-sm text-muted-foreground">+ {module.topics.length - 3} more topics</li>
                          )}
                        </ul>
                      </div>
                      <Button className="w-full" onClick={() => handleStartModule(module.id)} disabled={isCompleted}>
                        {isCompleted ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Learning
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Resources */}
          <Card className="classified-glow mt-8">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>Extra help and support materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-16 flex-col bg-transparent">
                  <BookOpen className="h-5 w-5 mb-1" />
                  <span className="text-sm">Family Safety Checklist</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col bg-transparent">
                  <Shield className="h-5 w-5 mb-1" />
                  <span className="text-sm">Emergency Contact Guide</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col bg-transparent">
                  <Users className="h-5 w-5 mb-1" />
                  <span className="text-sm">Talk to Your Kids Guide</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col bg-transparent">
                  <Smartphone className="h-5 w-5 mb-1" />
                  <span className="text-sm">Device Security Setup</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
