import type { Account } from "@/types/account";

export const processLabels = (labelsRaw: string) => {
  return labelsRaw.split(';')
    .map(label => label.trim())
    .filter(label => label.length > 0)
    .map(label => ({ text: label }));
};

export const stringyLabels = (labels: Account['labels']) => {
  return labels.map(l => l.text).join('; ') || '—';
};
