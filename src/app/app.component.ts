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


  editMode = false;
  cleanLabelStr = 'Wyczyść wszystkie';
  config: { [key: string]: string | Date } = null;
  taskName = 'domyślne zadanie';
  taskDeadline = '';
  day = 1;
  tasks: Task[] = [
    {
      name: 'Spacer z kotem Sylwestrem',
      deadline: '2020-03-20',
      done: false,
    },
    {
      name: 'Siłownia',
      deadline: '2020-01-02',
      done: true,
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
  prevTaskName = '';

  // tmp
  divStatus = true;

  // compareBoolean = (first: boolean, second: boolean) :number => {
  //   return first === second ? 0 : (first ? 1 : -1);
  // }

  compareBoolean (first: boolean, second: boolean) :number {
    return first === second ? 0 : (first ? 1 : -1);
  }
  constructor() {
    // symulacja ładowania danych z opóźnieniem
    setTimeout(() => this.initConfig(), 2000);
    console.log(this.tasks);
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.sortTasks();
  }

  initConfig() {
    this.config = {
      title: 'Zadania Smyka',
      footer:
        '© Lista zadań, All rights reserved (4400: todo-list-udemy-master 2).',
      date: new Date(),
    };
  }

  // getter - typescript
  get cleanLabel(): string {
    return this.cleanLabelStr;
  }

  cleanTasks() {
    this.tasks = [];
  }

  onKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.prevTaskName = target.value;
  }

  newTask() {
    this.addTask(this.taskName, this.taskDeadline);
    this.taskName = '';
    this.taskDeadline = '';
  }

  addTask(taskName: string, taskDeadline: string) {
    console.log('taskName: ' + taskName);
    console.log('taskDate: ' + taskDeadline);
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
    this.tasks = this.tasks.sort(
      (first,second) => this.compareTasks(first,second))
  }




  compareTasks(first: Task, second: Task): number {
    // const booleanComparison = first.done === second.done ? 0 : (first.done ? 1 : -1)
    //this.compareBoolean; let fun = this.compareBoolean;
    const booleanComparison = this.compareBoolean(first.done, second.done);
    if (booleanComparison === 0)    {
    return first.deadline.localeCompare(second.deadline);
    }  else    {
      return booleanComparison;}
  }



  changeDivStatus(){
    this.divStatus = !this.divStatus;
  }


  switchEditMode(){
     this.editMode = !this.editMode;
  }

  markTaskAsDone(task: Task){
    console.log("TaskAsDone: %o", task);
    task.done = true;
    this.sortTasks();
  }

  deleteTask(task: Task)  {
    console.log("DeleteTask: %o", task);
    const index = this.tasks.findIndex(t => task===t);
    this.tasks.splice(index, 1);
    //this.tasks = this.tasks.filter(t => t !==task);
  }

  // *ngFor="let item of (tasks | orderBy: 'deadline'); let i = index; let first = first; let last = last"
}
