'use client';

import { createContext } from 'react';

import { CustomerJWTContextType } from './types'

// ----------------------------------------------------------------------

export const CustomerAuthContext = createContext({} as CustomerJWTContextType);
