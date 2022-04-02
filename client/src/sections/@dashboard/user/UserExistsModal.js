import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

// mui
import {
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  DialogActions,
  TextField,
  Stack,
  Button,
  Link,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// componenets
import { PATH_AUTH } from '../../../routes/paths';
import { DialogAnimate } from '../../../components/animate';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';

const UserExistsModal = ({ isOpen, onClose, muiWidth, email }) => {
  // state for show password
  const [showPassword, setShowPassword] = useState(false);

  const UserExistsModal = Yup.object().shape({
    modalPassword: Yup.string().required('Password is required'),
  });

  // .test('required', 'Avatar is required', (value) => value !== ''),

  const defaultValues = useMemo(
    () => ({
      modalPassword: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(UserExistsModal),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="p">
          An account with <strong>{email || 'this email address'}</strong> already exists. You can load you account now
          by typing in your password. If you wish to use another email address, you can just close this dialogue.
        </Typography>

        <RHFTextField
          name="modalPassword"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Grid container gap={3} >
          <Grid item container gap={2} flex={1} >
            <Grid item>
              <LoadingButton type="submit" variant="contained">
                Load Account
              </LoadingButton>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="inherit" onClick={onClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Grid item alignSelf={'center'}>
            <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
};

UserExistsModal.propTypes = {
  email: PropTypes.string,
};

export default UserExistsModal;
