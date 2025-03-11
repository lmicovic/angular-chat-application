import { every } from 'rxjs';
import { Component, HostListener } from '@angular/core';
import { CardComponent } from "../shared/card/card.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidators } from '../../others/validators/email.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])
  });

  signinForm: FormGroup = new FormGroup({
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email], [EmailValidators.exists]),
    password: new FormControl("", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    confirmPassword: new FormControl("", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
  });

  cardStyle = {
    width: '40%',
    height: 'auto',
    margin: '80px auto',
    padding: '20px'
  }
  
  constructor() {
    this.onScreenResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onScreenResize(event: any) {
    
    // console.log(window.innerWidth);
    if(window.innerWidth < 880) {
      this.cardStyle.width = "80%";
    }
    else {
      this.cardStyle.width = "40%";
    }
 
  }

  onLogin() {

    // Check Form Validation
    if(this.loginForm.status === "INVALID") {
      document.getElementById("login-global-validation-message")!.style.display = "block";
      return;
    }
    else {
      document.getElementById("login-global-validation-message")!.style.display = "none";
    }
    
    
  }

  onSignin(event: MouseEvent) {
    event.preventDefault();

    // Check Form Validation
    if(this.signinForm.status === "INVALID") {
      document.getElementById("signin-gloabl-validation-message")!.style.display = "block";
      return;
    }
    else {
      document.getElementById("signin-gloabl-validation-message")!.style.display = "none";
    }

    // Check Password Confirmation Validation
    const password: HTMLInputElement =  document.getElementById("signin-password-value") as HTMLInputElement;
    const confirmPassword = document.getElementById("signin-confirm-password-value") as HTMLInputElement;

    const confirmPasswordValidationContainer = document.getElementById("confirm-password-validation-container");
    if(password.value !== confirmPassword.value) {
      confirmPasswordValidationContainer!.style.display = "block";
      return;
    }
    else {
      confirmPasswordValidationContainer!.style.display = "none";
    }
    
    
  }

  onGoogleLoginButton() {
    alert("Google OAuth 2.0 feature not supported yet.");
  }

  onGoogleSigninButton() {
    alert("Google OAuth 2.0 feature not supported yet.");
  }

  showLoginTemplate: boolean = true;
  changeToSigninTemplate(event: MouseEvent) {
    event.preventDefault();
    this.showLoginTemplate = !this.showLoginTemplate;
  }

  isLoginShowPassword: boolean = false;
  loginShowPassword() {
    this.isLoginShowPassword = !this.isLoginShowPassword;
  }

  isSigninShowPassword: boolean = false;
  signinShowPassword(event: MouseEvent) {
    event.preventDefault();
    this.isSigninShowPassword = !this.isSigninShowPassword;
  }

  isSigninShowConfirmPassword: boolean = false;
  signinShowConfirmPassword(event: MouseEvent) {
    event.preventDefault();
    this.isSigninShowConfirmPassword = !this.isSigninShowConfirmPassword;
  }

}
