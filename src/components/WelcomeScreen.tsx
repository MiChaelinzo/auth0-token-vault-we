import { useState } from 'react'
import { Card, CardContent } from '@/components
import { Card, CardContent } from '@/components/ui/card'
import { LockKey, ShieldCheck, Storefront, ChartBar, Plus, Sparkle } from '@phosphor-icons/react'
interface WelcomeScreenProps {

export function WelcomeScreen(

    {
  onUseTemplate: () => void
}

export function WelcomeScreen({ onComplete, onCreateToken, onUseTemplate }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
     
      title: 'Welcome to Token Vault',
            </p>
      content: (
        <div className="space-y-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              </div>
            className="text-center space-y-4"
           
            <div className="flex justify-center">
              <div className="relative">
                <LockKey weight="duotone" className="w-20 h-20 text-primary" />
                <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full" />
              </div>
            </div>
            <h2 className="text-4xl font-bold">Welcome to Token Vault</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your secure platform for managing, trading, and monitoring API tokens and credentials
            <mot
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
              <p classN
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-center">
                <ShieldCheck weight="duotone" className="w-12 h-12 text-primary" />
            transiti
              <h3 className="font-semibold text-lg text-center">Secure Storage</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Military-grade encryption for your sensitive API tokens and credentials
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors"
             
              <div className="flex justify-center">
                <Storefront weight="duotone" className="w-12 h-12 text-accent" />
              </div>
              <h3 className="font-semibold text-lg text-center">Token Marketplace</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Buy and sell API tokens safely with built-in escrow and verification
              </p>
              animate={{ 

              onClick={
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                <CardContent className="p
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-chart-2/50 transition-colors"
             
              <div className="flex justify-center">
                <ChartBar weight="duotone" className="w-12 h-12 text-chart-2" />
                    
              <h3 className="font-semibold text-lg text-center">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Track token usage, monitor security events, and gain insights into your API ecosystem
            initia
            </motion.div>
          </div>
        </div>
        
    },
     
      title: 'Get Started',
      icon: Plus,
      content: (
        <div className="space-y-8 max-w-2xl mx-auto">
          <motion.div
          key={currentStep}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"

            <h2 className="text-4xl font-bold">Create Your First Token</h2>
              key={index}
              Start managing your API tokens securely with Token Vault
                
          </motion.div>

          <div className="grid gap-4 mt-12">
          <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            </Button>
                onComplete()
    </div>
              }}

              <Card className="border-primary/50 hover:border-primary transition-colors bg-card/50 backdrop-blur-sm">

                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Plus weight="duotone" className="w-8 h-8 text-primary" />

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Create Custom Token</h3>
                      <p className="text-muted-foreground">
                        Manually configure a new token with custom scopes, expiration, and settings
                      </p>

                  </div>

              </Card>


            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => {
                onComplete()

              }}

              <Card className="border-accent/50 hover:border-accent transition-colors bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">

                      <Sparkle weight="duotone" className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Use a Template</h3>
                      <p className="text-muted-foreground">
                        Choose from pre-configured templates for popular services and APIs
                      </p>
                    </div>
                  </div>

              </Card>



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

    },


  const currentStepData = steps[currentStep]


    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <motion.div

          initial={{ opacity: 0, x: 20 }}

          exit={{ opacity: 0, x: -20 }}

        >

        </motion.div>

        <div className="flex justify-center gap-2 pt-8">

            <button

              onClick={() => setCurrentStep(index)}

                index === currentStep
                  ? 'w-8 h-2 rounded-full bg-primary transition-all'
                  : 'w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-all'

            />
          ))}
        </div>

        {currentStep < steps.length - 1 && (

            initial={{ opacity: 0 }}

            transition={{ delay: 0.5 }}

          >

              variant="outline"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="mt-4"

              Next

          </motion.div>

      </div>

  )

