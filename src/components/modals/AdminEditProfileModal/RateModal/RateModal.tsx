import React, { FC, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import { TransitionGroup } from 'react-transition-group';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import CurrencyRuble from '@mui/icons-material/CurrencyRuble';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { useFormik } from 'formik';
import * as yup from 'yup';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Types
import { ContractCurrencyVariant } from 'types/rate';

// Stores
import salaryStore from 'stores/SalaryCoefficientsStore';

// Components
import DatePicker from 'components/DatePicker';
import Loading from 'components/Loading';
import SelectCoefficientTextField from './SelectCoefficientTextField';

// Styles
import classes from './RateModal.module.scss';

interface RateModalProps {
  value: number;
  setValue: (value: number | ((prevVar: number) => number)) => void;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  title: string;
  newRateTitle: string;
  contractCurrency: string;
}

enum Names {
  value = 'value',
  startAt = 'startAt'
}

const validationSchema = yup.object({
  [Names.value]: yup.number().min(0),
  [Names.startAt]: yup.date()
});

const RateModal: FC<RateModalProps> = ({
  value,
  setValue,
  isOpen,
  setOpen,
  title,
  newRateTitle,
  contractCurrency
}) => {
  const { loading, getCoefficients, currentCoefficients, addNewCoefficient } =
    salaryStore;

  const formik = useFormik({
    initialValues: {
      [Names.value]: value,
      [Names.startAt]: dayjs()
    },
    validationSchema,
    onSubmit: (values) => {
      setValue(values.value);
    }
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f36d25'
      }
    }
  });

  const handleClose = useCallback((cIsOpen: boolean) => {
    formik.submitForm();
    setOpen(!cIsOpen);
  }, []);

  useEffect(() => {
    getCoefficients();
  }, []);

  return (
    <Profile isOpen={isOpen} handleClose={handleClose}>
      <ThemeProvider theme={theme}>
        <Box className={classes.box}>
          <div className={classes.modalContainer}>
            <Grid container spacing={1} className={classes.header}>
              <Grid item xs={11}>
                <h2 className={classes.titleFont}>{title}</h2>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => handleClose(isOpen)}>
                  <Close className={classes.close} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1.5}
              className={clsx(classes.gridContainer, classes.gridItem)}
            >
              <Grid container spacing={1.5} className={classes.gridContainer}>
                <Grid item xs="auto" className={classes.font}>
                  {newRateTitle}
                </Grid>
                <Grid item xs={3.4}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {contractCurrency === ContractCurrencyVariant.usd ? (
                            <AttachMoneyIcon />
                          ) : (
                            <CurrencyRuble />
                          )}
                        </InputAdornment>
                      ),
                      classes: {
                        root: classes.font
                      }
                    }}
                    variant="standard"
                    value={formik.values.value.toString()}
                    onChange={(e) => {
                      formik.setFieldValue(
                        'value',
                        Number(e.currentTarget.value),
                        true
                      );
                    }}
                  />
                </Grid>
              </Grid>
              {title === 'Edit monthly salary net' ? (
                <>
                  <Grid container spacing={0.2}>
                    {loading ? (
                      <div className={classes.loading}>
                        <Loading />
                      </div>
                    ) : (
                      <List
                        className={clsx(classes.list, {
                          [classes.scrollNone]:
                            currentCoefficients?.length === 0
                        })}
                      >
                        <TransitionGroup>
                          {currentCoefficients
                            ? currentCoefficients.map((item) => (
                                <Collapse key={item.id}>
                                  <ListItem
                                    key={item.id}
                                    sx={{
                                      '&:before': {
                                        display: 'none'
                                      }
                                    }}
                                    className={classes.gridItem}
                                  >
                                    <SelectCoefficientTextField
                                      coefficient={item}
                                    />
                                  </ListItem>
                                </Collapse>
                              ))
                            : ''}
                        </TransitionGroup>
                      </List>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton onClick={addNewCoefficient}>
                      <Add className={classes.addIcon} />
                      <span className={classes.orangeText}>
                        Add a coefficient
                      </span>
                    </IconButton>
                  </Grid>
                </>
              ) : (
                ''
              )}
            </Grid>

            <Grid container spacing={1.5} className={clsx(classes.timeFrom)}>
              <Grid item xs={4} className={clsx(classes.font, classes.apply)}>
                Apply this rate to:
              </Grid>
              <Grid
                container
                className={clsx(classes.gridContainer, classes.timeFrom)}
              >
                <Grid
                  item
                  xs={3.5}
                  className={clsx(classes.font, classes.gridItem)}
                >
                  Time entries from
                </Grid>
                <Grid item xs={3.5}>
                  <DatePicker
                    date={formik.values.startAt}
                    onChange={(val) => {
                      formik.setFieldValue('startAt', val, true);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  className={clsx(classes.font, classes.gridItem)}
                >
                  onwards
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={1} className={classes.buttonBox}>
              <Grid item xs={3.5}>
                <Button className={classes.buttonWithoutBorders}>DELETE</Button>
              </Grid>
              <Grid item xs={3.5}>
                <Button
                  className={classes.buttonWithoutBorders}
                  onClick={() => handleClose(isOpen)}
                >
                  CANCEL
                </Button>
              </Grid>
              <Grid item xs={4.5}>
                <Button
                  className={classes.save}
                  onClick={() => handleClose(isOpen)}
                >
                  SAVE
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};

export default observer(RateModal);
