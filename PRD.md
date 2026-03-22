# Token Vault Marketplace

A secure, modern token management dashboard combined with a vibrant marketplace where users can buy, sell, and trade API tokens with other developers and services.

**Experience Qualities**:
1. **Secure** - Every element communicates trust through clean design, clear security indicators, and professional aesthetics
2. **Dynamic** - The marketplace feels alive with real-time listings, trending tokens, and active trading
3. **Intuitive** - Complex security and marketplace concepts are made approachable through clear visual hierarchies and guided workflows

**Complexity Level**: Complex Application (advanced functionality with multiple views)
This app manages personal tokens, facilitates marketplace transactions, handles user authentication, includes multiple specialized views (vault, marketplace, transactions, seller dashboard), and maintains transaction history - fitting the Complex Application complexity tier.

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

### Marketplace Browse
- **Functionality**: Browse available token listings from other sellers with filtering, search, and sorting
- **Purpose**: Enable discovery of pre-configured tokens for common services and specialized access
- **Trigger**: Navigate to Marketplace tab
- **Progression**: Click marketplace → View featured listings → Apply filters (type, price range, rating) → Search by service → Sort by popularity/price/newest → Click listing for details
- **Success Criteria**: Listings load smoothly, filters work correctly, search is responsive, featured section highlights quality tokens

### List Token for Sale
- **Functionality**: Create marketplace listings to sell tokens to other users
- **Purpose**: Allow users to monetize their API access or specialized tokens
- **Trigger**: Click "List for Sale" on owned token or "Create Listing" button in marketplace
- **Progression**: Select token → Set price → Add description and usage guidelines → Set listing duration → Preview listing → Publish → Listing appears in marketplace
- **Success Criteria**: Only active tokens can be listed, price validation works, preview accurate, listing immediately searchable

### Purchase Token
- **Functionality**: Buy tokens from marketplace with simulated payment and instant delivery
- **Purpose**: Enable quick acquisition of pre-configured access tokens
- **Trigger**: Click "Buy Now" on marketplace listing
- **Progression**: View listing details → Click buy → Review purchase summary → Confirm payment → Process transaction → Token transferred to vault → Seller notified → Receipt generated
- **Success Criteria**: Transaction is atomic, token appears in buyer's vault, seller receives payment credit, purchase history updated

### Transaction History
- **Functionality**: View complete history of purchases and sales with transaction details
- **Purpose**: Provide transparency and record-keeping for marketplace activity
- **Trigger**: Navigate to Transactions tab
- **Progression**: View transactions → Filter by type (bought/sold) → Search by token name → View transaction details → Download receipt
- **Success Criteria**: All transactions logged, details accurate, timeline chronological, receipts downloadable

### Seller Dashboard
- **Functionality**: Analytics for sellers showing listing performance, sales metrics, and earnings
- **Purpose**: Help sellers optimize their listings and track marketplace success
- **Trigger**: Navigate to Seller Dashboard (for users with active listings)
- **Progression**: View dashboard → See total earnings → Review listing performance → Check active vs sold listings → View buyer ratings
- **Success Criteria**: Metrics update in real-time, charts visualize trends, insights actionable

### Security Dashboard
- **Functionality**: Display security metrics, recent activity, and security recommendations
- **Purpose**: Provide visibility into token usage patterns and potential security issues
- **Trigger**: Navigate to security tab/view
- **Progression**: Click security → Load analytics → View charts of token usage → See recent activity log → Review security alerts
- **Success Criteria**: Charts render with realistic data, activity log is chronological, alerts are actionable

### Token Usage Analytics
- **Functionality**: Visual charts showing token usage over time, by endpoint, and by token type
- **Purpose**: Help users understand their API consumption patterns and identify anomalies
- **Trigger**: Click Analytics tab
- **Progression**: Load view → Charts animate in → View metrics (total tokens, active tokens, API calls, health score) → Explore usage charts → Filter by time range
- **Success Criteria**: D3/Recharts display smooth animations, data is accurate, interactions feel responsive

### List Token for Sale
- **Functionality**: Create marketplace listings from owned tokens
- **Purpose**: Allow users to monetize their API access or specialized tokens
- **Trigger**: Click "List for Sale" in token details or quick actions menu
- **Progression**: Select token → Enter price → Choose category → Write description → Preview listing → Confirm → Listed in marketplace
- **Success Criteria**: Only active tokens can be listed, price validation works (0.01 to 10,000), preview accurate, listing immediately searchable

