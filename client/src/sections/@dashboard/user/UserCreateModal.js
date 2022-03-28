import React, {useState} from 'react'
import PropTypes from 'prop-types'

// mui
import { Box,
    Grid,
    Typography,
    InputAdornment,
    IconButton,
    DialogActions,} from "@mui/material"
import { LoadingButton } from '@mui/lab';

// componenets
import { DialogAnimate } from '../../../components/animate';
import { RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';



const UserCreateModal = ({isOpen, onClose, muiWidth, email}) => {
// state for show password
const [showPassword, setShowPassword] = useState(false);


  return (
    <DialogAnimate maxWidthMUI={muiWidth} open={isOpen} onClose={onClose} >
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Existing Customer Found
          </Typography>
        </DialogActions>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="p">
                An account with <strong>{email || 'this email address'}</strong> already exists. You can load you
                account now by typing in your password. If you wish to use another email address, you can just close
                this dialogue.
              </Typography>
            </Grid>
            <Grid justifyContent={'space-between'} container item xs={12} spacing={2}>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={4}>
                <LoadingButton type="submit" variant="contained">
                  Load Account
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogAnimate>
  )
}

UserCreateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    muiWidth: PropTypes.string.isRequired,
    email: PropTypes.string,
}

export default UserCreateModal