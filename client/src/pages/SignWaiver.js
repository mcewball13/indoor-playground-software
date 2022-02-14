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
  // load initial avatars to state when componenet mounts
  const [mappedAvatars, setMappedAvatars] = useState([]);

  const { isOpenModal } = useSelector((state) => state.newWaiverForm);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleSelectAvatar = (avatar) => {
    dispatch(setSelectedAvatar(avatar));
  };
  // load initial avatars to state when componenet mounts
  useEffect(() => {
    setMappedAvatars(avatars);
  }, []);

  return (
    <Page title="User: Sign Waiver">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Sign Waiver"
          links={[
            { name: 'Edit Account Members', href: `${PATH_DASHBOARD.user}/${id}/edit` },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New user' : capitalCase('name') },
          ]}
        />

        <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
      </Container>
    </Page>
  );
}
