import { createSlice } from '@reduxjs/toolkit';

// utils
import axios from 'axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  roles: [],
  locations: [],
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: 'newUserForm',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getRolesSuccess(state, action) {
      state.isLoading = false;
      state.roles = action.payload;
    },
    getLocationsSuccess(state, action) {
      state.isLoading = false;
      state.locations = action.payload;
    },
  },
});

export default slice.reducer

export const { startLoading, hasError, getRolesSuccess, getLocationsSuccess } = slice.actions;

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
