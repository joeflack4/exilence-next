import { Action } from '@ngrx/store';
import { Operation } from 'fast-json-patch';


export enum GroupActionTypes {
  SetName = '[Group] Set Name',
  SetNameSuccess = '[Group] Set Name Success',
  SetNameFail = '[Group] Set Name Fail',

  SetConnectionId = '[Group] Set Connection Id',
  SetConnectionIdSuccess = '[Group] Set Connection Id',
  SetConnectionIdFail = '[Group] Set Connection Id',

  Patch = '[Group] Patch',
  Patchuccess = '[Group] Patch Success',
  PatchFail = '[Group] Patch Fail',



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

export class SetConnectionId implements Action {
  readonly type = GroupActionTypes.SetConnectionId;
  constructor(public payload: { connectionId: string }) { }
}

export class SetConnectionIdSuccess implements Action {
  readonly type = GroupActionTypes.SetConnectionIdSuccess;
  constructor(public payload: { connectionId: string }) { }
}

export class SetConnectionIdFail implements Action {
  readonly type = GroupActionTypes.SetConnectionIdFail;
  constructor(public payload: { title: string, message: string }) { }
}

export class Patch implements Action {
  readonly type = GroupActionTypes.Patch;
  constructor(public payload: { operations: Operation[] }) { }
}

export class PatchSuccess implements Action {
  readonly type = GroupActionTypes.Patchuccess;
  constructor() { }
}

export class PatchFail implements Action {
  readonly type = GroupActionTypes.PatchFail;
  constructor(public payload: { title: string, message: string }) { }
}


export type GroupActions =
  SetName | SetNameSuccess | SetNameFail |
  SetConnectionId | SetConnectionIdSuccess | SetConnectionIdFail |
  Patch | PatchSuccess | PatchFail;
