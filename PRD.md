# Token Vault Dashboard

A secure, modern token management dashboard that demonstrates Auth0 Token Vault concepts with beautiful UI for managing API tokens, sessions, and security settings.

**Experience Qualities**:
1. **Secure** - Every element communicates trust through clean design, clear security indicators, and professional aesthetics
2. **Powerful** - The interface feels sophisticated with detailed token information, analytics, and comprehensive management tools
3. **Intuitive** - Complex security concepts are made approachable through clear visual hierarchies and guided workflows

**Complexity Level**: Light Application (multiple features with basic state)
This app manages tokens across multiple views with create/revoke operations, token details, and security settings - fitting the Light Application complexity tier.

## Essential Features

### Token List View
- **Functionality**: Display all active API tokens with key metadata (name, type, created date, last used, expiration status)
- **Purpose**: Provide at-a-glance overview of all tokens with quick access to management actions
- **Trigger**: Default view on app load
- **Progression**: Load app → View token grid with status badges → Click token for details → View expanded information in dialog
- **Success Criteria**: All tokens display correctly with accurate status, dates are human-readable, visual hierarchy makes scanning easy

### Create New Token
- **Functionality**: Generate new API tokens with configurable scopes, expiration, and naming
- **Purpose**: Allow users to provision new tokens for different services and use cases
- **Trigger**: Click "Create Token" button
- **Progression**: Click create → Dialog opens with form → Fill name, select scopes, set expiration → Submit → Token generated → Display token once with copy functionality → Token added to list
- **Success Criteria**: Form validation works, token appears in list immediately, one-time token display is clear

### Token Details & Management
- **Functionality**: View comprehensive token details and perform actions (copy, revoke, refresh)
- **Purpose**: Enable detailed inspection and lifecycle management of individual tokens
- **Trigger**: Click on any token card
- **Progression**: Click token → Dialog/sheet opens → View metadata, usage stats, scopes → Action buttons available → Confirm destructive actions → List updates
- **Success criteria**: All metadata displays accurately, revoke requires confirmation, refresh extends expiration, UI updates immediately

### Token Refresh
- **Functionality**: Regenerate token value and extend expiration date for expiring or expired tokens
- **Purpose**: Allow users to renew tokens without recreating them, maintaining token history and ID
- **Trigger**: Click "Refresh" button on token card or in token details dialog (only visible for tokens expiring within 7 days or already expired)
- **Progression**: Click refresh → Confirmation dialog explains impact → Confirm → New token value generated → Expiration extended by 30 days → Security event logged → Success notification with new token value
- **Success criteria**: Refresh button only shows for eligible tokens, old token immediately invalidated, new value generated, expiration updated, security event created

### Security Dashboard
- **Functionality**: Display security metrics, recent activity, and security recommendations
- **Purpose**: Provide visibility into token usage patterns and potential security issues
- **Trigger**: Navigate to security tab/view
- **Progression**: Click security → Load analytics → View charts of token usage → See recent activity log → Review security alerts
- **Success Criteria**: Charts render with realistic data, activity log is chronological, alerts are actionable

### Token Usage Analytics
- **Functionality**: Visual charts showing token usage over time, by endpoint, and by token type
- **Purpose**: Help users understand their API consumption patterns and identify anomalies
- **Trigger**: View in security dashboard or individual token details
- **Progression**: Load view → Charts animate in → Hover for details → Filter by time range → Export data option
- **Success Criteria**: D3/Recharts display smooth animations, data is accurate, interactions feel responsive

## Edge Case Handling
- **Empty States**: First-time users see welcoming onboarding with clear "Create First Token" CTA and explanation of Token Vault benefits
- **Expired Tokens**: Visually distinct (muted colors, warning badge) with prompts to refresh or create new
- **Expiring Soon Tokens**: Highlighted with warning color (yellow) and refresh button prominently displayed (tokens within 7 days of expiration)
- **Revoked Tokens**: Remain in history view but clearly marked as inactive with timestamp of revocation, refresh button disabled
- **Refreshed Tokens**: Generate new value and extend expiration, old token value immediately invalidated, security event logged with details
- **Network Simulation**: Simulated API delays show loading states and handle "failures" gracefully with retry options
- **Duplicate Names**: Prevent or warn when creating tokens with identical names
- **Long Token Values**: Truncate with ellipsis and provide copy button, never break layout
- **No Tokens**: Show compelling empty state with illustration and clear next steps

## Design Direction
The design should evoke trust, sophistication, and technological precision - like a high-security control center meets modern fintech. Think dark terminals with glowing accents, crisp typography, and subtle neon highlights that communicate both security and cutting-edge technology.

## Color Selection
A dark, cybersecurity-inspired palette with electric blue accents and high contrast for clarity.

