import { useState } from 'react';

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

  const [value, setValue] = useState(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MobileDatePicker
          {...other}
          {...field}
          label={label}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          inputFormat="M/d/yyyy"
          views={['year', 'month', 'day']}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      )}
    />
  );
}
