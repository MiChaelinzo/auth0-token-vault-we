import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
interface WelcomeScreenProps {
  onCreateToken: () => void

export function WelcomeScreen(

  onCreateToken: () => void
  onUseTemplate: () => void
}

export function WelcomeScreen({ onComplete, onCreateToken, onUseTemplate }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
     
      title: 'Welcome to Token Vault',
      subtitle: 'Your secure hub for API token management',
      icon: LockKey,
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Token Vault helps you securely store, manage, and trade API tokens with enterprise-grade security and real-time analytics.
              
          
          <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div clas
              initial={{ opacity: 0, y: 20 }}
              <h3 className="font-semibold t
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
              </p>
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Storefront weight="duotone" className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Token Marketplace</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Buy and sell pre-configured API tokens from a thriving developer community
          <motion.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            <div className="space-y-1">
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-chart-2/50 transition-colors"
             
              <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
              </p>
          </motion.d
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 p-4 rounded-lg bg-background/30 border border-border/30"
            <div c
            </div>
              <h
              
        

     
            transition={{ delay: 
          >
              <Check
            <div
              <p className="text-sm text-muted-foreground">
              </p>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, x: 0
            className="flex gap-4 p-4 rounded-lg bg-background/30 border border-border/30"
           
            </div>
              <h4 className="font-semibold">Data Export/Import</h4>
            </div>
            </div>
        </div>
    },
      title: 'Get Started',
      icon: LockKe
        <div class
          </motion.div>

              whileHo
            initial={{ opacity: 0, x: -20 }}
                onUseTemplate()
            >
                <CardContent className="pt-8 pb-8 text-center space-y-4">
           
                    </div>
                  <div className="space-y-2">
                  
                    </p>
                  <Button variant="outline" className="w-full 
                    <ArrowRight weight="bold" className="ml
                </CardContent>
            </moti
            <motio
              animate={

              onClick
                onCreateToken()
            >
                <CardContent className=
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center j
           
                  <div className="space-y-2
                    <p className="text-sm text-muted-foreground leading-relaxed
                  
                  <Button className="w-
                    <ArrowRight weight="bold" className="ml-2" /
                </CardContent>
            </motion.div>

            <Butto
            </Button>

    },

  const Icon = currentStepData.icon
            transition={{ delay: 0.4 }}
      <div className="w-full max-w-6xl">
          >
            <div className="flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
            classN
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
           
            <div className="flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Marketplace Trading</h4>

                Buy, sell, and trade tokens with secure escrow and instant delivery
                  
            </div>
              </div>

      </div>
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}

          >
            <div className="flex-shrink-0">
              <CheckCircle weight="duotone" className="w-6 h-6 text-success" />

            <div className="space-y-1">

              <p className="text-sm text-muted-foreground">
                Full vault backups with one-click export and import functionality
              </p>

          </motion.div>

      ),

    {

      subtitle: 'Choose how you want to begin',
      icon: LockKey,
      content: (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">

              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"

                onComplete()

              }}

              <Card className="h-full border-accent/50 bg-accent/5 hover:bg-accent/10 transition-colors">

                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Sparkle weight="duotone" className="w-9 h-9 text-accent" />

                  </div>

                    <h3 className="text-xl font-bold">Use a Template</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Start with pre-configured tokens for popular services like GitHub, Stripe, and more

                  </div>
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Browse Templates
                    <ArrowRight weight="bold" className="ml-2" />
                  </Button>

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

              }}

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

              </Card>

          </div>
















































































