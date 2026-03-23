import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LockKey, ShieldCheck, Storefront, ChartBar, Sparkle, ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface WelcomeScreenProps {
  onComplete: () => void
  onCreateToken: () => void
  onUseTemplate: () => void
}

export function WelcomeScreen({ onComplete, onCreateToken, onUseTemplate }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Welcome to Token Vault',
      subtitle: 'Your secure hub for API token management',
      icon: LockKey,
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Token Vault helps you securely store, manage, and trade API tokens with enterprise-grade security and real-time analytics.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShieldCheck weight="duotone" className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Secure Storage</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Military-grade encryption keeps your tokens safe with enterprise security standards
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Storefront weight="duotone" className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Token Marketplace</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Buy and sell pre-configured API tokens from a thriving developer community
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-chart-5/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-chart-5/10 flex items-center justify-center">
                <ChartBar weight="duotone" className="w-7 h-7 text-chart-5" />
              </div>
              <h3 className="font-semibold text-lg">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track token usage, monitor security events, and gain insights into your API ecosystem
              </p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: 'Get Started',
      subtitle: 'Choose how you want to begin',
      icon: LockKey,
      content: (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => {
                onComplete()
                onUseTemplate()
              }}
            >
              <Card className="h-full border-accent/50 bg-accent/5 hover:bg-accent/10 transition-colors">
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Sparkle weight="duotone" className="w-9 h-9 text-accent" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Use a Template</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Start with pre-configured tokens for popular services like GitHub, Stripe, and more
                    </p>
                  </div>
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Browse Templates
                    <ArrowRight weight="bold" className="ml-2" />
                  </Button>
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
                onComplete()
                onCreateToken()
              }}
            >
              <Card className="h-full border-primary/50 bg-primary/5 hover:bg-primary/10 transition-colors">
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                      <LockKey weight="duotone" className="w-9 h-9 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Create Custom Token</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Build your own token from scratch with full control over scopes and permissions
                    </p>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Create Token
                    <ArrowRight weight="bold" className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={onComplete}
            >
              Skip and explore on my own
            </Button>
          </div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl"
        >
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block"
            >
              <div className="relative">
                <Icon weight="duotone" className="w-20 h-20 text-primary mx-auto" />
                <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full" />
              </div>
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold tracking-tight"
              >
                {currentStepData.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-muted-foreground"
              >
                {currentStepData.subtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentStepData.content}
            </motion.div>

            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(1)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Get Started
                  <ArrowRight weight="bold" className="ml-2" />
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
