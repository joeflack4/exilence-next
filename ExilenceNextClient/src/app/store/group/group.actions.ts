import { Action } from '@ngrx/store';


export enum GroupActionTypes {
  SetName = '[Group] Set Name',
  SetNameSuccess = '[Group] Set Name Success',
  SetNameFail = '[Group] Set Name Fail',
}

export class SetName implements Action {
  readonly type = GroupActionTypes.SetName;

  constructor(public payload: { name: string }) { }
}

export class SetNameSuccess implements Action {
  readonly type = GroupActionTypes.SetNameSuccess;
  constructor(public payload: { name: string }) { }
}

export class SetNameFail implements Action {
  readonly type = GroupActionTypes.SetNameFail;
  constructor(public payload: { title: string, message: string }) { }
}

export type GroupActions = SetName | SetNameSuccess | SetNameFail;
