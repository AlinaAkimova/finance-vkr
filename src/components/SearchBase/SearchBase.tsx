import React, { FC, useCallback, useState } from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Search from '@mui/icons-material/Search';

// Styles
import classes from './SearchBase.module.scss';

const SearchBase: FC = () => {
  const [isButtonClick, setButtonClick] = useState<boolean>(false);

  const setStateOnClick = useCallback((state: boolean) => {
    setButtonClick(state);
  }, []);

  return (
    <div>
      <IconButton aria-label="search" onClick={() => setStateOnClick(true)}>
        <Search />
      </IconButton>
      <InputBase
        onClick={() => setStateOnClick(true)}
        className={clsx({
          [classes.openBase]: isButtonClick,
          [classes.closeBase]: !isButtonClick
        })}
        placeholder="Search all..."
        inputProps={{
          className: classes.font
        }}
      />
      <div
        className={clsx({
          [classes.openBackground]: isButtonClick,
          [classes.closeBackground]: !isButtonClick
        })}
        onClick={() => setStateOnClick(false)}
      />
    </div>
  );
};

export default SearchBase;
