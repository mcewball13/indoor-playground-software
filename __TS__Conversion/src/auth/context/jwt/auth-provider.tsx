'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { API_ENDPOINTS } from 'src/utils/axios';
//
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, AuthCustomerType } from '../../types';
import { CustomerGuardian, CustomerMinor } from "../../../types/customer"

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  CUSTOMER_REGISTER = 'CUSTOMER_REGISTER',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.CUSTOMER_REGISTER]: {
    customer: AuthCustomerType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
  customer: null,
  isCustomerAuthenticated: false,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.CUSTOMER_REGISTER) {
    const { customer } = action.payload;
    return {
      ...state,
      isCustomerAuthenticated: true,
      customer,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

type CustomerRegisterArgs = {
  guardians: CustomerGuardian;
  minors: CustomerMinor[];
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get(API_ENDPOINTS.auth.me);

        const { user } = response.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const response = await axios.post(API_ENDPOINTS.auth.login, data);

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      const response = await axios.post(API_ENDPOINTS.auth.register, data);

      const { accessToken, user } = response.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      });
    },
    []
  );

  const customerRegister = useCallback(async ({ guardians, minors }: CustomerRegisterArgs) => {
    console.log(guardians, minors);
    // change to axios.post when we have a completed backend
    // // =========================================================================
    const response = await axios({
      url: `/api/graphql/`,
      method: 'POST',
      baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : '/',
      data: {
        query: ADD_NEW_CUSTOMER,

        variables: {
          guardians,
          minors,
        },
      },
    });
    // const { accessToken, employeeData: user } = response.data;
    // const response = await axios.post('/api/account/new', newCustomer);
    console.log('response.data', response.data.data.customerRegister);
    const { customerAccessToken, customer } = response.data.data.customerRegister;
    console.log('customer', customer);
    console.log('customerAccessToken', customerAccessToken);

    // uncomment when we have a completed backend
    window.localStorage.setItem('customerAccessToken', customerAccessToken);
    dispatch({
      type: Types.CUSTOMER_REGISTER,
      payload: {
        customer,
      },
    });
  });

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
      customerRegister,
    }),
    [login, logout, register, customerRegister, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
