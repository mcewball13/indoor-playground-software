import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Collapse,
  TextField,
  Button,
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
// utils
import uuid from 'uuid/v4';
import { format, parseISO } from 'date-fns';
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { useDispatch, useSelector } from '../../../redux/store';
import { openModal, setSelectedAvatar } from '../../../redux/slices/waiverFormSlice';
import LightboxModal from '../../../components/LightboxModal';
import { UserMoreMenu } from './list';
import RHFDatePicker from '../../../components/hook-form/RHFDatePicker';
import { RHFChooseAvatar } from '../../../components/hook-form/RHFChooseAvatar';

// ----------------------------------------------------------------------

UserWaiverForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserWaiverForm({ isEdit, currentUser, isOpen, onOpen, onCancel }) {
  const theme = useTheme();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  //  show password local state
  const [showPassword, setShowPassword] = useState(false);
  // State to hold array of minors in objects
  const [minors, setMinors] = useState([]);

  // capture the element to scroll to
  const addMinorFormScrollRef = useRef(null);
  const addedMinorScrollRef = useRef(null);

  const NewUserSchema = Yup.object().shape({
    fName: Yup.string().required('First name is required'),
    lName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email(),
    birthDate: Yup.string().required('Birth date is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - 8 characters minimum')
      .matches(/[0-9a-zA-Z*.!@$%^&(){}[\]:;<>,.?~_+-=|\]]/),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string(),
    location: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    zipCode: Yup.string().required('Zip code is required'),
    role: Yup.string(),
    avatarUrl: Yup.mixed(),
    minorFName: Yup.string(),
    minorLName: Yup.string(),
    minorBirthDate: Yup.string(),
  });

  // .test('required', 'Avatar is required', (value) => value !== ''),

  const defaultValues = useMemo(
    () => ({
      fName: currentUser?.firstName || '',
      lName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      birthDate: currentUser?.birthDate || '1/1/1990',
      password: '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: currentUser?.avatarUrl || '',
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      minorFName: '',
      minorLName: '',
      minorBirthDate: '1/1/2019',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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

  
  console.log('values', values);

  const { isOpenModal, selectedAvatar} = useSelector((state) => state.newWaiverForm);


  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const handleOnEntered = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async () => {
    console.log('clicked');
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleRemoveMinor = (index) => {
    const newArray = minors.filter((item, i) => item.id !== index);
    setMinors(newArray);
  };

  const handleSetMinors = (minor) => {
    console.log(values.minorBirthDate);
    setMinors([...minors, minor]);
    setTimeout(() => {
      handleOnEntered(addMinorFormScrollRef);
    }, 50);
    reset({ minorFName: '', minorLName: '', minorBirthDate: '01/01/2018' });
  };

  // formate date object to string
  const formatDate = (date) => {
    return format(date, 'MM/dd/yyyy');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item container xs={12} md={4} spacing={3}>
          {/* Avatar upload plate */}
          <Grid item xs={12}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
                <Label
                  color={values.status !== 'active' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <RHFChooseAvatar
                  name="avatarUrl"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>

              {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value !== 'active'}
                          onChange={(event) => field.onChange(event.target.checked ? 'banned' : 'active')}
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

              <RHFSwitch
                name="isVerified"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Card>
          </Grid>
        </Grid>

        <Grid container item xs={12} md={8} gap={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="fName" label="First Name" />
                <RHFTextField name="lName" label="Last Name" />
                <RHFTextField name="email" label="Email Address" />
                <RHFDatePicker name="birthDate" label="Birth Date" openTo="year"/>
                <RHFTextField
                  name="password"
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
                <RHFTextField name="phoneNumber" label="Phone Number" />
                <RHFTextField name="state" label="State/Region" />
                <RHFTextField name="city" label="City" />
                <RHFTextField name="address" label="Address" />
                <RHFTextField name="zipCode" label="Zip Code" />
              </Box>

              <Stack justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Create User' : 'Save Changes'}
                </LoadingButton>

                <Button size="small" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={onOpen} disabled={isOpen}>
                  Add a Minor
                </Button>
              </Stack>

              {/* Add Minor form */}
              <Collapse
                onEntered={() => handleOnEntered(addMinorFormScrollRef)}
                in={isOpen}
                ref={addMinorFormScrollRef}
              >
                <Box
                  sx={{
                    padding: 3,
                    marginTop: 3,
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Stack spacing={3}>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                      {' '}
                      Add a Minor
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <RHFTextField name="minorFName" fullWidth label="First Name" />
                      <RHFTextField name="minorLName" fullWidth label="Last Name" />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <RHFDatePicker name="minorBirthDate" label="Birth Date" openTo="year" />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button onClick={onCancel} color="error" startIcon={<Iconify icon={'eva:close-outline'} />}>
                        Cancel
                      </Button>
                      <Button
                        color="success"
                        onClick={() =>
                          handleSetMinors({
                            id: uuid(),
                            minorFName: values.minorFName,
                            minorLName: values.minorLName,
                            minorBirthDate: formatDate(values.minorBirthDate),
                          })
                        }
                        startIcon={<Iconify icon={'eva:plus-fill'} />}
                      >
                        Add
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Collapse>
            </Card>
          </Grid>
          {/* Added minors list plate */}
          {!!minors.length && (
            <Grid item xs={12}>
              <Card sx={{ py: 2, px: 1 }}>
                <Typography variant="button" sx={{ mb: 1 }}>
                  Added minors
                </Typography>
                <TableContainer>
                  <Table>
                    <TableBody>
                      {minors.map((minor) => (
                        <TableRow key={minor.id} hover ref={addedMinorScrollRef}>
                          <TableCell>
                            <Typography variant="body1">{minor.minorFName}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">{minor.minorBirthDate}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              isMinor
                              userName={minor.minorFName}
                              onDelete={() => handleRemoveMinor(minor.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </FormProvider>
  );
}
