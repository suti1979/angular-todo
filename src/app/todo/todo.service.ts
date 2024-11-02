import { Injectable, signal } from '@angular/core'
import { Todo } from './todo.model'
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([])

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

// // counter.service.ts
// import { Injectable, signal } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CounterService {
//   // Create a signal to hold the counter state
//   private count = signal(0);

//   // Expose the count as a readonly signal
//   getCount = this.count.asReadonly();

//   increment() {
//     this.count.update(count => count + 1);
//   }

//   decrement() {
//     this.count.update(count => count - 1);
//   }

//   reset() {
//     this.count.set(0);
//   }
// }

// // counter-display.component.ts
// import { Component, inject } from '@angular/core';
// import { CounterService } from './counter.service';

// @Component({
//   selector: 'app-counter-display',
//   standalone: true,
//   template: `
//     <div>
//       <h2>Counter Display</h2>
//       <p>Current Count: {{ counterService.getCount() }}</p>
//     </div>
//   `
// })
// export class CounterDisplayComponent {
//   counterService = inject(CounterService);
// }

// // counter-controls.component.ts
// import { Component, inject } from '@angular/core';
// import { CounterService } from './counter.service';

// @Component({
//   selector: 'app-counter-controls',
//   standalone: true,
//   template: `
//     <div>
//       <h2>Counter Controls</h2>
//       <button (click)="counterService.increment()">Increment</button>
//       <button (click)="counterService.decrement()">Decrement</button>
//       <button (click)="counterService.reset()">Reset</button>
//     </div>
//   `
// })
// export class CounterControlsComponent {
//   counterService = inject(CounterService);
// }

// // app.component.ts
// import { Component } from '@angular/core';
// import { CounterDisplayComponent } from './counter-display.component';
// import { CounterControlsComponent } from './counter-controls.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CounterDisplayComponent, CounterControlsComponent],
//   template: `
//     <h1>Counter App</h1>
//     <app-counter-display></app-counter-display>
//     <app-counter-controls></app-counter-controls>
//   `
// })
// export class AppComponent {}
