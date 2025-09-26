<script setup lang="ts">
import type { Account, AccountForm } from '@/types/account'
import { stringyLabels } from '@/utils/processLabels'
import { ref } from 'vue'

const props = defineProps<{
  account: Account;
}>()

const emit = defineEmits<{
  (e: 'save', account: AccountForm): void
  (e: 'delete', id: string): void
}>()

const localAccount = ref<AccountForm>({
  ...props.account,
  labelsRaw: stringyLabels(props.account.labels)
})

const errors = ref({ login: '', password: '' })
const isLoading = ref(false)

const validate = (acc: Account): boolean => {
  errors.value = { login: '', password: '' }

  if (!acc.login?.trim()) {
    errors.value.login = 'Логин обязателен'
    return false
  }

  if (acc.type === 'Локальная') {
    if (!acc.password?.trim()) {
      errors.value.password = 'Пароль обязателен'
      return false
    }
    if (acc.password.length < 6) {
      errors.value.password = 'Минимум 6 символов'
      return false
    }
  }

  return true
}

const saveOnBlur = async (): Promise<void> => {
  if (isLoading.value || !validate(localAccount.value)) return

  isLoading.value = true
  try {
    emit('save', localAccount.value)
  } finally {
    isLoading.value = false
  }
}

const removeAccount = (): void => {
  emit('delete', localAccount.value.id)
}
</script>

<template>
  <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow relative">
    <div class="flex flex-col w-3/13">
      <label class="text-xs font-medium text-gray-500">Метка</label>
      <input
        v-model="localAccount.labelsRaw"
        maxlength="50"
        class="px-3 py-1 rounded-md border focus:ring-2 focus:ring-blue-500"
        placeholder="Основная;Резервная"
        @blur="saveOnBlur"
      />
    </div>

    <div class="flex flex-col w-3/13">
      <label class="text-xs font-medium text-gray-500">Тип</label>
      <select
        v-model="localAccount.type"
        class="px-3 py-1 rounded-md border focus:ring-2 focus:ring-blue-500"
        @change="saveOnBlur"
      >
        <option value="LDAP">LDAP</option>
        <option value="Локальная">Локальная</option>
      </select>
    </div>

    <div class="flex flex-col" :class="localAccount.type === 'Локальная' ? 'w-3/13' : 'w-6/13'">
      <label class="text-xs font-medium text-gray-500">
        Логин<span class="text-red-500">*</span>
      </label>
      <input
        v-model="localAccount.login"
        maxlength="100"
        :class="[
          'px-3 py-1 rounded-md border focus:ring-2',
          errors.login ? 'border-red-500' : 'focus:ring-blue-500'
        ]"
        placeholder="Введите логин"
        @blur="saveOnBlur"
      />
      <span v-if="errors.login" class="text-red-500 text-xs mt-1">{{ errors.login }}</span>
    </div>

    <div v-if="localAccount.type === 'Локальная'" class="flex flex-col w-3/13">
      <label class="text-xs font-medium text-gray-500">
        Пароль<span class="text-red-500">*</span>
      </label>
      <input
        type="password"
        v-model="localAccount.password"
        maxlength="100"
        :class="[
          'px-3 py-1 rounded-md border focus:ring-2',
          errors.password ? 'border-red-500' : 'focus:ring-blue-500'
        ]"
        placeholder="Введите пароль"
        @blur="saveOnBlur"
      />
      <span v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</span>
    </div>

    <button
      @click="removeAccount"
      class="flex items-center justify-center p-2 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors duration-100 ml-auto mt-4"
      :disabled="isLoading"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>
