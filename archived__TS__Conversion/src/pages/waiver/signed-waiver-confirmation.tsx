import React, { useEffect } from 'react/ts5.0';
import { m } from 'framer-motion';
import { Link as NextLink } from 'next/link';
import { useRouter } from 'next/router';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';

import Page from '../../components/Page';
import { MotionContainer, varBounce } from '../../components/animate';
import { PATH_PAGE } from '../../routes/paths';
import Layout from '../../layouts';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

SignedWaiverConfirmation.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

export default function SignedWaiverConfirmation() {
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      push(PATH_PAGE.signWaiver);
    }, 5000);
  }, []);

  return (
    <Page title="Successfully Signed Waiver" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                Success! Please check Junk Mail
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}>
              This page with reload automatically after 5 seconds.
            </Typography>
            <m.div variants={varBounce().in}>image</m.div>
            <Button to="/sign-waiver" size="large" variant="contained" component={NextLink}>
              New waiver
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
