'use client';

import { createContext } from 'react';

import { CustomerJWTContextType } './types'

// ----------------------------------------------------------------------

export const CustomerAuthContext = createContext({} as CustomerJWTContextType);
