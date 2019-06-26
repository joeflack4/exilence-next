import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as moment from 'moment';
import * as fromAdapter from './notification.adapter';
import { NotificationActions, NotificationActionTypes } from './notification.actions';
import { NotificationsState } from '../../app.states';
import { Guid } from 'guid-typescript';

export const initialState: NotificationsState = fromAdapter.adapter.getInitialState({
  ids: [],
  entities: {}
});

export function reducer(
  state = initialState,
  action: NotificationActions
): NotificationsState {
  switch (action.type) {
    case NotificationActionTypes.AddNotification: {
      action.payload.notification.id = Guid.create();
      action.payload.notification.timestamp = moment();
      return fromAdapter.adapter.addOne(action.payload.notification, state);
    }

    case NotificationActionTypes.DeleteNotification: {
      return fromAdapter.adapter.removeOne(action.payload.id, state);
    }

    case NotificationActionTypes.LoadNotifications: {
      return fromAdapter.adapter.addAll(action.payload.notifications, state);
    }

    case NotificationActionTypes.ClearNotifications: {
      return fromAdapter.adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getNotificationsState = createFeatureSelector<NotificationsState>('notificationsState');
export const selectAllNotifications = createSelector(getNotificationsState, fromAdapter.selectAllNotifications);