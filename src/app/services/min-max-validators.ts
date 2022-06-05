import { AbstractControl, ValidationErrors } from '@angular/forms';

export class MinMaxValidator {
  static rangeValidator(control: AbstractControl): ValidationErrors | null {
    debugger
    const range = control.value === 0 || control.value ? Number(control.value) : null

    if (range === null) {
      return {
        minMaxRequired: true,
        message: 'Range 1- 10'
      };
    } else if (((range && range < 0) || (range && range > 10))) {
      return {
        invalidMinMax: true,
        message: 'Range 1 -10'
      };
    }
    return null;
  }
}
