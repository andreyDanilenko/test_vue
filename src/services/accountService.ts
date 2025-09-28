import { processLabels } from '@/utils/processLabels'
import type { Account, AccountForm } from '@/types/account'
import { validateAccount } from '@/validator/account'

export const formatAccountForStorage = (account: AccountForm): Account => {
  const validation = validateAccount(account)
  if (!validation.isValid) {
    throw new Error(validation.errors.join(', '))
  }

  return {
    id: account.id,
    type: account.type,
    login: account.login,
    password: account.password,
    labels: processLabels(account.labelsRaw)
  }
}

export const createDefaultAccount = (): AccountForm => {
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
