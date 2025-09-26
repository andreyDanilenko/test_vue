export const ACCOUNT_TYPES = {
  LDAP: 'LDAP',
} as const

export const DEFAULT_ACCOUNT_VALUES = {
  type: ACCOUNT_TYPES.LDAP,
  password: null,
  labels: [],
  isEditing: false
} as const
