'use client';

import { createContext } from 'react';
//
import { Auth0ContextType } from '../jwt/user/types';

// ----------------------------------------------------------------------

export const AuthContext = createContext({} as Auth0ContextType);
