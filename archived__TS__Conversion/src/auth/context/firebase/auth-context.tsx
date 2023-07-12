'use client';

import { createContext } from 'react';
//
import { FirebaseContextType } from '../jwt/user/types';

// ----------------------------------------------------------------------

export const AuthContext = createContext({} as FirebaseContextType);
