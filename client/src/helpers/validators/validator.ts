export const FieldIsEmpty = (value: any, textError?: string) => {
  if (!value) return textError || 'จำเป็น'
}

export const FieldIsPercentRange = (value: any, textError?: string) => {
  if (value < 0) return 'ตัวเลขต้องมากกว่า 0'
  if (value > 100) return 'ตัวเลขต้องน้อยกว่า 100'
}

export const FieldIsMoreThan = (value: any, valueCompared: any, textError?: string) => {
  if (value > valueCompared) return textError || `ตัวเลขต้องน้อยกว่า ${valueCompared}`
}

export const FieldIsLessThan = (value: any, valueCompared: any, textError?: string) => {
  if (value < valueCompared) return textError || `ตัวเลขต้องมากกว่า ${valueCompared}`
}

export const FieldIsPositiveNumber = (value: any, textError?: string) => {
  if (value < 0) return textError || 'ตัวเลขต้องมากกว่า 0'
}
