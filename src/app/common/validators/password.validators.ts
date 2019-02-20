import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') !== -1) {
            return { cannotContainSpace: true };
        }
        return null;
    }

    static mustBeEqualToPassword(passwordFormControl: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value !== control.root.value[passwordFormControl]) {
                return { mustBeEqualToPassword: true };
            }
            return null;
        };
    }
}
