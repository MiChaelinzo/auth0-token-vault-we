import { useState } from 'react'
import { LockKey, ShieldCheck, Storefront, ChartBar, Sp
import { LockKey, ShieldCheck, Storefront, ChartBar, Sparkle, ArrowRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
  onCreateToken: () => void

export function WelcomeScreen(

  onCreateToken: () => void
  onUseTemplate: () => void
}

export function WelcomeScreen({ onComplete, onCreateToken, onUseTemplate }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
     
                <ShieldCheck weight="d
              <h3 className="font-semibold text-lg">Secure 
                Mili
            </mo
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors"
              
          
              <p className="text-sm text-muted-foreground 
              </p>

              initial={{ opacity: 0, y: 20 }
              transition={{ delay: 0.3 }}
            >
             
              <h3 className="font-semibold text-lg">Real-time Analytics</h3>
                Track token usage, monitor security events, and gain insights int
            </motion
        </div>
    },
      title: 'Get Started',
      icon: LockKe
        <div className="s

              animate={
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                onUseTemplate()
            >
             
                    <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-ce
                    </div>
                  <d
                    <p className="text-sm text-muted-foreground leading-re
                    </p>
                  <Button variant="outline" className="w-full border-accent text-accent ho
                  
                </CardCon

            <motion.div
              animate={{ opacity: 1, scale: 1
              whileHover={{ scale: 1.02 }}
              transition={{ delay: 0.3 }}
                onCreateToken()
            >
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex it
                    
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground leading-rel
                    </p>
                  
                    <Arro
          </div>
            </
      ),
      
    {
            >
      subtitle: 'Choose how you want to begin',
      icon: LockKey,
      content: (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
  return (
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            <motion.div
                onComplete()
              className="inline
              }}
             
              <Card className="h-full border-accent/50 bg-accent/5 hover:bg-accent/10 transition-colors">
            <div className="space-y-2">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Sparkle weight="duotone" className="w-9 h-9 text-accent" />
              </motion.h1>
                  </div>
                transition={{ delay: 0.3 }}
                    <h3 className="text-xl font-bold">Use a Template</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Start with pre-configured tokens for popular services like GitHub, Stripe, and more
              initial={{
                  </div>
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Browse Templates
                    <ArrowRight weight="bold" className="ml-2" />
                  </Button>
              >
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



























































































