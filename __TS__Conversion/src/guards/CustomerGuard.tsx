import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';// hooks
import useAuth from '../hooks/useAuth';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_PAGE } from '../routes/paths';

// ----------------------------------------------------------------------

type Props = {
    children: ReactNode;
};

export default function CustomerGuard({ children }: Props) {
  const { isCustomerAuthenticated, isInitialized } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      // ? is this right? navigate to requested location?
      console.log('navigating to requested location');
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isCustomerAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(null);
    }
    push(PATH_PAGE.signWaiver);
  }

  return <>{children}</>;
}

// * once they fill out info and submit they will be sent to the signWaiver page
// ? What happens when they go back to the previous page to edit/update?
