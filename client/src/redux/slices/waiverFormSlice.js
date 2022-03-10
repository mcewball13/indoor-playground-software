import { createSlice } from '@reduxjs/toolkit';

// utils
import axios from 'axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  isOpenModal: false,
  selectedAvatar: null,
  roles: [],
  locations: [],
  customers: [],
  currentCustomer: {},
  emailExists: false,
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: 'newWaiverForm',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSelectedAvatar(state, action) {
      state.selectedAvatar = action.payload;
      state.isOpenModal = false;
    },
    createNewCustomerSuccess(state, action) {
      const newCustomer = action.payload;
      state.currentCustomer = newCustomer;
      state.selectedAvatar = null;
      state.isLoading = false;
    },
    checkEmailSuccess(state, action) {
      state.emailExists = true;
      state.currentCustomer = action.payload;
      state.isLoading = false;
    },
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
    },
  },
});

export default slice.reducer;

export const { startLoading, hasError, openModal, closeModal, setSelectedAvatar, currentCustomer } = slice.actions;

// ----------------------------------------------------------------------

export function getRoles() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/employees/roles');
      dispatch(slice.actions.getRolesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getLocations() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/locations');
      dispatch(slice.actions.getLocationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function createNewCustomer(newCustomer) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/customers', newCustomer);
      console.log(response.data)
      dispatch(slice.actions.createNewCustomerSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
// check to see if email is in the database
export function checkEmail(email) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/customers/email/${email}`);
      dispatch(slice.actions.checkEmailSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
