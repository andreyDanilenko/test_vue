export interface Account {
  id: string;
  labels: { text: string }[];
  type: AccountType;
  login: string;
  password: string | null;
}

export interface AccountForm extends Account {
  labelsRaw: string;
  isEditing?: boolean;
}

export type AccountType = 'LDAP' | 'Локальная';
