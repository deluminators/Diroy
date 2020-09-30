import AsyncStorage from '@react-native-community/async-storage';
import {LINK} from '../../assets/config';
import axios from 'axios';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';

let timer;

export const signup = (
  email,
  password,
  passwordConfirm,
  name,
  mobile,
  budgetStart,
  budgetEnd,
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${LINK}/users/signup`,

        {
          email: email,
          password: password,
          name: name,
          mobile: mobile,
          passwordConfirmation: passwordConfirm,
          budgetStart: budgetStart,
          budgetEnd: budgetEnd,
        },
      );

      const resData = response.data;
      dispatch(authenticate(resData.user, resData.token, resData.expiresIn));
      const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
      saveDataToStorage(resData.token, resData.user, expirationDate);
    } catch (er) {
      throw new Error(er.response.data.message);
    }
  };
};

export const googleLogin = (idToken) => {
  return async (dispatch) => {
    const response = await axios.post(`${LINK}/users/login`, {
      method: 'google',
      idToken,
    });
    const resData = response.data;
    dispatch(authenticate(resData.user, resData.token, resData.expiresIn));
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
    saveDataToStorage(resData.token, resData.user, expirationDate);
  };
};

export const facebookLogin = (accessToken) => {
  return async (dispatch) => {
    const response = await axios.post(`${LINK}/users/login`, {
      method: 'facebook',
      accessToken,
    });
    const resData = response.data;
    dispatch(authenticate(resData.user, resData.token, resData.expiresIn));
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
    saveDataToStorage(resData.token, resData.user, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${LINK}/users/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const resData = response.data;
    dispatch(authenticate(resData.user, resData.token, resData.expiresIn));
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
    saveDataToStorage(resData.token, resData.user, expirationDate);
  };
};

export const authenticate = (user, token, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      user: user,
      token: token,
      expirationDate: expiryTime,
    });
  };
};

const saveDataToStorage = (token, user, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      user: user,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};

export const updateUser = (user) => {
  return {type: UPDATE_USER, user};
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
