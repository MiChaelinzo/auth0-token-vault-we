import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LockKey, ShieldCheck, Storefront, Char
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
              <h3 
          <div className=

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
            >
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              </div>
          </d
      ),
    {
              </div>
      content: (
          <div className="grid md:grid-cols-2 gap-4">
              initial={{ opacity: 0, scale: 0.95 }}
              </p>
              className="
                

              <Card className="h-full bord
                  <div 
                      <Sparkle weight="duotone
                  </div>
                    <h3 className="text-x
                      Start with pre-configured tokens for popular services like GitHub, Str
             
                    Browse Templates
                  </Button>
              </Card

              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.3 }}
              className="cursor-pointer"
                onCo
              }}
              <Card class

                      <
                  </div>
                    <h3 className="text-xl f
                      Build your own toke
                  </div>
             
                  </Button>
              </Card>
          </div>
          <div className="text-center">
              variant="ghost"
              className="text-muted-foreground hover:text-for
              Skip and explore on my own
          </div>
      ),
  ]


    <div className="min-h-screen flex items-ce
        <AnimatePresence mode="wait">
            key={currentStep}
            animate={{ opacity: 1, y: 0 }}
            t
          >
              <motion.div
                anim
                className="inline-block"
                <div className="relative">
                    <Icon weight="duotone" className="w-11 h-
                  <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-f
              </moti
              <div c
                  initial
                
              
      ),
      
    {
                >
      subtitle: 'Choose how you want to begin',
      icon: LockKey,
      content: (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            </motion.di
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
                    }`}
                onComplete()

              }}
             
              <Card className="h-full border-accent/50 bg-accent/5 hover:bg-accent/10 transition-colors">
                </Button>
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Sparkle weight="duotone" className="w-9 h-9 text-accent" />
}
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








































































































