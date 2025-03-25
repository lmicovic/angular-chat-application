import { Component } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { MessageBoxComponent } from "../shared/message-box/message-box.component";
import { TextInputComponent } from "../shared/text-input/text-input.component";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent, MessageBoxComponent, TextInputComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  constructor() {

  }

  onViewUserProfile(event: MouseEvent) {
    event.preventDefault();
    alert("This feature is not supported yet!");
  }

  onAddToFriendList(event: MouseEvent) {
    event.preventDefault();
    alert("This feature is not supported yet!");
  }

  onAddToGroup(event: MouseEvent) {
    event.preventDefault();
    alert("This feature is not supported yet!");
  }

  onBlock(event: MouseEvent) {
    event.preventDefault();
    alert("This feature is not supported yet!");
  }

  onVideoCall(event: MouseEvent) {
    alert("This feature is not supported yet!");
  }

  onVoiceCall(event: MouseEvent) {
    alert("This feature is not supported yet!");
  }

}
