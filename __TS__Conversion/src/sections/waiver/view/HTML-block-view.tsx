'use client'

import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

// _mock
import { Card } from '@mui/material';

import { waiverText } from '../tempWaiverText';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));



const HTMLBlock = ({ waiverText  , ...other }: Record<string,any>) => (
  <Card>
    <RootStyle dangerouslySetInnerHTML={{ __html: waiverText }} {...other} />
  </Card>
);

HTMLBlock.propTypes = {
  waiverText: PropTypes.string,
};

export default HTMLBlock;
