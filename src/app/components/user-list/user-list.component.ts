import { Component } from '@angular/core';
import { CardComponent } from "../shared/card/card.component";
import { SearchBarComponent } from "../shared/search-bar/search-bar.component";
import { ToggleComponent } from "../shared/toggle/toggle.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CardComponent, SearchBarComponent, ToggleComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  
}
