import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// signatureCanvas
import SignatureCanvas from 'react-signature-canvas';
// @mui
import { FormHelperText } from '@mui/material';

RHFSignatureCanvas.propTypes = {
  name: PropTypes.string,
  onEnd: PropTypes.func,
  ref: PropTypes.func,
  penColor: PropTypes.string,
  canvasProps: PropTypes.object,
};

export default function RHFSignatureCanvas({ name, onEnd, elementRef, penColor, canvasProps, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <SignatureCanvas
          id={name}
          value={field.value}
          onEnd={onEnd}
          ref={elementRef}
          penColor={penColor}
          canvasProps={canvasProps}
          error={!!error}
          helperText={
            <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
              {error?.message}
            </FormHelperText>
          }
          {...other}
        />
      )}
    />
  );
}
