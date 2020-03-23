import { Component, OnInit } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  editMode = false;
  cleanLabelStr = 'Wyczyść wszystkie';
  config: { [key: string]: string | Date } = null;

  taskName = '';
  taskDeadline = '';

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

  constructor() {
    // symulacja ładowania danych z opóźnieniem
    setTimeout(() => this.initConfig(), 2000);
    console.log(this.tasks);
  }

  initConfig() {
    this.config = {
      title: 'Zadania Smyka',
      footer: '© Lista zadań, All rights reserved (4300).',
      date: new Date(),
    };
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.sortTasks();
  }

  // getter - typescript
  get cleanLabel(): string {
    return this.cleanLabelStr;
  }

  cleanTasks() {
    this.tasks = [];
  }

  switchEditMode(){
    this.editMode = !this.editMode;
 }

  newTask() {
    this.addTask(this.taskName, this.taskDeadline);
    this.taskName = '';
    this.taskDeadline = '';
  }

  addTask(taskName: string, taskDeadline: string) {
    console.log('taskName: %s, taskDate: %s', taskName, taskDeadline);
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
    const booleanComparison = this.compareBoolean(first.done, second.done);
    if (booleanComparison === 0)    {
    return first.deadline.localeCompare(second.deadline);
    }  else    {
      return booleanComparison;}
  }

  compareBoolean (first: boolean, second: boolean) :number {
    return first === second ? 0 : (first ? 1 : -1);
  }

  markTaskAsDone(task: Task){
    console.log("markskAsDone: %o", task);
    task.done = true;
    this.sortTasks();
  }

  deleteTask(task: Task)  {
    console.log("deleteTask: %o", task);
    this.tasks = this.tasks.filter(t => t !== task);
    this.sortTasks();
  }

  tasksToJsonFormat() :string {
    const json = JSON.stringify(this.tasks, null, '  ');
    console.log(json);
    return json;
  }

}
