import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserDTO } from '../../../others/models/userDto.class';
import { MessageDTO } from '../../../others/models/messageDto.class';
import { AuthService } from '../../../others/services/auth-service/auth.service';
import { MessageServiceService } from '../../../others/services/message-service/message-service.service';
import { CommonModule } from '@angular/common';
import { MessageDatePipe } from '../../../others/pipes/message-date-pipe/message-date.pipe';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [CommonModule, MessageDatePipe],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent implements OnInit, OnChanges {

  public currentUser: Object = {
    userName: "Me", 
    image: ""
  };

  public connectedUser: Object = {
    userName: "Pera Peric",
    image: ""
  };

  // public messages: Object[] = [
  //   {userSender: "Me", messageContent: "Hi Pera", time: new Date(2023, 2, 15, 10, 30)},
  //   {userSender: "Pera Peric", messageContent: "Hi", time: new Date(2023, 2, 15, 10, 31)},
  //   {userSender: "Me", messageContent: "Hi Pera", time: new Date(2023, 2, 15, 10, 32)},
  //   {userSender: "Pera Peric", messageContent: "Hi", time: new Date(2023, 2, 15, 10, 33)}
  // ];
  
  @Input("selectedUser")
  selectedUser: UserDTO | null = null;

  loggedUser: UserDTO | null = null;

  /**
   * Represents Messages from selectedUser and messages from loggedUser.
   */
  messages: MessageDTO[] | null = null;

  @Output("selectedUserMessages")
  selectedUserMessagesEmmiter = new EventEmitter<MessageDTO[]>;

  constructor(private authService: AuthService, private messageService: MessageServiceService) {

  }

  ngOnInit(): void {
    this.loggedUser = this.getLoggedUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    // selectedUser or loggedUser attributes are changed
    if(changes["selectedUser"] !== undefined || changes["loggedUser"] !== undefined) {
      this.loggedUser = this.getLoggedUser();
      this.getMessages();
    }
    
  }

  private getLoggedUser() {
    return this.authService.getLoggedUser();
  }

  private getMessages() {
    
    this.messageService.getAllUserSenderAndUserReceiverMessages(this.loggedUser!.id, this.selectedUser!.id).subscribe((messages) => {
      this.messages = messages;
      this.selectedUserMessagesEmmiter.emit(this.messages);
    }, (error) => {
      console.error(error);
    });

  }




}
