import { Component, HostListener } from '@angular/core';
import { CardComponent } from "../shared/card/card.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRequest } from '../../others/models/authRequest.class';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../others/services/auth-service/auth.service';
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
    firstname: new FormControl("Pera", [Validators.required]),
    lastname: new FormControl("Peric", [Validators.required]),
    email: new FormControl("pera.peric@gmail.com", [Validators.required, Validators.email]),
    password: new FormControl("Test!123!", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    confirmPassword: new FormControl("Test!123!", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
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

      this.userService.getCurrentLoggedinUser(userEmail as string).subscribe((user: UserDTO) => {

        console.log("Logged User: " + JSON.stringify(user));

        this.authService.saveLoggedUser(user);
      
        // Redirect to Home Page
        this.router.navigate(["/home"]);
        
      }, (error) => {
        console.log(error);
      });

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

  responseEmailExist: boolean = false;
  onSignin(event: MouseEvent) {
    event.preventDefault();

    this.responseEmailExist = false;

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
    
    const firstname = this.signinForm.get("firstname")?.value;
    const lastname = this.signinForm.get("lastname")?.value;
    const email = this.signinForm.get("email")?.value;
    const pwd = password.value;

    const userDto = new UserDTO(-1, firstname, lastname, email, pwd, [{authority: "ROLE_USER"}], true, new Date());
    
    this.authService.signin(userDto).subscribe((response: UserDTO) => {

      // Save user
      this.authService.saveLoggedUser(response);

      // Get JWT Token
      const email = response.email;
      const password = this.signinForm.get("password")?.value as string;
      const authRequest = new AuthRequest(email, password);

      this.authService.authenticate(authRequest).subscribe((response) => {

        console.log("jwtToken: " + response.jwtToken);

        // Save JWT Token
        this.authService.saveJwtToken(response.jwtToken);
        
        // Redirecto to Home Page
        this.router.navigate(["/home"]);

      }, (error) => {
        console.error(error);
      });

    }, (error: HttpErrorResponse) => {
      // HTTPStatus.Conflict - email is in use.
      if(error.status === 409) {
        this.responseEmailExist = true;
        this.signinForm.get("email")?.setErrors({exist: true});
      }
      console.error(error);
    });

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

  /**
   * Check If email is unique when focus is removed from emial input field in signin form
   */
  onSigninEmailBlur() {

    this.responseEmailExist = false;

    const email: string = this.signinForm.get("email")?.value as string;

    // If email is not typed
    if(email.length <= 0) {
      return;
    }

    // Check if email already exist
    this.authService.emailExist(email).subscribe((response) => {
      if(response === true) {
        this.signinForm.get("email")?.setErrors({exist: true});
      }
      
    }, (error) => {
      console.error(error);
    });
    
  }

  /**
   * Check if Password and confirmPassword is the same
   */
  onConfigrmPasswordBlur() {

    const password = this.signinForm.get("password")?.value as string;
    const confirmPassword = this.signinForm.get("confirmPassword")?.value as string;

    if(password.length <= 0 || confirmPassword.length <= 0) {
      return;
    }

    if(password !== confirmPassword) {
      this.signinForm.get("confirmPassword")?.setErrors({notSame: true});
    }

  }

}
