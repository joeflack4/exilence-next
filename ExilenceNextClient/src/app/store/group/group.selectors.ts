import { createFeatureSelector } from '@ngrx/store';
import { GroupState } from '../../app.states';

export const getGroupState = createFeatureSelector<GroupState>('groupState');

