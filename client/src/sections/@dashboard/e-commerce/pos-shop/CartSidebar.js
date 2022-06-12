import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
  }));

export default function CartSidebar() {

  return (
    <Card sx={{ position: 'relative', p: 1, bgcolor: 'grey.200', height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Cart</Typography>
      </Box>
      <Stack spacing={2} direction="column">
        <Stack spacing={2} direction="column">
          <Card sx={{ p: 1, borderRadius: 1 }}>
            <Typography variant="body2">Cart item</Typography>
          </Card>
        </Stack>
        <Button variant="contained" color="primary" fullWidth>
          Collect
        </Button>
      </Stack>
    </Card>
  );
}
