// @mui
import { Box, Card, Container, DialogTitle, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { capitalCase, paramCase } from 'change-case';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// modules
import DOMPurify from 'dompurify';
import SignatureCanvas from 'react-signature-canvas';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// components
import Page from '../components/Page';
import { DialogAnimate } from '../components/animate';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Avatar from '../components/Avatar';
import Image from '../components/Image';
import SignatureBlockStyle from '../components/waiver';
// hooks
import useSettings from '../hooks/useSettings';
// utils
import { openModal, setSelectedAvatar, closeModal } from '../redux/slices/waiverFormSlice';
import { useDispatch, useSelector } from '../redux/store';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// sections
import UserWaiverForm from '../sections/@dashboard/user/UserWaiverForm';
// slices
// _mock_
import { _userList } from '../_mock';
// avatars
import avatars from '../assets/avatars';

import { waiverText } from './tempWaiverText';
import RHFSignatureCanvas from '../components/hook-form/RHFSignatureCanvas';
import { FormProvider } from '../components/hook-form';
import HTMLBlock from '../components/waiver/HTMLBlock';

// ----------------------------------------------------------------------

const safeHTML = DOMPurify.sanitize(waiverText.content);

export default function SignWaiver() {
  const theme = useTheme();
  console.log('theme', theme);
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const isEdit = pathname.includes('edit');
  const signatureRef = useRef(null);

  // make styles for signature convas and signature block

  const [canvasWidth, setCanvasWidth] = useState(Math.floor(window.innerWidth * 0.8));
  console.log(canvasWidth);

  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(Math.floor(window.innerWidth * 0.8));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  // state to hold signature
  const [signature, setSignature] = useState('');

  const { currentCustomer } = useSelector((state) => state.newWaiverForm);
  console.log('currentCustomer', currentCustomer);

  // Form defaults and Method initialization
  const signatureSchema = Yup.object().shape({
    signature: Yup.string().required('Please sign the waiver'),
  });

  const defaultValues = useMemo(() => ({
    signature: '',
  }));

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(signatureSchema),
  });

  // handler Funtions
  const handleUpdateSignature = (data) => {
    const signatureImg = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
    setSignature(signatureImg);
  };
  console.log(signature);

  return (
    <Page title="User: Sign Waiver">
      <Container maxWidth={themeStretch ? 'false' : 'lg'}>
        <HeaderBreadcrumbs
          heading="Sign Waiver"
          links={[
            { name: 'Edit Account Members', href: `${PATH_DASHBOARD.user}/${id}/edit` },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New user' : capitalCase('name') },
          ]}
        />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HTMLBlock waiverText={safeHTML} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" component="h4">
              Signing for: {currentCustomer.newCustomerData?.guardianFirstName}{' '}
              {currentCustomer.newCustomerData?.guardianLastName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" component="h4">
              Minors:
            </Typography>

            {currentCustomer.newCustomerMinorDataArr &&
              currentCustomer.newCustomerMinorDataArr.map((minor) => {
                return (
                  <Typography variant="h4" component="h4">
                    {minor.minorFirstName} {minor.minorLastName}
                  </Typography>
                );
              })}
          </Grid>
          <Grid item xs={12}>
            <FormProvider methods={methods}>
              <Card>
                <RHFSignatureCanvas
                  name={`signature`}
                  onEnd={handleUpdateSignature}
                  elementRef={signatureRef}
                  backgroundColor={theme.palette.grey[200]}
                  penColor="blue"
                  canvasProps={{
                    width: canvasWidth,
                    height: 200,
                  }}
                />
              </Card>
            </FormProvider>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
