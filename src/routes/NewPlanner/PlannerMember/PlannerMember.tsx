import React, { FC, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';

// Types
import type { User } from 'types/user';

// Components
import PlannerPersonModal from 'components/modals/PlannerPersonModal';
import MemberAvatar from 'components/MemberAvatar';

// Styles
import classes from './PlannerMember.module.scss';

interface PlannerMemberProps {
  user: User;
}

const PlannerMember: FC<PlannerMemberProps> = ({ user }) => {
  const { name, role, colour } = user;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className={classes.userItem}>
        <MemberAvatar fullName={name} userRole={role} color={colour} />
        <div className={classes.textItem}>
          <span className={classes.name}>{name}</span>
        </div>
        <button
          type="button"
          className={classes.buttonDot}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreVertIcon className={classes.dot} fontSize="inherit" />
        </button>
        <PlannerPersonModal
          user={user}
          isOpen={isOpen}
          setOpen={setIsOpen}
          title="Edit person"
        />
      </div>
    </div>
  );
};

export default PlannerMember;
