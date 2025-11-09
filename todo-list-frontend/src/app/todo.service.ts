import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";

export interface Todo {
  id: number;
  task: string;
  priority: 1 | 2 | 3;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = '/api/todos/';

  constructor(private httpClient: HttpClient){
    
  }

  getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.apiUrl).pipe(delay(2000));
  }

  remove(id: number): Observable<void> {

    return new Observable<void>((observer) => {
      setTimeout(() => {
        if (Math.random() < 0.8) {                      // 80% chance success
          this.httpClient.delete<void>(`${this.apiUrl}${id}`).subscribe({
            next: () => {
              observer.next();                          // Success
              observer.complete();                      // Obsevable complete
            },
            error: (err) => {
              observer.error(err);                      // Forward the Backend error
            },
          });
        } else {
          observer.error('Simulated failure');          // Simulated failure
        }
      }, 2000);                                         // 2 seconds timeout
    });

  }
}
