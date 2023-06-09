import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stars from '@mui/icons-material/Stars';

// Types
import { UserRole } from 'types/user';

// Images
import managerStar from 'assets/icons/managerStar.svg';

// Styles
import classes from './MemberAvatar.module.scss';

interface AvatarProps {
  userRole: string | undefined;
  fullName: string | undefined;
  color: string | undefined;
}

const MemberAvatar: FC<AvatarProps> = ({ userRole, fullName, color }) => {
  const initialOfName = useMemo(() => {
    const name: string[] = fullName ? fullName.split(' ') : [''];
    const firstValue: string = name[0] ? name[0].charAt(0) : '';
    const secondValue: string = name[1] ? name[1].charAt(0) : '';
    return firstValue + secondValue;
  }, [fullName]);

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      badgeContent={
        <div>
          <Stars
            className={clsx(classes.stars, {
              [classes.adminStar]:
                userRole === UserRole.ADMIN || userRole === UserRole.OWNER,
              [classes.starUserRoleNone]:
                userRole !== UserRole.ADMIN && userRole !== UserRole.OWNER
            })}
          />
          <img
            src={managerStar}
            alt="manager star"
            className={clsx(classes.stars, {
              [classes.starUserRoleNone]:
                userRole === UserRole.ADMIN ||
                userRole === UserRole.OWNER ||
                userRole === UserRole.USER
            })}
          />
        </div>
      }
    >
      <div className={classes.headerItem}>
        <Avatar
          className={classes.avatar}
          style={{ backgroundColor: color || '#ce93d8' }}
        >
          {initialOfName}
        </Avatar>
      </div>
    </Badge>
  );
};

export default observer(MemberAvatar);
