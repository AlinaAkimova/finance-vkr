import React, { FC, useEffect, useMemo, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import AccessTime from '@mui/icons-material/AccessTime';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Close from '@mui/icons-material/Close';
import CurrencyExchange from '@mui/icons-material/CurrencyExchange';
import CurrencyRuble from '@mui/icons-material/CurrencyRuble';

// Types
import { User } from 'types/user';

// API
import { refreshMember } from 'api/members';

// Stores
import rateStore from 'stores/RateStore';
import membersStore from 'stores/MembersStore';
import plannerStore from 'stores/PlannerStore';

// Components
import Profile from 'layouts/ProfileLayout';
import ButtonWorkHours from 'components/ButtonWorkHoursView/ButtonWorkHours';

// Theme
import theme from 'theme';

// Styles
import classes from './PlannerPersonModal.module.scss';

interface PlannerPersonModalProps {
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  title: string;
  user?: User;
}

interface AddPlannerPerson {
  id: string;
  defaultRate: number;
  defaultWeeklyCapacity: number;
  defaultExpertize: string;
  workDays: number[];
}

const expertises = [
  {
    value: 'PA'
  },
  {
    value: 'QA'
  },
  {
    value: 'Fullstack'
  },
  {
    value: 'Designer'
  },
  {
    value: 'Frontend'
  },
  {
    value: 'Flutter'
  },
  {
    value: 'IOS'
  },
  {
    value: 'Android'
  },
  {
    value: 'Backend'
  }
];

const PlannerPersonModal: FC<PlannerPersonModalProps> = ({
  isOpen,
  setOpen,
  title,
  user
}) => {
  const { members } = membersStore;

  const usersWithoutPlanner = useMemo(
    () => members.filter((member) => !member.hasPlanner),
    [members]
  );
  const [isButtonMondayWorkHoursClick, setIsButtonMondayWorkHoursClick] =
    useState<boolean>(true);
  const [isButtonTuesdayWorkHoursClick, setIsButtonTuesdayWorkHoursClick] =
    useState<boolean>(true);
  const [isButtonWednesdayWorkHoursClick, setIsButtonWednesdayWorkHoursClick] =
    useState<boolean>(true);
  const [isButtonThursdayWorkHoursClick, setIsButtonThursdayWorkHoursClick] =
    useState<boolean>(true);
  const [isButtonFridayWorkHoursClick, setIsButtonFridayWorkHoursClick] =
    useState<boolean>(true);
  const [isButtonSaturdayWorkHoursClick, setIsButtonSaturdayWorkHoursClick] =
    useState<boolean>(false);
  const [isButtonSundayWorkHoursClick, setIsButtonSundayWorkHoursClick] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [rubleValue, setRubleValue] = useState<number>(0);
  const [expertiseValue, setExpertiseValue] = useState<string>('');
  const [hoursValue, setHoursValue] = useState<string | null>('');
  const [capacityValue, setCapacityValue] = useState<number>(0);
  const isEditPerson = title === 'Edit person';

  const handleAddAssignment = useCallback((newUser: AddPlannerPerson) => {
    if (newUser) {
      plannerStore.addPlannerUser({
        userId: newUser.id,
        defaultRate: newUser.defaultRate,
        defaultWeeklyCapacity: newUser.defaultWeeklyCapacity,
        defaultExpertize: newUser.defaultExpertize,
        workDays: [0, 1, 2, 3, 4]
      });
      plannerStore.getPlannerUsers();
    }
    refreshMember({
      userId: newUser.id,
      defaultRate: newUser.defaultRate,
      defaultWeeklyCapacity: newUser.defaultWeeklyCapacity,
      defaultExpertize: newUser.defaultExpertize
    });
  }, []);

  useEffect(() => {
    membersStore.loadMembers();
    rateStore.getDollarRate();
    if (user) {
      setRubleValue(user.defaultRate);
      setExpertiseValue(user.defaultExpertize);
      setHoursValue(String(user.defaultWeeklyCapacity / 5));
      setCapacityValue(user.defaultWeeklyCapacity);
    }
  }, []);

  const close = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const handleUser = (id: string) => {
    setUserId(id);
  };
  const handleRate = (rate: number) => {
    setRubleValue(rate);
  };

  const handleExpertise = (expertise: string) => {
    setExpertiseValue(expertise);
  };

  const handleCapacity = (capacity: number) => {
    setCapacityValue(capacity);
  };

  return (
    <Profile isOpen={isOpen} handleClose={close}>
      <ThemeProvider theme={theme}>
        <div className={classes.wrapper}>
          <div className={classes.headerContainer}>
            <div>{title}</div>
            <IconButton
              onClick={() => {
                close();
              }}
            >
              <Close className={classes.close} />
            </IconButton>
          </div>
          <div className={classes.fullTextFieldContainer}>
            <div className={classes.name}>Member name</div>
            <TextField
              id="standard-basic"
              variant="standard"
              select={!isEditPerson}
              color="primary"
              InputProps={{
                classes: {
                  root: classes.font
                }
              }}
              className={classes.fullTextField}
              onChange={(e) => handleUser(e.target.value)}
              value={isEditPerson ? undefined : userId}
              defaultValue={user?.name}
            >
              {isEditPerson
                ? user?.name
                : usersWithoutPlanner.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
            </TextField>
          </div>
          <div className={classes.fullTextFieldContainer}>
            <div className={classes.name}>Billable rate</div>
            <TextField
              id="standard-basic"
              variant="standard"
              color="primary"
              InputProps={{
                startAdornment: <CurrencyRuble className={classes.icon} />,
                classes: {
                  root: classes.font
                }
              }}
              value={rubleValue}
              onChange={(e) => handleRate(Number(e.target.value))}
              className={classes.rateTextField}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              color="primary"
              InputProps={{
                startAdornment: <AttachMoney className={classes.dollarIcon} />,
                classes: {
                  root: classes.font
                }
              }}
              value={(Number(rubleValue) / rateStore.rate).toFixed(2)}
              className={classes.rateTextField}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              color="primary"
              InputProps={{
                startAdornment: <CurrencyExchange className={classes.icon} />,
                classes: {
                  root: classes.font
                }
              }}
              value={rateStore.rate}
              className={classes.rateTextField}
            />
          </div>
          <div className={classes.fullTextFieldContainer}>
            <div className={classes.name}>Expertise</div>
            <TextField
              id="standard-basic"
              variant="standard"
              color="primary"
              InputProps={{
                classes: {
                  root: classes.font
                }
              }}
              select
              value={expertiseValue}
              onChange={(e) => handleExpertise(e.target.value)}
              className={classes.fullTextField}
            >
              {expertises.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.minTextFieldContainer}>
            <Grid className={classes.nameMinTextField} item xs={2}>
              Hours/Day
            </Grid>
            <TextField
              id="standard-basic"
              variant="standard"
              color="primary"
              InputProps={{
                classes: {
                  root: classes.font
                }
              }}
              sx={{
                '.MuiTextField-root': {
                  color: '#f36d25'
                }
              }}
              value={hoursValue}
              onChange={(e) => setHoursValue(e.target.value)}
              className={classes.minTextField}
            />
            <div className={classes.info}>100% of 8 h/d</div>
          </div>
          <div className={classes.minTextFieldContainer}>
            <Grid className={classes.nameMinTextField} item xs={2}>
              Capacity
            </Grid>
            <TextField
              id="standard-basic"
              variant="standard"
              color="primary"
              className={classes.minTextField}
              InputProps={{
                startAdornment: <AccessTime className={classes.timeIcon} />,
                classes: {
                  root: classes.font
                }
              }}
              sx={{
                '.MuiTextField-root': {
                  color: '#f36d25'
                }
              }}
              value={capacityValue}
              onChange={(e) => handleCapacity(Number(e.target.value))}
            />
            <div className={classes.info}>hours per week</div>
          </div>
          <div className={classes.workDaysContainer}>
            <div className={classes.name}>Work days</div>
            <div className={classes.buttonContainerWorkDays}>
              <ButtonWorkHours
                isButtonClick={isButtonMondayWorkHoursClick}
                setIsButtonClick={(value: boolean) => {
                  setIsButtonMondayWorkHoursClick(value);
                }}
                label="M"
              />
              <ButtonWorkHours
                isButtonClick={isButtonTuesdayWorkHoursClick}
                setIsButtonClick={setIsButtonTuesdayWorkHoursClick}
                label="T"
              />
              <ButtonWorkHours
                isButtonClick={isButtonWednesdayWorkHoursClick}
                setIsButtonClick={setIsButtonWednesdayWorkHoursClick}
                label="W"
              />
              <ButtonWorkHours
                isButtonClick={isButtonThursdayWorkHoursClick}
                setIsButtonClick={setIsButtonThursdayWorkHoursClick}
                label="T"
              />
              <ButtonWorkHours
                isButtonClick={isButtonFridayWorkHoursClick}
                setIsButtonClick={setIsButtonFridayWorkHoursClick}
                label="F"
              />
              <ButtonWorkHours
                isButtonClick={isButtonSaturdayWorkHoursClick}
                setIsButtonClick={setIsButtonSaturdayWorkHoursClick}
                label="S"
              />
              <ButtonWorkHours
                isButtonClick={isButtonSundayWorkHoursClick}
                setIsButtonClick={setIsButtonSundayWorkHoursClick}
                label="S"
              />
            </div>
          </div>
          <div className={classes.buttonBox}>
            <Button
              className={classes.buttonWithoutBorders}
              onClick={() => {
                close();
              }}
            >
              CANCEL
            </Button>
            <Button
              className={classes.save}
              onClick={() => {
                handleAddAssignment({
                  id: userId,
                  defaultRate: rubleValue,
                  defaultWeeklyCapacity: capacityValue,
                  defaultExpertize: expertiseValue,
                  workDays: [0, 1, 2, 3, 4]
                });
                close();
              }}
            >
              SAVE
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </Profile>
  );
};

export default observer(PlannerPersonModal);
