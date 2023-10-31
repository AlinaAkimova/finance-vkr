import React, { FC, useState, useCallback } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import clsx from 'clsx';

import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth
} from 'date-fns';

// Components
import { DateRange, DayPicker } from 'react-day-picker';

// Styles
import styles from './DateRangePicker.module.scss';

interface IProps {
  isOpen: boolean;
  onClose: (val: boolean) => void;
  firstDate: Date;
  onFirstDateChange: (date: Date) => void;
  secondDate: Date;
  onSecondDateChange: (date: Date) => void;
  rangeType: string;
  onRangeTypeChange: (str: string) => void;
  datesRange: DateRange;
  onDatesRangeChange: (r: DateRange) => void;
}

enum RangeType {
  ThisWeek = 'ThisWeek',
  LastWeek = 'LastWeek',
  ThisMonth = 'ThisMonth',
  Last3Months = 'Last3Months',
  Last6Months = 'Last6Months',
  Next3Months = 'Next3Months',
  Next6Months = 'Next6Months'
}

const DateRangePicker: FC<IProps> = ({
  isOpen,
  onClose,
  firstDate,
  onFirstDateChange,
  secondDate,
  onSecondDateChange,
  rangeType,
  onRangeTypeChange,
  datesRange,
  onDatesRangeChange
}) => {
  const [range, setRange] = useState<DateRange>(datesRange);
  const [startDate, setStartDate] = useState<Date>(startOfMonth(firstDate));
  const [endDate, setEndDate] = useState<Date>(endOfMonth(secondDate));
  const [activeRange, setActiveRange] = useState<string>(rangeType);

  const handleChange = useCallback((value?: DateRange) => {
    if (!value) {
      return;
    }
    setRange(value);

    if (value.from) {
      setStartDate(value.from);
    }

    if (value.to) {
      setEndDate(value.to);
    }
  }, []);

  const onCancel = useCallback(() => {
    onClose(false);
  }, [onClose]);

  const onSubmit = () => {
    onDatesRangeChange(range);
    onFirstDateChange(startDate);
    onSecondDateChange(endDate);
    onRangeTypeChange(activeRange);
    onClose(false);
  };

  const changeRange = useCallback(
    (
      newRange: string,
      primaryDate: Date | number,
      secondaryDate: Date | number
    ) => {
      const temporaryDateRange: DateRange = {
        from: startOfWeek(primaryDate, { weekStartsOn: 1 }),
        to: endOfWeek(secondaryDate, { weekStartsOn: 1 })
      };

      setRange(temporaryDateRange);
      setActiveRange(newRange);

      if (temporaryDateRange.from) {
        setStartDate(temporaryDateRange.from);
      }

      if (temporaryDateRange.to) {
        setEndDate(temporaryDateRange.to);
      }
    },
    []
  );

  const changeHandler = useCallback((newRange: string) => {
    switch (newRange) {
      case RangeType.ThisWeek: {
        const day = new Date();

        changeRange(newRange, day, day);
        break;
      }
      case RangeType.LastWeek: {
        const firstDayOfTheWeek = new Date().getDate() - 7;
        const date = new Date().setDate(firstDayOfTheWeek);

        changeRange(newRange, date, date);
        break;
      }
      case RangeType.ThisMonth: {
        const start = startOfMonth(new Date());
        const end = endOfMonth(new Date());

        changeRange(newRange, start, end);
        break;
      }
      case RangeType.Last3Months: {
        const month = new Date().getMonth() - 2;
        const start = startOfMonth(new Date().setMonth(month));
        const end = endOfMonth(new Date());

        changeRange(newRange, start, end);
        break;
      }
      case RangeType.Last6Months: {
        const month = new Date().getMonth() - 5;
        const start = startOfMonth(new Date().setMonth(month));
        const end = endOfMonth(new Date());

        changeRange(newRange, start, end);
        break;
      }
      case RangeType.Next3Months: {
        const month = new Date().getMonth() + 3;
        const end = endOfMonth(new Date().setMonth(month));
        const start = startOfMonth(new Date().setMonth(month - 2));

        changeRange(newRange, start, end);
        break;
      }
      case RangeType.Next6Months: {
        const month = new Date().getMonth() + 6;
        const end = endOfMonth(new Date().setMonth(month));
        const start = startOfMonth(new Date().setMonth(month - 5));

        changeRange(newRange, start, end);
        break;
      }
      default:
        break;
    }
  }, [changeRange]);

  return (
    <div>
      {isOpen && (
        <ClickAwayListener onClickAway={onCancel}>
          <div className={styles.container}>
            <div className={styles.main}>
              <div className={styles.sidebar}>
                <div className={styles.list}>
                  <div
                    className={clsx({
                      [styles.active]: activeRange === RangeType.ThisWeek
                    })}
                    onClick={() => changeHandler(RangeType.ThisWeek)}
                  >
                    <p>This week</p>
                  </div>
                  <div
                    className={clsx({
                      [styles.active]: activeRange === RangeType.LastWeek
                    })}
                    onClick={() => changeHandler(RangeType.LastWeek)}
                  >
                    <p>Last week</p>
                  </div>
                  <div
                    className={clsx({
                      [styles.active]: activeRange === RangeType.ThisMonth
                    })}
                    onClick={() => changeHandler(RangeType.ThisMonth)}
                  >
                    <p>This month</p>
                  </div>
                  <div
                    className={clsx({
                      [styles.active]: activeRange === RangeType.Last3Months
                    })}
                    onClick={() => changeHandler(RangeType.Last3Months)}
                  >
                    <p>Last 3 month</p>
                  </div>
                  <div
                    className={clsx({
                      [styles.active]: activeRange === RangeType.Last6Months
                    })}
                    onClick={() => changeHandler(RangeType.Last6Months)}
                  >
                    <p>Last 6 month</p>
                  </div>
                  <div
                    className={clsx({
                      [styles.active]: activeRange === RangeType.Next3Months
                    })}
                    onClick={() => changeHandler(RangeType.Next3Months)}
                  >
                    <p>Next 3 month</p>
                  </div>
                  <div
                    className={clsx({
                      [styles.active]: activeRange === RangeType.Next6Months
                    })}
                    onClick={() => changeHandler(RangeType.Next6Months)}
                  >
                    <p>Next 6 month</p>
                  </div>
                </div>
              </div>
              <div className={styles.dates}>
                <div className={styles.inputs}>
                  <input
                    type="text"
                    value={format(startDate, 'dd.MM.yyyy')}
                    readOnly
                  />
                  <p>—</p>
                  <input
                    type="text"
                    value={format(endDate, 'dd.MM.yyyy')}
                    readOnly
                  />
                </div>
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={handleChange}
                  showOutsideDays
                  weekStartsOn={1}
                />
              </div>
            </div>
            <div className={styles.footer}>
              <button type="button" onClick={onCancel}>
                CANCEL
              </button>
              <button type="button" onClick={() => onSubmit()}>
                APPLY
              </button>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default DateRangePicker;
