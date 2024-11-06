import { Component, effect, inject, signal } from '@angular/core'
import { HubService } from '../services/hub.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.development'

@Component({
  selector: 'app-stuff',
  standalone: true,
  imports: [],
  templateUrl: './stuff.component.html',
  styleUrl: './stuff.component.scss'
})
export class StuffComponent {
  private hubService = inject(HubService)
  private httpClient = inject(HttpClient)

  private stuff = signal<string>('x')
  getStuff = this.stuff.asReadonly()

  constructor() {
    this.loadStuff()

    effect(() => {
      if (this.hubService.dataUpdated()?.includes('STUFF')) {
        console.log('STUFF update')
        this.loadStuff()
      }
    })
  }

  loadStuff() {
    this.httpClient.get<string>(`${environment.apiUrl}/stuff`).subscribe((todos) => {
      this.stuff.set(todos)
    })
  }

  updateStuff(stuff: string) {
    this.httpClient.post<string>(`${environment.apiUrl}/stuff/${stuff}`, {}).subscribe()
  }
}
