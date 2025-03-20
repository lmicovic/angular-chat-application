import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent {

  @Input("items")
  public items: String[] = ["All", "Friend List", "Online"];
  
  @Input("activeItem")
  public activeItem: number = 0;

  @Output("optionEmmiter")
  optionEmmiter = new EventEmitter<number>();

  constructor() {

  }

  public onItem(idx: number): void {
    
    this.activeItem = idx;
    
    this.optionEmmiter.emit(idx);
    

  }

}
