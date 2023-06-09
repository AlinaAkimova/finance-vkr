import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { observer } from 'mobx-react-lite';
import { startOfMonth, endOfMonth } from 'date-fns';
import { DateRange } from 'react-day-picker';

// Stores
import plannerStore from 'stores/PlannerStore';
import membersStore from 'stores/MembersStore';

// Components
import TabsView from 'components/Tabs/TabsView';
import ButtonView from 'components/ButtonView';
import PlannerPersonModal from 'components/modals/PlannerPersonModal';
import DateRangePicker from 'components/DateRangePicker';
import PlannerWeek from './PlannerWeek';
import PlannerItem from './PlannerItem';

// Styles
import classes from './Planner.module.scss';

/* 
  TODO: temporary data for planer panel. It used in PlanerItem and PlanerWeek for displaying months,weeks numbers and days. It will be replaced in future. 
  
  month ( string ) is name of month
  workTime ( number ) is used for computing workload. 
  days ( Array<number> ) is array with dates for one week. Array length is 7
  numberWeek ( number ) is number of week.
*/
const weeks = [
  {
    month: 'January',
    workTime: 40,
    days: [1, 2, 3, 4, 5, 6, 7],
    numberWeek: 28
  },
  {
    month: 'January',
    workTime: 36,
    days: [8, 9, 10, 11, 12, 13, 14],
    numberWeek: 29
  },
  {
    month: 'January',
    workTime: 32,
    days: [15, 16, 17, 18, 19, 20, 21],
    numberWeek: 30
  },
  {
    month: 'January',
    workTime: 28,
    days: [22, 23, 24, 25, 26, 27, 28],
    numberWeek: 31
  },
  {
    month: 'February',
    workTime: 24,
    days: [29, 30, 31, 1, 2, 3, 4],
    numberWeek: 32
  },
  {
    month: 'February',
    workTime: 20,
    days: [5, 6, 7, 8, 9, 10, 11],
    numberWeek: 33
  },
  {
    month: 'February',
    workTime: 16,
    days: [12, 13, 14, 15, 16, 17, 18],
    numberWeek: 34
  },
  {
    month: 'February',
    workTime: 12,
    days: [19, 20, 21, 22, 23, 24, 25],
    numberWeek: 35
  },
  {
    month: 'February',
    workTime: 8,
    days: [26, 27, 28, 29, 1, 2, 3],
    numberWeek: 36
  },
  {
    month: 'March',
    workTime: 4,
    days: [4, 5, 6, 7, 8, 9, 10],
    numberWeek: 37
  },
  {
    month: 'March',
    workTime: 0,
    days: [11, 12, 13, 14, 15, 16, 17],
    numberWeek: 38
  },
  {
    month: 'March',
    workTime: 40,
    days: [18, 19, 20, 21, 22, 23, 24],
    numberWeek: 39
  },
  {
    month: 'March',
    workTime: 40,
    days: [25, 26, 27, 28, 29, 30, 31],
    numberWeek: 40
  },
  {
    month: 'July',
    workTime: 40,
    days: [11, 12, 13, 14, 15, 16, 17],
    numberWeek: 41
  },
  {
    month: 'July',
    workTime: 40,
    days: [11, 12, 13, 14, 15, 16, 17],
    numberWeek: 42
  },
  {
    month: 'July',
    workTime: 40,
    days: [11, 12, 13, 14, 15, 16, 17],
    numberWeek: 43
  },
  {
    month: 'July',
    workTime: 40,
    days: [11, 12, 13, 14, 15, 16, 17],
    numberWeek: 44
  },
  {
    month: 'July',
    workTime: 40,
    days: [11, 12, 13, 14, 15, 16, 17],
    numberWeek: 45
  },
  {
    month: 'July',
    workTime: 40,
    days: [11, 12, 13, 14, 15, 16, 17],
    numberWeek: 46
  }
];

