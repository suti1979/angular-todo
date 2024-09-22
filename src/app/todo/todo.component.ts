import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  nextId: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.loadTodos();
    this.fetchTodos();
  }

  addTodo() {
    this.todos.push({
      id: this.nextId++,
      title: this.newTodoTitle,
      completed: false,
    });
    this.saveTodos();
    this.newTodoTitle = '';
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  fetchTodos() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos') // Fetch from API
      .subscribe((data) => {
        this.todos = data; // Assign fetched data to todos
      });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveTodos();
  }
}
