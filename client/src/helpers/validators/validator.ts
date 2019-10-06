export const FieldIsEmpty = (value: any, textError?: string) => {
  if (!value) return textError || 'Required'
}

export const FieldIsPercentRange = (value: any, textError?: string) => {
  if (value < 0) return 'Number Pecent must more than 0'
  if (value > 100) return 'Number Pecent must less than 100'
}

export const FieldIsMoreThan = (value: any, valueCompared: any, textError?: string) => {
  if (value > valueCompared) return textError || `Number must less than ${valueCompared}`
}

export const FieldIsLessThan = (value: any, valueCompared: any, textError?: string) => {
  if (value < valueCompared) return textError || `Number must more than ${valueCompared}`
}

export const FieldIsPositiveNumber = (value: any, textError?: string) => {
  if (value < 0) return textError || 'Number Pecent must more than 0'
}
