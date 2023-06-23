
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

export type AuthCustomerType = null | Record<string, any>;

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