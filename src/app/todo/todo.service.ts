import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Todo } from './todo.model'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5224/api/TodoItems'

  constructor(private http: HttpClient) {}

  fetchTodos() {
    return this.http.get<Todo[]>(this.apiUrl)
  }

  addTodo(todo: Omit<Todo, 'id'>) {
    return this.http.post<Omit<Todo, 'id'>>(this.apiUrl, todo)
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updateTodo(todo: Todo) {
    return this.http.put(`${this.apiUrl}/${todo.id}`, todo)
  }
}
