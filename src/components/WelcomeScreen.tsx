import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LockKey, ShieldCheck, Storefront, ChartBar, Plu
import { LockKey, ShieldCheck, Storefront, ChartBar, Plus, Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface WelcomeScreenProps {
}
  onCreateToken: () => void

 

            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}

              <Lo
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
              <h
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
              </p>
              <h3 className="font-semibold text-lg text-center">Secure Storage</h3>
              <p className="text-sm text-muted-foreground text-center">
                Store and manage all your API tokens in one encrypted vault
              tran
            </motion.div>

            <motion.div
              <h3 className="font-semibold te
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 p-5 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50"
        </div
              <div className="flex justify-center">
                <Storefront weight="duotone" className="w-10 h-10 text-chart-2" />
              </div>
              <h3 className="font-semibold text-lg text-center">Token Marketplace</h3>
              <p className="text-sm text-muted-foreground text-center">
                Buy and sell API tokens securely on our marketplace
              </p>
            </motion.div>

              initial={
              transition={{ delay: 0.2 }}
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
                  
            </motion.div>
                
        </div>
        
    },
     
            </mo
        <div className="text-center space-y-4">
              initial
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              onClick={() => {
          >
              }}
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                <CardContent className="p-6">
            </p>
            <button

          <div className="grid gap-4 mt-12 max-w-2xl mx-auto">
            <motion.div
            />
        </div>
        {currentStep < steps.length - 1 &
            initial={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
              onClick={() => {
                onCreateToken()
              onClick={() =>
              Ne
            >
      </div>
                <CardContent className="p-6">



                    </div>





                    </div>

                </CardContent>

            </motion.div>








                onUseTemplate()


            >



                    <div className="rounded-lg bg-accent/10 p-3">









                </CardContent>

            </motion.div>
          </div>
















      ),

  ]



  return (



          key={currentStep}

          animate={{ opacity: 1, x: 0 }}

          transition={{ duration: 0.3 }}

          {currentStepData.content}



          {steps.map((_, index) => (

              key={index}

              className={



              }





          <motion.div

            animate={{ opacity: 1 }}

            className="text-center"

            <Button



            >

            </Button>

        )}

    </div>

}
