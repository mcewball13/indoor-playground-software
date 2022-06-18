import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Stack, IconButton } from '@mui/material';

import Iconify from '../../../../components/Iconify';

export default function CartItem({ title, isAdmission = 'false', bgColor, onDelete }) {
  return (
    <Card sx={{ p: 2, borderRadius: 1, backgroundColor: bgColor }}>
      <Stack spacing={2} direction="row" alignItems="center">
        <Typography flex={1} variant="body2">
          {title}
        </Typography>
        {isAdmission && <Iconify icon="ic:round-view-day" width={20} height={20} />}
        <IconButton>
          <Iconify onClick={onDelete} icon={'eva:close-fill'} width={20} height={20} />
        </IconButton>
      </Stack>
    </Card>
  );
}

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  isAdmission: PropTypes.bool,
  isWaiverSigned: PropTypes.bool,
  onDelete: PropTypes.func,
};
