'use client'

import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

// _mock
import { Card } from '@mui/material';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));


const HTMLBlock = ({ waiverText , ...other }) => (
  <Card>
    <RootStyle dangerouslySetInnerHTML={{ __html: waiverText }} {...other} />
  </Card>
);

HTMLBlock.propTypes = {
  waiverText: PropTypes.string,
};

export default HTMLBlock;
