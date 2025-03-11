import { Component } from '@angular/core';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent {

  public currentUser: Object = {
    userName: "Me", 
    image: ""
  };

  public connectedUser: Object = {
    userName: "Pera Peric",
    image: ""
  };

  public messages: Object[] = [
    {userSender: "Me", messageContent: "Hi Pera", time: new Date(2023, 2, 15, 10, 30)},
    {userSender: "Pera Peric", messageContent: "Hi", time: new Date(2023, 2, 15, 10, 31)},
    {userSender: "Me", messageContent: "Hi Pera", time: new Date(2023, 2, 15, 10, 32)},
    {userSender: "Pera Peric", messageContent: "Hi", time: new Date(2023, 2, 15, 10, 33)}
  ];

  constructor() {

  }

}
