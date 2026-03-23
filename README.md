# 🔐 Token Vault Marketplace

A comprehensive, enterprise-grade API token management platform with an integrated marketplace for buying, selling, and securely managing authentication tokens. Built with React, TypeScript, and powered by GitHub Spark.

> ⚠️ **Live Demo Notice**: The live demo environment may be unstable and is intended for demonstration and testing purposes only. Data persistence is not guaranteed, and the service may experience intermittent downtime. For production use, please deploy your own instance.

## ✨ Features

### 🔑 Token Management
- **Create & Store Tokens**: Securely generate and store API tokens with customizable scopes and expiration dates
- **Token Lifecycle**: Comprehensive status tracking (Active, Expired, Revoked, Listed)
- **Automatic Expiration Detection**: Real-time monitoring of token validity with automatic status updates
- **Token Refresh**: Extend token lifespans with one-click refresh functionality (generates new values and extends expiration by 30 days)
- **Favorites System**: Mark frequently-used tokens as favorites for quick access
- **Smart Templates**: Pre-configured templates for popular services (GitHub, Stripe, OpenAI, AWS, etc.)
- **Search & Filter**: Advanced filtering by name, type, status, and favorites

### 🛒 Marketplace Features
- **Browse Listings**: Explore tokens available for purchase across multiple categories
- **Token Trading**: List your tokens for sale or purchase tokens from other users
- **Featured Listings**: Highlighted premium tokens with enhanced visibility
- **Category Organization**: Tokens organized by Developer Tools, Infrastructure, AI/ML, Analytics, Payment Processing, and more
- **Rating System**: User ratings and reviews for marketplace confidence
- **Secure Transactions**: Built-in escrow-like transaction handling with balance management

### 💼 Bulk Operations
- **Selection Mode**: Activate bulk mode to manage multiple tokens simultaneously
- **Bulk Actions**:
  - Revoke multiple tokens at once
  - Refresh multiple tokens with new values
  - Delete multiple tokens permanently
  - Export selected tokens to backup files
- **Smart Filters**: Quick-select tokens by status (Active, Expired, Revoked), type, or expiration timeframe
- **Selection Management**: Select all, clear selection, or individually toggle token selection

### 📊 Analytics & Insights
- **Token Distribution**: Visual breakdown by type, status, and category
- **Usage Analytics**: Track token usage patterns over time
- **Expiration Monitoring**: Dashboard showing tokens expiring soon
- **Activity Timeline**: Comprehensive event history and security logs
- **Performance Metrics**: Key statistics on token health and utilization

### 🔒 Security Dashboard
- **Event Logging**: Comprehensive audit trail of all token operations
- **Real-time Monitoring**: Live security event feed with color-coded severity
- **Status Overview**: At-a-glance security health metrics
- **Event Types**: Track creation, revocation, refresh, purchase, and listing events

### 💰 Wallet & Transactions
- **Virtual Balance**: Built-in wallet system for marketplace transactions
- **Transaction History**: Complete record of all purchases and sales
- **Earnings Tracking**: Monitor total earnings and spending
- **Price Formatting**: Professional currency display with proper formatting

### 📦 Data Management
- **Export Vault**: Download complete backup of all tokens, events, transactions, and balance
- **Import Vault**: Restore from backup files with validation
- **Selective Export**: Export only selected tokens for partial backups
- **JSON Format**: Easy-to-parse backup format for data portability

## 🎨 Design Features

### Visual Identity
- **Dark Cyberpunk Theme**: Striking purple/blue color palette with neon accents
- **Space Grotesk Typography**: Modern, technical aesthetic with JetBrains Mono for code elements
- **Animated Grid Background**: Multi-layered gradient mesh with subtle grid pattern
- **Glassmorphism**: Frosted glass effects on cards and overlays with backdrop blur
- **Token Glow Effects**: Dynamic glow animations on hover for visual feedback

### User Experience
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Toast Notifications**: Real-time feedback using Sonner for all user actions
- **Loading States**: Skeleton loaders and progress indicators
- **Empty States**: Helpful guidance when no data is present