- **Primary Color**: Electric Blue (oklch(0.65 0.25 250)) - Represents security, technology, and trust; used for primary actions and focus states
- **Secondary Colors**: Deep Navy (oklch(0.15 0.02 250)) for backgrounds, Slate Gray (oklch(0.35 0.02 250)) for cards and elevated surfaces
- **Accent Color**: Neon Cyan (oklch(0.75 0.15 195)) - High-energy highlight for important status indicators, active tokens, and success states
- **Destructive**: Vibrant Red (oklch(0.60 0.24 25)) - Clear danger signaling for revoke and delete actions
- **Foreground/Background Pairings**:
  - Background (Deep Navy oklch(0.15 0.02 250)): Light text (oklch(0.95 0.01 250)) - Ratio 10.2:1 ✓
  - Card (Slate Gray oklch(0.25 0.02 250)): Light text (oklch(0.95 0.01 250)) - Ratio 7.8:1 ✓
  - Primary (Electric Blue oklch(0.65 0.25 250)): White text (oklch(1 0 0)) - Ratio 5.2:1 ✓
  - Accent (Neon Cyan oklch(0.75 0.15 195)): Dark text (oklch(0.15 0.02 250)) - Ratio 8.5:1 ✓

## Font Selection
Typography should feel technical yet refined - like developer tools meets premium security software.

- **Primary**: Space Grotesk - A geometric sans-serif with technical character but warm personality, perfect for headings and UI labels
- **Secondary**: JetBrains Mono - Monospace font for token values, IDs, and technical data

**Typographic Hierarchy**:
- H1 (Page Title): Space Grotesk Bold/32px/tight tracking
- H2 (Section Headers): Space Grotesk SemiBold/24px/normal tracking
- H3 (Card Titles): Space Grotesk Medium/18px/normal tracking
- Body (UI Text): Space Grotesk Regular/15px/relaxed leading (1.6)
- Code (Tokens/IDs): JetBrains Mono Regular/14px/normal leading
- Caption (Metadata): Space Grotesk Regular/13px/loose tracking

## Animations
Animations should emphasize security and precision with smooth, deliberate transitions. Use framer-motion for card reveals (staggered fade-in), dialog entrances (scale + fade), and status changes (color transitions). Token copy actions should have satisfying feedback with scale pulse. Keep durations snappy (200-300ms) to maintain the technical, responsive feel.

## Component Selection

**Components**:
- **Card**: Primary container for token items with hover states and click interactions
- **Dialog**: For create token form and detailed token inspection with backdrop blur
- **Button**: Primary (create), Secondary (cancel), Destructive (revoke) variants with icon support
- **Badge**: Status indicators (active, expired, revoked) with color-coded meanings
- **Input**: For token name and search with focus ring animations
- **Checkbox**: Multi-select for token scopes with grouped organization
- **Select**: Dropdown for expiration options and filtering
- **Tabs**: Navigate between "All Tokens", "Security", and "Settings" views
- **Table**: Alternative view for power users wanting dense token information
- **Tooltip**: Contextual help for security concepts and scope descriptions
- **Alert**: Security warnings and important notices
- **Progress**: Token expiration visualization
- **Separator**: Visual division between sections
- **ScrollArea**: For long token lists and activity logs

**Customizations**:
- Token card with glow effect on hover using box-shadow and border gradients
- Animated token generation sequence with progress indicators
- Copy-to-clipboard button with success feedback animation
- Token value display with obfuscation toggle (show/hide)
- Usage chart components using Recharts with custom theming

**States**:
- Buttons: Default has subtle glow, hover brightens and scales slightly, active compresses, disabled is muted with reduced opacity
- Token cards: Default has border, hover adds glow and elevation, selected has accent border, expired has muted appearance
- Inputs: Default subtle border, focus has blue glow ring, error has red border with shake animation, success has green checkmark

**Icon Selection**:
- Key (token/credentials), ShieldCheck (security), Plus (create), Copy (clipboard), Trash (delete), Eye/EyeSlash (visibility toggle), ChartBar (analytics), Clock (expiration), Warning (alerts), CheckCircle (success), LockKey (vault), Code (API), Globe (endpoints)

**Spacing**:
- Page padding: p-8 (desktop), p-4 (mobile)
- Card padding: p-6
- Grid gaps: gap-6 for main layouts, gap-4 for forms, gap-2 for compact lists
- Section spacing: space-y-8 for major sections, space-y-4 for related groups

**Mobile**:
- Token grid: 3 columns desktop (xl:grid-cols-3) → 2 columns tablet (md:grid-cols-2) → 1 column mobile
- Navigation: Horizontal tabs desktop → Bottom sheet or stacked tabs mobile
- Token cards: Reduce padding to p-4, stack metadata vertically
- Dialogs: Full-screen on mobile with slide-up animation
- Tables: Switch to card view on mobile for better readability
