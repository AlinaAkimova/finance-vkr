import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import PaidIcon from '@mui/icons-material/Paid';
import MailIcon from '@mui/icons-material/Mail';

// Components
import SearchBase from 'components/SearchBase';
import AvatarMenu from 'components/Header/AvatarMenu';
import MemberAvatar from 'components/MemberAvatar';

// Stores
import rateStore from 'stores/RateStore';
import profileStore from 'stores/ProfileStore';

// Styles
import classes from './Header.module.scss';

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { profile } = profileStore;

  const handleClick = useCallback(() => {
    setIsOpen((cIsOpen) => !cIsOpen);
  }, []);

  useEffect(() => {
    rateStore.getDollarRate();
    profileStore.getProfile();
  }, []);

  return (
    <div>
      <Toolbar className={classes.header}>
        <div className={classes.headerSection}>
          <SearchBase />
        </div>
        <div className={classes.headerSection}>
          <div className={classes.headerItem}>
            <div className={classes.rate}>
              <PaidIcon className={classes.icon} />
              <div>{rateStore.rate}</div>
            </div>
          </div>
          <Badge className={classes.headerItem}>
            <MailIcon className={classes.icon} />
          </Badge>
          <div
            onClick={handleClick}
            className={clsx(classes.headerItem, classes.avatar)}
          >
            <MemberAvatar
              fullName={profile?.name}
              userRole={profile?.role}
              color={profile?.colour}
            />
          </div>
        </div>
      </Toolbar>
      <AvatarMenu
        avatar={
          <MemberAvatar
            fullName={profile?.name}
            userRole={profile?.role}
            color={profile?.colour}
          />
        }
        fullName={profile?.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};
export default observer(Header);
