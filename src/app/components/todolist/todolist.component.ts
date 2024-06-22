import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoServiceService } from '../../services/todo-service.service';
import { TaskModel } from '../../models/TodoModel';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent implements OnInit {

  taskForm: FormGroup;

  tasks: TaskModel[] = []

  constructor(private todoService: TodoServiceService) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      task: new FormControl('', Validators.required)
    });

    this.todoService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.todoService.addTask(this.taskForm.get('task')?.value);
      this.taskForm.reset();
    }
  }

  onDelete(index: number): void {
   this.todoService.deleteTask(index)
  }

  onChecked(index: number): void {
    this.todoService.toggleTaskCompletetion(index)
  }

}