## 🛠️ Tech Stack

### Frontend
- **React 19**: Latest React with modern hooks and patterns
- **TypeScript**: Full type safety and IntelliSense support
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS 4**: Utility-first styling with custom theme configuration
- **Shadcn UI**: High-quality, accessible component library

### Key Libraries
- **@phosphor-icons/react**: Beautiful icon system (2.1k+ icons)
- **framer-motion**: Production-ready animation library
- **sonner**: Elegant toast notifications
- **react-hook-form + zod**: Type-safe form validation
- **recharts**: Powerful charting for analytics
- **date-fns**: Modern date utility library
- **uuid**: RFC4122 compliant UUID generation

### State Management
- **GitHub Spark KV Store**: Persistent key-value storage for all application data
- **React Hooks**: `useKV` for reactive, persistent state management
- **Functional Updates**: Ensures data integrity with proper state updates

## 📋 Usage Guide

### Getting Started
1. **Create Your First Token**: Click "Create Token" or use "Templates" for quick setup
2. **Configure Token**: Set name, type, scopes, and optional expiration
3. **Manage Tokens**: View, refresh, revoke, or list tokens for sale
4. **Explore Marketplace**: Browse available tokens and make purchases
5. **Track Activity**: Monitor security events and transaction history

### Bulk Operations Workflow
1. Click the menu (⋯) and select "Enter Bulk Mode"
2. Use filter buttons to quick-select tokens by criteria
3. Or manually select individual tokens
4. Choose bulk action: Revoke, Refresh, Delete, or Export
5. Confirm the operation in the dialog
6. Exit bulk mode when finished

### Marketplace Trading
1. Navigate to the "Marketplace" tab
2. Browse available listings by category
3. Click "Purchase" on desired token
4. Confirm transaction (requires sufficient balance)
5. Token automatically added to your vault

### Analytics Dashboard
1. Go to "Analytics" tab
2. View token distribution charts
3. Monitor expiration timelines
4. Review usage statistics
5. Identify optimization opportunities

## 🔐 Token Types Supported

- **Personal Access Tokens**: GitHub, GitLab, Bitbucket
- **API Keys**: OpenAI, Anthropic, AWS, Google Cloud
- **OAuth Tokens**: Stripe, Shopify, Discord
- **Service Tokens**: Datadog, Sentry, PagerDuty
- **Payment Tokens**: Stripe, PayPal, Square
- **Custom Tokens**: User-defined token types

## 🎯 Key Metrics Tracked

- Total tokens managed
- Active vs. inactive tokens
- Tokens expiring soon (7, 14, 30 days)
- Token usage frequency
- Marketplace transactions
- Wallet balance and earnings
- Security event history

## 🚀 Deployment

This application is built with GitHub Spark and can be deployed as a Spark application. The codebase uses:
- Client-side state persistence via Spark KV Store
- No backend server requirements
- Fully self-contained React SPA
- Ready for GitHub Pages, Vercel, or Netlify deployment

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── TokenCard.tsx   # Individual token display
│   ├── CreateTokenDialog.tsx
│   ├── MarketplaceBrowse.tsx
│   ├── BulkActionsBar.tsx
│   └── ...
├── lib/                # Utilities and types
│   ├── types.ts        # TypeScript interfaces
│   ├── token-utils.ts  # Token operations
│   ├── marketplace-utils.ts
│   └── export-utils.ts
├── hooks/              # Custom React hooks
├── styles/             # Global styles
└── App.tsx             # Main application component
```

### Key Technologies
- **Spark Runtime SDK**: `spark.kv` for persistence, `spark.llm` for AI features
- **Form Management**: react-hook-form with Zod validation
- **Date Handling**: date-fns for expiration calculations
- **Icons**: Phosphor Icons (duotone weight)
- **Animations**: Framer Motion with purpose-driven transitions

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

**Built with ❤️ using GitHub Spark** | [Report Issues](../../issues) | [View Source](../../)
