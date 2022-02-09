// @mui
import { Container, DialogTitle } from '@mui/material';
import { capitalCase, paramCase } from 'change-case';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// components
import Page from '../../components/Page';
// hooks
import useSettings from '../../hooks/useSettings';
// utils
import { openModal, setSelectedAvatar, closeModal } from '../../redux/slices/waiverFormSlice';
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// sections
import UserWaiverForm from '../../sections/@dashboard/user/UserWaiverForm';
// slices
// _mock_
import { _userList } from '../../_mock';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const isEdit = pathname.includes('edit');
  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  // state for callapse component for add child
  const [minorDrawerOpen, setMinorDrawerOpen] = useState(false);

  const { isOpenModal } = useSelector((state) => state.newWaiverForm);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

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

        <UserWaiverForm
          isEdit={isEdit}
          currentUser={currentUser}
          isOpen={minorDrawerOpen}
          onOpen={() => setMinorDrawerOpen(!minorDrawerOpen)}
          onCancel={() => setMinorDrawerOpen(false)}
        />
      </Container>
      <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>Select an avatar</DialogTitle>
      </DialogAnimate>
    </Page>
  );
}
