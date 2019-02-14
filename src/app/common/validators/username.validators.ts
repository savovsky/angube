import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if ((control.value as string).indexOf(' ') !== -1) {
            return { cannotContainSpace: true }
        }
        return null;
    }

    // static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if (control.value === 'miro') {
    //                 resolve({ shouldBeUnique: true });
    //                 console.log('eho');
    //             } else {
    //                 resolve(null);
    //             }
    //         }, 2000);
    //     });
    // }

    static shouldBeUnique(control: AbstractControl) : ValidationErrors | null {
        if (control.value === 'miro') {
            return { shouldBeUnique: true }
        }
        return null;
    }
}