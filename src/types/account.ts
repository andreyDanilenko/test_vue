export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  labels: { text: string }[]
  labelsRaw?: string;
  type: AccountType;
  login: string;
  password: string | null;
  isEditing?: boolean;
}
