import { Grid, Card, Typography, Stack, Button, IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';
import Iconify from '../../../../components/Iconify';
import CartItem from './CartItem';

const cartItems = [
  {
    key: '1',
    title: 'First Child',
    isAdmission: true,
    isWaiverSigned: false,
    onDelete: () => {},
  },
  {
    key: '2',
    title: 'Sibling',
    isAdmission: true,
    isWaiverSigned: true,
    onDelete: () => {},
  },
  {
    key: '3',
    title: 'Chocolate Milk',
    isAdmission: false,
    isWaiverSigned: null,
    onDelete: () => {},
  }
];
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 8,
}));

export default function CartSidebar() {

  const setBgColor = (isWaiverSigned) => {
    if (isWaiverSigned) {
      return 'success.lighter';
    } else if (isWaiverSigned === false) {
      return 'warning.lighter';
    } else {
      return 'white.main';
    }
  }

  return (
    <RootStyle sx={{ bgcolor: 'grey.200', p: 1 }}>
      <Stack sx={{ p: 1 }} spacing={2}>
        <Typography variant="h6">Cart</Typography>
        <Stack spacing={2} direction="column">
         {cartItems.map(item => <CartItem key={item.key} bgColor={setBgColor(item.isWaiverSigned)} title={item.title} isAdmission={item.isAdmission} />)}
        </Stack>
        <Button variant="contained" color="primary" fullWidth>
          Collect
        </Button>
      </Stack>
    </RootStyle>
  );
}
