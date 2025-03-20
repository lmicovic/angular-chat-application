import { every } from 'rxjs';
import { Component, HostListener } from '@angular/core';
import { CardComponent } from "../shared/card/card.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidators } from '../../others/validators/email.validator';
import { AuthRequest } from '../../others/models/authRequest.class';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../others/services/auth-service/auth.service';
import { DecodedJwtToken } from '../../others/models/decodedJwtToken.interface';
import { UserService } from '../../others/services/user-service/user.service';
import { UserDTO } from '../../others/models/userDto.class';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService],
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("peraperic1@gmail.com", [Validators.required, Validators.email]),
    password: new FormControl("Test!123!", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])
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
  
  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
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

  /**
   * Validate Form and gets User's JWTToken if username and passwrod is correct.<br>
   * If username and password are correct redirects to home page.
   */
  onLogin() {

    // Check Form Validation
    if(this.loginForm.status === "INVALID") {
      document.getElementById("login-global-validation-message")!.style.display = "block";
      return;
    }
    else {
      document.getElementById("login-global-validation-message")!.style.display = "none";
    }
    //-------------------------------------------------------------------------------------------

    // Get JWT Token
    const email: string = this.loginForm.get("email")?.value;
    const password: string = this.loginForm.get("password")?.value;
    const authRequest = new AuthRequest(email, password);

    this.authService.authenticate(authRequest).subscribe((response) => {
      
      console.log("JwtToken: " + JSON.stringify(response.jwtToken));
      
      // Save JWT Token
      this.authService.saveJwtToken(response.jwtToken);
      
      // Save user
      const decodedJwtToken = this.authService.decodeJwtToken(response);
      const userEmail = decodedJwtToken?.sub;

      this.userService.findByEmail(userEmail as string).subscribe((user: UserDTO) => {

        console.log("Logged User: " + JSON.stringify(user));

        this.authService.saveLoggedUser(user);
        this.router.navigate(["/home"]);
        

      }, (error) => {
        console.log(error);
      });

      // Redirect to Home Page
      // this.router.navigate(["/home"]);

      
      


    }, (error: HttpErrorResponse) => {
      
      // HTTP Status -  HTTP.Unathorized
      if(error.status === 401) {
        this.loginForm.setErrors({wrongEmailOrPassword: true});
        try {
          throw new Error("Wrong Email or Passwrod");
        } catch (error) {
          console.error(error);
        }
      }
      
    });
    
    
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
