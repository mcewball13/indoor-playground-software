import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef, useContext } from 'react';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
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
  Button,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
} from '@mui/material';
// utils
import { format } from 'date-fns';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useDispatch, useSelector } from '../../../redux/store';
import { openCustomerExistsModal, closeCustomerExistsModal } from '../../../redux/slices/waiverFormSlice';
import { UserMoreMenu } from './list';
import RHFDatePicker from '../../../components/hook-form/RHFDatePicker';
import { RHFChooseAvatar } from '../../../components/hook-form/RHFChooseAvatar';
import useAuth from '../../../hooks/useAuth';
import { AuthContext } from '../../../contexts/JWTContext';
import UserCreateModal from './UserCreateModal';

// ----------------------------------------------------------------------

UserWaiverForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onCancel: PropTypes.func,
};

export default function UserWaiverForm({ isEdit, currentUser, isOpen, onOpen, onCancel }) {
  const { customerRegister, customerExists } = useAuth();
  const { existingCustomer } = useContext(AuthContext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  //  show password local state
  const [showPassword, setShowPassword] = useState(false);
  // State to hold array of minors in objects
  const [minors, setMinors] = useState([]);

  const { selectedAvatar, currentCustomer, isOpenModalCustomerExists } = useSelector((state) => state.newWaiverForm);
  // capture the element to scroll to
  const addMinorFormScrollRef = useRef(null);
  const addedMinorScrollRef = useRef(null);

  const NewUserSchema = Yup.object().shape({
    guardianFirstName: Yup.string().required('First name is required'),
    guardianLastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email(),
    guardianBirthday: Yup.string().required('Birth date is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - 8 characters minimum')
      .matches(/[0-9a-zA-Z*.!@$%^&(){}[\]:;<>,.?~_+-=|\]]/),
    addressPhone: Yup.string().required('Phone number is required'),
    addressStreet: Yup.string(),
    addressState: Yup.string(),
    addressCity: Yup.string(),
    addressZipCode: Yup.string().required('Zip code is required'),
    avatarUrl: Yup.mixed(),
  });

  // .test('required', 'Avatar is required', (value) => value !== ''),

  const defaultValues = useMemo(
    () => ({
      guardianFirstName: currentCustomer.newCustomerData?.guardianFirstName || '',
      guardianLastName: currentCustomer.newCustomerData?.guardianLastName || '',
      email: currentCustomer.newCustomerData?.email || '',
      guardianBirthday: currentCustomer.newCustomerData?.guardianBirthday || null,
      password: '',
      addressPhone: currentCustomer.newCustomerData?.addressPhone || '',
      addressStreet: currentCustomer.newCustomerData?.addressStreet || '',
      addressState: currentCustomer.newCustomerData?.addressState || '',
      addressCity: currentCustomer.newCustomerData?.addressCity || '',
      addressZipCode: currentCustomer.newCustomerData?.addressZipCode || '',
      avatarUrl: currentCustomer?.avatarUrl || null,
      isBanned: currentCustomer?.isBanned || false,
      status: currentCustomer?.status,
      minorFirstName: '',
      minorLastName: '',
      minorBirthday: null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCustomer]
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

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  useEffect(() => {
    if (existingCustomer) {
      dispatch(openCustomerExistsModal());
    }
  }, [existingCustomer]);

  const handleOnEntered = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  const onSubmit = async () => {
    try {
      await customerRegister({ guardians: { ...values, avatarUrl: selectedAvatar }, minors });
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      console.log(currentCustomer);
      navigate(PATH_PAGE.signWaiver);
      // reset();
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
    const newArray = minors.filter((item) => item.id !== index);
    setMinors(newArray);
  };

  const handleSetMinors = (minor) => {
    console.log(values.minorBirthday);
    setMinors([...minors, minor]);
    reset({
      ...values,
      minorFirstName: '',
      minorLastName: '',
      minorBirthday: null,
    });
    // wait a bit to scroll to the new minor
    setTimeout(() => {
      handleOnEntered(addMinorFormScrollRef);
    }, 50);
  };

  const handleBlur = () => {
    customerExists(values.email);
  };

  const handleCustomerExistsCloseModal = () => {
    dispatch(closeCustomerExistsModal(false));
  };

  // formate date object to string
  const formatDate = (date) => format(date, 'MM/dd/yyyy');

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
                      If you don't choose an avatar your
                      <br />
                      initial will be used
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

              {/* <RHFSwitch
                name="isBanned"
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
              /> */}
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
                <RHFTextField onBlur={handleBlur} name="email" label="Email Address" />
                <RHFTextField name="guardianFirstName" label="First Name" />
                <RHFTextField name="guardianLastName" label="Last Name" />
                <RHFDatePicker name="guardianBirthday" label="Guardian Birth Date" openTo="year" />
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
                <RHFTextField name="addressPhone" label="Phone Number" />
                <RHFTextField name="addressStreet" label="Street Address" />
                <RHFTextField name="addressCity" label="City" />
                <RHFTextField name="addressState" label="State" />
                <RHFTextField name="addressZipCode" label="Zip Code" />
              </Box>

              <Stack gap={3} justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Sign Waiver' : 'Save Changes'}
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
                      <RHFTextField name="minorFirstName" fullWidth label="First Name" />
                      <RHFTextField name="minorLastName" fullWidth label="Last Name" />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <RHFDatePicker name="minorBirthday" label="Birth Date" openTo="year" />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button onClick={onCancel} color="error" startIcon={<Iconify icon={'eva:close-outline'} />}>
                        Cancel
                      </Button>
                      <Button
                        color="success"
                        onClick={() =>
                          handleSetMinors({
                            minorFirstName: values.minorFirstName,
                            minorLastName: values.minorLastName,
                            minorBirthday: values.minorBirthday,
                            email: values.email,
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
                      {minors.map((minor, i) => (
                        <TableRow key={`${minor.minorFirstName}_${i}`} hover ref={addedMinorScrollRef}>
                          <TableCell>
                            <Typography variant="body1">{minor.minorFirstName}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">{formatDate(minor.minorBirthday)}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              isMinor
                              userName={minor.minorFirstName}
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
      <UserCreateModal muiWidth='sm' isOpen={isOpenModalCustomerExists} onClose={handleCustomerExistsCloseModal} email={values.email} />
    </FormProvider>
  );
}
