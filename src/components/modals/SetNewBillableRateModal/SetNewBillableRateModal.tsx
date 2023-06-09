import React, {
  FC,
  useCallback,
  useState,
  useMemo,
  ChangeEvent,
  useEffect
} from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { observer } from 'mobx-react-lite';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

// Icons
import Close from '@mui/icons-material/Close';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Components
import DatePicker from 'components/DatePicker';

// Stores
import rateStore from 'stores/RateStore';
import expertiseStore from 'stores/ExpertiseStore';

// Types
import { ExpertizeVariant } from 'types/user';
import { IRate } from 'types/rate';

// Theme
import theme from 'theme';

// Styles
import classes from './SetNewBillableRateModal.module.scss';

interface IProps {
  item?: IRate;
  projectId: string;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  checked: boolean;
}

const SetNewBillableRate: FC<IProps> = ({
  item,
  projectId,
  isOpen,
  setOpen,
  checked
}) => {
  const [expertise, setExpertise] = useState<string>('');
  const [rate, setRate] = useState<number>(0);
  const [newExpertise, setNewExpertise] = useState<boolean>(true);
  const [startAt, setStartAt] = useState<Dayjs | null>(null);

  const handleAddRate = useCallback(() => {
    expertiseStore.addExpertise(projectId, {
      projectId,
      expertise,
      rate,
      startAt: startAt?.toISOString()
    });
  }, [expertise, rate, startAt]);

  const handleUpdate = useCallback(() => {
    if (item) {
      setExpertise(item.expertise);
      setRate(item.rate);
      setStartAt(dayjs(item.startAt));
    }
  }, [item]);

  const deleteProject = useCallback(() => {
    if (item) {
      expertiseStore.deleteExpertise(item);
    }
  }, [item]);

  useEffect(() => {
    if (isOpen && item) {
      handleUpdate();
    }
  }, [item]);

  const expertiseChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setExpertise(e.target.value);
  }, []);

  const rateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRate(Number(e.target.value));
  }, []);

  const handleClose = useCallback(() => {
    setOpen((prev) => !prev);
  }, [isOpen]);

  const rubbleExchangeValue = useMemo(() => {
    return (Number(rate) * rateStore.rate).toFixed(2);
  }, [rate]);

  return (
    <Profile isOpen={isOpen}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} className={classes.pageName}>
          <Grid item xs={11}>
            {item ? <h2>Rate information</h2> : <h2>Set rate</h2>}
          </Grid>

          <Grid item xs={1}>
            <IconButton onClick={() => handleClose()}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>

        <Box className={classes.textFieldBox}>
          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Expertise</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="standard-basic"
                variant="standard"
                select={newExpertise}
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={expertiseChange}
                value={expertise}
              >
                <MenuItem onClick={() => setNewExpertise(false)}>
                  <AddCircleOutlineIcon />
                  Add new expertise
                </MenuItem>
                {Object.values(ExpertizeVariant).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={12}>
              <Typography className={classes.font}>
                What is the new billable rate
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRubleIcon />
                    </InputAdornment>
                  ),
                  classes: {
                    root: classes.font
                  }
                }}
                variant="standard"
                value={checked ? rubbleExchangeValue : rate}
                onChange={rateChange}
                disabled={checked}
              />
            </Grid>

            {checked ? (
              <Grid item xs={4}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                    classes: {
                      root: classes.font
                    }
                  }}
                  variant="standard"
                  value={rate}
                  onChange={rateChange}
                />
              </Grid>
            ) : (
              ''
            )}

            {checked ? (
              <Grid item xs={4}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyExchangeIcon />
                      </InputAdornment>
                    ),
                    classes: {
                      root: classes.font
                    }
                  }}
                  variant="standard"
                  value={rateStore.rate}
                  disabled
                />
              </Grid>
            ) : (
              ''
            )}
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={12}>
              <Typography className={classes.font}>
                Apply this bilable rate to
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.font}>
                Time entries from
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <DatePicker date={startAt} onChange={setStartAt} />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.font}>onwards</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.buttonBox}>
          {item ? (
            <Button
              className={classes.cancel}
              onClick={() => {
                deleteProject();
                handleClose();
              }}
            >
              DELETE
            </Button>
          ) : (
            ''
          )}
          <Button
            className={classes.cancel}
            onClick={() => {
              handleClose();
            }}
          >
            CANCEL
          </Button>
          <Button
            className={classes.save}
            onClick={() => {
              handleAddRate();
              handleClose();
            }}
          >
            SAVE
          </Button>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};
export default observer(SetNewBillableRate);
