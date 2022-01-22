import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
import { useMutation, useQuery } from '@apollo/client';
//
import { GET_ROLE_NAMES } from '../../utils/gql/queries/employeeQueries';
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
      const response = await useQuery(GET_ROLE_NAMES);
      dispatch(slice.actions.getRolesSuccess(response.data.roles));
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  };
}
