export function validatePassStrengthValue(pass: string): boolean {
  const hasLowercase = /[a-z]/.test(pass);
  const hasUppercase = /[A-Z]/.test(pass);
  const hasDigit = /\d/.test(pass);
  const isLongEnough = pass.length >= 8;

  return hasLowercase && hasUppercase && hasDigit && isLongEnough;
}