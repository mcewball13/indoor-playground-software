'use client';

import { createContext } from 'react';
//
import { AmplifyContextType } from '../jwt/user/types';

// ----------------------------------------------------------------------

export const AuthContext = createContext({} as AmplifyContextType);
