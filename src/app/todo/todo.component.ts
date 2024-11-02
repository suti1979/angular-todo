import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TodoService } from './todo.service'
import { JsonPipe } from '@angular/common'
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './todo.component.html'
})
export class TodoComponent {
  todoService = inject(TodoService)

  newTodoTitle = ''
}
