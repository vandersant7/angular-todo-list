import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from '../models/TodoModel';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  private taskArray: TaskModel[] = []

  private taskSubject = new BehaviorSubject<TaskModel[]>(this.taskArray)

  constructor() {
    this.loadTasks();
  }

  getTasks(): Observable<TaskModel[]>{
    return this.taskSubject.asObservable();
  }

  addTask(taskName: string): void {
    const newTask: TaskModel = { taskName, isCompleted: false };
    this.taskArray.push(newTask);
    this.saveTasks();
    this.taskSubject.next(this.taskArray);
  }

    deleteTask(index: number): void {
    this.taskArray.splice(index, 1);
    this.saveTasks();
    this.taskSubject.next(this.taskArray)
  }

  toggleTaskCompletetion(index: number): void {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;

    this.saveTasks();

    this.taskSubject.next(this.taskArray)
  }

  private loadTasks(): void {
    const value = localStorage.getItem('todo')
    value ? this.taskArray = JSON.parse(value) : this.taskArray = [{taskName: "Adicione uma tarefa", isCompleted: false}]

    this.taskSubject.next(this.taskArray)
  }

  private saveTasks(): void {
    localStorage.setItem('todo', JSON.stringify(this.taskArray))
  }
}
