import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@mui/material';
import Iconify from '../../../components/Iconify';

export default function ToolkitBar({ iconArr }) {
  return (
    <Grid item container spacing={2} justifyContent="center">
      {iconArr.map((item, index) => (
        <IconButton key={index}>
          <Iconify color="default" icon={item} width={60} height={60} />
        </IconButton>
      ))}
    </Grid>
  );
}
ToolkitBar.propTypes = {
  iconArr: PropTypes.arrayOf(PropTypes.string).isRequired,
};
