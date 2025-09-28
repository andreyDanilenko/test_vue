import type { AccountForm } from "@/types/account";

export const validateAccount = (account: AccountForm): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (!account.login?.trim()) {
    errors.push('Логин обязателен')
  }

  if (account.type === 'Локальная') {
    if (!account.password?.trim()) {
      errors.push('Пароль обязателен для локальных аккаунтов')
    } else if (account.password.length < 6) {
      errors.push('Пароль должен быть не менее 6 символов')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateAccountForUI = (account: AccountForm): { isValid: boolean; errors: { login: string; password: string } } => {
  const validation = validateAccount(account)
  const uiErrors = { login: '', password: '' }

  validation.errors.forEach(error => {
    if (error.includes('Логин')) uiErrors.login = error
    if (error.includes('Пароль')) uiErrors.password = error
  })

  return {
    isValid: validation.isValid,
    errors: uiErrors
  }
}
