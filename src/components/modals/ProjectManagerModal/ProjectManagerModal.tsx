import React, { FC, useState, ChangeEvent, useCallback } from 'react';
import clsx from 'clsx';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Paper from '@mui/material/Paper';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// Icons
import Close from '@mui/icons-material/Close';

// Types
import { IProject } from 'types/project';
import dayjs, { Dayjs } from 'dayjs';

// Components
import DatePicker from 'components/DatePicker';

// Images
import archive from 'assets/img/archive.svg';

// Styles
import classes from './ProjectManagerModal.module.scss';

interface IProps {
  item: IProject;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ProjectManagerModal: FC<IProps> = ({ item, isOpen, setOpen }) => {
  const [projectName, setProjectName] = useState<string>(item.name);
  const [client, setClient] = useState<string | undefined>(item.clientId);
  const [color, setColor] = useState<string | undefined>(item.colour);
  const [assignedHours, setAssignedHours] = useState<number>(666);
  const [firstDate, setFirstDate] = useState<Dayjs | null>(dayjs(item.startAt));
  const [secondDate, setSecondDate] = useState<Dayjs | null>(dayjs(item.endAt));
  const [choosenField, setChoosenField] = useState<string | null>(null);

  const [isHrsShown, setIsHrsShown] = useState<boolean>(false);

  const handleClose = useCallback((isModalOpen: boolean) => {
    setOpen(!isModalOpen);
  }, []);

  const setNameByRow = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  }, []);

  const clientChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
  }, []);

  const colorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  }, []);

  const setHoursByRow = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (!value) {
      return;
    }

    setAssignedHours(value);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f36d25'
      }
    }
  });

  return (
    <Grid
      className={clsx({
        [classes.mainContainer]: isOpen,
        [classes.mainContainerIsClosed]: !isOpen
      })}
    >
      <ThemeProvider theme={theme}>
        <Paper variant="elevation" elevation={2} className={classes.Paper}>
          <div className={classes.customGridBox}>
            <h2 className={classes.pageName}>Edit project</h2>
            <div>
              <IconButton onClick={() => handleClose(isOpen)}>
                <img
                  src={archive}
                  alt="Archive/Unarchive"
                  width={24}
                  height={24}
                />
              </IconButton>
              <IconButton onClick={() => handleClose(isOpen)}>
                <Close />
              </IconButton>
            </div>
          </div>

          <Box className={classes.textFieldBox}>
            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={4}>
                <Typography
                  className={clsx(classes.font, {
                    [classes.choosenField]: choosenField === 'pn'
                  })}
                >
                  Project name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="standard"
                  fullWidth
                  onFocus={() => {
                    setChoosenField('pn');
                  }}
                  onBlur={() => {
                    setChoosenField(null);
                  }}
                  value={projectName}
                  onChange={setNameByRow}
                  InputProps={{
                    classes: {
                      root: classes.font
                    }
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={4}>
                <Typography
                  className={clsx(classes.font, {
                    [classes.choosenField]: choosenField === 'c'
                  })}
                >
                  Client
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth onChange={clientChange}>
                  <NativeSelect
                    className={classes.font}
                    defaultValue={client}
                    onFocus={() => {
                      setChoosenField('c');
                    }}
                    onBlur={() => {
                      setChoosenField(null);
                    }}
                  >
                    <option value="ooo YYY">ooo YYY</option>
                    <option value="ooo QQQ">ooo QQQ</option>
                    <option value="ooo AAA">ooo AAA</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={4}>
                <Typography
                  className={clsx(classes.font, {
                    [classes.choosenField]: choosenField === 'cl'
                  })}
                >
                  Color label
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth onChange={colorChange}>
                  <NativeSelect
                    className={clsx(classes.font, classes.colorBlack, {
                      [classes.colorRed]: color === 'Red',
                      [classes.colorBlue]: color === 'Blue',
                      [classes.colorPurple]: color === 'Purple'
                    })}
                    defaultValue={color}
                    onFocus={() => {
                      setChoosenField('cl');
                    }}
                    onBlur={() => {
                      setChoosenField(null);
                    }}
                  >
                    <option className={classes.colorRed} value="Red">
                      Red
                    </option>
                    <option className={classes.colorBlue} value="Blue">
                      Blue
                    </option>
                    <option className={classes.colorPurple} value="Purple">
                      Purple
                    </option>
                  </NativeSelect>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={4}>
                <Typography
                  className={clsx(classes.font, {
                    [classes.choosenField]: choosenField === 'a'
                  })}
                >
                  Assigned
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="standard"
                  fullWidth
                  value={
                    isHrsShown ? `${assignedHours} hrs` : `${assignedHours}`
                  }
                  onChange={setHoursByRow}
                  onFocus={() => {
                    setChoosenField('a');
                    setIsHrsShown(false);
                  }}
                  onBlur={() => {
                    setChoosenField(null);
                    setIsHrsShown(true);
                  }}
                  InputProps={{
                    inputMode: 'numeric',
                    classes: {
                      root: classes.font
                    }
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={4}>
                <Typography
                  className={clsx(classes.font, {
                    [classes.choosenField]: choosenField === 'd'
                  })}
                >
                  Start date
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <DatePicker date={firstDate} onChange={setFirstDate} />
              </Grid>
            </Grid>

            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={4}>
                <Typography
                  className={clsx(classes.font, {
                    [classes.choosenField]: choosenField === 'd'
                  })}
                >
                  End date
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <DatePicker date={secondDate} onChange={setSecondDate} />
              </Grid>
            </Grid>

            <Box className={classes.buttonBox}>
              <Button
                className={classes.cancel}
                onClick={() => handleClose(isOpen)}
              >
                CANCEL
              </Button>
              <Button
                onClick={() => handleClose(isOpen)}
                className={classes.save}
              >
                SAVE
              </Button>
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Grid>
  );
};

export default ProjectManagerModal;
