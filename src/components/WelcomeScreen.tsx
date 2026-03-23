import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { LockKey, ShieldCheck, Storefront, ChartBar, Plus, Sparkle } from '@phosphor-icons/react'
interface WelcomeScreenProps {

  onUseTemplate: () => void
  onComplete: () => void
export function WelcomeScre
  onUseTemplate: () => void
}

export function WelcomeScreen({ onComplete, onCreateToken, onUseTemplate }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
     
            </p>

            <motion.div
              animate
              className="space-y-3 p-5 roun
              <div className="flex justify
              </div>
           
              </p>

              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
            >
                <S
              <h3 className="font-semibold text-lg text-center">Token Mark
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your secure platform for managing, trading, and monitoring API tokens and credentials
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              </p>
          </div>
      ),
    {
      content: (
          <motion.div
            animate=
            className="text-center space-y-4"
            <h2 className="text-4xl font-bold">Create Your First Token</h2>
              Start managing your API tokens securely with Token Vault
          </motion
          <div className=

              transitio
              className="cursor-pointer"
                onComplete()
              }}
              <Card className="border-primary/50 hover:border-primary transition-colors bg-card/50 backdrop-blur-sm">
             
                      <Plus weight="duotone" classN
                    <div className="flex-1">
                    
                      </p>
                  </div>
              </Card>

              initial={{ 

              className
                onComplete()
              }}
              <Card className="border-acc
                  <div className="flex items-start gap-4">
             
                    <div className="flex-1">
                      <p className="text-muted-foreground">
                    
                  </div>
              </Card>
          </div>
          <motion.
            animate={{ op
            clas
            <B
        
      
     
        </div>
    },


    <div className="min-h-screen flex items
        <motion.div
          initial={{ opacity: 0, x: 20 }}
            className="text-center space-y-4"
        >
            <h2 className="text-4xl font-bold">Create Your First Token</h2>
        <div className="flex justify-center gap-2 pt-8">
              Start managing your API tokens securely with Token Vault
              on
          </motion.div>

          <div className="grid gap-4 mt-12">
        </div>
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              className="mt-4"
                onComplete()
          </motion.div>
              }}
  )
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

