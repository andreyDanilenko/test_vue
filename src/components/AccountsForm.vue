<script setup lang="ts">
import { ref } from 'vue';
import InfoBlock from '@/components/InfoBlock.vue';

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  labels: { text: string }[]
  labelsRaw?: string;
  type: AccountType;
  login: string;
  password: string | null;
  isEditing: boolean;
  errors: {
    login?: string
    password?: string
  }
}

const isEdit = ref(true)
const account = ref<Account>({
  id: '1',
  labels: [{ text: 'string' }],
  labelsRaw: '',
  type: 'LDAP',
  login: 'string',
  password: null,
  isEditing: true,
  errors: {}
})

const validate = () => {
  let valid = true;
  account.value.errors.login = '';
  account.value.errors.password = '';

  if (!account.value.login || account.value.login.trim().length === 0) {
    account.value.errors.login = 'Логин обязателен';
    valid = false;
  }

  if (account.value.type === 'Локальная') {
    if (!account.value.password || account.value.password.trim().length === 0) {
      account.value.errors.password = 'Пароль обязателен';
      valid = false;
    }
  }

  return valid;
};

const saveOnBlur = () => {
  if (validate()) {
    isEdit.value = false;
  }
};

</script>

<template>
  <div class="max-w-5xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-xl space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Учётные записи</h2>
      <button
       class="flex items-center justify-center gap-2 px-2 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors duration-100 cursor-pointer"
      >
        <span class="text-xl">+</span> Добавить
      </button>
    </div>

    <InfoBlock text="Введите несколько меток через ;."/>

    <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow relative">
      <div class="flex flex-col w-1/5">
        <label class="text-xs font-medium text-gray-500">Метка</label>
        <input
          v-if="isEdit"
          maxlength="50"
          class="px-3 py-1 rounded-md border focus:ring-2 focus:ring-blue-500"
          placeholder="Основная;Резервная"
          @blur="saveOnBlur"
        />
        <span v-else class="text-gray-700">
          {{ account.labels.map(l => l.text).join('; ') || '—' }}
        </span>
      </div>

      <div class="flex flex-col w-1/5">
        <label class="text-xs font-medium text-gray-500">Тип</label>
        <select
          v-if="isEdit"
          v-model="account.type"
          class="px-3 py-1 rounded-md border focus:ring-2 focus:ring-blue-500"
          @blur="saveOnBlur"
        >
          <option value="LDAP">LDAP</option>
          <option value="Локальная">Локальная</option>
        </select>
        <span v-else class="text-gray-700">{{ account.type }}</span>
      </div>

      <div class="flex flex-col w-1/5"
          :class="[
            'flex flex-col w-1/5',
            account.type !== 'Локальная' ? 'w-2/5' : 'w-1/5',
          ]"
      >
        <label class="text-xs font-medium text-gray-500">Логин<span class="text-red-500">*</span></label>
        <input
          v-if="isEdit"
          type="text"
          v-model="account.login"
          minlength="1"
          maxlength="100"
          :class="[
            'px-3 py-1 rounded-md border focus:ring-2',
            account.errors.login  ? 'border-red-500' : 'focus:ring-blue-500'
          ]"
          placeholder="Введите логин"
          @blur="saveOnBlur"
        />
        <span v-else class="text-gray-700">{{ account.login }}</span>
      </div>

      <div v-if="account.type === 'Локальная'" class="flex flex-col w-1/5">
        <label class="text-xs font-medium text-gray-500">Пароль<span class="text-red-500">*</span></label>
        <input
          v-if="isEdit"
          type="password"
          v-model="account.password"
          minlength="1"
          maxlength="100"
          :class="[
            'px-3 py-1 rounded-md border focus:ring-2',
            account.errors.password ? 'border-red-500' : 'focus:ring-blue-500'
          ]"
          placeholder="Введите пароль"
          @blur="saveOnBlur"
        />
        <span v-else class="text-gray-700">••••••</span>
      </div>

      <div class="flex w-auto items-center gap-2 ml-auto mt-4">
        <button v-if="!isEdit" @click="isEdit = !isEdit" class="flex items-center justify-center gap-2 px-2 py-2  bg-green-400 hover:bg-green-500 text-white rounded-lg transition-colors duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
        </button>
        <button class="flex items-center justify-center gap-2 px-2 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors duration-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
