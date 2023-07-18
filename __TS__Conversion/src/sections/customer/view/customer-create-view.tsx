'use client';

import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import DialogTitle from '@mui/material/DialogTitle';
// routes
import { paths } from 'src/routes/paths';
// components
import Image from 'src/components/image';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import UserNewEditForm from '../customer-new-edit-form';
import avatars from 'src/assets/avatars';

// ----------------------------------------------------------------------

type AvatarKey = keyof typeof avatars;

export default function UserCreateView() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  useEffect(() => {
    console.log(selectedAvatar);
  }, [selectedAvatar]);

  const modal = useBoolean();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          { name: 'New user' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm avatar={selectedAvatar} openModal={modal.onTrue} />
      <Dialog maxWidth="lg" open={modal.value} onClose={modal.onFalse}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <DialogTitle>Select an avatar</DialogTitle>
            </Grid>
            {Object.keys(avatars).map((avatar) => {
              const Avatar = avatars[avatar as AvatarKey];
              return (
                <Grid
                  sx={{ '&:hover': { opacity: 0.72 } }}
                  onClick={() => setSelectedAvatar(avatar)}
                  item
                  xs={6}
                  sm={3}
                  md={2}
                  key={avatar}
                >
                  <Image component={Avatar} ratio="1/1" disabledEffect alt={'Avatar Icon'} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Dialog>
    </Container>
  );
}
