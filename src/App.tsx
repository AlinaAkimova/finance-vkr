import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import * as locales from '@mui/material/locale';

// Routes
import Routes from 'routes';

// Stores
import authStore from 'stores/AuthStore';

const App: FC = () => {
  const { i18n } = useTranslation();

  const [locale, setLocale] = useState<keyof typeof locales>(
    i18n.language as keyof typeof locales
  );

  useEffect(() => {
    authStore.checkAuth();
    const onLanguageChanged = (cLocale: keyof typeof locales) => {
      setLocale(cLocale);
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, []);

  const theme = useMemo(() => createTheme({}, locales[locale]), [locale]);

  return (
    <ThemeProvider theme={theme}>
      <Helmet titleTemplate="%s - Olga Finance" defaultTitle="Olga Finance" />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
