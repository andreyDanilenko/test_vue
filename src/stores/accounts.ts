import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { Account, AccountForm } from '@/types/account'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/constants/storage'
import {
  formatAccountForStorage
} from '@/services/accountService'

export const useAccountsStore = defineStore('accounts', () => {
  const storedAccounts = useLocalStorage<Account[]>(STORAGE_KEYS.ACCOUNTS, [])

  const accounts = computed(() => storedAccounts.value);

  const addAccount = (accountForm: AccountForm) => {
    const account = formatAccountForStorage(accountForm)
    storedAccounts.value = [...storedAccounts.value, account]
  }

  const updateAccount = (accountForm: AccountForm) => {
    const account = formatAccountForStorage(accountForm)
    storedAccounts.value = storedAccounts.value.map(a =>
      a.id === account.id ? account : a
    )
  }

  const removeAccount = (id: string) => {
    storedAccounts.value = storedAccounts.value.filter(a => a.id !== id)
  }

  const saveAccount = (accountForm: AccountForm) => {
    const isExistingAccount = storedAccounts.value.some(a => a.id === accountForm.id)

    if (isExistingAccount) {
      updateAccount(accountForm)
    } else {
      addAccount(accountForm)
    }
  }

  return {
    accounts,
    saveAccount,
    removeAccount
  }
})
