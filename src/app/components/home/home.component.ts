import { Component } from '@angular/core';
import { ApplicationHeaderComponent } from "../application-header/application-header.component";
import { UserListComponent } from "../user-list/user-list.component";
import { MessagesComponent } from "../messages/messages.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ApplicationHeaderComponent, UserListComponent, MessagesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
