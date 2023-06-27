import { createSlice } from '@reduxjs/toolkit';

// utils
import axios from 'axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  isOpenModal: false,
  isOpenModalCustomerExists: false,
  selectedAvatar: null,
  roles: [],
  locations: [],
  customers: [],
  currentCustomer: {},
  emailExists: false,
  resetEmail: '',
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
    setResetEmailSuccess(state, action) {
      state.resetEmail = action.payload;
      state.isLoading = false;
    },
    openModal(state) {
      state.isOpenModal = true;
    },
    openCustomerExistsModal(state) {
      state.isOpenModalCustomerExists = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
    },
    closeCustomerExistsModal(state) {
      state.isOpenModalCustomerExists = false;
    },
  },
});

export default slice.reducer;

export const {
  startLoading,
  hasError,
  openModal,
  closeModal,
  setSelectedAvatar,
  currentCustomer,
  openCustomerExistsModal,
  closeCustomerExistsModal,
} = slice.actions;

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
export function setResetEmail(email) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.setResetEmailSuccess(email));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
