import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardComponent } from "../shared/card/card.component";
import { SearchBarComponent } from "../shared/search-bar/search-bar.component";
import { ToggleComponent } from "../shared/toggle/toggle.component";
import { UserDTO } from '../../others/models/userDto.class';
import { CommonModule } from '@angular/common';
import { UserService } from '../../others/services/user-service/user.service';
import { AuthService } from '../../others/services/auth-service/auth.service';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, CardComponent, SearchBarComponent, ToggleComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  
  // allUsers: UserDTO[] = [new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!")];
  // friendList: UserDTO[] = [new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!"), new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!")];
  // onlineUsers: UserDTO[] = [new UserDTO(1, "Pera", "Peric", "peraperic@gmail.com", "Test!123!")];

  allUsers: UserDTO[] = [];
  friendList: UserDTO[] = [];
  onlineUsers: UserDTO[] = [];

  loggedUser: UserDTO | null = null;

  menuOption: string[] = ["all", "friendList", "online"];
  selectedOption: string = this.menuOption[1];

  

  constructor(private userService: UserService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.getAllUsers();
  }

  

  /**
   * Get All Users from Backend
   */
  private getAllUsers() {

    this.userService.getAll().subscribe((response) => {
      this.allUsers = this.filterCurrentUser(response);
      this.allUsersFiltered = this.allUsers;
      this.onlineUsers = this.filterOnlineUsers(response);
      this.onlineUsersFiltered = this.onlineUsers;
      if(this.loggedUser?.friendList !== undefined) {
        this.friendList = this.loggedUser?.friendList; 
        this.friendListFiltered = this.loggedUser?.friendList;
      }   
      
    }, (error) => {
      console.error(error);
    });

  }

  /**
   * Used to filter Current User from list of All Users, and store Filtered Users to this.allUsers
   * @param allUsers 
   */
  private filterCurrentUser(allUsers: UserDTO[]) {
    
    if(this.loggedUser === null) {
      try {
        throw new Error("Current user is null.");
      } catch (error) {
        console.error(error);
      }
      return [];
    }

    allUsers =  allUsers.filter((value) => {
      if(value.id === (this.loggedUser as UserDTO).id) {
        return false;
      }
      return true;
    });

    return allUsers;

  }

  /**
   * Filter Online Users and store Online Users in this.onlineUsers
   */
  private filterOnlineUsers(allUsers: UserDTO[]) {

    let onlineUsers =  allUsers.filter((value) => {
      if(value.isOnline === true && (this.loggedUser as UserDTO).id !== value.id) {
        return true;
      }
      return false;
    });

    return onlineUsers;

  }

  getSelectedOption(selectedOption: number) {
    this.selectedOption = this.menuOption[selectedOption];
  }

  resultValue: string = "";
  allUsersFiltered: UserDTO[] = [];
  friendListFiltered: UserDTO[] = [];
  onlineUsersFiltered: UserDTO[] = [];
  onSearchResult(value: string) {
    
    this.resultValue = value.toLocaleLowerCase();
    
    switch (this.selectedOption) {
      case "all":
        this.allUsersFiltered = this.allUsers.filter((value) => {
          let filterString = (value.firstname + " " + value.lastname).toLocaleLowerCase();
          if(filterString.includes(this.resultValue) === true) {
            return true;
          }
          return false;
        });
        break;

      case "friendList":
        this.friendListFiltered = this.friendList.filter((value) => {
          let filterString = (value.firstname + " " + value.lastname).toLocaleLowerCase();
          if(filterString.includes(this.resultValue) === true) {
            return true;
          }
          return false;
        });
        break  
      break;

      case "online":
        this.onlineUsersFiltered = this.onlineUsers.filter((value) => {
          let filterString = (value.firstname + " " + value.lastname).toLocaleLowerCase();
          if(filterString.includes(this.resultValue) === true) {
            return true;
          }
          return false;
        });
        break
      
      default:
        try {
          throw new Error("Wrong Selected Menu Option: " + this.selectedOption + ". Options can be: [all, friendList, online]")
        } catch (error) {
          console.error(error);
        }
        break;
    }
    
  }

}
