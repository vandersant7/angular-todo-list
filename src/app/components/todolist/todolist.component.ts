import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface TaskModel {
  taskName: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})

export class TodolistComponent implements OnInit {
  taskArray: TaskModel[] = [];

  ngOnInit(): void {
    this.GetAll();
  }

  onSubmit(form: NgForm) {
    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
    });

    this.Save();

    form.reset();
  }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);
    this.Save();
  }

  onChecked(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.Save();
  }

  Save() {
    localStorage.setItem('todo', JSON.stringify(this.taskArray));
  }

  GetAll() {
    let value = localStorage.getItem('todo');
    if (value) {
      this.taskArray = JSON.parse(value);
    } else {
      this.taskArray = [
        { taskName: 'Adicione uma tarefa', isCompleted: false },
      ];
    }
  }
}
