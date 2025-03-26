import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudServiceImpl } from '../crud-service.service';
import { MessageDTO } from '../../models/messageDto.class';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService extends CrudServiceImpl<MessageDTO>  {

  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService, "message", true);
  }

  //------------------------------------------------------------
  // Custom Service Methods
  //------------------------------------------------------------

  /**
   * Gets All Messages where specified User is Message Sender or Receiver.
   */
  public getAllUserSenderAndUserReceiverMessages(userSenderId: number, userReceiverId: number): Observable<MessageDTO[]> {
    
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

      return this.httpClient.get<MessageDTO[]>(this.urlApi + "/" + this.path + "/all-message/" + userSenderId + "/" + userReceiverId, {headers: headers});

    }
    
    return this.httpClient.get<MessageDTO[]>(this.urlApi + "/" + this.path + "/all-message/" + userSenderId + "/" + userReceiverId);

  }



}
