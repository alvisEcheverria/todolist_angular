import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule], // Importa FormsModule aquí
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userName = '';

  constructor(private userService: UserService) {}

  addUser() {
    if (this.userName.trim()) {
      this.userService.addUser(this.userName);
      this.userName = ''; // Limpiar el input
    }
  }
}
