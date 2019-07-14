import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignalrService } from './signalr.service';
import { Operation } from 'fast-json-patch';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(
    private http: HttpClient,
    private signalR: SignalrService
  ) { }

  patch(patch: Operation[]) {
    return this.http.patch(
      'https://localhost:44327/api/group',
      patch,
      { headers: { 'ConnectionId': this.signalR.connectionId } }
    );
  }
}
