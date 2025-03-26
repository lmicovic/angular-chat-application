import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { MessageBoxComponent } from "../shared/message-box/message-box.component";
import { TextInputComponent } from "../shared/text-input/text-input.component";
import { UserDTO } from '../../others/models/userDto.class';
import { CommonModule } from '@angular/common';
import { SelectedUserService } from '../../others/services/shared-service/selected-user-service/selected-user.service';
import { MessageDTO } from '../../others/models/messageDto.class';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, CardComponent, MessageBoxComponent, TextInputComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {

  selectedUser: UserDTO | null = null;
  selectedUserMessages: MessageDTO[] | null = null;

  constructor(private selectedUserService: SelectedUserService) {

  }

  ngOnInit(): void {
    this.getSelectedUser();
  }

  private getSelectedUser() {
    
    this.selectedUserService.currentData.subscribe((selectedUser) => {
      this.selectedUser = selectedUser;
    }, (error) =>{
      console.error(error);
    });

  }

  onSelectedUserMessages(selectedUserMessages: MessageDTO[] | null) {
    this.selectedUserMessages = selectedUserMessages;
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
