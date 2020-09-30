import {AUTHENTICATE, LOGOUT, UPDATE_USER} from '../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
const initialState = {
  token: null,
  user: null,
  expirationDate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        user: action.user,
        expirationDate: action.expirationDate,
      };
    case LOGOUT:
      return {...initialState};
    case UPDATE_USER:
      AsyncStorage.setItem(
        'userData',
        JSON.stringify({
          token: state.token,
          user: action.user,
          expiryDate: state.expirationDate,
        }),
      );
      return Object.assign(state, {user: action.user});
    default:
      return state;
  }
};
