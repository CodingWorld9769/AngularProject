import { FormGroup } from '@angular/forms';
//custom validator in angular
export function confirmPasswordValidator(
  controlName: string,
  matchControlName: string
) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[controlName];
    const confirmPasswordcontrol = formGroup.controls[matchControlName];
    if (
      confirmPasswordcontrol.errors &&
      confirmPasswordcontrol.errors['confirmPasswordValidator']
    ) {
      return;
    }
    if (passwordControl.value !== confirmPasswordcontrol.value) {
      confirmPasswordcontrol.setErrors({ confirmPasswordValidator: true });
    } else {
      confirmPasswordcontrol.setErrors(null);
    }
  };
}
