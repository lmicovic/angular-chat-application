import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../../models/authRequest.class';
import { JwtTokenDTO } from '../../models/jwtTokenDTO.class';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedJwtToken } from '../../models/decodedJwtToken.interface';
import { UserDTO } from '../../models/userDto.class';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = "http://localhost:8080/auth";

  private readonly jwtTokenKey: string = "jwtToken";
  private readonly loggedUserKey: string = "loggedUser";

  constructor(private httpClient: HttpClient) { 
    this.getWelcome();
  }

  /**
   * This method is used to test If Client Application can connect to unprotected API routes.
   */
  getWelcome() {

    let headers = new HttpHeaders({
      "Accept": "text/plain"
    });

    this.httpClient.get(this.authUrl + "/welcome", { headers: headers, responseType: "text" }).subscribe((response) => {
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });

  }

  /**
   * This method is used to get JWTToken for User based on username and passwrod.
   * @param authRequest - containts username and passwrod
   * @returns Observable<JwtTokenDTO>
   */
  authenticate(authRequest: AuthRequest): Observable<JwtTokenDTO> {
    return this.httpClient.post<JwtTokenDTO>(this.authUrl + "/generateToken", authRequest);
  }

  signin(user: UserDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(this.authUrl + "/signin", user);
  }

  emailExist(email: string): Observable<Boolean> {
    return this.httpClient.get<boolean>(this.authUrl + "/email-exists/" + email);
  }

  /**
   * Checks if User is loggedin. Checks JWT if JWT Token exists and if JWT Token is expired
   * @returns boolean
   */
  isLoggedIn() {

    // Check if JWT Token exists
    if(this.jwtTokenExists() === false) {
      return false;
    }

    // Check if JWT Token is expired
    const jwtToken = this.getJwtToken() as string;
    if(this.jwtTokenExpired(jwtToken) === true) {
      return false
    }

    return true;

  }

  /**
   * Logout current user by removing its JWT Token from localStorage.
   */
  logout() {
    this.removeJwtToken();
    this.removeLoggedUser();
  }

  /**
     * Saves JWT Token to local storage with name jwtToken.
     * @param jwtToken
     */
  saveJwtToken(jwtToken: string) {
    localStorage.setItem(this.jwtTokenKey, jwtToken);
  }

  /**
   * Gets JWT Token from localStorage or returns null if jwtToken is not found.
   * @returns jwtToken | null
   */
   getJwtToken() {

    if(this.jwtTokenExists() === false) {
      return null;
    }

    let jwtToken = localStorage.getItem(this.jwtTokenKey);

    return jwtToken;

  }

  /**
   * Checks if JWT Token exists in local storage.
   * @returns true/false
   */
  private jwtTokenExists() {

    const jwtToken = localStorage.getItem(this.jwtTokenKey);
    if(jwtToken === null) {
      return false;
    }

    return true;

  }

  private removeJwtToken() {
    localStorage.removeItem(this.jwtTokenKey);
  }

  /**
   * Checks if JWT Token is expired
   * @param jwtToken - object
   * @returns true/false
   */
  private jwtTokenExpired(jwtToken: string) {

    const jwtTokenHelper = new JwtHelperService(JSON.stringify(jwtToken));
    const JwtTokenExpired = jwtTokenHelper.isTokenExpired(JSON.stringify(jwtToken));

    if(JwtTokenExpired === true) {
      return true;
    }

    return false;

  }

  /**
   * Decode JWT Token to readable object
   * @param jwtToken - encoded JWT Token
   * @returns jwtToken - decoded jwtToken
   * @error InvalidJwtToken
   */
  decodeJwtToken(jwtToken: JwtTokenDTO) {

    const jwtTokenHelper = new JwtHelperService(JSON.stringify(jwtToken.jwtToken));

    const decodedJwtToken: DecodedJwtToken | null = jwtTokenHelper.decodeToken(jwtToken.jwtToken);
    if(decodedJwtToken === null) {
      try {
        throw new Error("Invalid JWT Token.");
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    return decodedJwtToken as DecodedJwtToken;
  }

  /**
   * Save LoggedUser to localStorage
   */
  saveLoggedUser(user: UserDTO): void {
    localStorage.setItem(this.loggedUserKey, JSON.stringify(user));
  }

  getLoggedUser(): UserDTO | null {
    
    const loggedUserString = localStorage.getItem(this.loggedUserKey);
    
    if(loggedUserString === null) {
      try {
        throw new Error("getLoggedUser(): logged user is not found.");
      } catch (error) {
        console.error(error);
        return null;  
      }
    }
    
    const loggedUser: UserDTO = JSON.parse(loggedUserString);
    return loggedUser;
    
  }

  existLoggedUser(): boolean {
    
    if(this.getLoggedUser() === null) {
      return false;
    }

    return true;
  }

  removeLoggedUser(): boolean {

    if(this.getLoggedUser() === null) {
      return false;
    }

    localStorage.removeItem(this.loggedUserKey);
    return true;

  }

}
