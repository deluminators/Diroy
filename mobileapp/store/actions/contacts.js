export const ADD_CONTACTS = 'ADD_CONTACTS';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const ADD_DEVICES = 'ADD_DEVICES';

export const addContacts = (contact) => {
  return {
    type: ADD_CONTACTS,
    contact,
  };
};

export const removeContact = (number) => {
  return {
    type: REMOVE_CONTACT,
    number,
  };
};

export const addDevices = (devices) => {
  return {
    type: ADD_DEVICES,
    devices,
  };
};
