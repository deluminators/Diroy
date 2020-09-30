import {
  SET_DESTINATION_LOCATION,
  SET_PICKUP_LOCATION,
  SET_TRANSPORTATION_MODE,
  CLEAR_LOCATION,
  SET_GROUP,
  RESET_GROUP,
} from '../actions/location';

const initialState = {
  pickup: null,
  destination: null,
  mode: null,
  groupId: null,
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PICKUP_LOCATION:
      return Object.assign({}, state, {pickup: action.location});
    case SET_DESTINATION_LOCATION:
      return Object.assign({}, state, {destination: action.location});
    case SET_TRANSPORTATION_MODE:
      return Object.assign({}, state, {mode: action.mode});
    case CLEAR_LOCATION:
      return initialState;
    case SET_GROUP:
      return Object.assign({}, state, {groupId: action.id});
    case RESET_GROUP:
      return Object.assign({}, state, {groupId: null});
    default:
      return state;
  }
};
