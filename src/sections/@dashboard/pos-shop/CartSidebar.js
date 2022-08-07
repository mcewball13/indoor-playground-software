import { Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
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
  },
];
// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
}));

export default function CartSidebar() {
  const setBgColor = (isWaiverSigned) => {
    if (isWaiverSigned) {
      return 'success.lighter';
    } 
    if (isWaiverSigned === false) {
      return 'warning.lighter';
    } 
    if (isWaiverSigned === true) {
      return 'white.main';
    }
  };

  return (
    <RootStyle sx={{ bgcolor: 'grey.200', p: 2 }}>
      <Stack flex={1} spacing={2}>
        <Typography variant="h6">Cart</Typography>
        <Stack spacing={2} direction="column">
          {cartItems.map((item) => (
            <CartItem
              key={item.key}
              bgColor={setBgColor(item.isWaiverSigned)}
              title={item.title}
              isAdmission={item.isAdmission}
            />
          ))}
        </Stack>
      </Stack>
      <Button variant="contained" color="primary" fullWidth>
        Collect
      </Button>
    </RootStyle>
  );
}
