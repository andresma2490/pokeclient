import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordsMustBeEquals: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordsMustBeEquals: true };
};
