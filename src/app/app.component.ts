import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TodoComponent } from './todo/todo.component'
import { NotificationComponent } from './notification/notification.component'
import { StuffComponent } from './stuff/stuff.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoComponent, NotificationComponent, StuffComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-todo'
}
