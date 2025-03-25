import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDTO } from '../../others/models/userDto.class';
import { AuthService } from '../../others/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../others/services/user-service/user.service';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit {

  loggedUser: UserDTO | null = null;

  settingsForm = new FormGroup({
    image: new FormControl([Validators.required]),
    firstname: new FormControl(this.loggedUser?.firstname, [Validators.required]),
    lastname: new FormControl(this.loggedUser?.lastname, [Validators.required]),
    email: new FormControl(this.loggedUser?.email, [Validators.required, Validators.email]),
    password: new FormControl(this.loggedUser?.password, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])
  });

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.getCurrentLoggedUser();
    this.initSettingsFormData();
    console.log(this.loggedUser);
  }

  private getCurrentLoggedUser() {

    const loggedUser = this.authService.getLoggedUser(); 
    if(loggedUser !== null) {
      this.loggedUser = loggedUser;
    }

  }
  
  private initSettingsFormData() {
    this.settingsForm.get("firstname")?.setValue(this.loggedUser?.firstname);
    this.settingsForm.get("lastname")?.setValue(this.loggedUser?.lastname);
    this.settingsForm.get("email")?.setValue(this.loggedUser?.email);
    this.settingsForm.get("password")?.setValue("");
  }

  onSave(event: MouseEvent) {
    event.preventDefault();
  
    // Update User Image ...
    const firstname = this.settingsForm.get("firstname")?.value as string;
    const lastname = this.settingsForm.get("lastname")?.value as string;
    const email = this.settingsForm.get("email")?.value as string;
    const password = this.settingsForm.get("password")?.value as string;

    
    let user: UserDTO | null = null;
    // Password is defined in Form
    if((password !== undefined || password !== null || (password as string).length === 0) && this.checkPasswordConfirm() === true) {
      user = new UserDTO(this.loggedUser!.id, firstname, lastname, email, password, (this.loggedUser as UserDTO).friendList, (this.loggedUser as UserDTO).authorities, (this.loggedUser as UserDTO).isOnline, (this.loggedUser as UserDTO).lastOnline);
    } else {
      // Password is not defined in Form
      user = new UserDTO(this.loggedUser!.id, firstname, lastname, email, this.loggedUser?.password as string, (this.loggedUser as UserDTO).friendList, (this.loggedUser as UserDTO).authorities, (this.loggedUser as UserDTO).isOnline, (this.loggedUser as UserDTO).lastOnline);
    }

    this.userService.saveUser(user).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error(error);
    });  

  }

  onCancel(event: MouseEvent) {
    event.preventDefault();
    this.router.navigate(["/home"]);
  }

  onChangeImage(event: MouseEvent) {

    event.preventDefault();

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpg, .jpeg, .png";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", this.onImageSelect);

    const mainContainer = document.getElementsByClassName("main-container")[0];
  
    //-------------------------------------------------
    // This is requred to support custom fileInbut in Firefox
    //-------------------------------------------------
    mainContainer.appendChild(fileInput);
    fileInput.click();
    mainContainer.removeChild(fileInput);
    //-------------------------------------------------

  }

  selectedImage: File | undefined;
  onImageSelect(event: Event) {    

    const fileInput = event.target as HTMLInputElement;
    if(fileInput.files) {
      this.selectedImage = fileInput.files[0];
      
      const formData = new FormData();
      formData.append("file", this.selectedImage, this.selectedImage.name);

      // Send formData Object to Server wiht HTTP POST Method.
      //...

    }
 
  }

  showChangePasswordInput: boolean = false;
  onChangePassword(event: MouseEvent) {
    event.preventDefault();
    this.showChangePasswordInput = !this.showChangePasswordInput;
  }

  onEmailBlur() {

    const email = this.settingsForm.get("email")?.value;

    if(email === undefined || email === null || email.length === 0) {
      return;     // email not defined in Input Form
    }

    if(email === this.loggedUser?.email) {
      return;   // if written email is same as current LoggedUser email do nothing.
    }

    this.authService.emailExist(email).subscribe((response) => {
      
      if(response === true ) {
        this.settingsForm.get("email")?.setErrors({emailExist: true});
      }
    }, (error) => {
      console.error(error);
    });

  }

  confirmPassword: boolean = false;
  onConfirmPasswordBlur() {

    this.confirmPassword = false;

    this.checkPasswordConfirm();

  }

  private checkPasswordConfirm() {

    const password = this.settingsForm.get("password")?.value;
    const confirmedPassword = document.getElementById("confirm-password");
    if(password === undefined || password === null || password.length === 0 || confirmedPassword === null) {
      this.settingsForm.get("password")?.setErrors({required: true});
      this.confirmPassword = true;
      return false;
    }

    if(password !== (confirmedPassword as HTMLInputElement).value) {
      this.settingsForm.get("password")?.setErrors({notSame: true});
      return false;
    }
    else {
      this.settingsForm.get("password")?.setErrors({notSame: false});
      return true;
    }

  }

  onLogout() {
    
  }

}

