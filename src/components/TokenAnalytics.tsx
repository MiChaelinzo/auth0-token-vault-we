import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Token } from '@/lib/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { ChartBar, ChartPie, TrendUp, ChartLine } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

interface TokenAnalyticsProps {
  tokens: Token[]
}

export function TokenAnalytics({ tokens }: TokenAnalyticsProps) {
  const tokensByType = tokens.reduce((acc, token) => {
    acc[token.type] = (acc[token.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const typeData = Object.entries(tokensByType).map(([type, count]) => ({
    name: type,
    value: count,
  }))

  const tokensByStatus = tokens.reduce((acc, token) => {
    acc[token.status] = (acc[token.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const statusData = Object.entries(tokensByStatus).map(([status, count]) => ({
    name: status,
    value: count,
  }))

  const usageData = tokens
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 10)
    .map((token) => ({
      name: token.name.length > 15 ? token.name.substring(0, 15) + '...' : token.name,
      usage: token.usageCount,
    }))

  const timelineDataItems = tokens.map((token) => ({
    date: new Date(token.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    timestamp: new Date(token.createdAt).getTime(),
    count: 1,
  }))

  const timelineData = timelineDataItems
    .reduce((acc, item) => {
      const existing = acc.find((a) => a.date === item.date)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ ...item })
      }
      return acc
    }, [] as Array<{ date: string; timestamp: number; count: number }>)
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-14)

  const COLORS = {
    api: 'oklch(0.65 0.25 250)',
    access: 'oklch(0.75 0.15 195)',
    refresh: 'oklch(0.70 0.20 280)',
    service: 'oklch(0.70 0.20 150)',
    active: 'oklch(0.75 0.15 195)',
    expired: 'oklch(0.70 0.18 50)',
    revoked: 'oklch(0.60 0.01 250)',
    listed: 'oklch(0.70 0.20 150)',
  }

  const totalUsage = tokens.reduce((sum, token) => sum + token.usageCount, 0)
  const avgUsage = tokens.length > 0 ? Math.round(totalUsage / tokens.length) : 0
  const activeTokens = tokens.filter((t) => t.status === 'active').length
  const healthScore = tokens.length > 0 ? Math.round((activeTokens / tokens.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardDescription>Total Tokens</CardDescription>
            <CardTitle className="text-3xl font-bold">{tokens.length}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardDescription>Active Tokens</CardDescription>
            <CardTitle className="text-3xl font-bold text-accent">{activeTokens}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardDescription>Total API Calls</CardDescription>
            <CardTitle className="text-3xl font-bold text-chart-2">
              {totalUsage.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardDescription>Health Score</CardDescription>
            <div className="flex items-center gap-2">
              <CardTitle className="text-3xl font-bold">
                {healthScore}%
              </CardTitle>
              <Badge 
                variant="outline" 
                className={healthScore >= 80 ? 'bg-chart-5/20 text-chart-5 border-chart-5/30' : healthScore >= 50 ? 'bg-warning/20 text-warning border-warning/30' : 'bg-destructive/20 text-destructive border-destructive/30'}
              >
                {healthScore >= 80 ? 'Good' : healthScore >= 50 ? 'Fair' : 'Poor'}
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ChartBar weight="duotone" className="w-5 h-5 text-primary" />
              <CardTitle>Top 10 Most Used Tokens</CardTitle>
            </div>
            <CardDescription>API calls by token</CardDescription>
          </CardHeader>
          <CardContent>
            {usageData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.02 250)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="oklch(0.60 0.01 250)" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="oklch(0.60 0.01 250)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(0.20 0.02 250)', 
                      border: '1px solid oklch(0.30 0.02 250)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="usage" fill="oklch(0.65 0.25 250)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No usage data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ChartPie weight="duotone" className="w-5 h-5 text-accent" />
              <CardTitle>Tokens by Type</CardTitle>
            </div>
            <CardDescription>Distribution of token types</CardDescription>
          </CardHeader>
          <CardContent>
            {typeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || COLORS.api} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(0.20 0.02 250)', 
                      border: '1px solid oklch(0.30 0.02 250)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No token data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendUp weight="duotone" className="w-5 h-5 text-chart-5" />
              <CardTitle>Token Creation Timeline</CardTitle>
            </div>
            <CardDescription>Tokens created over the last 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            {timelineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.30 0.02 250)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="oklch(0.60 0.01 250)" 
                    fontSize={12}
                  />
                  <YAxis stroke="oklch(0.60 0.01 250)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(0.20 0.02 250)', 
                      border: '1px solid oklch(0.30 0.02 250)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="oklch(0.75 0.15 195)" 
                    strokeWidth={3}
                    dot={{ fill: 'oklch(0.75 0.15 195)', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No timeline data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ChartLine weight="duotone" className="w-5 h-5 text-warning" />
              <CardTitle>Token Status Distribution</CardTitle>
            </div>
            <CardDescription>Current status of all tokens</CardDescription>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || COLORS.active} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'oklch(0.20 0.02 250)', 
                      border: '1px solid oklch(0.30 0.02 250)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No status data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
