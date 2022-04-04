import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isCustomerAuthenticated: false,
  customer: null,
  isInitialized: false,
  user: null,
  existingCustomer: null,
  currentCustomer: {},
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
    const { existingCustomer,  } = action.payload;
    return {
      ...state,
      existingCustomer,
    };
  },
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
  const customerRegister = async (newCustomer) => {
    // change to axios.post when we have a completed backend
    // // =========================================================================
    const response = await axios({
      url: '/api/customers/new',
      method: 'POST',
      baseURL: '/',
      data: newCustomer,
    });
    // const { accessToken, employeeData: user } = response.data;
    // const response = await axios.post('/api/account/new', newCustomer);

    const { accessToken, customer } = response.data;

    // uncomment when we have a completed backend
    // window.localStorage.setItem('accessToken', accessToken);
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
      baseURL: '/',
      data: {
        email,
        password,
      },
    });
    const { accessToken, existingCustomer } = response.data;

    // ========================================================================

    window.localStorage.setItem('accessToken', accessToken);
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
      url: `/api/customers/email-exists/${email}`,
      method: 'GET',
      baseURL: '/',
     
    });
   
    const { exists, customerEmail } = response.data.existingCustomer;

    if (exists) {
      dispatch({
        type: 'CUSTOMER_EXISTS',
        payload: {
          existingCustomer: {exists, customerEmail},
        },
      });
    }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
