import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDTO } from '../../../models/userDto.class';

/**
 * Used to send Selected User to other Components
 */
@Injectable({
  providedIn: 'root'
})
export class SelectedUserService {

  private dataSubject = new BehaviorSubject<UserDTO | null>(null);
  currentData = this.dataSubject.asObservable();

  constructor() { 

  }

  changeData(data: UserDTO) {
    this.dataSubject.next(data);
  }

}
