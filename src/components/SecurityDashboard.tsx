import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Token, SecurityEvent } from '@/lib/types'
import { ShieldCheck, Warning, ChartLine, Key } from '@phosphor-icons/react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { formatRelativeTime } from '@/lib/token-utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SecurityDashboardProps {
  tokens: Token[]
  events: SecurityEvent[]
}

export function SecurityDashboard({ tokens, events }: SecurityDashboardProps) {
  const activeTokens = tokens.filter(t => t.status === 'active').length
  const expiredTokens = tokens.filter(t => t.status === 'expired').length
  const revokedTokens = tokens.filter(t => t.status === 'revoked').length
  const totalUsage = tokens.reduce((sum, t) => sum + t.usageCount, 0)

  const usageData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      requests: Math.floor(Math.random() * 500) + 100
    }
  })

  const tokenTypeData = [
    { name: 'API', value: tokens.filter(t => t.type === 'api').length, color: 'oklch(0.65 0.25 250)' },
    { name: 'Access', value: tokens.filter(t => t.type === 'access').length, color: 'oklch(0.75 0.15 195)' },
    { name: 'Refresh', value: tokens.filter(t => t.type === 'refresh').length, color: 'oklch(0.70 0.20 280)' },
    { name: 'Service', value: tokens.filter(t => t.type === 'service').length, color: 'oklch(0.75 0.18 150)' },
  ].filter(d => d.value > 0)

  const recentEvents = events.slice(0, 10)

  const getEventIcon = (type: SecurityEvent['type']) => {
    switch (type) {
      case 'created':
        return <Key weight="duotone" className="text-accent" />
      case 'revoked':
        return <Warning weight="duotone" className="text-destructive" />
      case 'used':
        return <ChartLine weight="duotone" className="text-primary" />
      case 'failed':
        return <Warning weight="duotone" className="text-yellow-400" />
      case 'expired':
        return <Warning weight="duotone" className="text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs uppercase tracking-wider">Active Tokens</CardDescription>
            <CardTitle className="text-3xl font-bold text-accent">{activeTokens}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs uppercase tracking-wider">Total Usage</CardDescription>
            <CardTitle className="text-3xl font-bold text-primary">{totalUsage.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">API calls made</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs uppercase tracking-wider">Expired</CardDescription>
            <CardTitle className="text-3xl font-bold text-yellow-400">{expiredTokens}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs uppercase tracking-wider">Revoked</CardDescription>
            <CardTitle className="text-3xl font-bold text-muted-foreground">{revokedTokens}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Deactivated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold tracking-tight">API Usage Trend</CardTitle>
            <CardDescription>Requests over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.02 250)" />
                <XAxis 
                  dataKey="date" 
                  stroke="oklch(0.60 0.01 250)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="oklch(0.60 0.01 250)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(0.20 0.02 250)',
                    border: '1px solid oklch(0.30 0.02 250)',
                    borderRadius: '8px',
                    color: 'oklch(0.95 0.01 250)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="oklch(0.65 0.25 250)" 
                  strokeWidth={3}
                  dot={{ fill: 'oklch(0.65 0.25 250)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold tracking-tight">Token Distribution</CardTitle>
            <CardDescription>By token type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={tokenTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tokenTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(0.20 0.02 250)',
                      border: '1px solid oklch(0.30 0.02 250)',
                      borderRadius: '8px',
                      color: 'oklch(0.95 0.01 250)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {tokenTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight">Recent Activity</CardTitle>
          <CardDescription>Latest security events and token operations</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {recentEvents.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ChartLine weight="duotone" className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No recent activity</p>
                </div>
              ) : (
                recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-4 bg-background/30 border border-border/30 rounded-lg hover:bg-background/50 transition-colors"
                  >
                    <div className="mt-1">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {event.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(event.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm font-medium truncate">{event.tokenName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.details}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