### Export/Import Vault Data
- **Functionality**: Download complete vault backup (JSON) and restore from backup files
- **Purpose**: Enable users to backup their data and migrate between devices/accounts
- **Trigger**: Click export/import in quick actions dropdown menu
- **Progression**: Export: Click export → JSON file downloads with timestamp | Import: Click import → Choose file → Validate format → Restore data → Success confirmation
- **Success Criteria**: Export includes all tokens, events, transactions, and balance; Import validates format and handles errors gracefully

### Bulk Token Operations
- **Functionality**: Select multiple tokens and perform batch operations (revoke, refresh, delete, export)
- **Purpose**: Enable efficient management of multiple tokens simultaneously, saving time for users with many tokens
- **Trigger**: Click "Enter Bulk Mode" in quick actions dropdown menu
- **Progression**: Enable bulk mode → Checkboxes appear on token cards → Select tokens individually or click "Select All" → Bulk actions bar appears at bottom → Choose action (Revoke/Refresh/Delete/Export) → Confirmation dialog shows affected tokens → Confirm → Batch operation executes → Success notification with count → Selection cleared
- **Success Criteria**: Selection state persists across interactions, bulk actions only affect eligible tokens (e.g., only active tokens can be revoked/refreshed), confirmation dialog clearly shows which tokens will be affected, operations complete atomically, appropriate security events are logged for each token

## Edge Case Handling
- **Empty States**: First-time users see welcoming onboarding with clear "Create First Token" CTA and explanation of Token Vault benefits
- **Empty Marketplace**: When no listings available, show empty state encouraging users to list their tokens
- **Expired Tokens**: Visually distinct (muted colors, warning badge) with prompts to refresh or create new
- **Expiring Soon Tokens**: Highlighted with warning color (yellow) and refresh button prominently displayed (tokens within 7 days of expiration)
- **Revoked Tokens**: Remain in history view but clearly marked as inactive with timestamp of revocation, refresh button disabled
- **Listed Tokens**: Cannot be revoked or refreshed while listed in marketplace, must delist first
- **Sold Tokens**: Automatically removed from seller's vault, transfer logged in security events
- **Refreshed Tokens**: Generate new value and extend expiration, old token value immediately invalidated, security event logged with details
- **Insufficient Funds**: Prevent purchase if user's balance is too low, show clear error message
- **Concurrent Purchase**: Handle case where listing is purchased by multiple users simultaneously (first wins)
- **Network Simulation**: Simulated API delays show loading states and handle "failures" gracefully with retry options
- **Duplicate Names**: Prevent or warn when creating tokens with identical names
- **Long Token Values**: Truncate with ellipsis and provide copy button, never break layout
- **No Tokens**: Show compelling empty state with illustration and clear next steps
- **Price Validation**: Prevent negative prices, extremely high prices (cap at 10,000), or zero-price listings
- **Bulk Selection Mode**: When no tokens selected in bulk mode, actions bar doesn't appear; selecting tokens automatically enables bulk mode
- **Bulk Operations on Mixed Status**: Only active tokens can be revoked/refreshed, inactive tokens are skipped with clear warning message
- **Bulk Delete**: Works on any status, confirmation shows all tokens to be deleted
- **Bulk Export**: Exports selected tokens regardless of status, downloads separate file with count in filename
- **Empty Bulk Selection**: Clear selection button exits bulk mode, selection persists when switching tabs

## Design Direction
The design should evoke trust, sophistication, and technological precision - like a high-security control center meets modern fintech trading platform. Think dark terminals with glowing accents, crisp typography, and subtle neon highlights that communicate both security and cutting-edge technology. The marketplace section should feel vibrant and active with price tags, ratings, and trending indicators that suggest a thriving economy.

## Color Selection
A dark, cybersecurity-inspired palette with electric blue accents and high contrast for clarity.

- **Primary Color**: Electric Blue (oklch(0.65 0.25 250)) - Represents security, technology, and trust; used for primary actions and focus states
- **Secondary Colors**: Deep Navy (oklch(0.15 0.02 250)) for backgrounds, Slate Gray (oklch(0.35 0.02 250)) for cards and elevated surfaces
- **Accent Color**: Neon Cyan (oklch(0.75 0.15 195)) - High-energy highlight for important status indicators, active tokens, and success states
- **Success/Currency**: Vibrant Green (oklch(0.70 0.20 150)) - Represents earnings, successful purchases, and positive metrics
- **Warning**: Warm Orange (oklch(0.70 0.18 50)) - Expiring soon tokens and caution indicators
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
