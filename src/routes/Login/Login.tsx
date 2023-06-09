import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import { useFormik } from 'formik';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// Stores
import authStore from 'stores/AuthStore';

import classes from './Login.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f36d25'
    }
  }
});

const Login: FC = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: ({ email, password }, actions) => {
      if (!email?.length || !password?.length) {
        return;
      }

      authStore.login(email, password).finally(() => {
        actions.setSubmitting(false);
      });
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100%"
        direction="column"
        wrap="nowrap"
        className={classes.formWrapper}
      >
        <Helmet title="Login" />
        <Grid item className={classes.headForm}>
          <Typography component="div" align="center">
            <img src="favicon.svg" alt="" className={classes.logoIcon} />
            <Grid className={classes.head}>Log In</Grid>
          </Typography>
        </Grid>
        <Paper variant="elevation" elevation={2} className={classes.paper}>
          <Grid item>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="email"
                    fullWidth
                    name="email"
                    label={t('Email')}
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    autoFocus
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                        focused: classes.focused
                      }
                    }}
                    InputProps={{
                      classes: {
                        root: classes.outlinedInput,
                        focused: classes.focused,
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="password"
                    label={t('Password')}
                    fullWidth
                    name="password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                        focused: classes.focused
                      }
                    }}
                    InputProps={{
                      classes: {
                        root: classes.outlinedInput,
                        focused: classes.focused,
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <Link className={classes.forgotPassword} href="main">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Checkbox />
                  <Grid className={classes.checkBoxPassword} component="div">
                    Remember my password
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submitBtn}
                  >
                    {t("Let's go!")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
