export const SCREEN_KEY = {
  Home: 'Home',
  Transaction: 'Transaction',
  Beneficiary: 'Beneficiary',
} as const;

export const franceIBANPattern = /^FR\d{2}\d{5}\d{5}[A-Z0-9]{11}\d{2}$/;
// E.g: FR7630006000011234567890189
