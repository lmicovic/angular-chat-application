import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationHeaderComponent } from "../application-header/application-header.component";
import { UserListComponent } from "../user-list/user-list.component";
import { MessagesComponent } from "../messages/messages.component";
import { AuthService } from '../../others/services/auth-service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ApplicationHeaderComponent, UserListComponent, MessagesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    window.addEventListener("beforeunload", this.onWindowClosed);     // Calls this.onWindowClosed() method when Window is closed.
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.onWindowClosed);
  }

  /**
   * Logout current User before windows is closed.
   */
  private onWindowClosed() {
    
    // this.authService.logout(false);
  }

  

}
