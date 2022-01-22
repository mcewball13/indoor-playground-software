import { useEffect } from 'react';
import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// utils
import { useMutation, useQuery } from '@apollo/client';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import {dispatch} from "../../redux/store"
// gql
import { GET_ROLE_NAMES } from "../../utils/gql/queries/employeeQueries";
// slices
import { startLoading, hasError, getRolesSuccess, getLocationsSuccess } from "../../redux/slices/userForm"
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UserNewForm from '../../sections/@dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const isEdit = pathname.includes('edit');
  const {loading, data, error} = useQuery(GET_ROLE_NAMES);
  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  useEffect(() => {
    if (loading) {
      dispatch(startLoading());

    } 
    if (data) {
      dispatch(getRolesSuccess(data.getRoles));
    } 
    if (error) {
      dispatch(hasError(error));
    }
  }, [dispatch, loading, data, error]);
  


      // try {
      // } catch (error) {
      //   console.log(error)
      //   dispatch(hasError(error))
      // }
  

  return (
    <Page title="User: Create a new user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new user' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New user' : capitalCase(name) },
          ]}
        />

        <UserNewForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
