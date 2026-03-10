import { Token, SecurityEvent, Transaction, UserBalance } from './types'

export interface TokenVaultBackup {
  version: string
  exportDate: string
  tokens: Token[]
  events: SecurityEvent[]
  transactions: Transaction[]
  balance: UserBalance
}

export function exportVaultData(
  tokens: Token[],
  events: SecurityEvent[],
  transactions: Transaction[],
  balance: UserBalance
): string {
  const backup: TokenVaultBackup = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    tokens,
    events,
    transactions,
    balance,
  }

  return JSON.stringify(backup, null, 2)
}

export function downloadVaultBackup(
  tokens: Token[],
  events: SecurityEvent[],
  transactions: Transaction[],
  balance: UserBalance
) {
  const data = exportVaultData(tokens, events, transactions, balance)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `token-vault-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function validateBackupData(data: unknown): data is TokenVaultBackup {
  if (typeof data !== 'object' || data === null) return false

  const backup = data as Partial<TokenVaultBackup>

  return (
    typeof backup.version === 'string' &&
    typeof backup.exportDate === 'string' &&
    Array.isArray(backup.tokens) &&
    Array.isArray(backup.events) &&
    Array.isArray(backup.transactions) &&
    typeof backup.balance === 'object' &&
    backup.balance !== null
  )
}

export async function importVaultData(file: File): Promise<TokenVaultBackup> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const data = JSON.parse(content)

        if (!validateBackupData(data)) {
          throw new Error('Invalid backup file format')
        }

        resolve(data)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsText(file)
  })
}
