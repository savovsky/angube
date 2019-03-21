import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
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

    // TODO Use it for 'User Name', async, must check existing!
    // static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if (control.value === 'miro') {
    //                 resolve({ shouldBeUnique: true });
    //             } else {
    //                 resolve(null);
    //             }
    //         }, 2000);
    //     });
    // }
    // REMIND Max, Section 15, Lecture 202

    // static shouldBeUnique(control: AbstractControl): ValidationErrors | null {
    //     if (control.value === 'miro') {
    //         return { shouldBeUnique: true };
    //     }
    //     return null;
    // }
}
