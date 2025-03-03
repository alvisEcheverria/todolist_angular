import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DEFAULT_USERS } from './data/default-users';
import { TasksComponent } from './tasks/tasks.component';
import { UserFormComponent } from './user/user-form/user-form.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent, TasksComponent, UserFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  users = DEFAULT_USERS;
  selectedUserId?: string;

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }
  
  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
