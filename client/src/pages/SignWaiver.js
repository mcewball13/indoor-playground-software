// @mui
import { Box, Container, DialogTitle, Grid } from '@mui/material';
import { capitalCase, paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// dompurify
import DOMPurify from 'dompurify';
// components
import Page from '../components/Page';
import { DialogAnimate } from '../components/animate';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Avatar from '../components/Avatar';
import Image from '../components/Image';
// hooks
import useSettings from '../hooks/useSettings';
// utils
import { openModal, setSelectedAvatar, closeModal } from '../redux/slices/waiverFormSlice';
import { useDispatch, useSelector } from '../redux/store';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// sections
import UserWaiverForm from '../sections/@dashboard/user/UserWaiverForm';
// slices
// _mock_
import { _userList } from '../_mock';
// avatars
import avatars from '../assets/avatars';

import { waiverText } from './tempWaiverText';

// ----------------------------------------------------------------------

const safeHTML = DOMPurify.sanitize(waiverText.content);


export default function SignWaiver() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const isEdit = pathname.includes('edit');
  const currentUser = _userList.find((user) => paramCase(user.id) === id);

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
    setMappedAvatars(avatars)
  }, []);
  

  return (
    <Page title="User: Sign Waiver">
      <div dangerouslySetInnerHTML={{__html: safeHTML}}/>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Sign Waiver' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New user' : capitalCase("name") },
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
      <DialogAnimate maxWidthMUI="lg" open={isOpenModal} onClose={handleCloseModal}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <DialogTitle>Select an avatar</DialogTitle>
            </Grid>
            {mappedAvatars.map((avatar) => (
              <Grid
                sx={{ '&:hover': { opacity: 0.72 } }}
                onClick={() => handleSelectAvatar(avatar)}
                item
                xs={6}
                sm={3}
                md={2}
                key={avatar}
              >
                <Image src={avatar} ratio="1/1" disabledEffect alt={avatar} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogAnimate>
    </Page>
  );
}
