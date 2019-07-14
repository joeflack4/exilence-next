import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { JsonService } from '../../core/providers/json.service';
import { NotificationType } from '../../shared/enums/notification-type.enum';
import { Notification } from './../../shared/interfaces/notification.interface';
import * as notificationActions from './../notification/notification.actions';
import * as groupActions from './group.actions';


@Injectable()
export class GroupEffects {

  constructor(
    private actions$: Actions,
    private jsonService: JsonService
  ) { }

  patch$ = createEffect(() => this.actions$.pipe(
    ofType(groupActions.GroupActionTypes.Patch),
    mergeMap((res: any) =>
      this.jsonService.patch(res.payload.operations)
        .pipe(
          map(() => {
            return new groupActions.PatchSuccess();
          }),
          catchError(() => of(
            new groupActions.PatchFail(
              { title: 'ERROR.COULD_NOT_PATCH_TITLE', message: 'ERROR.COULD_NOT_PATCH_DESC' })))
        ))
  ),
  );

  patchFail$ = createEffect(() => this.actions$.pipe(
    ofType(groupActions.GroupActionTypes.PatchFail),
    map((res: any) => new notificationActions.AddNotification({
      notification:
        {
          title: res.payload.title,
          description: res.payload.message,
          type: NotificationType.Error
        } as Notification
    }))
  ));


}


