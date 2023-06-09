import React, { FC, useCallback, useState, ChangeEvent } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// Icons
import Close from '@mui/icons-material/Close';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Theme
import theme from 'theme';

// Stores
import { inviteMemberOwner } from 'api/sendLink';

// Styles
import classes from './AddMemberModal.module.scss';

interface AddMemberProps {
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const AddMember: FC<AddMemberProps> = ({ isOpen, setOpen }) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const nameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const roleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  }, []);

  const handleClose = useCallback((cIsOpen: boolean) => {
    setOpen(!cIsOpen);
  }, []);

  const sendLink = () => {
    if (email.length && name.length && role.length) {
      inviteMemberOwner(email, name, role);
    }
  };

  return (
    <Profile isOpen={isOpen} handleClose={handleClose}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} className={classes.nameContainer}>
          <Grid item xs={11}>
            <h2>Adding a member</h2>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handleClose(isOpen)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={1} className={classes.box}>
          <Grid item xs={3}>
            <Typography className={classes.font}>Full name</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              fullWidth
              value={name}
              onChange={nameChange}
              autoFocus
              InputProps={{
                classes: {
                  root: classes.font
                }
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} className={classes.box}>
          <Grid item xs={3}>
            <Typography className={classes.font}>Email</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="standard"
              fullWidth
              value={email}
              onChange={emailChange}
              autoFocus
              InputProps={{
                classes: {
                  root: classes.font
                }
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} className={classes.box}>
          <Grid item xs={3}>
            <Typography className={classes.font}>Role</Typography>
          </Grid>
          <Grid item xs={9}>
            <RadioGroup row onChange={roleChange}>
              <FormControlLabel
                control={<Radio />}
                value="USER"
                checked={role === 'USER'}
                label={<Typography className={classes.font}>User</Typography>}
              />
              <FormControlLabel
                control={<Radio />}
                value="MANAGER"
                checked={role === 'MANAGER'}
                label={
                  <Typography className={classes.font}>
                    Project Manager
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Radio />}
                value="ADMIN"
                checked={role === 'ADMIN'}
                label={<Typography className={classes.font}>Admin</Typography>}
              />
            </RadioGroup>
          </Grid>
        </Grid>

        <Box className={classes.box}>
          <Button
            variant="contained"
            className={classes.inviteButton}
            onClick={() => {
              sendLink();
              handleClose(isOpen);
            }}
          >
            INVITE
          </Button>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};

export default AddMember;
