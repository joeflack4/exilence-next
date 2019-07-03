import { Action } from '@ngrx/store';
import { NetWorthState } from '../../app.states';
import { Tab } from '../../shared/interfaces/stash.interface';
import { ApplicationSessionDetails } from '../../shared/interfaces/application-session-details.interface';
import { PricedItem } from '../../shared/interfaces/priced-item.interface';
import { ExternalPrice } from '../../shared/interfaces/external-price.interface';

export enum NetWorthActionTypes {
  LoadStateFromStorage = '[NetWorth] Load State From Storage',
  LoadStateFromStorageSuccess = '[NetWorth] Load State From Storage Success',
  LoadStateFromStorageFail = '[NetWorth] Load State From Storage Fail',
  OverrideState = '[NetWorth] Override State',
  UpdateTabSelection = '[NetWorth] Update TabSelection',
  FetchItemsForSnapshot = '[NetWorth] Fetch Items For Snapshot',
  FetchItemsForSnapshotSuccess = '[NetWorth] Fetch Items For Snapshot Success',
  FetchItemsForSnapshotFail = '[NetWorth] Fetch Items For Snapshot Fail',
  FetchPrices = '[NetWorth] Fetch Prices',
  FetchPricesSuccess = '[NetWorth] Fetch Prices Success',
  FetchPricesFail = '[NetWorth] Fetch Prices Fail',
  PriceItemsForSnapshot = '[NetWorth] Price Items For Snapshot',
  PriceItemsForSnapshotSuccess = '[NetWorth] Price Items For Snapshot Success',
  PriceItemsForSnapshotFail = '[NetWorth] Price Items For Snapshot Fail',
  AddTabs = '[NetWorth] Add Tabs',
  FetchTabs = '[NetWorth] Fetch Tabs',
  FetchTabsSuccess = '[NetWorth] Fetch Tabs Success',
  FetchTabsFail = '[NetWorth] Fetch Tabs Fail',
}

export class LoadStateFromStorage implements Action {
  readonly type = NetWorthActionTypes.LoadStateFromStorage;
  constructor() { }
}

export class LoadStateFromStorageSuccess implements Action {
  readonly type = NetWorthActionTypes.LoadStateFromStorageSuccess;
  constructor() { }
}

export class LoadStateFromStorageFail implements Action {
  readonly type = NetWorthActionTypes.LoadStateFromStorageFail;
  constructor(public payload: { title: string, message: string }) { }
}

export class OverrideState implements Action {
  readonly type = NetWorthActionTypes.OverrideState;

  constructor(public payload: { state: NetWorthState }) { }
}
export class FetchTabs implements Action {
  readonly type = NetWorthActionTypes.FetchTabs;

  constructor(public payload: { accountDetails: ApplicationSessionDetails, league: string, tabs: Tab[] }) { }
}

export class FetchTabsSuccess implements Action {
  readonly type = NetWorthActionTypes.FetchTabsSuccess;
  constructor(public payload: { accountDetails: ApplicationSessionDetails, tabs: Tab[] }) { }
}

export class FetchTabsFail implements Action {
  readonly type = NetWorthActionTypes.FetchTabsFail;
  constructor(public payload: { title: string, message: string }) { }
}

export class AddTabs implements Action {
  readonly type = NetWorthActionTypes.AddTabs;
  constructor(public payload: { tabs: Tab[] }) { }
}

export class UpdateTabSelection implements Action {
  readonly type = NetWorthActionTypes.UpdateTabSelection;
  constructor(public payload: { tabs: string[] }) { }
}

export class FetchItemsForSnapshot implements Action {
  readonly type = NetWorthActionTypes.FetchItemsForSnapshot;
  constructor(public payload: { tabs: Tab[] }) { }
}

export class FetchItemsForSnapshotSuccess implements Action {
  readonly type = NetWorthActionTypes.FetchItemsForSnapshotSuccess;
  constructor(public payload: { tabs: Tab[] }) { }
}

export class FetchItemsForSnapshotFail implements Action {
  readonly type = NetWorthActionTypes.FetchItemsForSnapshotFail;
  constructor(public payload: { title: string, message: string }) { }
}

export class PriceItemsForSnapshot implements Action {
  readonly type = NetWorthActionTypes.PriceItemsForSnapshot;
  constructor(public payload: { tabs: Tab[] }) { }
}

export class PriceItemsForSnapshotSuccess implements Action {
  readonly type = NetWorthActionTypes.PriceItemsForSnapshotSuccess;
  constructor() { }
}

export class PriceItemsForSnapshotFail implements Action {
  readonly type = NetWorthActionTypes.PriceItemsForSnapshotFail;
  constructor(public payload: { error: string }) { }
}

export class FetchPrices implements Action {
  readonly type = NetWorthActionTypes.FetchPrices;
  constructor() { }
}

export class FetchPricesSuccess implements Action {
  readonly type = NetWorthActionTypes.FetchPricesSuccess;
  constructor(public payload: { prices: ExternalPrice[] }) { }
}

export class FetchPricesFail implements Action {
  readonly type = NetWorthActionTypes.FetchPricesFail;
  constructor(public payload: { error: string }) { }
}

export type NetWorthActions =
  OverrideState |
  LoadStateFromStorage | LoadStateFromStorageSuccess | LoadStateFromStorageFail |
  AddTabs |
  PriceItemsForSnapshot | PriceItemsForSnapshotSuccess | PriceItemsForSnapshotFail |
  FetchItemsForSnapshot | FetchItemsForSnapshotSuccess | FetchItemsForSnapshotFail |
  FetchPrices | FetchPricesSuccess | FetchPricesFail |
  UpdateTabSelection;
