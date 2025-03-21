import { UserDTO } from './../../models/userDto.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CrudServiceImpl } from '../crud-service.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudServiceImpl<UserDTO> {

  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService, "user", true);
  }

  //------------------------------------------------------------
  // Custom Service Methods
  //------------------------------------------------------------
  public existByEmail(email: string): Observable<boolean> {
    
    if(this.secure === true) {

      const jwtToken = this.authService.getJwtToken();
      if(jwtToken === null) {
          try {
              throw new Error("JwtToken is not found in localStorage.");
          } catch (error) {
              console.error(error);
          }
      }

      let headers = new HttpHeaders({
          "Authorization": "Bearer " + jwtToken,
          "Content-Type": "application/json",
          "Accept": "application/json"
      });
      
      return this.httpClient.get<boolean>(this.urlApi + "/" + this.path + "/check-email/" + email, {headers: headers});

    }

    return this.httpClient.get<boolean>(this.urlApi + "/" + this.path + "/check-email/" + email);
  }
  
  public findByEmail(email: string): Observable<UserDTO> {
  
    if(this.secure === true) {

      const jwtToken = this.authService.getJwtToken();
      if(jwtToken === null) {
          try {
              throw new Error("JwtToken is not found in localStorage.");
          } catch (error) {
              console.error(error);
          }
      }

      let headers = new HttpHeaders({
          "Authorization": "Bearer " + jwtToken,
          "Content-Type": "application/json",
          "Accept": "application/json"
      });

      return this.httpClient.get<UserDTO>(this.urlApi + "/" + this.path + "/email/" + email, {headers: headers});  

    }

    return this.httpClient.get<UserDTO>(this.urlApi + "/" + this.path + "/email/" + email);
  }

  getCurrentLoggedinUser(email: string) {

    if(this.secure === true) {

      const jwtToken = this.authService.getJwtToken();
      if(jwtToken === null) {
          try {
              throw new Error("JwtToken is not found in localStorage.");
          } catch (error) {
              console.error(error);
          }
      }

      let headers = new HttpHeaders({
          "Authorization": "Bearer " + jwtToken,
          "Content-Type": "application/json",
          "Accept": "application/json"
      });

      return this.httpClient.get<UserDTO>(this.urlApi + "/" + this.path + "/current-user/" + email, {headers: headers});  

    }

    return this.httpClient.get<UserDTO>(this.urlApi + "/" + this.path + "/current-user/" + email);

  }


  /**
   * @deprecated This method is not longer in use, use saveUser() or saveAdmin() method instead.
   * @param object 
   */
  override save(object: UserDTO): Observable<UserDTO> {
    console.warn("This method is not longer in use, use saveUser() or saveAdmin() method instead.");
    return new Observable();
  }

  saveUser(object: UserDTO): Observable<UserDTO> {
    
    if(this.secure === true) {

      const jwtToken = this.authService.getJwtToken();
      if(jwtToken === null) {
          try {
              throw new Error("JwtToken is not found in localStorage.");
          } catch (error) {
              console.error(error);
          }
      }

      let headers = new HttpHeaders({
          "Authorization": "Bearer " + jwtToken,
          "Content-Type": "application/json",
          "Accept": "application/json"
      });

      return this.httpClient.post<UserDTO>(this.urlApi + "/" + this.path + "/user-save", object, {headers: headers});  

    }

    return this.httpClient.post<UserDTO>(this.urlApi + "/" + this.path + "/user-save", object);
  }

  saveAllUser(objects: UserDTO[]): Observable<UserDTO[]> {
    
    if(this.secure === true) {

      const jwtToken = this.authService.getJwtToken();
      if(jwtToken === null) {
          try {
              throw new Error("JwtToken is not found in localStorage.");
          } catch (error) {
              console.error(error);
          }
      }

      let headers = new HttpHeaders({
          "Authorization": "Bearer " + jwtToken,
          "Content-Type": "application/json",
          "Accept": "application/json"
      });

      return this.httpClient.post<UserDTO[]>(this.urlApi + "/" + this.path + "/user-save-all", objects, {headers: headers});

    }

    return this.httpClient.post<UserDTO[]>(this.urlApi + "/" + this.path + "/user-save-all", objects);
  }

  saveAdmin(object: UserDTO): Observable<UserDTO> {
    
    if(this.secure === true) {

      const jwtToken = this.authService.getJwtToken();
      if(jwtToken === null) {
          try {
              throw new Error("JwtToken is not found in localStorage.");
          } catch (error) {
              console.error(error);
          }
      }

      let headers = new HttpHeaders({
          "Authorization": "Bearer " + jwtToken,
          "Content-Type": "application/json",
          "Accept": "application/json"
      });

      return this.httpClient.post<UserDTO>(this.urlApi + "/" + this.path + "/admin-save", object, {headers: headers});

    }

    return this.httpClient.post<UserDTO>(this.urlApi + "/" + this.path + "/admin-save", object);
  }

  saveAllAdmin(objects: UserDTO[]): Observable<UserDTO[]> {
    
    if(this.secure === true) {

        const jwtToken = this.authService.getJwtToken();
      if(jwtToken === null) {
          try {
              throw new Error("JwtToken is not found in localStorage.");
          } catch (error) {
              console.error(error);
          }
      }

      let headers = new HttpHeaders({
          "Authorization": "Bearer " + jwtToken,
          "Content-Type": "application/json",
          "Accept": "application/json"
      });

      return this.httpClient.post<UserDTO[]>(this.urlApi + "/" + this.path + "/admin-save-all", objects, {headers: headers});

    }

    return this.httpClient.post<UserDTO[]>(this.urlApi + "/" + this.path + "/admin-save-all", objects);
  }

}
