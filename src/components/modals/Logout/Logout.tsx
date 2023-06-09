import React, { FC, useCallback } from 'react';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

// Components
import Profile from 'layouts/ProfileLayout';

// Stores
import authStore from 'stores/AuthStore';

// Styles
import classes from './Logout.module.scss';

interface LogoutProps {
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Logout: FC<LogoutProps> = ({ isOpen, setIsOpen }) => {
  const clickLogout = useCallback(() => {
    authStore.logout();
  }, []);

  return (
    <Profile isOpen={isOpen}>
      <div
        className={clsx({
          [classes.wrapper]: isOpen
        })}
      >
        <div className={classes.titleContainer}>
          <div className={classes.title}>Logout</div>
          <IconButton className={classes.icon} onClick={() => setIsOpen(false)}>
            <Close />
          </IconButton>
        </div>
        <div className={classes.content}>Do you really want to logout?</div>
        <Box className={classes.buttonBox}>
          <Button className={classes.cancel} onClick={() => setIsOpen(false)}>
            CANCEL
          </Button>
          <Button className={classes.yes} onClick={clickLogout}>
            YES
          </Button>
        </Box>
      </div>
    </Profile>
  );
};

export default Logout;
