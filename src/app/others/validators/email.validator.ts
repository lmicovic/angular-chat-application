import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export class EmailValidators {

    static exists(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

        return new Promise((resolve, reject) => {

            const email = control.value;

            // Simulate Call to Server
            setTimeout(() => {

                const emailExists = true;
                if(emailExists) {
                    return resolve({exist: true});          // Email is in use
                }
                else {
                    console.log("Email: Ok");
                    return resolve(null);                   // Email is not in use
                }
                
            }, 3000);

        });
    }

}