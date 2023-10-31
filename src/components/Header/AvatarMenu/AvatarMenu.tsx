import React, { FC, ReactNode, useCallback, useState } from 'react';
import clsx from 'clsx';

import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';

// Components
import Logout from 'components/modals/Logout';

// Images
import settings from 'assets/icons/gear-fill.svg';
import arrow from 'assets/icons/box-arrow-right.svg';

// Styles
import classes from './AvatarMenu.module.scss';

interface AvatarMenuProps {
  avatar: ReactNode;
  fullName: string | undefined;
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const AvatarMenu: FC<AvatarMenuProps> = ({
  avatar,
  fullName,
  isOpen,
  setIsOpen
}) => {
  const [onClickLogout, setOnClickLogout] = useState<boolean>(false);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <div
      className={clsx({
        [classes.wrapper]: isOpen,
        [classes.wrapperNone]: !isOpen
      })}
      onClick={() => setIsOpen(false)}
    >
      <Paper className={classes.paper}>
        <div className={classes.avatarName}>
          <div className={classes.avatar}>{avatar}</div>
          <div className={classes.name}>{fullName || 'User'}</div>
        </div>
        <div className={classes.menu}>
          <MenuList>
            <MenuItem
              className={classes.menuItem}
              onClick={closeMenu}
              sx={{
                '&:before': {
                  display: 'none'
                }
              }}
            >
              <div className={classes.containerSettings}>
                <img src={settings} alt="gear" />
                Settings of profile
              </div>
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => setOnClickLogout(!onClickLogout)}
              sx={{
                '&:before': {
                  display: 'none'
                }
              }}
            >
              <div className={classes.containerLogout}>
                <img src={arrow} alt="exit arrow" />
                Logout
              </div>
            </MenuItem>
          </MenuList>
        </div>
      </Paper>
      <Logout isOpen={onClickLogout} setIsOpen={setOnClickLogout} />
    </div>
  );
};

export default AvatarMenu;
