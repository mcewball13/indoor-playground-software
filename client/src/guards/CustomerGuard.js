import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_PAGE } from '../routes/paths';

// ----------------------------------------------------------------------

CustomerGuard.propTypes = {
  children: PropTypes.node
};

export default function CustomerGuard({ children }) {
  const { isCustomerAuthenticated } = useAuth();

  if (isCustomerAuthenticated) {
    return <Navigate to={PATH_PAGE.signWaiver} />;
  }

  return <>{children}</>;
}


// once they fill out info and submit they will be sent to the signWaiver page
// What happens when they go back to the previous page to edit/update?