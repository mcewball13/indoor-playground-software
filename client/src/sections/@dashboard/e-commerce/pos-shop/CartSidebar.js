import { Grid, Card, Typography, Stack, Button, IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 8,
}));

export default function CartSidebar() {
  return (
    <RootStyle sx={{ bgcolor: 'grey.200', p: 1 }}>
      <Stack sx={{ p: 1 }} spacing={2}>
        <Typography variant="h6">Cart</Typography>

        <Stack spacing={2} direction="column">
          <Card sx={{ p: 2, borderRadius: 1 }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography flex={1} variant="body2">
                Cart item
              </Typography>
              <Iconify icon="ic:round-view-day" width={20} height={20} />
              <IconButton>
                <Iconify icon={'eva:close-fill'} width={20} height={20} />
              </IconButton>
            </Stack>
          </Card>
        </Stack>

        <Button variant="contained" color="primary" fullWidth>
          Collect
        </Button>
      </Stack>
    </RootStyle>
  );
}
