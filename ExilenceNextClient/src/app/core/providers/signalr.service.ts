import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection, HubConnectionState } from '@aspnet/signalr';
import { AppConfig } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public _hubConnection: HubConnection | undefined;
  public connectionId = '';

  constructor() {

    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(AppConfig.url + 'hubs/group')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.initHubConnection();
  }

  initHubConnection() {
    if (this._hubConnection.state === HubConnectionState.Disconnected) {
      this._hubConnection.start().then(() => {

        console.log('[SignalR] Successfully established connection!');
        // this.joinParty(this.party.name, this.party.spectatorCode, this.currentPlayer);

        this._hubConnection.invoke('getConnectionId').then(connectionId => this.connectionId = connectionId);

        this._hubConnection.invoke('join', 'development')
          .then(result => console.log('[SignalR] Action: Join, Group: "development", Result: ', result));

      }).catch(() => {
        console.log('[SignalR] Could not connect to signalr');
      });
    }
  }
}
