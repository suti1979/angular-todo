import { effect, Injectable, signal } from '@angular/core'
import { Todo } from './todo.model'

const LOCALSTORAGE_KEY = 'todos-sti'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([])

  constructor() {
    if (localStorage.getItem(LOCALSTORAGE_KEY)) {
      this.todos.set(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]'))
    }

    effect(() => {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.todos()))
    })
  }

  getTodos = this.todos.asReadonly()

  addTodo(todo: string) {
    const newTodo = {
      name: todo,
      isComplete: false,
      id: Date.now().toString()
    }
    this.todos.update((todos) => [...todos, newTodo])
  }

  toggleComplete(todo: Todo) {
    this.todos.update((todos) =>
      todos.map((t) => (t.id === todo.id ? { ...t, isComplete: !t.isComplete } : t))
    )
  }

  deleteTodo(id: string) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id))
  }

  updateTodo(todo: Todo) {
    this.todos.update((todos) => todos.map((t) => (t.id === todo.id ? todo : t)))
  }
}
