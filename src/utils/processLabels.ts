export const processLabels = (labelsRaw: string) => {
  return labelsRaw.split(';')
    .map(label => label.trim())
    .filter(label => label.length > 0)
    .map(label => ({ text: label }));
};
