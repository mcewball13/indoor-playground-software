import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
// type
import { ChooseAvatar } from '../upload';
import { useSelector } from '../../redux/store';

// ----------------------------------------------------------------------

RHFChooseAvatar.propTypes = {
  name: PropTypes.string,
};

export default function RHFChooseAvatar({ name, ...other }) {
  const { control } = useFormContext();

  const { selectedAvatar } = useSelector((state) => state.newWaiverForm);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <ChooseAvatar {...other} file={selectedAvatar} />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}