import PropTypes from 'prop-types';
import isString from 'lodash/isString';
// @mui
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//
// usedispatch from store
import { useDispatch } from '../../redux/store';
//

import Image from '../Image';
import Iconify from '../Iconify';
import { openModal } from '../../redux/slices/waiverFormSlice';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
}));

const ThumbnailStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9,
    },
  },
});

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

ChooseAvatar.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function ChooseAvatar({ file, helperText, sx, ...other }) {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal(true));
  };

  return (
    <>
      <RootStyle
        sx={{
          ...sx,
        }}
        {...other}
      >
        <ThumbnailStyle onClick={handleOpenModal}>
          {file && <Image alt="avatar" src={isString(file) ? file : file.preview} sx={{ zIndex: 8 }} />}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(file && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900',
                '&:hover': { opacity: 0.72 },
              }),
            }}
          >
            <Iconify icon={'ic:round-add-a-photo'} sx={{ width: 24, height: 24, mb: 1 }} />
            <Typography variant="caption">{file ? 'Update avatar' : 'Choose Avatar'}</Typography>
          </PlaceholderStyle>
        </ThumbnailStyle>
      </RootStyle>

      {helperText && helperText}
    </>
  );
}
