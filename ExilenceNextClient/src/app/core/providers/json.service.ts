import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(
    private http: HttpClient
  ) { }

  patch(patch) {
    return this.http.patch('https://localhost:44327/api/group', patch, { headers: { "ConnectionId": "f7919e96-01d4-48e7-a6f6-89180929c041" } });
  }
}
