
export type ActionMapTypeCustomer<T extends Record<string, any>> = {
  [Key in keyof T]: T[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: T[Key];
      };
};

export type AuthCustomerType = {
  id: number;
  guardianFirstName: string;
  guardianLastName: string;
  displayName: string;
  birthday: string;
  email: string;
  password: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
  photoURL?: string;
  storedValue?: number;
  notes?: string;
  isAccountOwner: boolean;
  isBanned: boolean;
  minors?: AuthMinorType[];
} | null;

export type AuthMinorType = {
  id: number;
  minorFirstName: string;
  minorLastName: string;
  birthday: string;
};
export type AuthStateTypeCustomer = {
    status?: string;
    loading: boolean;
    customer: AuthCustomerType;
};

// ----------------------------------------------------------------------

export type CustomerJWTContextType = {
    customer: AuthCustomerType;
    method: string;
    loading: boolean;
    authenticated: boolean;
    unauthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    logout: () => Promise<void>;
};