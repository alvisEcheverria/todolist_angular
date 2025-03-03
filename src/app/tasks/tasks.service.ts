import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { type NewTaskData } from './task/task.model';
import { DEFAULT_TASKS } from '../data/default-tasks';
import { Task } from './task/task.model'; 

const STORAGE_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  private loadTasks(): Task[] {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      return JSON.parse(storedTasks);
    } else {
      this.saveTasks(DEFAULT_TASKS);
      return [...DEFAULT_TASKS];
    }
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  getUserTasks(userId: string) {
    return this.tasksSubject.value.filter(task => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    };

    const updatedTasks = [...this.tasksSubject.value, newTask];
    this.saveTasks(updatedTasks);
  }

  removeTask(id: string) {
    const updatedTasks = this.tasksSubject.value.filter(task => task.id !== id);
    this.saveTasks(updatedTasks);
  }

  updateTask(id: string, updatedData: Partial<NewTaskData>) {
    const tasks = this.tasksSubject.value;
    const index = tasks.findIndex(task => task.id === id);

    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedData };
      this.saveTasks([...tasks]);
    }
  }
}