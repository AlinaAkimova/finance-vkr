import React, { FC, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

// Images
import box from 'assets/icons/box.png';
import calendar from 'assets/icons/calendar.svg';

// Types
import {
  ContractStatusVariant,
  IProject,
  WorkStatusVariant
} from 'types/project';

// Stores
import clientsStore from 'stores/ClientsStore';
import projectsStore from 'stores/ProjectsStore';

// Components
import TableFooter from 'components/TableFooter';
import EmptyTableBody from 'components/EmptyTableBody';
import Loading from 'components/Loading';
import DropdownIndicator from 'components/DropdownIndicator';
import ProjectAdminModal from '../../../components/modals/ProjectAdminModal';

// Styles
import classes from './TableProjects.module.scss';

interface TableProjectsProps {
  activeTab: number;
}

const changeArrow = (sortDir: 1 | -1, active: boolean) => {
  return <DropdownIndicator sortDir={sortDir} active={active} />;
};

export const getNumberByIndexAndPage = (
  index: number,
  page: number,
  rowsPerPage: number
) => {
  return page === 0 ? index + 1 : index + 1 + page * rowsPerPage;
};

const projects = [
  { 
    id: '1',
    name: 'superProject',
    startAt: '01.11.2022',
    endAt: '01.12.2022',
    hasActualContract: true,
    colour: 'purple',
    manager: 'Alina',
    clientId: '1',
    contractStatus: 'Active',
    workStatus: 'Active',
    contractCurrency: 'RUB',
    assignedHours: 1234
  },
  { 
    id: '2',
    name: 'TalkScanner',
    startAt: '05.11.2021',
    endAt: '09.12.2021',
    hasActualContract: true,
    colour: 'green',
    manager: 'Alina',
    clientId: '2',
    contractStatus: 'Active',
    workStatus: 'Active',
    contractCurrency: 'RUB',
    assignedHours: 1234
  },
  { 
    id: '3',
    name: 'MewOwner',
    startAt: '20.03.2022',
    endAt: '30.05.2022',
    hasActualContract: true,
    colour: 'blue',
    manager: 'Alina',
    clientId: '2',
    contractStatus: 'Active',
    workStatus: 'Active',
    contractCurrency: 'RUB',
    assignedHours: 1234
  },
  { 
    id: '4',
    name: 'YandexGo',
    startAt: '11.01.2019',
    endAt: '06.04.2022',
    hasActualContract: true,
    colour: 'orange',
    manager: 'Alina',
    clientId: '3',
    contractStatus: 'Active',
    workStatus: 'Active',
    contractCurrency: 'RUB',
    assignedHours: 1234
  }
]

const TableProjects: FC<TableProjectsProps> = ({ activeTab }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedRow, setSelectedRow] = useState<IProject | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { loading, filteredProjects, sort, sortDir } = projectsStore;

  useEffect(() => {
    clientsStore.loadClients();
  }, []);

  useEffect(() => {
    projectsStore.loadProjects();
  }, []);

  const dateFormat = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const setOnClickRow = useCallback((row: IProject, index: number) => {
    setSelectedIndex(index);
    setSelectedRow(row);
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={classes.wrapper}>
      <TableContainer
        className={clsx(classes.container, {
          [classes.undefinedRowsContainer]: !projects || projects.length === 0
        })}
      >
        <Table aria-label="a dense table" className={classes.table}>
          <TableHead
            className={clsx({
              [classes.undefinedRowsHeader]: !projects || projects.length === 0
            })}
          >
            <TableRow
              sx={{
                '.MuiTableCell-root': {
                  borderBottom: 'none'
                }
              }}
            >
              <TableCell align="left" className={classes.tableCellHead}>
                №
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  IconComponent={() => changeArrow(sortDir, sort === 'name')}
                  onClick={() => projectsStore.setSort('name')}
                >
                  Project Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                Client
              </TableCell>
              <TableCell align="left" className={classes.tableCellDate}>
                <TableSortLabel
                  onClick={() => projectsStore.setSort('startAt')}
                  IconComponent={() => changeArrow(sortDir, sort === 'startAt')}
                >
                  Start date
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellDate}>
                <TableSortLabel
                  onClick={() => projectsStore.setSort('endAt')}
                  IconComponent={() => changeArrow(sortDir, sort === 'endAt')}
                >
                  End date
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => projectsStore.setSort('manager')}
                  IconComponent={() => changeArrow(sortDir, sort === 'manager')}
                >
                  Manager
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className={classes.tableCellHead}>
                <TableSortLabel
                  onClick={() => projectsStore.setSort('contractStatus')}
                  IconComponent={() =>
                    changeArrow(sortDir, sort === 'contractStatus')
                  }
                >
                  Contract Status
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
              projects
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      className={clsx(classes.tableRow, {
                        [classes.tableRowOnClick]: selectedIndex === index + 1
                      })}
                      hover
                      key={row.id}
                      onClick={() => setOnClickRow(row, index + 1)}
                      sx={{
                        '.MuiTableCell-root': {
                          borderBottom: 'none'
                        }
                      }}
                    >
                      <TableCell
                        className={clsx({
                          [classes.typography]: row,
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold
                        })}
                      >
                        {getNumberByIndexAndPage(index, page, rowsPerPage)}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                        style={{ color: row.colour }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {clientsStore.clients.map((client) =>
                          client.id === row.clientId ? client.legalName : ''
                        )}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.startAt ? (
                          <span className={classes.dateWrapper}>
                            <img src={calendar} alt="calendar icon" />
                            {dateFormat(row.startAt)}
                          </span>
                        ) : (
                          <span>-</span>
                        )}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.endAt ? (
                          <span className={classes.dateWrapper}>
                            <img src={calendar} alt="calendar icon" />
                            {dateFormat(row.endAt)}
                          </span>
                        ) : (
                          <span>-</span>
                        )}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {!row.manager ? 'n/a' : row.manager}
                      </TableCell>
                      <TableCell
                        className={clsx({
                          [classes.inactiveRow]:
                            row.workStatus === WorkStatusVariant.archived ||
                            row.workStatus === WorkStatusVariant.planned ||
                            row.workStatus === WorkStatusVariant.onHold,
                          [classes.typography]: row
                        })}
                        align="left"
                      >
                        {row.contractStatus?.toLowerCase() === 'n/a' ? (
                          <Chip
                            label={row.contractStatus.toLowerCase()}
                            className={clsx(classes.chipTypography, {
                              [classes.na]:
                                row.contractStatus === ContractStatusVariant.na
                            })}
                          />
                        ) : (
                          <Chip
                            label={row.contractStatus}
                            className={clsx(classes.chipTypography, {
                              [classes.signing]:
                                row.contractStatus ===
                                ContractStatusVariant.signing,
                              [classes.approval]:
                                row.contractStatus ===
                                ContractStatusVariant.approval,
                              [classes.archived]:
                                row.contractStatus ===
                                ContractStatusVariant.archived,
                              [classes.na]:
                                row.contractStatus === ContractStatusVariant.na
                            })}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading ? (
        <TableFooter
          rowsLength={projects?.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      ) : (
        ''
      )}
      {!filteredProjects && !loading ? (
        <div>
          <EmptyTableBody
            image={<img src={box} alt="box" />}
            text="No projects added. Add someone!"
          />
        </div>
      ) : null}
      {selectedRow ? (
        <ProjectAdminModal
          item={selectedRow}
          isOpen={isOpen}
          setOpen={setIsOpen}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default observer(TableProjects);
