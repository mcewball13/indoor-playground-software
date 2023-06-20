'use client';

import { useCallback, useEffect, useMemo, useReducer } from 'react';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';

import { CustomerAuthContext } from './customer-auth-context';
import { isValidToken, setSession } from '../utils';
import { ActionMapTypeCustomer, AuthStateTypeCustomer, AuthCustomerType } from './types';

enum CustomerTypes {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [CustomerTypes.INITIAL]: {
    customer: AuthCustomerType;
  };
  [CustomerTypes.LOGIN]: {
    customer: AuthCustomerType;
  };
  [CustomerTypes.REGISTER]: {
    customer: AuthCustomerType;
  };
  [CustomerTypes.LOGOUT]: undefined;
};

type ActionsType = ActionMapTypeCustomer<Payload>[keyof ActionMapTypeCustomer<Payload>];

const initialState: AuthStateTypeCustomer = {
  customer: null,
  loading: true,
};

const reducer = (state: AuthStateTypeCustomer, action: ActionsType) => {
  if (action.type === CustomerTypes.INITIAL) {
    return {
      loading: false,
      customer: action.payload.customer,
    };
  }
  if (action.type === CustomerTypes.LOGIN) {
    return {
      ...state,
      customer: action.payload.customer,
    };
  }
  if (action.type === CustomerTypes.REGISTER) {
    return {
      ...state,
      customer: action.payload.customer,
    };
  }
  if (action.type === CustomerTypes.LOGOUT) {
    return {
      ...state,
      customer: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const CUSTOMER_STORAGE_KEY = 'customerAcceeToken';

type Props = {
  children: React.ReactNode;
};

export default function CustomerAuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const customerAccessToken = sessionStorage.getItem(CUSTOMER_STORAGE_KEY);

      if (customerAccessToken && isValidToken(customerAccessToken)) {
        setSession(customerAccessToken);

        const response = await axios.get(API_ENDPOINTS.auth.me);

        dispatch({
          type: CustomerTypes.INITIAL,
          payload: { customer: response.data.customer },
        });
      } else {
        dispatch({ type: CustomerTypes.LOGOUT });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: CustomerTypes.LOGOUT });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // TODO: Add API call
        const response = await axios.post(API_ENDPOINTS.auth.login, {
          email,
          password,
        });

        const { customer, accessToken } = response.data;

        setSession(accessToken);

        dispatch({
          type: CustomerTypes.LOGIN,
          payload: { customer },
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (email, password, firstName, lastName) => {
      try {
        const response = await axios.post(API_ENDPOINTS.auth.register, {
          email,
          password,
          firstName,
          lastName,
        });

        const { customer, accessToken } = response.data;

        setSession(accessToken);

        dispatch({
          type: CustomerTypes.REGISTER,
          payload: { customer },
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    setSession(null);
    dispatch({ type: CustomerTypes.LOGOUT });
  }, [dispatch]);

  const value = useMemo(
    () => ({
      ...state,
      login,
      register,
      logout,
    }),
    [state, login, register, logout]
  );

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}
