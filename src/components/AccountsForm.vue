<script setup lang="ts">
import { ref } from 'vue'
import InfoBlock from '@/components/InfoBlock.vue'
import AccountItem from '@/components/AccountForm.vue'
import { useAccountsStore } from '@/stores/accounts'
import type { Account } from '@/types/account'

const store = useAccountsStore()
const temporaryAccounts = ref<Account[]>([])

const addAccount = () => {
  temporaryAccounts.value.push({
    id: crypto.randomUUID(),
    labels: [],
    labelsRaw: '',
    type: 'LDAP',
    login: '',
    password: null,
    isEditing: true,
  })
}

const saveAccount = (account: Account) => {
  store.saveAccount(account)
  temporaryAccounts.value = temporaryAccounts.value.filter(acc => acc.id !== account.id)
}

const deleteAccount = (id: string) => {
  if (store.accounts.find(a => a.id === id)) {
    store.removeAccount(id)
  } else {
    temporaryAccounts.value = temporaryAccounts.value.filter(acc => acc.id !== id)
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-xl space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Учётные записи</h2>
      <button
        @click="addAccount"
        class="flex items-center justify-center gap-2 px-2 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors duration-100 cursor-pointer"
      >
        <span class="text-xl">+</span> Добавить
      </button>
    </div>

    <InfoBlock text="Вы можете ввести несколько меток через ;."/>

    <AccountItem
      v-for="account in [...store.accounts, ...temporaryAccounts]"
      :key="account.id"
      :account="account"
      @save="saveAccount"
      @delete="deleteAccount"
    />
  </div>
</template>
