import { Component, OnInit } from '@angular/core'
import { Todo } from './todo.model'
import { FormsModule } from '@angular/forms'
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { TodoService } from './todo.service'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  todos: Todo[] = []
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
    this.todoService
      .fetchTodos()
      .pipe(
        catchError((error) => {
          console.error('Error fetching todos:', error)
          this.errorMessage = 'Failed to load todos. Please try again later.'
          return of([])
        })
      )
      .subscribe((data) => {
        this.todos = data
        this.loading = false
      })
  }

  addTodo() {
    this.todoService
      .addTodo({
        name: this.newTodoTitle,
        isComplete: false
      })
      .subscribe(() => {
        this.getTodos()
        this.newTodoTitle = ''
      })
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.getTodos()
    })
  }

  toggleComplete(todo: Todo) {
    const updatedTodo = { ...todo, isComplete: !todo.isComplete }
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.getTodos()
    })
  }
}
