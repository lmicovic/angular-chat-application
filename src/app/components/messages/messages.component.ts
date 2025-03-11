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

}
