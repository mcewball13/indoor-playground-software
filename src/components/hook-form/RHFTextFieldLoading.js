import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { CircularProgress, InputAdornment, TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextFieldLoading.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextFieldLoading({ name, isLoading, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          InputProps={
            isLoading
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <CircularProgress size={16} />
                    </InputAdornment>
                  ),
                }
              : {}
          }
          {...other}
        />
      )}
    />
  );
}
