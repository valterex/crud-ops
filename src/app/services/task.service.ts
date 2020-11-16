import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private TASKS_URL = 'https://jsonplaceholder.typicode.com/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.TASKS_URL)
      .pipe(catchError(this.handleError<Task[]>([])));
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.TASKS_URL}/${id}`;
    return this.http.get<Task>(url).pipe(catchError(this.handleError<Task>()));
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.TASKS_URL, task, this.httpOptions)
      .pipe(catchError(this.handleError<Task>()));
  }

  updateTask(task: Task): Observable<any> {
    const url = `${this.TASKS_URL}/${task.id}`;

    return this.http
      .patch(url, task, this.httpOptions)
      .pipe(catchError(this.handleError<any>('update task')));
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.TASKS_URL}/${id}`;

    return this.http
      .delete<Task>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Task>()));
  }

  searchTasks(term: string): Observable<Task[]> {
    if (!term.trim()) {
      // if not search term, return empty task array.
      return of([]);
    }

    return this.http
      .get<Task[]>(`${this.TASKS_URL}/?name=${term}`)
      .pipe(catchError(this.handleError<Task[]>([])));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
