import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LockKey, Plus, ShieldCheck } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface EmptyStateProps {
  onCreateToken: () => void
}

export function EmptyState({ onCreateToken }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[500px]"
    >
      <Card className="max-w-2xl border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-12 pb-12 px-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="relative">
              <LockKey weight="duotone" className="w-24 h-24 text-primary" />
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

          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Welcome to Token Vault</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              Securely manage your API tokens with enterprise-grade security and monitoring
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="space-y-2 p-4 rounded-lg bg-background/30 border border-border/30">
              <ShieldCheck weight="duotone" className="w-8 h-8 text-accent" />
              <h3 className="font-semibold">Secure Storage</h3>
              <p className="text-sm text-muted-foreground">
                Encrypted token vault with Auth0 security
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-lg bg-background/30 border border-border/30">
              <LockKey weight="duotone" className="w-8 h-8 text-primary" />
              <h3 className="font-semibold">Scope Control</h3>
              <p className="text-sm text-muted-foreground">
                Granular permissions for each token
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-lg bg-background/30 border border-border/30">
              <ShieldCheck weight="duotone" className="w-8 h-8 text-accent" />
              <h3 className="font-semibold">Usage Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Monitor and analyze token activity
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              size="lg" 
              onClick={onCreateToken}
              className="bg-primary hover:bg-primary/90 px-8"
            >
              <Plus weight="bold" className="mr-2" />
              Create Your First Token
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
