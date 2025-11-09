import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {Observable} from "rxjs";
import { catchError, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="title">
      <h1>
        A list of TODOs
      </h1>
    </div>
    <div class="list">
      <label for="search">Search...</label>
      <input id="search" type="text" [(ngModel)]="inputText" (keyup)="searchMethod()">
      <app-progress-bar *ngIf="!(todos$ | async) || reloadingTodos"></app-progress-bar>
      <app-todo-item *ngFor="let todo of todosShown; index as i" [item]="todo" (click)="deleteMethod(todo)" class="todo-item"></app-todo-item>
      <div *ngIf="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  readonly todos$: Observable<Todo[]>;
  public todos: Todo[] = [];
  public inputText: string = "";
  public todosShown: Todo[] = [];
  public reloadingTodos = false;
  public errorMessage: string | null = null;

  constructor(public todoService: TodoService) {
    this.todos$ = todoService.getAll();
    this.todos$.subscribe((res: Todo[]) => {
      this.todos = res;
      this.todosShown = res;
    })
  }

  searchMethod(){
    let newArray: Todo[] = [];
    for(let i = 0; i < this.todos.length; i++) {
      if(this.todos[i].task.toLowerCase().includes(this.inputText.toLowerCase())){
        newArray.push(this.todos[i]);
      }
    }
    this.todosShown = newArray;
  }

  deleteMethod(todo: Todo){
    this.reloadingTodos = true;
    this.todoService.remove(todo.id)
    .pipe(timeout(5000), catchError(err => {
      // Timeout managing
      this.errorMessage = 'Operation timed out. Please try again.';
      this.reloadingTodos = false;
      throw err;
    }))
    .subscribe({
      next: () => {
        // Deletion successful
        this.todoService.getAll().subscribe((res: Todo[]) => {
          this.todos = res;
          this.searchMethod();
          this.errorMessage = '';
          this.reloadingTodos = false;
        })
      },
      error: () => {
        // Error managing
        this.errorMessage = `Failed to remove task "${todo.task}". Please try again.`;
        this.reloadingTodos = false;
      }
    })
  }
}
