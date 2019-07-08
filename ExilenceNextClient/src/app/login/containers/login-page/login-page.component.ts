import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { ApplicationSessionDetails } from '../../../shared/interfaces/application-session-details.interface';
import { ApplicationSession } from '../../../shared/interfaces/application-session.interface';
import { selectApplicationSessionCharacterLeagues, selectApplicationSessionLoading, selectApplicationSessionTradeLeagues, selectApplicationSessionValidated } from '../../../store/application/application.selectors';
import * as applicationActions from './../../../store/application/application.actions';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public leagues$: Observable<string[]>;
  public tradeLeagues$: Observable<string[]>;
  public loading$: Observable<Boolean>;
  public validated$: Observable<Boolean>;

  constructor(
    private router: Router,
    private appStore: Store<ApplicationSession>
  ) {
    this.leagues$ = this.appStore.select(selectApplicationSessionCharacterLeagues).takeUntil(this.destroy$);
    this.tradeLeagues$ = this.appStore.select(selectApplicationSessionTradeLeagues).takeUntil(this.destroy$);
    this.loading$ = this.appStore.select(selectApplicationSessionLoading).takeUntil(this.destroy$);
    this.validated$ = this.appStore.select(selectApplicationSessionValidated).takeUntil(this.destroy$);
  }

  ngOnInit() {
  }

  doLogin(event: ApplicationSession) {
    this.appStore.dispatch(new applicationActions.SetLeague({
      league: event.league
    }));

    this.appStore.dispatch(new applicationActions.SetTradeLeague({
      tradeLeague: event.tradeLeague
    }));

    this.router.navigate(['/auth']);
  }

  doValidate(event: ApplicationSessionDetails) {
    this.appStore.dispatch(new applicationActions.InitSession({
      accountDetails: event
    }));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
