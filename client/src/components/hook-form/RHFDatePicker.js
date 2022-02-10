import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/lab';

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string,
};

export default function RHFDatePicker({ label = 'Select your Date', name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MobileDatePicker
          {...other}
          {...field}
          label={label}
          inputFormat="M/d/yyyy"
          views={[ 'year','month', 'day']}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      )}
    />
  );
}
