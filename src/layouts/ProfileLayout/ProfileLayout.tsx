import React, { FC, ReactElement, ReactNode } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

// Styles
import classes from './ProfileLayout.module.scss';

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose?: (cIsOpen: boolean) => void;
}

const Profile: FC<IProps> = ({
  children,
  isOpen,
  handleClose
}): ReactElement => {
  return (
    <Dialog
      scroll="body"
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
    >
      <DialogContent className={classes.paper}>{children}</DialogContent>
    </Dialog>
  );
};

export default Profile;
