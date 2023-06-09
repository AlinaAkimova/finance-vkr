import React, { FC, useCallback, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { startOfMonth, endOfMonth } from 'date-fns';
import { DateRange } from 'react-day-picker';

// Components
import TabsView from 'components/Tabs/TabsView';
import DateRangePicker from 'components/DateRangePicker';
import ButtonView from 'components/ButtonView';
import GenerateReport from 'components/modals/GenerateReport';
import TabPanel from 'components/TabPanel';
import ProjectProfitability from './ProjectProfitability/ProjectProfitability';
import ResourceProfitability from './ResourceProfitability/ResourceProfitability';
import TotalProfit from './TotalProfit';

// Styles
import classes from './Reports.module.scss';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const Reports: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [firstDate, setFirstDate] = useState<Date>(new Date());
  const [secondDate, setSecondDate] = useState<Date>(new Date());
  const [rangeType, setRangeType] = useState<string>('ThisMonth');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  });

  const getLabels = () => {
    const monthsNum: string[] = [];
    if (dateRange.from && dateRange.to) {
      for (
        let i = dateRange.from.getMonth();
        i <= dateRange.to.getMonth();
        i += 1
      ) {
        monthsNum.push(months[i]);
      }
    }
    return monthsNum;
  };

  const calendarStateChange = useCallback(() => {
    setIsCalendarOpen((val) => !val);
  }, []);

  console.log(firstDate);
  return (
    <div className={classes.wrapper}>
      <div className={classes.upperLevel}>
        <h1 className={classes.pageHeader}>Profit forecasted</h1>
        <ButtonView
          label="Generate report"
          isButtonClick={isModalOpen}
          setIsButtonClick={setIsModalOpen}
        />
      </div>
      <div className={classes.navigateItem}>
        <div>
          <TabsView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
              'Total profit',
              'Project profitability',
              'Resource profitability'
            ]}
          />
        </div>
        <div className={classes.calendarButtons}>
          <button
            type="button"
            className={classes.buttonItem}
            onClick={calendarStateChange}
          >
            <CalendarMonthIcon /> Select date range <ArrowDropDownIcon />
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
      <TabPanel value={activeTab} index={0}>
        <TotalProfit
          labelsArr={getLabels()}
          start={firstDate.toISOString()}
          end={secondDate.toISOString()}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <ProjectProfitability
          labelsArr={getLabels()}
          start={firstDate.toISOString()}
          end={secondDate.toISOString()}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <ResourceProfitability />
      </TabPanel>
      <GenerateReport isOpen={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
};

export default Reports;
