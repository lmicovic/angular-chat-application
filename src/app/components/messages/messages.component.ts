import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { MessageBoxComponent } from "../shared/message-box/message-box.component";
import { TextInputComponent } from "../shared/text-input/text-input.component";
import { UserDTO } from '../../others/models/userDto.class';
import { CommonModule } from '@angular/common';
import { SelectedUserService } from '../../others/services/shared-service/selected-user-service/selected-user.service';
import { MessageDTO } from '../../others/models/messageDto.class';
import { AuthService } from '../../others/services/auth-service/auth.service';

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

  loggedUser: UserDTO | null = null;

  constructor(private authService: AuthService, private selectedUserService: SelectedUserService) {

  }

  ngOnInit(): void {
    this.getLoggedUser();
    this.getSelectedUser();
  }

  private getLoggedUser() {
    this.loggedUser = this.authService.getLoggedUser();
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

  /**
   * Checks if loggedUser contains selectedUser in FriendList
   */
  containsInFriendList() {

    if(this.loggedUser !== null && this.selectedUser !== null && this.loggedUser.friendList.length > 0) {
      
      for(let friend of this.loggedUser.friendList) {
        if(this.selectedUser.id === friend.id) {
          return true;
        }
      }

      return false;
    }
    return true;
  }


}
