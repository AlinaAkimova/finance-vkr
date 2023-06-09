import React, { FC } from 'react';
import clsx from 'clsx';

// Icons
import logo from 'assets/icons/downloadLogo.svg';

// Styles
import classes from './Loading.module.scss';

interface ILoading {
  table?: boolean;
}

const Loading: FC<ILoading> = ({ table }) => {
  return (
    <div
      className={clsx(classes.wrapper, {
        [classes.loadingWrapper]: !table,
        [classes.tableLoadingWrapper]: table
      })}
    >
      <img src={logo} alt="download logo" className={classes.logo} />
    </div>
  );
};

export default Loading;
