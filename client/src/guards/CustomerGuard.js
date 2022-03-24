import { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
import UserCreate from '../pages/dashboard/UserCreate';
// routes
import { PATH_PAGE } from '../routes/paths';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

CustomerGuard.propTypes = {
  children: PropTypes.node,
};

export default function CustomerGuard({ children }) {
  const { isCustomerAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isCustomerAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <UserCreate />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    // is this right? navigate to requested location?
    console.log('navigating to requested location');
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}

// once they fill out info and submit they will be sent to the signWaiver page
// What happens when they go back to the previous page to edit/update?
