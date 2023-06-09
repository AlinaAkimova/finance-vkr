import React, { FC, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// Icons
import Close from '@mui/icons-material/Close';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Theme
import theme from 'theme';

// Styles
import classes from './GenerateReport.module.scss';

interface IProps {
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const GenerateReport: FC<IProps> = ({ isOpen, setOpen }) => {
  const handleClose = useCallback(() => {
    setOpen((prev) => !prev);
  }, [isOpen]);
  return (
    <Profile isOpen={isOpen}>
      <ThemeProvider theme={theme}>
        <Box className={classes.nameBox}>
          <h2>Generate report</h2>
          <IconButton onClick={() => handleClose()}>
            <Close />
          </IconButton>
        </Box>
        <Button className={classes.button}>Export</Button>
        <Button className={classes.button}>Send by Email</Button>
      </ThemeProvider>
    </Profile>
  );
};
export default GenerateReport;
