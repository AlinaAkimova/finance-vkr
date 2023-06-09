import React, { FC, useCallback } from 'react';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';

// Styles
import classes from './TableFooter.module.scss';

interface TablePaginationViewProps {
  rowsLength: number | undefined;
  page: number;
  setPage: (value: number | ((prevVar: number) => number)) => void;
  rowsPerPage: number;
  setRowsPerPage: (value: number | ((prevVar: number) => number)) => void;
}

const TableFooter: FC<TablePaginationViewProps> = ({
  rowsLength,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage
}) => {
  const setChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const setChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    []
  );

  const labelDisplayedRows = (from: number, to: number, count: number) => (
    <span className={classes.typographyFooter}>
      {from}-{to} of {count}
    </span>
  );

  return (
    <div>
      {rowsLength ? (
        <TablePagination
          sx={{
            '.MuiInputBase-input ': {
              fontSize: '12px'
            },
            '.MuiTablePagination-root': {
              borderTop: '1px solid rgba(0, 0, 0, 0.12)'
            }
          }}
          className={classes.footer}
          rowsPerPageOptions={[10, 15, 25]}
          count={rowsLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={setChangePage}
          onRowsPerPageChange={setChangeRowsPerPage}
          component={Box}
          labelRowsPerPage={
            <span className={classes.typographyFooter}>Rows per page:</span>
          }
          labelDisplayedRows={({ from, to, count }) =>
            labelDisplayedRows(from, to, count)
          }
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default TableFooter;
