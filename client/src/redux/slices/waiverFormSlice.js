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
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedAvatar(state, action) {
      state.selectedAvatar = action.payload;
      state.isOpenModal = false;
    },
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
    }
  },
});

export default slice.reducer

export const { startLoading, hasError, openModal, closeModal, setSelectedAvatar } = slice.actions;

// ----------------------------------------------------------------------

export function getRoles() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/employees/roles")
      dispatch(slice.actions.getRolesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}
export function getLocations() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/locations")
      dispatch(slice.actions.getLocationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}
