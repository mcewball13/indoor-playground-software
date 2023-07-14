'use client';

import { useContext } from 'react';
//
import { CustomerAuthContext } from '../context/jwt/customer/customer-auth-context';
// import { AuthContext } from '../context/auth0/auth-context';
// import { AuthContext } from '../context/amplify/auth-context';
// import { AuthContext } from '../context/firebase/auth-context';

// ----------------------------------------------------------------------

export const useCustomerAuthContext = () => {
  const context = useContext(CustomerAuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
