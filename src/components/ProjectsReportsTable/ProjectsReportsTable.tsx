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
import projectsStore from 'stores/ProjectsStore';

// Components
import DropdownIndicator from 'components/DropdownIndicator';
import TableFooter from 'components/TableFooter';

// Styles
import classes from './ProjectsReportsTable.module.scss';

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

const ProjectsReportsTable: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { loading, filteredProjects, sort, sortDir } = projectsStore;
  const projects = filteredProjects;

  useEffect(() => {
    projectsStore.loadProjects();
  }, []);

  const arr = Array.from(
    {
      length: projects ? projects.length : 0
    },
    () => Math.floor(Math.random() * 10000)
  );

  const arr1 = Array.from(
    {
      length: projects ? projects.length : 0
    },
    () => Math.floor(Math.random() * 10000)
  );

  const arr2 = Array.from(
    {
      length: projects ? projects.length : 0
    },
    () => Math.floor(Math.random() * 10000)
  );
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
                <TableSortLabel
                  IconComponent={() => changeArrow(sortDir, sort === 'name')}
                  onClick={() => projectsStore.setSort('name')}
                >
                  Project Name
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
            {projects
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
        rowsLength={projects?.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  );
};

export default observer(ProjectsReportsTable);
