import { Component } from '@angular/core';
import { CardComponent } from "../shared/card/card.component";
import { SearchBarComponent } from "../shared/search-bar/search-bar.component";
import { ToggleComponent } from "../shared/toggle/toggle.component";
import { UserDTO } from '../../others/models/userDto.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, CardComponent, SearchBarComponent, ToggleComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  
  allUsers: UserDTO[] = [new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!")];
  friendList: UserDTO[] = [new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!")];
  onlineUsers: UserDTO[] = [new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!")];

  menuOption: string[] = ["all", "friendList", "online"];
  selectedOption: string = this.menuOption[1];

  constructor() {

  }

  getSelectedOption(selectedOption: number) {

    this.selectedOption = this.menuOption[selectedOption];
    
  }

}
