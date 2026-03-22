import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TOKEN_TEMPLATES, TokenTemplate } from '@/lib/token-templates'
import { Sparkle, Fire } from '@phosphor-icons/react'

interface TokenTemplatesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectTemplate: (template: TokenTemplate) => void
}

export function TokenTemplatesDialog({
  open,
  onOpenChange,
  onSelectTemplate,
}: TokenTemplatesDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'development', label: 'Development' },
    { id: 'finance', label: 'Finance' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'social', label: 'Social' },
    { id: 'productivity', label: 'Productivity' },
  ]

  const filteredTemplates = selectedCategory === 'all'
    ? TOKEN_TEMPLATES
    : TOKEN_TEMPLATES.filter(t => t.category === selectedCategory)

  const popularTemplates = TOKEN_TEMPLATES.filter(t => t.popular)

  const handleSelectTemplate = (template: TokenTemplate) => {
    onSelectTemplate(template)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkle weight="duotone" className="w-6 h-6 text-primary" />
            Token Templates
          </DialogTitle>
          <DialogDescription>
            Start with pre-configured templates for popular services and APIs
          </DialogDescription>
        </DialogHeader>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
          <div className="px-6 pt-4">
            <TabsList className="w-full justify-start bg-card/50">
              {categories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex-1 px-6 py-4" style={{ maxHeight: 'calc(85vh - 200px)' }}>
            {selectedCategory === 'all' && popularTemplates.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Fire weight="duotone" className="w-5 h-5 text-warning" />
                  <h3 className="font-semibold text-lg">Popular Templates</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {popularTemplates.map(template => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onSelect={handleSelectTemplate}
                    />
                  ))}
                </div>
                <div className="my-6 border-t border-border/50" />
              </div>
            )}

            <div className="grid gap-3 md:grid-cols-2">
              {filteredTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No templates found in this category</p>
              </div>
            )}
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

interface TemplateCardProps {
  template: TokenTemplate
  onSelect: (template: TokenTemplate) => void
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <button
      onClick={() => onSelect(template)}
      className="flex flex-col gap-3 p-4 bg-card/50 border border-border/50 rounded-lg hover:bg-card hover:border-primary/50 transition-all text-left group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{template.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold group-hover:text-primary transition-colors">
                {template.service}
              </h4>
              {template.popular && (
                <Badge variant="secondary" className="text-xs">
                  Popular
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{template.name}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {template.description}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className="text-xs">
          {template.type}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {template.defaultScopes.length} scope{template.defaultScopes.length !== 1 ? 's' : ''}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {template.expirationDays ? `${template.expirationDays}d expiry` : 'No expiry'}
        </Badge>
      </div>
    </button>
  )
}
