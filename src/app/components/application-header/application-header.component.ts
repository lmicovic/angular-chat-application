import { Component } from '@angular/core';
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-application-header',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './application-header.component.html',
  styleUrl: './application-header.component.css'
})
export class ApplicationHeaderComponent {

}
