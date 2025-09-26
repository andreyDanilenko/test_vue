import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { Account, AccountForm } from '@/types/account'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/constants/storage'
import { AccountService } from '@/services/accountService'

export const useAccountsStore = defineStore('accounts', () => {
  const storedAccounts = useLocalStorage<Account[]>(STORAGE_KEYS.ACCOUNTS, [])

  const addAccount = (accountForm: AccountForm) => {
    if (!AccountService.validateAccount(accountForm)) {
      throw new Error('Invalid account data')
    }

    const account = AccountService.formatAccountForStorage(accountForm)
    storedAccounts.value.push(account)
  }

  const updateAccount = (accountForm: AccountForm) => {
    if (!AccountService.validateAccount(accountForm)) {
      throw new Error('Invalid account data')
    }

    const account = AccountService.formatAccountForStorage(accountForm)
    const index = storedAccounts.value.findIndex(a => a.id === account.id)

    if (index !== -1) {
      storedAccounts.value.splice(index, 1, account)
    }
  }

  const removeAccount = (id: string) => {
    storedAccounts.value = storedAccounts.value.filter(a => a.id !== id)
  }

  const saveAccount = (accountForm: AccountForm) => {
    const exists = storedAccounts.value.some(a => a.id === accountForm.id)

    if (exists) {
      updateAccount(accountForm)
    } else {
      addAccount(accountForm)
    }
  }

  return {
    accounts: computed(() => storedAccounts.value),
    saveAccount,
    removeAccount
  }
})
