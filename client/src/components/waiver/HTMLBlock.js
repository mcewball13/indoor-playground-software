import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';

// _mock
import { Card } from '@mui/material';

const RootStyle = styled('div')(({ theme }) => ({
  padding: '1rem',
}));

const HTMLBlock = ({ waiverText, ...other }) => {
  return (
    <Card>
      <RootStyle dangerouslySetInnerHTML={{ __html: waiverText }} {...other} />
    </Card>
  );
};

HTMLBlock.propTypes = {
  waiverText: PropTypes.string,
};

export default HTMLBlock;
