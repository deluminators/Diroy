import {ADD_CONTACTS, ADD_DEVICES, REMOVE_CONTACT} from '../actions/contacts';

const initialState = {
  contacts: [],
  devices: [],
};

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_CONTACT:
      console.log(action);
      const index = state.contacts.findIndex((el) => {
        console.log(el);
        return el.number == action.number;
      });
      const contact = state.contacts;
      contact.splice(index, 1);
      return Object.assign({}, state, {
        contacts: [...contact],
      });
    case ADD_CONTACTS:
      return Object.assign({}, state, {
        contacts: [action.contact, ...state.contacts],
      });
    case ADD_DEVICES:
      return Object.assign({}, state, {
        devices: [...action.devices, ...state.devices],
      });
    default:
      return state;
  }
};
