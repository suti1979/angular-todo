import { Injectable, signal, WritableSignal } from '@angular/core'
import * as signalR from '@microsoft/signalr'
import { environment } from '../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class HubService {
  private hubConnection!: signalR.HubConnection
  public dataUpdated: WritableSignal<'ADDRESS' | 'COURIER' | null> = signal(null)

  constructor() {
    this.startConnection()
    this.recieveMessage()
    this.addRefreshDataListener()
  }

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chathub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build()

    this.hubConnection.start().catch((err) => console.error(err))
  }

  recieveMessage(): void {
    this.hubConnection.on('ReceiveMessage', (user, message) => {
      console.log(`User: ${user}, Message: ${message}`)
    })
  }

  sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message).catch((err) => console.error(err))
  }

  private addRefreshDataListener() {
    this.hubConnection.on('RefreshData', (data) => {
      this.dataUpdated.set(data)
      console.log('RefreshData', this.dataUpdated())
    })
  }
}
