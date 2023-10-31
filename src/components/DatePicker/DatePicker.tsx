import React, { FC, useCallback, ChangeEvent, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'date-fns/locale/en-US';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface IProps {
  date: Dayjs | null;
  onChange: (newDate: Dayjs | null) => void;
}

const DatePicker: FC<IProps> = ({ date, onChange }) => {
  useEffect(() => {
    if (locale && locale.options) {
      locale.options.weekStartsOn = 1;
    }
  }, []);

  const handleChange = useCallback(
    (value: ChangeEvent<HTMLInputElement> | null) => {
      if (value) {
        onChange(dayjs(value.toString()));
      }
    },
    [onChange]
  );

  const renderInput = (params: TextFieldProps) => (
    <TextField
      {...params}
      variant="standard"
      fullWidth
      label={null}
      value={date}
    />
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <DesktopDatePicker
        label="Date desktop"
        format="PP"
        value={date as any}
        onChange={handleChange}
        closeOnSelect
        // slotProps={{
        //   textField: {
        //     fontFamily: 'Ubuntu-Light'
        //   }
        // }}
        slots={{
          openPickerIcon: CalendarMonthIcon,
          textField: renderInput
        }}
        views={['month', 'day']}
        showDaysOutsideCurrentMonth
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
