import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { OrderByPipe } from 'ngx-pipes';
import { ReversePipe } from 'ngx-pipes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cleanLabelStr = 'Wyczyść wszystkie';
  config: { [key: string]: string | Date } = null;
  taskName = 'domyślne zadanie';
  taskDate = '';
  tasks: Task[] = [
    {
      name: 'Spacer z kotem Sylwestrem',
      deadline: '2020-03-20',
      done: false,
    },
    {
      name: 'Siłownia',
      deadline: '2020-01-02',
      done: false,
    },
    {
      name: 'Nauka Angulara',
      deadline: '2020-01-06',
      done: false,
    },
    {
      name: 'Sprzątanie kuwety',
      deadline: '2020-01-04',
      done: false,
    },
  ];
  inputTest = 'pusto';
  constructor() {
    // symulacja ładowania danych z opóźnieniem
    setTimeout(() => this.initConfig(), 2000);
    console.log(this.tasks);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sortTasks();
  }

  initConfig() {
    this.config = {
      title: 'Lista zadań Smyka',
      footer:
        '© Lista zadań, All rights reserved (4300: todo-list-udemy-master 2).',
      date: new Date(),
    };
  }

  //getter - typescript
  get cleanLabel(): string {
    return this.cleanLabelStr;
  }

  cleanTasks() {
    this.tasks = [];
  }

  onKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.inputTest = target.value;
  }

  newTask(taskName: HTMLInputElement, taskDeadline : HTMLInputElement) {
    this.addTask(taskName.value, taskDeadline.value);
    taskName.value = '';
    taskDeadline.value = '';
  }

 createTask() {
  this.addTask(this.taskName, this.taskDate);
  this.taskName = 'dodano 2';
  this.taskDate = '2019-11-29';
 }

  addTask(taskName: string, taskDeadline: string) {
    console.log('taskName: ' + this.taskName);
    console.log('taskDate: ' + this.taskDate);
    if (taskDeadline.trim() === ''){
        taskDeadline = new Date().toString();
    }
    this.tasks.push({
      name: taskName,
      deadline: taskDeadline,
      done: false,
    });
    this.sortTasks();
  }

  sortTasks() {
    this.tasks = this.tasks.sort(this.compareTasks);
  }

  compareTasks(first: Task, second: Task): number {
    return first.deadline.localeCompare(second.deadline);
  }

  //*ngFor="let item of (tasks | orderBy: 'deadline'); let i = index; let first = first; let last = last"
}
