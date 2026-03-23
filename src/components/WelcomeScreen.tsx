import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
interface WelcomeScreenProps {
  onCreateToken: () => void

export function WelcomeScreen(

  onCreateToken: () => void
  onUseTemplate: () => void
}

export function WelcomeScreen({ onComplete, onCreateToken, onUseTemplate }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
     
              animate={{ opacity: 1, y
              className="space-y-3 p-5 rounded-xl bg-backgro
              <div c
              </
              <p className="text-sm text-muted-foregr
              </p>

              initial={{ opacity: 0,
              transition={{ delay: 0.25
            >
           
              <h3 className="font-semibold text-lg text-center">Token Marketplace</h3>
                Buy a

            <motion.div
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-center">
                <ShieldCheck weight="duotone" className="w-12 h-12 text-primary" />
            </motion
              <h3 className="font-semibold text-lg text-center">Secure Storage</h3>
      ),
                Military-grade encryption for your sensitive API tokens and credentials
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="flex justify-center">
                <Storefront weight="duotone" className="w-12 h-12 text-accent" />
              </div>
              <h3 className="font-semibold text-lg text-center">Token Marketplace</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Buy and sell API tokens safely with built-in escrow and verification
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="flex justify-center">
                <ChartBar weight="duotone" className="w-12 h-12 text-chart-2" />
              </div>
              <h3 className="font-semibold text-lg text-center">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Track token usage, monitor security events, and gain insights into your API ecosystem
              </p>
            </motion.div>
                
        </div>
        
    },
     
      title: 'Get Started',
              whileHover={{ scale: 1.02 }}
      icon: LockKey,
                
        <div className="space-y-8 max-w-2xl mx-auto">
            >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => {
            <motion.p
              animate={{ opacit
              cl
             
          </div>
          <div className="mt-12">
          </div>
          <div className="flex justify-center gap-2 pt-8">
              <button
                onClick={(
                  index 
                    : 'w-2 bg-muted-foregroun
              />
          </div>
          {currentStep < steps.length - 1 && (
              initial={{
              transition
              <Button
                variant="outline"
                className="mt-4"
                Next
              </Button>
          )}
      </div>
























































































































