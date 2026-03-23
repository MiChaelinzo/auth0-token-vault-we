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
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full space-y-12"
      >
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center">Get Started</h2>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card className="border-primary/50 bg-card/50 backdrop-blur-sm hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mx-auto">
                    <Plus weight="duotone" className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-center">Create Custom Token</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Build a token from scratch with custom scopes and settings
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={onCreateToken}
                  >
                    <Plus weight="bold" className="mr-2" />
                    Create Token
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/50 bg-card/50 backdrop-blur-sm hover:border-accent transition-colors">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="rounded-lg bg-accent/10 p-3 w-fit mx-auto">
                    <Sparkle weight="duotone" className="w-8 h-8 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-center">Use Template</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Quick start with pre-configured templates for popular services
                    </p>
                  </div>
                  <Button 
                    className="w-full border-accent/50 text-accent hover:bg-accent/10"
                    variant="outline"
                    onClick={onUseTemplate}
                  >
                    <Sparkle weight="duotone" className="mr-2" />
                    Browse Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={onComplete}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip and explore
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
