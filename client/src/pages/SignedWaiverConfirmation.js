import React from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion';


// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';

import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function SignedWaiverConfirmation({firstName = "Wiggler"}){
  return (
    <Page title="Successfully Signed Waiver" sx={{height: 1}}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{maxWidth: 480, margin: 'auto', textAlign: 'center'}}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                Thank you {firstName}, you've successfully signed your waiver!
              </Typography>
            </m.div>
            <Typography sx={{color: 'text.secondary'}}>
              This page with reload automatically after 5 seconds.
            </Typography>
            <m.div variants={varBounce().in}>
              image
            </m.div>
            <Button to="/sign-waiver" size="large" variant="contained" component="a">
              New waiver
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>

  )
}

SignedWaiverConfirmation.propTypes = {}