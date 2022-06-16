import { Grid, Card, Typography, Stack, Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';

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
      <Stack sx={{ p: 2 }} spacing={2}>
        <Typography variant="h6">Cart</Typography>

        <Stack spacing={2} direction="column">
          <Stack spacing={2} direction="column">
            <Card sx={{ p: 1, borderRadius: 1 }}>
              <Typography variant="body2">Cart item</Typography>
            </Card>
          </Stack>
        </Stack>
        <Button variant="contained" color="primary" fullWidth>
          Collect
        </Button>
      </Stack>
    </RootStyle>
  );
}
