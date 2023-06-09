import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Api
import { register } from 'api/register';

// Styles
import classes from './Registration.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f36d25'
    }
  }
});

const Registration: FC = () => {
  const { search } = useLocation();
  const hash = new URLSearchParams(search).get('hash');
  const navigate = useNavigate();

  const reg = async (firstPassword: string) => {
    if (!hash) return null;
    try {
      const { data } = await register(firstPassword, hash);
      navigate('/');
      return data;
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      firstPassword: '',
      secondPassword: ''
    },
    onSubmit: ({ firstPassword, secondPassword }) => {
      if (
        !firstPassword?.length ||
        !secondPassword?.length ||
        firstPassword !== secondPassword
      ) {
        return;
      }
      reg(firstPassword);
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
        <Helmet title="Regist" />
        <Grid item className={classes.headForm}>
          <Typography component="div" align="center">
            <img src="favicon.svg" alt="" className={classes.logoIcon} />
            <Grid className={classes.head}>Sign Up</Grid>
          </Typography>
        </Grid>
        <Paper variant="elevation" elevation={2} className={classes.paper}>
          <Grid item>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="password"
                    fullWidth
                    name="firstPassword"
                    label="New Password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.firstPassword}
                    helperText
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
                    label="Repeat Password"
                    fullWidth
                    name="secondPassword"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.secondPassword}
                    helperText
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

export default Registration;
