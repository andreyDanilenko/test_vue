import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '@/types/account'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>(JSON.parse(localStorage.getItem('accounts') || '[]'))

  const saveToStorage = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  const addAccount = (account: Account) => {
    accounts.value.push(account)
    saveToStorage()
  }

  const editAccount = (account: Account) => {
    const index = accounts.value.findIndex(a => a.id === account.id);
    if (index !== -1) {
      accounts.value.splice(index, 1, account);
      saveToStorage();
    }
  }

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter(a => a.id !== id)
    saveToStorage()
  }

  const saveAccount = (account: Account) => {
    const acc = accounts.value.find(a => a.id === account.id)
    const accountToSave = {
      ...account,
    };

    delete accountToSave.labelsRaw
    delete accountToSave.isEditing

    if (acc) {
      editAccount(accountToSave)
    } else {
      addAccount(accountToSave)
    }
  }

  return {
    accounts,
    saveAccount,
    removeAccount
  }
})
