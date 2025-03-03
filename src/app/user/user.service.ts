import { Injectable, Signal, signal } from '@angular/core';
import { DEFAULT_USERS } from '../data/default-users';
import { type User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSignal = signal<User[]>(this.loadUsers()); 
  users: Signal<User[]> = this.usersSignal;
  private defaultAvatar = 'default-avatar.webp';

  constructor() {}

  private loadUsers(): User[] {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [...DEFAULT_USERS];
  }

  private saveUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users)); 
    this.usersSignal.set(users); 
  }

  addUser(name: string) {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      avatar: this.defaultAvatar,
    };

    const updatedUsers = [...this.usersSignal(), newUser]; 
    this.saveUsers(updatedUsers);
  }
}

