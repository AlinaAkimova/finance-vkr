import React, { FC, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import CurrencyRuble from '@mui/icons-material/CurrencyRuble';

// Stores
import membersStore from 'stores/MembersStore';

// Types
import { User } from 'types/user';
import {
  ExpertizeVariant,
  LevelVariant,
  WorkStatusVariant
} from 'types/member';

// Components
import TableFooter from 'components/TableFooter';
import MemberAvatar from 'components/MemberAvatar';
import Loading from 'components/Loading';
import DropdownIndicator from 'components/DropdownIndicator';
import AdminEditProfileModal from '../../../components/modals/AdminEditProfileModal';

// Styles
import classes from './TableTeam.module.scss';

interface TableTeamProps {
  activeTab: number;
}

const getNumberByIndexAndPage = (
  index: number,
  page: number,
  rowsPerPage: number
) => {
  return page === 0 ? index + 1 : index + 1 + page * rowsPerPage;
};

const changeArrow = (sortDir: 1 | -1, active: boolean) => {
  return <DropdownIndicator sortDir={sortDir} active={active} />;
};

const selectedMembers = (activeTab: number, filteredMembers: User[]) => {
  switch (activeTab) {
    case 1: {
      return filteredMembers.filter((member) => member.status === 'Active');
    }
    case 2: {
      return filteredMembers.filter((member) => member.status === 'Archived');
    }
    case 3: {
      return filteredMembers.filter(
        (member) => member.defaultLegalStatus?.toLowerCase() === 'employee'
      );
    }
    case 4: {
      return filteredMembers.filter(
        (member) => member.defaultLegalStatus?.toLowerCase() === 'contractor'
      );
    }
    default: {
      return filteredMembers;
    }
  }
};

const TableTeam: FC<TableTeamProps> = ({ activeTab }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedRow, setSelectedRow] = useState<User | null>(null);
  const [onRowClick, setOnRowClick] = useState<boolean>(false);

  const { loading, filteredMembers, sort, sortDir } = membersStore;
  const members = selectedMembers(activeTab, filteredMembers);

  useEffect(() => {
    membersStore.loadMembers();
  }, []);

  const setOnClickRow = useCallback((row: User, index: number) => {
    setSelectedIndex(index);
    setSelectedRow(row);
    setOnRowClick(!onRowClick);
  }, []);

  return (
    <div className={classes.wrapper}>
      <TableContainer component={Box} className={classes.container}>
        <Table aria-label="a dense table" className={classes.table}>
          <TableHead>
            <TableRow
              sx={{
                '.MuiTableCell-root': {
                  borderBottom: 'none'
                }
              }}
            >
              <TableCell align="left" className={classes.tableCellHeadNumber}>
                №
              </TableCell>
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
                <TableSortLabel
                  onClick={() => membersStore.setSort('email')}
                  IconComponent={() => changeArrow(sortDir, sort === 'email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => membersStore.setSort('defaultLevel')}
                  IconComponent={() =>
                    changeArrow(sortDir, sort === 'defaultLevel')
                  }
                >
                  Level
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => membersStore.setSort('defaultExpertize')}
                  IconComponent={() =>
                    changeArrow(sortDir, sort === 'defaultExpertize')
                  }
                >
                  Expertize
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => membersStore.setSort('defaultRate')}
                  IconComponent={() =>
                    changeArrow(sortDir, sort === 'defaultRate')
                  }
                >
                  Default Rate
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            className={clsx({
              [classes.tableBodyLoading]: loading,
              [classes.tableBody]: !loading
            })}
          >
            {loading ? (
              <Loading table />
            ) : (
              members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      className={clsx(classes.tableRow, {
                        [classes.tableRowOnClick]: selectedIndex === index + 1
                      })}
                      onClick={() => {
                        setOnClickRow(row, index + 1);
                      }}
                      sx={{
                        '.MuiTableCell-root': {
                          borderBottom: 'none'
                        }
                      }}
                    >
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {getNumberByIndexAndPage(index, page, rowsPerPage)}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        <MemberAvatar
                          userRole={row.role}
                          fullName={row.name}
                          color={row.colour}
                        />
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.defaultLevel === null ? (
                          <div> - </div>
                        ) : (
                          <Chip
                            label={row.defaultLevel}
                            className={clsx(classes.chipTypography, {
                              [classes.inactiveChip]:
                                row.status === WorkStatusVariant.archived,
                              [classes.intern]:
                                row.defaultLevel === LevelVariant.intern,
                              [classes.junior]:
                                row.defaultLevel === LevelVariant.junior,
                              [classes.middle]:
                                row.defaultLevel === LevelVariant.middle,
                              [classes.highMiddle]:
                                row.defaultLevel === LevelVariant.highMiddle,
                              [classes.senior]:
                                row.defaultLevel === LevelVariant.senior
                            })}
                          />
                        )}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.defaultExpertize === null ? (
                          <div> - </div>
                        ) : (
                          <Chip
                            label={row.defaultExpertize}
                            className={clsx(classes.chipTypography, {
                              [classes.inactiveChip]:
                                row.status === WorkStatusVariant.archived,
                              [classes.pa]:
                                row.defaultExpertize === ExpertizeVariant.pa,
                              [classes.qa]:
                                row.defaultExpertize === ExpertizeVariant.qa,
                              [classes.design]:
                                row.defaultExpertize ===
                                ExpertizeVariant.design,
                              [classes.react]:
                                row.defaultExpertize ===
                                ExpertizeVariant.frontend,
                              [classes.nodejs]:
                                row.defaultExpertize ===
                                ExpertizeVariant.backend,
                              [classes.fullstack]:
                                row.defaultExpertize ===
                                ExpertizeVariant.fullstack,
                              [classes.ios]:
                                row.defaultExpertize === ExpertizeVariant.ios,
                              [classes.android]:
                                row.defaultExpertize ===
                                ExpertizeVariant.android,
                              [classes.flutter]:
                                row.defaultExpertize ===
                                ExpertizeVariant.flutter
                            })}
                          />
                        )}
                      </TableCell>
                      <TableCell
                        className={clsx(classes.tableCellDefaultRate, {
                          [classes.inactiveRow]:
                            row.status === WorkStatusVariant.archived,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        <CurrencyRuble className={classes.currencyRuble} />
                        {row.defaultRate}
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter
        rowsLength={members.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      {selectedRow ? (
        <AdminEditProfileModal
          item={selectedRow}
          isOpen={onRowClick}
          setOpen={setOnRowClick}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default observer(TableTeam);
