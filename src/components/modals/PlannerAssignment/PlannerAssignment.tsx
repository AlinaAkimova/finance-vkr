import { useFormik } from 'formik';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import dayjs, { Dayjs } from 'dayjs';

import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import IconButton from '@mui/material/IconButton';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// Theme
import theme from 'theme';

// Components
import Profile from 'layouts/ProfileLayout';
import DatePicker from 'components/DatePicker';

// Icons
import { ReactComponent as CopyItem } from 'assets/icons/copyItem.svg';

// Types
import { AssigmentUser } from 'types/planner';
import { User } from 'types/user';

// Stores
import rateStore from 'stores/RateStore';
import plannerStore from 'stores/PlannerStore';
import membersStore from 'stores/MembersStore';
import projectsStore from 'stores/ProjectsStore';

// Styles
import classes from './PlannerAssignment.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface PlannerAssignmentProps {
  active: boolean;
  setActive: (active: boolean) => void;
  user: User;
}

const PlannerAssignment: FC<PlannerAssignmentProps> = ({
  active,
  setActive,
  user
}) => {
  const expetizes = [
    'PA',
    'QA',
    'Fullstack',
    'Designer',
    'Frontend',
    'Flutter',
    'IOS',
    'Android',
    'Backend'
  ];
  const { members } = membersStore;
  const { projects } = projectsStore;

  const plannerUsers = useMemo(
    () => members.filter((member) => member.hasPlanner),
    [members]
  );

  const {
    id,
    name,
    defaultRate,
    defaultExpertize,
    defaultWeeklyCapacity,
    workDays
  } = user;

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const handleClose = useCallback((cIsOpen: boolean) => {
    setActive(!cIsOpen);
  }, []);

  const formik = useFormik({
    initialValues: {
      userId: id,
      projectId: projects?.length ? projects[0].id : '',
      rate: defaultRate,
      expertize: defaultExpertize,
      dailyHours: defaultWeeklyCapacity / workDays.length,
      startAt: new Date().toISOString(),
      endAt: new Date().toISOString()
    },
    onSubmit: (assignmentUser: AssigmentUser) => {
      plannerStore.assignmentPlannerUser({
        ...assignmentUser,
        startAt: startDate?.toISOString() || formik.values.startAt,
        endAt: endDate?.toISOString() || formik.values.endAt
      });
    }
  });

  const rateDollars = useMemo(
    () => formik.values.rate / rateStore.rate,
    [formik.values.rate, rateStore.rate]
  );

  if (!active) {
    return null;
  }
  return (
    <Profile isOpen={active} handleClose={handleClose}>
      <ThemeProvider theme={theme}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>Assignment</div>
          <IconButton onClick={() => handleClose(active)}>
            <CloseIcon className={classes.closeItem} />
          </IconButton>
        </div>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <div className={classes.inputWrapper}>
            <div className={classes.label}>Member name</div>
            <TextField
              select
              variant="standard"
              fullWidth
              className={classes.formItem}
              defaultValue={name}
            >
              <MenuItem className={classes.option} value="Placeholder">
                Placeholder
              </MenuItem>
              {plannerUsers.map((member) => (
                <MenuItem
                  key={member.id}
                  className={classes.option}
                  value={member.name}
                >
                  {member.name}
                </MenuItem>
              ))}
            </TextField>
            <CopyItem className={classes.valuteIcon} />
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.label}>Project name</div>
            <TextField
              select
              variant="standard"
              fullWidth
              className={classes.formItem}
              defaultValue=""
              value={formik.values.projectId}
              onChange={formik.handleChange}
            >
              {projects
                ? projects.map((project) => (
                    <MenuItem
                      key={project.id}
                      className={classes.option}
                      value={project.id}
                    >
                      {project.name}
                    </MenuItem>
                  ))
                : ''}
            </TextField>
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.label}>Client</div>
            <input
              name="client"
              className={classes.formItem}
              value={projects?.length ? projects[0]?.name : ''}
              disabled
            />
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.label}>Billable rate</div>
            <div className={classes.valuteItem}>
              <CurrencyRubleIcon
                className={classes.valuteIcon}
                fontSize="small"
              />
              <input
                type="number"
                name="rate"
                onChange={formik.handleChange}
                className={classes.valute}
                value={formik.values.rate}
              />
            </div>
            <div className={classes.valuteItem}>
              <AttachMoneyIcon
                className={classes.valuteIcon}
                fontSize="small"
              />
              <input
                type="number"
                name="rateDollar"
                onChange={formik.handleChange}
                className={classes.valute}
                value={rateDollars}
              />
            </div>
            <div className={classes.valuteItem}>
              <CurrencyExchangeIcon
                className={classes.valuteIcon}
                fontSize="small"
              />
              <input
                type="number"
                name="exchangeRate"
                onChange={formik.handleChange}
                className={classes.exchangeRate}
                value={rateStore.rate}
              />
            </div>
            <div />
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.label}>Expertize</div>
            <TextField
              select
              variant="standard"
              fullWidth
              name="expertize"
              onChange={formik.handleChange}
              className={classes.formItem}
              defaultValue={formik.values.expertize}
            >
              {expetizes.map((expetize) => (
                <MenuItem
                  key={expetize}
                  className={classes.option}
                  value={expetize}
                >
                  {expetize}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.label}>Hours/Day</div>
            <input
              type="number"
              name="dailyHours"
              onChange={formik.handleChange}
              className={classes.hoursItem}
              value={formik.values.dailyHours}
            />
            <div className={classes.smallLabel}>100% of 8 h/d</div>
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.label}>Total Hours</div>
            <input
              type="number"
              name="totalHours"
              className={classes.hoursItem}
              value="8"
            />
            <div className={classes.smallLabel}>across 22 days</div>
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.label}>Start date</div>
            <DatePicker date={startDate} onChange={setStartDate} />
          </div>
          <div className={classes.inputWrapper}>
            <div className={classes.label}>End date</div>
            <DatePicker date={endDate} onChange={setEndDate} />
          </div>
          <div className={classes.buttons}>
            <button className={classes.button} type="button">
              DELETE
            </button>
            <button
              onClick={() => setActive(false)}
              className={classes.button}
              type="button"
            >
              CANCEL
            </button>
            <button
              onClick={() => setActive(false)}
              className={classes.fullButton}
              type="submit"
            >
              SAVE
            </button>
          </div>
        </form>
      </ThemeProvider>
    </Profile>
  );
};

export default observer(PlannerAssignment);
