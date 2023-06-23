'use client';

// components
import { SplashScreen } from '../../../../components/loading-screen';
// context
import { CustomerAuthContext } from './customer-auth-context';

//  -----------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function CustomerAuthConsumer({ children }: Props) {
  return (
    <CustomerAuthContext.Consumer>
      {(auth) => (auth.loading ? <SplashScreen /> : children)}
    </CustomerAuthContext.Consumer>
  );
}
