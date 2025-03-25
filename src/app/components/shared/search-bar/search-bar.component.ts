import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @Input("styles")
  public styles: Object = {};

  constructor() {

  }

  @Output("searchResult")
  private searchResult = new EventEmitter<string>();
  onSearch() {

    let typedValue = (document.getElementById("search-user") as HTMLInputElement).value;
    this.searchResult.emit(typedValue);

  }

}
