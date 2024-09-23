import { Component, OnInit } from '@angular/core'
// import { Todo } from './todo.model'
import { FormsModule } from '@angular/forms'
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'
// import { TodoService } from './todo.service'
import { JsonPipe } from '@angular/common'
import { TodoItemsService as TodoService } from '../api/api/todoItems.service'
import { TodoItem } from '../api'
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  todos: TodoItem[] = []
  newTodoTitle: string = ''
  nextId: number = 1
  errorMessage: string = ''
  loading: boolean = false

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loading = true
    this.getTodos()
  }

  getTodos() {
    this.todoService.apiTodoItemsGet().pipe(
      catchError((error) => {
        console.error('Error fetching todos:', error)
        this.errorMessage = 'Failed to load todos. Please try again later.'
        return of([])
      })
    )
  }

  addTodo() {
    this.todoService
      .apiTodoItemsPost({
        name: this.newTodoTitle,
        isComplete: false
      })
      .subscribe(() => {
        this.getTodos()
        this.newTodoTitle = ''
      })
  }

  deleteTodo(id: string) {
    this.todoService.apiTodoItemsIdDelete(id).subscribe(() => {
      this.getTodos()
    })
  }

  toggleComplete(todo: TodoItem) {
    const updatedTodo = { ...todo, isComplete: !todo.isComplete }
    this.todoService.apiTodoItemsIdPut(updatedTodo.id ?? '', updatedTodo).subscribe(() => {
      this.getTodos()
    })
  }
}
