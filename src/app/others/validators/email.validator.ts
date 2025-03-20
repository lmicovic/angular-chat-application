import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { UserService } from "../services/user-service/user.service";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class EmailValidators {



    constructor(private userService: UserService) {

    }

    // static exists(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

              

    //     return new Promise((resolve, reject) => {

    //         const email = control.value;

    //         // Simulate Call to Server
    //         // setTimeout(() => {

    //         //     const emailExists = true;
    //         //     if(emailExists) {
    //         //         return resolve({exist: true});          // Email is in use
    //         //     }
    //         //     else {
    //         //         console.log("Email: Ok");
    //         //         return resolve(null);                   // Email is not in use
    //         //     }
                
    //         // }, 3000);

            


    //     });
    // }

    emailExist(userService: UserService): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

            return new Promise((resolve) => {

                const email = control.value;

                console.log("1: " + email);
                

                userService.existByEmail(email).subscribe((exist) => {
                    
                    console.log("2: " + exist);

                    if(exist === true) {
                        return resolve({exist: true});
                    }
                    else {
                        return resolve(null);
                    }
                }, (error) => {
                    // console.error(error);
                    return resolve(null);
                });

            });

        };

            

        
    }

}