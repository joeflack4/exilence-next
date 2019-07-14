import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { compare } from 'fast-json-patch';
import * as moment from 'moment';
import { pairwise, skip, startWith, delay } from 'rxjs/operators';
import { AppState, GroupState } from './app.states';
import { SnapshotProgressSnackbarComponent } from './core/components/snapshot-progress-snackbar/snapshot-progress-snackbar.component';
import { ElectronService } from './core/providers/electron.service';
import { JsonService } from './core/providers/json.service';
import { SignalrService } from './core/providers/signalr.service';
import { StorageService } from './core/providers/storage.service';
import { BrowserHelper } from './shared/helpers/browser.helper';
import * as applicationActions from './store/application/application.actions';
import * as groupActions from './store/group/group.actions';
import { getGroupState } from './store/group/group.selectors';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('progressSnackbar', undefined) progressSnackbar: SnapshotProgressSnackbarComponent;

  constructor(public electronService: ElectronService,
    private storageMap: StorageMap,
    private translate: TranslateService,
    private appStore: Store<AppState>,
    private jsonService: JsonService,
    private storageService: StorageService,
    private signalrService: SignalrService,
    private groupStore: Store<GroupState>
  ) {

    // this.jsonService.testJsonPatch();

    this.translate.setDefaultLang('en');

    if (electronService.isElectron()) {
      moment.locale(this.electronService.remote.app.getLocale());
    } else {
      moment.locale(BrowserHelper.getBrowserLang());
    }

    this.groupStore.dispatch(new groupActions.SetName({ name: 'development' }));

    // load state from storage
    this.appStore.dispatch(new applicationActions.LoadStateFromStorage());

    // save state to storage on changes
    this.appStore.pipe(skip(1)).subscribe((state: AppState) => {
      this.storageMap.set('appState', state.applicationState).subscribe();
    });

    // generate and send patch of differences on updates
    this.groupStore.select(getGroupState).pipe(delay(5000), startWith({}), pairwise()).subscribe((state) => {
      const previousState = state[0] as GroupState;
      const newState = state[1] as GroupState;

      const operations = compare(previousState, newState);

      this.groupStore.dispatch(new groupActions.Patch({ operations }));

    });
  }

  ngOnInit() {
    this.progressSnackbar.openSnackBar();
  }
}
