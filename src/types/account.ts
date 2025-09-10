export type AccountType = 'LDAP' | 'Локальная'
export type AccountLabels = { text: string }[]

export interface Account {
  id: string;
  labels: AccountLabels;
  labelsRaw?: string;
  type: AccountType;
  login: string;
  password: string | null;
  isEditing?: boolean;
}
