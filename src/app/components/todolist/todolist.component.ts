import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})


export class TodolistComponent {


  taskArray = [{taskName: 'Adicione uma tarefa', isCompleted: false }]

  onSubmit(form: NgForm){
    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false
    })

    localStorage.setItem('', 'taskArray')

    form.reset()
  }

  onDelete(index: number){
    this.taskArray.splice(index, 1)

  }

  onChecked(index: number) {
    console.log(this.taskArray)

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted
  }

}
