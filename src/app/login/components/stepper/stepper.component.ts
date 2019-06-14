import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

import { Character } from '../../../shared/interfaces/character.interface';
import { League } from '../../../shared/interfaces/league.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  public accountFormGroup: FormGroup;
  public leagueFormGroup: FormGroup;
  public charFormGroup: FormGroup;

  // todo: remove mock data
  public leagues: Array<League> = [{ id: 'test league', description: '' } as League];
  public tradeLeagues: Array<League> = [{ id: 'test league', description: '' } as League];
  public characters: Array<Character> = [{
    name: 'test_char',
    league: 'test league',
    classId: 1,
    ascendancyClass: 1,
    class: 'Witch',
    level: 1
  } as Character];

  @ViewChild('stepper', undefined) stepper: MatStepper;

  constructor(@Inject(FormBuilder) fb: FormBuilder, private router: Router) {
    this.accountFormGroup = fb.group({
      accountName: ['', Validators.required],
      sessionId: ['', Validators.required]
    });
    this.leagueFormGroup = fb.group({
      leagueName: ['', Validators.required],
      tradeLeagueName: ['', Validators.required]
    });
    this.charFormGroup = fb.group({
      characterName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  mapTradeLeague(event: any) {
    console.log(event);
  }

  fetchCharacters() {
    this.stepper.next();
  }

  authorize() {
    this.router.navigate(['/auth/net-worth']);
  }

}