const Planner: FC = () => {
  const [startWeek, setStartWeek] = useState<number>(0);
  const [viewWeeks, setViewWeeks] = useState<number>(6);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeUsersTab, setActiveUsersTab] = useState<number>(0);
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] =
    useState<boolean>(false);

  const { users } = plannerStore;

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [firstDate, setFirstDate] = useState<Date>(new Date());
  const [secondDate, setSecondDate] = useState<Date>(new Date());
  const [rangeType, setRangeType] = useState<string>('ThisMonth');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  });

  const calendarStateChange = useCallback(() => {
    setIsCalendarOpen((val) => !val);
  }, []);

  const selectedUsers = useMemo(() => {
    if (activeUsersTab === 0) return users;

    if (activeUsersTab === 1)
      return users.filter(
        (user) => user.defaultLegalStatus?.toLowerCase() === 'employee'
      );

    return users.filter(
      (user) => user.defaultLegalStatus?.toLowerCase() === 'contractor'
    );
  }, [activeUsersTab, users]);

  useEffect(() => {
    membersStore.loadMembers();
    plannerStore.getPlannerUsers();
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.upperLevel}>
        <h1 className={classes.pageHeader}>Planner</h1>
        <ButtonView
          label="Add person"
          isButtonClick={isAddPersonModalOpen}
          setIsButtonClick={setIsAddPersonModalOpen}
        />
      </div>
      <div className={classes.navigateItem}>
        <div className={classes.navigateTable}>
          <TabsView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={['Team', 'Projects']}
          />
        </div>
        <div className={classes.calendarButtons}>
          <button
            type="button"
            disabled={viewWeeks === 4}
            onClick={() => setViewWeeks(viewWeeks - 2)}
            className={classes.buttonItem}
          >
            <AddIcon />
          </button>
          <button
            type="button"
            disabled={viewWeeks === 6}
            onClick={() => setViewWeeks(viewWeeks + 2)}
            className={classes.buttonItem}
          >
            <RemoveIcon />
          </button>
          <button
            type="button"
            className={classes.buttonItem}
            onClick={calendarStateChange}
          >
            <CalendarMonthIcon /> Select date range <ArrowDropDownIcon />
          </button>
          <button
            type="button"
            disabled={startWeek === 0}
            onClick={() => {
              setStartWeek(startWeek - 1);
            }}
            className={classes.buttonItem}
          >
            <ArrowBackIosIcon />
          </button>
          <button
            type="button"
            disabled={startWeek === weeks.length - viewWeeks}
            onClick={() => {
              setStartWeek(startWeek + 1);
            }}
            className={classes.buttonItem}
          >
            <ArrowForwardIosIcon />
          </button>
          <DateRangePicker
            isOpen={isCalendarOpen}
            onClose={setIsCalendarOpen}
            firstDate={firstDate}
            onFirstDateChange={setFirstDate}
            secondDate={secondDate}
            onSecondDateChange={setSecondDate}
            rangeType={rangeType}
            onRangeTypeChange={setRangeType}
            datesRange={dateRange}
            onDatesRangeChange={setDateRange}
          />
        </div>
      </div>
      <div className={classes.headers}>
        <div className={classes.members}>
          <TabsView
            activeTab={activeUsersTab}
            setActiveTab={setActiveUsersTab}
            tabs={['All', 'Employee', 'Contractor']}
          />
        </div>
        {weeks.slice(startWeek, startWeek + viewWeeks).map((week) => (
          <PlannerWeek isHeader week={week} key={week.numberWeek} />
        ))}
      </div>
      {selectedUsers.map((user) => (
        <PlannerItem
          key={user.id}
          startWeek={startWeek}
          viewWeeks={viewWeeks}
          weeks={weeks}
          user={user}
        />
      ))}
      <PlannerPersonModal
        isOpen={isAddPersonModalOpen}
        setOpen={setIsAddPersonModalOpen}
        title="Add person"
      />
    </div>
  );
};

export default observer(Planner);
