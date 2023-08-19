import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

type RHFDatePickerProps = {
  name: string;
  label: string;
};

export default function RHFDatePicker({ label = 'Select your Date', name, ...other }: RHFDatePickerProps) {
  const { control, setValue } = useFormContext(); // Added setValue

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          {...field}
          label={label}
          // inputFormat="M/d/yyyy"
          views={['year', 'month', 'day']}
          value={field.value || null} // Set the value from react-hook-form
          onChange={(date) => setValue(name, date)} // Update the value using setValue
          {...other}
        />
      )}
    />
  );
}
