import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../../shared/interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient,
  ) { }

  put(player: Player) {
    return this.http.put(
      'https://localhost:44327/api/group',
      player
    );
  }

}
