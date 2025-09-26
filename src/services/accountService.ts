import { processLabels } from '@/utils/processLabels'
import type { Account, AccountForm } from '@/types/account'

export class AccountService {
  static validateAccount(account: AccountForm): boolean {
    return !!account.login.trim()
  }

  static formatAccountForStorage(account: AccountForm): Account {
    const accountData: Account = {
      id: account.id,
      type: account.type,
      login: account.login,
      password: account.password,
      labels: processLabels(account.labelsRaw)
    }

    return accountData
  }

  static createDefaultAccount(): AccountForm {
    return {
      id: crypto.randomUUID(),
      labels: [],
      labelsRaw: '',
      type: 'LDAP',
      login: '',
      password: null,
      isEditing: true,
    }
  }
}
