// react styled div
import React from 'react';
// @mui
import { styled } from '@mui/material/styles';

//  ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme}) => {
  return {
    position: 'relative',
    margin: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[600]}`,
    borderRadius: theme.shape.borderRadius,
  };
});

export default function SignatureBlockStyle({ children, ...other }) {
  return <RootStyle {...other}>{children}</RootStyle>;
}
