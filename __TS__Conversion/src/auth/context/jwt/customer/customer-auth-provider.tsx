'use client';

import { memo, useCallback, useEffect, useMemo, useReducer } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
import graphQL from 'src/utils/graphql';

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

const CUSTOMER_STORAGE_KEY = 'customerAccessToken';

type Props = {
  children: React.ReactNode;
};

const TEST_CUSTOMER = {
  id: '5e86809283e28b96d2d38537',
  avatarUrl: '#',
  email: 'test@test.com',
  guardianFirstName: 'Test',
  guardianLastName: 'Test',
  phoneNumber: '1234567890',
  displayName: 'Test',
  birthday: '1984-10-10T-5:00',
  street: 'test street',
  city: 'test city',
  state: 'test state',
  zipCode: '12345',
  note: 'test note',
  isAccountOwner: true,
  minors: [
    {
      id: '5e86809283e28b96d2d38537',
      minorFirstName: 'Minor First Test',
      minorLastName: 'Minor Last Test',
      minorBirthday: '2020-10-10T-5:00',
      email: 'test@test.com',
    },
    {
      id: '5e86809283e27c96d2d38537',
      minorFirstName: 'Minor First Test 2',
      minorLastName: 'Minor Last Test 2',
      minorBirthday: '2018-10-10T-5:00',
      email: 'test@test.com',
    },
  ],
};

export function CustomerAuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const customerAccessToken = sessionStorage.getItem(CUSTOMER_STORAGE_KEY);

      if (customerAccessToken && isValidToken(customerAccessToken)) {
        setSession(customerAccessToken);

        const response = await axios.get(endpoints.auth.me);

        dispatch({
          type: CustomerTypes.INITIAL,
          payload: { customer: response.data.customer },
        });
      } else {
        const response = await graphQL.post('/api/graphql', {
          query: `query Query($singleCustomerId: ID!) {
            singleCustomer(id: $singleCustomerId) {
              birthday
              city
              displayName
              email
              id
              minors {
                minorBirthday
                minorFirstName
                minorLastName
              }
              state
              street
              zipCode
            }
          }
          `,
          variables: {
            singleCustomerId: 62,
          },
        });
        console.log("response", response.data.data.singleCustomer);
        dispatch({
          type: CustomerTypes.INITIAL,
          payload: {
            // ! return to null
            customer: { ...TEST_CUSTOMER },
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: CustomerTypes.INITIAL,
        payload: {
          customer: null,
        },
      });
    }
    console.log(initialState);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // TODO Add API call
      const response = await axios.post(endpoints.auth.login, {
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
  }, []);

  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      try {
        const response = await axios.post(endpoints.auth.register, {
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
    []
  );

  const logout = useCallback(async () => {
    setSession(null);
    dispatch({ type: CustomerTypes.LOGOUT });
  }, []);

  const checkAuthenticated = state.customer ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      customer: state.customer,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, register, logout, state.customer, status]
  );

  return (
    <CustomerAuthContext.Provider value={memoizedValue}>{children}</CustomerAuthContext.Provider>
  );
}
