import React, { FC } from 'react';
import Box from '@mui/material/Box';

// Styles
import classes from './ReportMoneyCard.module.scss';

export interface MoneyCardInt {
  title: string;
  money: number;
  description: string;
}

const ReportMoneyCard: FC<MoneyCardInt> = ({ title, money, description }) => {
  return (
    <Box className={classes.boxWrapper}>
      <div className={classes.title}>{title}</div>
      <div className={classes.moneyLine}>
        <div className={classes.money}>{money}</div>
        <div className={classes.money}>RUB</div>
      </div>
      <div className={classes.description}>{description}</div>
    </Box>
  );
};
export default ReportMoneyCard;
