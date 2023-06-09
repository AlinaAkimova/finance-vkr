import React, { FC } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';

// Styles
import classes from './DropdownIndicator.module.scss';

export interface DropdownIndicatorProps {
  sortDir: 1 | -1;
  active: boolean;
}

const DropdownIndicator: FC<DropdownIndicatorProps> = ({ sortDir, active }) => {
  return (
    <>
      <ArrowDropUp
        className={clsx(classes.arrows, {
          [classes.arrowNone]: sortDir === 1 || !active
        })}
      />
      <ArrowDropDown
        className={clsx(classes.arrows, {
          [classes.arrowNone]: sortDir === -1 && active
        })}
      />
    </>
  );
};

export default observer(DropdownIndicator);
