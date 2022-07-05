import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import { ADD_NEW_CUSTOMER, SUBMIT_SIGNED_WAIVER } from '../utils/gql/queries/auth/customerMutations';
import { EMAIL_EXISTS } from '../utils/gql/queries/customerQueries';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isCustomerAuthenticated: false,
  customer: null,
  isInitialized: false,
  user: null,
  existingCustomer: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { employee } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      employee,
    };
  },
  CUSTOMER_REGISTER: (state, action) => {
    const { customer } = action.payload;

    return {
      ...state,
      isCustomerAuthenticated: true,
      customer,
    };
  },
  CUSTOMER_LOGIN: (state, action) => {
    const { customer } = action.payload;

    return {
      ...state,
      isCustomerAuthenticated: true,
      customer,
    };
  },
  CUSTOMER_EXISTS: (state, action) => {
    const { emailExists } = action.payload;
    return {
      ...state,
      existingCustomer: emailExists,
    };
  },
  SUBMIT_SIGNED_WAIVER: (state, action) => {
    const { customer, isCustomerAuthenticated } = action.payload;
    return {
      ...state,
      customer,
      isCustomerAuthenticated,
    };
  },
  SET_EXISTS_NULL: (state) => ({
    ...state,
    existingCustomer: null,
  }),
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  employeeLogin: () => Promise.resolve(),
  customerLogin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  customerRegister: () => Promise.resolve(),
  customerExists: () => Promise.resolve(),
  submitSignedWaiver: () => Promise.resolve(),
  setCustomerExistsNull: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        // eslint-disable-next-line
        const customerAccessToken = window.localStorage.getItem('customerAccessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const employeeLogin = async (email, password) => {
    console.log(email, password);
    // change to axios.post when we have a completed backend
    // // =========================================================================
    // const response = await axios({
    //   url: '/api/employees/login',
    //   method: 'POST',
    //   baseURL: '/',
    //   data: {
    //     email,
    //     password,
    //   },
    // });
    // const { accessToken, employeeData: user } = response.data;

    // ========================================================================
    const response = await axios.post('/api/account/login', {
      email,
      password,
    });
    const { accessToken, user } = response.data;
    // =========================================================================

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const register = async (newEmployee) => {
    const response = await axios.post('/api/account/new', newEmployee);

    const { accessToken, employee } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        employee,
      },
    });
  };
  const customerRegister = async ({ guardians, minors }) => {
    console.log(guardians, minors);
    // change to axios.post when we have a completed backend
    // // =========================================================================
    const response = await axios({
      url: '/graphql',
      method: 'POST',
      baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:3031' : '/',
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
      type: 'CUSTOMER_REGISTER',
      payload: {
        customer,
      },
    });
  };
  const customerLogin = async (email, password) => {
    // change to axios.post when we have a completed backend
    // =========================================================================

    const response = await axios({
      url: '/api/auth/customers/login',
      method: 'POST',
      baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:3031' : '/',
      data: {
        email,
        password,
      },
    });
    const { customerAccessToken, existingCustomer } = response.data;

    // ========================================================================

    window.localStorage.setItem('customerAccessToken', customerAccessToken);
    dispatch({
      type: 'CUSTOMER_LOGIN',
      payload: {
        existingCustomer,
      },
    });
  };

  const customerExists = async (email) => {
    // change to axios.post when we have a completed backend
    // // =========================================================================
    const response = await axios({
      url: `/graphql`,
      method: 'POST',
      baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:3031' : '/',
      data: {
        query: EMAIL_EXISTS,
        variables: {
          email,
        },
      },
    });

    if (response.data.data.emailExists) {
      const { emailExists } = response.data.data;
      console.log('emailExists', emailExists);
      if (emailExists) {
        dispatch({
          type: 'CUSTOMER_EXISTS',
          payload: {
            emailExists,
          },
        });
      }
    }
  };

  const submitSignedWaiver = async ({ signedWaiver, customerId }) => {
    // change to axios.post when we have a completed backend
    // // =========================================================================
    await axios({
      url: `/graphql`,
      method: 'POST',
      baseURL: '/',
      data: { query: SUBMIT_SIGNED_WAIVER, variables: { signedWaiver, customerId } },
    });

    dispatch({
      type: 'SUBMIT_SIGNED_WAIVER',
      payload: {
        customer: null,
        isCustomerAuthenticated: false,
      },
    });
  };
  const setCustomerExistsNull = async () => {
    dispatch({
      type: 'SET_EXISTS_NULL',
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        employeeLogin,
        customerLogin,
        logout,
        register,
        customerRegister,
        customerExists,
        submitSignedWaiver,
        setCustomerExistsNull,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
