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
    (
      value: ChangeEvent<HTMLInputElement> | null,
      keyboardInputValue?: string | undefined
    ) => {
      if (value) {
        onChange(dayjs(value.toString()));
      } else if (keyboardInputValue) {
        onChange(dayjs(keyboardInputValue));
      }
    },
    []
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
        inputFormat="PP"
        value={date}
        onChange={handleChange}
        closeOnSelect
        disableMaskedInput
        renderInput={renderInput}
        InputProps={{
          sx: {
            '& .MuiInputBase-input': {
              fontFamily: 'Ubuntu-Light'
            }
          }
        }}
        components={{
          OpenPickerIcon: CalendarMonthIcon
        }}
        views={['month', 'day']}
        showDaysOutsideCurrentMonth
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
