import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

// Stores
import membersStore from 'stores/MembersStore';

// Components
import DropdownIndicator from 'components/DropdownIndicator';
import TableFooter from 'components/TableFooter';
import MemberAvatar from 'components/MemberAvatar';

// Styles
import classes from './MembersReportTable.module.scss';

const changeArrow = (sortDir: 1 | -1, active: boolean) => {
  return <DropdownIndicator sortDir={sortDir} active={active} />;
};

const MembersReportTable: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { loading, sort, sortDir } = membersStore;
  const members = [
    {
      id: '1',
      name: 'Alina',
      colour: 'green',
      role: 'MANAGER'
    },
    {
      id: '2',
      name: 'Danila',
      colour: 'blue',
      role: 'MANAGER'
    },
    {
      id: '3',
      name: 'Kate',
      colour: 'red',
      role: 'MANAGER'
    }
  ]

  useEffect(() => {
    membersStore.loadMembers();
  }, []);

  const arr = Array.from(
    {
      length: members.length
    },
    () => Math.floor(Math.random() * 10000)
  );

  const arr1 = Array.from(
    {
      length: members.length
    },
    () => Math.floor(Math.random() * 10000)
  );

  const arr2 = Array.from(
    {
      length: members.length
    },
    () => Math.floor(Math.random() * 10000)
  );

  return (
    <div className={classes.wrapper}>
      <TableContainer
        className={clsx(classes.container, {
          [classes.undefinedRowsContainer]: !members || members.length === 0
        })}
      >
        <Table aria-label="a dense table" className={classes.table}>
          <TableHead
            className={clsx({
              [classes.undefinedRowsHeader]: !members || members.length === 0
            })}
          >
            <TableRow
              sx={{
                '.MuiTableCell-root': {
                  borderBottom: 'none'
                }
              }}
            >
              <TableCell className={classes.tableCellHead}>Avatar</TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => membersStore.setSort('name')}
                  IconComponent={() => changeArrow(sortDir, sort === 'name')}
                >
                  Full name
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                Revenue
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                Wages
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                Profit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            className={clsx({
              [classes.tableBodyLoading]: loading,
              [classes.tableBody]: !loading
            })}
          >
            {members
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={row.id}
                    sx={{
                      '.MuiTableCell-root': {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <TableCell
                      className={classes.typography}
                      align="left"
                      style={{ color: row.colour }}
                    >
                      <MemberAvatar
                        userRole={row.role}
                        fullName={row.name}
                        color={row.colour}
                      />
                    </TableCell>
                    <TableCell className={classes.typography} align="left">
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.typography} align="left">
                      {arr[index]} RUB
                    </TableCell>
                    <TableCell className={classes.typography} align="left">
                      {arr1[index]} RUB
                    </TableCell>
                    <TableCell className={classes.typography} align="left">
                      {arr2[index]} RUB
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter
        rowsLength={members?.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  );
};

export default observer(MembersReportTable);
