// @mui
import { useTheme } from '@mui/system';
import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { capitalCase } from 'change-case';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
// modules
import DOMPurify from 'dompurify';


import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// hooks
import useSettings from '../hooks/useSettings';
// utils
import { useSelector } from '../redux/store';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../routes/paths';
// sections
// slices
// _mock_
// avatars

import { waiverText } from './tempWaiverText';
import { FormProvider } from '../components/hook-form';
import HTMLBlock from '../components/waiver/HTMLBlock';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const safeHTML = DOMPurify.sanitize(waiverText.content);

export default function SignWaiver() {
  const theme = useTheme();
  const { customer, submitSignedWaiver } = useAuth();
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar} = useSnackbar();
  const { id = '' } = useParams();
  const isEdit = pathname.includes('edit');
  const signatureRef = useRef({});
  const signatureBlockCardRef = useRef(null);
  const pdfWaiverElement = useRef(null);
  const pdfWaiverElementDownload = useRef(null);

  // only update signature width when the signature block is visible
  useEffect(() => {
    if (signatureBlockCardRef.current) {
      setCanvasWidth(signatureBlockCardRef.current.clientWidth);
    }
  }, [signatureBlockCardRef]);

  // set inital canvas width to null on load
  const [canvasWidth, setCanvasWidth] = useState(null);

  // set the canvas width to the signature block width on resize
  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(Math.floor(signatureBlockCardRef.current.clientWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  // state to hold signature
  const [signature, setSignature] = useState('');
  console.log(signature);

  // Form defaults and Method initialization
  const signatureSchema = Yup.object().shape({
    signature: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      signature: '',
    }),
    []
  );

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(signatureSchema),
  });

  // deconstruct form methods
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // handler Funtions
  const handleUpdateSignature = async () => {
    const signatureImg = await signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
    setSignature(signatureImg);
  };
  const onSubmit = async () => {
    const drawnDOM = await drawDOM(pdfWaiverElement.current, {
      paperSize: 'A4',
      margin: '1cm',
      scale: .55,
    });
    const signedWaiver = await exportPDF(drawnDOM);
    console.log(signedWaiver);
    // post cloudinary url to server
    const isDesktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isDesktop) {
      console.log(pdfWaiverElementDownload.current);
      await pdfWaiverElementDownload.current.save();
    }
    await submitSignedWaiver({
      signedWaiver,
      customerId: customer.id,
    }); 
    enqueueSnackbar('Waiver Signed');
    navigate(PATH_PAGE.signWaiverSuccess);
  };

  // clear signature on click
  const handleClearSignature = () => signatureRef.current.clear();

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
        <PDFExport ref={pdfWaiverElementDownload} paperSize="Letter" imageResolution={300} scale={0.55} margin={10}>
          <Grid ref={pdfWaiverElement} container spacing={2}>
            <Grid item xs={12}>
              <HTMLBlock waiverText={safeHTML} />
            </Grid>
            <Grid alignItems="center" container spacing={2} item xs={6}>
              <Grid item>
                <Typography variant="h4" component="h4">
                  Signing for:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  alignSelf={'center'}
                  textAlign="left"
                  variant="p"
                  component="p"
                  sx={{
                    marginLeft: '1rem',
                  }}
                >
                  {customer?.guardianFirstName} {customer?.guardianLastName}
                </Typography>
              </Grid>
            </Grid>
            <Grid alignItems="center" container item xs={6}>
              <Typography variant="h4" component="h4">
                Minors:
              </Typography>

              {customer?.minors &&
                customer?.minors.map((minor, i) => (
                  <Grid item key={minor + i}>
                    <Typography variant="p" component="p" sx={{ marginLeft: '1rem' }}>
                      {customer?.minors.length - 1 !== i
                        ? `${minor.minorFirstName}
                      ${minor.minorLastName},`
                        : `${minor.minorFirstName} ${minor.minorLastName}`}
                    </Typography>
                  </Grid>
                ))}
            </Grid>
            <Grid item xs={12}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ border: 1, marginBottom: 3 }} ref={signatureBlockCardRef}>
                  <SignatureCanvas
                    id={`signature`}
                    onEnd={handleUpdateSignature}
                    ref={signatureRef}
                    canvasProps={{
                      width: canvasWidth,
                      height: 200,
                    }}
                  />
                </Card>
                <Stack gap={3} justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }} sx={{ my: 3 }}>
                  <Button color="inherit" variant="outlined" onClick={() => handleClearSignature()}>
                    Clear Signature
                  </Button>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Submit Waiver
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </Grid>
          </Grid>
        </PDFExport>
      </Container>
    </Page>
  );
}
