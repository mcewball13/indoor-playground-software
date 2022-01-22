import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------
const httpLink = createHttpLink({
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <ThemeColorPresets>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <MotionLazyContainer>
                  <ProgressBarStyle />
                  <ChartStyle />
                  <Settings />
                  <ScrollToTop />
                  <Router />
                </MotionLazyContainer>
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemeColorPresets>
      </ThemeProvider>
    </ApolloProvider>
  );
}
