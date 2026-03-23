import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LockKey, ShieldCheck, Storefront, ChartBar, Plus, Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onComplete: () => void
  onCreateToken: () => void
  onUseTemplate: () => void
}

export function WelcomeScreen({ onComplete, onCreateToken, onUseTemplate }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              <LockKey weight="duotone" className="w-24 h-24 text-primary" />
              <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl font-bold tracking-tight">
              Welcome to Token Vault
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your secure platform for managing, trading, and monitoring API tokens and credentials
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 p-5 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50"
            >
              <div className="flex justify-center">
                <LockKey weight="duotone" className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-center">Secure Storage</h3>
              <p className="text-sm text-muted-foreground text-center">
                Store and manage all your API tokens in one encrypted vault
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 p-5 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50"
            >
              <div className="flex justify-center">
                <Storefront weight="duotone" className="w-10 h-10 text-chart-2" />
              </div>
              <h3 className="font-semibold text-lg text-center">Token Marketplace</h3>
              <p className="text-sm text-muted-foreground text-center">
                Buy and sell API tokens securely on our marketplace
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 p-5 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50"
            >
              <div className="flex justify-center">
                <ChartBar weight="duotone" className="w-10 h-10 text-chart-5" />
              </div>
              <h3 className="font-semibold text-lg text-center">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground text-center">
                Monitor token usage and track security events in real-time
              </p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-bold">Create Your First Token</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Start managing your API tokens securely with Token Vault
            </p>
          </motion.div>

          <div className="grid gap-4 mt-12 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => {
                onCreateToken()
                onComplete()
              }}
            >
              <Card className="border-primary/50 hover:border-primary transition-colors bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Plus weight="duotone" className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Create Custom Token</h3>
                      <p className="text-muted-foreground">
                        Manually configure a new token with custom scopes, expiration, and settings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => {
                onUseTemplate()
                onComplete()
              }}
            >
              <Card className="border-accent/50 hover:border-accent transition-colors bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-accent/10 p-3">
                      <Sparkle weight="duotone" className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Use a Template</h3>
                      <p className="text-muted-foreground">
                        Choose from pre-configured templates for popular services and APIs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center pt-4"
          >
            <Button 
              variant="ghost" 
              onClick={onComplete}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </Button>
          </motion.div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStepData.content}
        </motion.div>

        <div className="flex justify-center gap-2 pt-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={
                index === currentStep
                  ? 'w-8 h-2 rounded-full bg-primary transition-all'
                  : 'w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-all'
              }
            />
          ))}
        </div>

        {currentStep < steps.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="mt-4"
            >
              Next
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
