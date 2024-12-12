import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordLength(minLength: number, maxLength: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const length = value.length;
      
      if (length < minLength) {
        return {
          passwordLength: {
            requiredLength: minLength,
            actualLength: length,
            message: `Password must be at least ${minLength} characters`
          }
        };
      }

      if (length > maxLength) {
        return {
          passwordLength: {
            requiredLength: maxLength,
            actualLength: length,
            message: `Password cannot be longer than ${maxLength} characters`
          }
        };
      }

      return null;
    };
  }
}