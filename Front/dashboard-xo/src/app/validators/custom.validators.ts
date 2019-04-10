import { AbstractControl } from '@angular/forms';
import { User } from '../models/user.model';

export class CustomValidators {

    static usernameValidator(users: User[]) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const username: string = control.value;
                isValid = !(users.find(user => user.username === username));
            }
            if (isValid) {
                return null;
            } else {
                return { username: true };
            }
        };
    }

}
