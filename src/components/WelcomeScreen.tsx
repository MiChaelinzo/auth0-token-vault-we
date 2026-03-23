import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LockKey, ShieldCheck, Storefront, ChartBar, ArrowRight, CheckCircle, Sparkle } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

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
              transition={{ delay: 0.2 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShieldCheck weight="duotone" className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Secure Storage</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Military-grade encryption keeps your tokens safe with Auth0 security standards
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
              transition={{ delay: 0.4 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-chart-2/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <ChartBar weight="duotone" className="w-7 h-7 text-chart-2" />
              </div>
              <h3 className="font-semibold text-lg">Real-Time Analytics</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monitor usage patterns, track security events, and optimize your API strategy
              </p>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: 'Powerful Features',
      subtitle: 'Everything you need to manage tokens like a pro',
      icon: Sparkle,
      content: (
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 p-4 rounded-lg bg-background/30 border border-border/30"
          >
            <div className="flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Token Refresh</h4>
              <p className="text-sm text-muted-foreground">
                Automatically renew expiring tokens without losing history or configuration
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 p-4 rounded-lg bg-background/30 border border-border/30"
          >
            <div className="flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Scope Control</h4>
              <p className="text-sm text-muted-foreground">
                Granular permission management for each token with visual indicators
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 p-4 rounded-lg bg-background/30 border border-border/30"
          >
            <div className="flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Bulk Operations</h4>
              <p className="text-sm text-muted-foreground">
                Manage multiple tokens at once with bulk revoke, refresh, and export
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 p-4 rounded-lg bg-background/30 border border-border/30"
          >
            <div className="flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Security Dashboard</h4>
              <p className="text-sm text-muted-foreground">
                Real-time monitoring with alerts for suspicious activity and patterns
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 p-4 rounded-lg bg-background/30 border border-border/30"
          >
            <div className="flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Marketplace Trading</h4>
              <p className="text-sm text-muted-foreground">
                Buy, sell, and trade tokens with secure escrow and instant delivery
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 p-4 rounded-lg bg-background/30 border border-border/30"
          >
            <div className="flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Export & Backup</h4>
              <p className="text-sm text-muted-foreground">
                Full vault backups with one-click export and import functionality
              </p>
            </div>
          </motion.div>
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

          <div className="text-center pt-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onComplete}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip and explore the vault
            </Button>
          </div>
        </div>
      ),
    },
  ]

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-5xl"
        >
          <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
            <CardContent className="pt-12 pb-12 px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="flex justify-center"
                    >
                      <div className="relative">
                        <Icon weight="duotone" className="w-20 h-20 text-primary" />
                        <motion.div
                          animate={{ 
                            boxShadow: [
                              '0 0 20px oklch(0.65 0.25 250 / 0.3)',
                              '0 0 40px oklch(0.65 0.25 250 / 0.5)',
                              '0 0 20px oklch(0.65 0.25 250 / 0.3)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full"
                        />
                      </div>
                    </motion.div>

                    <div className="space-y-2">
                      <h2 className="text-4xl font-bold tracking-tight">{currentStepData.title}</h2>
                      <p className="text-muted-foreground text-lg">{currentStepData.subtitle}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    {currentStepData.content}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between pt-12">
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep 
                          ? 'bg-primary w-8' 
                          : index < currentStep
                          ? 'bg-primary/50 w-2'
                          : 'bg-muted w-2'
                      }`}
                      animate={{ 
                        width: index === currentStep ? 32 : 8,
                        backgroundColor: index <= currentStep 
                          ? 'oklch(0.65 0.25 250)' 
                          : 'oklch(0.25 0.02 250)'
                      }}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    >
                      Back
                    </Button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Next
                      <ArrowRight weight="bold" className="ml-2" />
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
