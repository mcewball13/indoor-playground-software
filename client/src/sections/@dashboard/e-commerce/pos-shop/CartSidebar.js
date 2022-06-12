import { Box, Card, Typography, Stack } from '@mui/material';
import React from 'react';

export default function CartSidebar() {
  return (
    <Card sx={{p: 1, bgcolor: "grey.200"}}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Cart</Typography>
      </Box>
      <Stack spacing={2} direction="column" justifyContent="center">
        <Card sx={{p: 1, borderRadius: 1}}>
          <Typography variant="body2">Cart item</Typography>
        </Card>
      </Stack>
    </Card>
  );
}
