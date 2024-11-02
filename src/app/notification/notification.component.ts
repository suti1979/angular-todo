import { Component, inject } from '@angular/core'
import { TodoService } from '../todo/todo.service'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  todoService = inject(TodoService)
}
