import React from 'react';
import {Provider} from 'react-redux';
import {locationReducer} from './store/reducers/location';
import {contactsReducer} from './store/reducers/contacts';
import ReduxThunk from 'redux-thunk';
import Navigator from './navigator/navigator';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import authReducer from './store/reducers/auth';
const rootReducer = combineReducers({
  location: locationReducer,
  auth: authReducer,
  contacts: contactsReducer,
  // deliveryLocation: deliveryLocationReducers,
  // interaction: ineractionReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};
export default App;
