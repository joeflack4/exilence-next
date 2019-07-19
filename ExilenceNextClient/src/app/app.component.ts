import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { skip, distinctUntilChanged } from 'rxjs/operators';

import { AppState, ApplicationState } from './app.states';
import { SnapshotProgressSnackbarComponent } from './core/components/snapshot-progress-snackbar/snapshot-progress-snackbar.component';
import { ElectronService } from './core/providers/electron.service';
import { JsonService } from './core/providers/json.service';
import { StorageService } from './core/providers/storage.service';
import { BrowserHelper } from './shared/helpers/browser.helper';
import * as applicationActions from './store/application/application.actions';
import { ofType, Actions } from '@ngrx/effects';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { getApplicationState } from './store/application/application.selectors';
import { GithubService } from './core/providers/github.service';
import { GithubRelease } from './shared/interfaces/github/github-release.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  latestVersion: string;
  @ViewChild('progressSnackbar', undefined) progressSnackbar: SnapshotProgressSnackbarComponent;

  constructor(public electronService: ElectronService,
    private storageMap: StorageMap,
    private translate: TranslateService,
    private appStore: Store<ApplicationState>,
    private githubService: GithubService,
    private jsonService: JsonService,
    private storageService: StorageService,
    private actions$: Actions
  ) {

    // this.jsonService.testJsonPatch();

    this.translate.setDefaultLang('en');

    if (electronService.isElectron()) {
      moment.locale(this.electronService.remote.app.getLocale());
    } else {
      moment.locale(BrowserHelper.getBrowserLang());
    }

    // load state from storage
    this.appStore.dispatch(new applicationActions.LoadStateFromStorage());

    // save state to storage on changes
    this.appStore.select(getApplicationState)
      .pipe(distinctUntilChanged(), skip(1)).takeUntil(this.destroy$).subscribe((state: ApplicationState) => {
        this.storageMap.set('appState', state).takeUntil(this.destroy$).subscribe();
      });

    setTimeout(() => {
      setInterval(() => this.checkForNewRelease(), 1000 * 60 * 2); // check every two min
    }, 1000 * 60);
  }

  ngOnInit() {
    this.progressSnackbar.openSnackBar();
  }

  checkForNewRelease() {
    if (this.electronService.isElectron()) {
      this.githubService.getLatestRelease().takeUntil(this.destroy$).subscribe((release: GithubRelease) => {
        console.log('Release found: ', release.name);
        this.latestVersion = release.name;
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
