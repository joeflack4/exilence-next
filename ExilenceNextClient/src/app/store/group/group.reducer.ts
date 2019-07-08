import { GroupState } from '../../app.states';
import { GroupActions, GroupActionTypes } from './group.actions';
import { initialState } from './group.state';

export function reducer(
  state = initialState,
  action: GroupActions
): GroupState {

  switch (action.type) {
    case GroupActionTypes.SetName: {
      return {
        ...state,
        group: action.payload.name
      };
    }

    default: {
      return state;
    }
  }


}
