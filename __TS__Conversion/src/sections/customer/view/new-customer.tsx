// @mui
import { Box, Container, Dialog, DialogTitle, Grid } from '@mui/material';
import { capitalCase, paramCase } from 'change-case';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Image from '../../../components/image';
// hooks

// utils
import { closeModal, setSelectedAvatar } from '../../redux/slices/waiverFormSlice';
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// sections
import UserWaiverForm from '../../sections/@dashboard/user/UserWaiverForm';
// slices
// _mock_
import { _userList } from '../../_mock';
// avatars
import avatars from '../../assets/avatars';

// ----------------------------------------------------------------------

export default function NewCustomer() {
  const dispatch = useDispatch();
  const { pathname, query } = useRouter();
  const { name = '' } = query;
  const isEdit = pathname.includes('edit');
  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  // state for callapse component for add child
  const [minorDrawerOpen, setMinorDrawerOpen] = useState(false);
  const [mappedAvatars, setMappedAvatars] = useState([]);

  const { isOpenModal } = useSelector((state) => state.newWaiverForm);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleSelectAvatar = (avatar) => {
    dispatch(setSelectedAvatar(avatar));
  };

  useEffect(() => {
    setMappedAvatars(avatars);
  }, []);

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading={!isEdit ? 'Create a new account' : 'Edit user'}
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
      <Dialog open={isOpenModal} onClose={handleCloseModal}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <DialogTitle>Select an avatar</DialogTitle>
            </Grid>
            {mappedAvatars.map(({ src: url }) => (
              <Grid
                sx={{ '&:hover': { opacity: 0.72 } }}
                onClick={() => handleSelectAvatar(url)}
                item
                xs={6}
                sm={3}
                md={2}
                key={url}
              >
                <Image src={url} ratio="1/1" disabledEffect alt={url} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Dialog>
    </>
  );
}
