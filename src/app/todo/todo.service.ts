import { effect, inject, Injectable, signal } from '@angular/core'
import { Todo } from './todo.model'
import { HubService } from '../services/hub.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([])

  private hubService = inject(HubService)
  private httpClient = inject(HttpClient)

  constructor() {
    this.loadTodos()

    effect(() => {
      if (this.hubService.dataUpdated()?.includes('COURIER')) {
        console.log('COURIER update')
        this.loadTodos()
      }
    })
  }

  getTodos = this.todos.asReadonly()

  loadTodos() {
    this.httpClient.get<Todo[]>(`${environment.apiUrl}/api/TodoItems`).subscribe((todos) => {
      this.todos.set(todos)
    })
  }

  addTodo(todo: string) {
    const newTodo = { name: todo, isComplete: false }
    this.httpClient.post<Todo>(`${environment.apiUrl}/api/TodoItems`, newTodo).subscribe()
  }

  toggleComplete(todo: Todo) {
    todo.isComplete = !todo.isComplete
    this.httpClient.put<Todo>(`${environment.apiUrl}/api/TodoItems/${todo.id}`, todo).subscribe()
  }

  deleteTodo(id: string) {
    this.httpClient.delete(`${environment.apiUrl}/api/TodoItems/${id}`).subscribe()
  }

  updateTodo(todo: Todo) {
    this.httpClient.put<Todo>(`${environment.apiUrl}/api/TodoItems/${todo.id}`, todo).subscribe()
  }
}
