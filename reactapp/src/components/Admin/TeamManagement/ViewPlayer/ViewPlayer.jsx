import React from 'react'
import './ViewPlayer.css'
import Header from '../../../Header/Header'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import 'material-icons/iconfont/material-icons.css';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";




function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <span className="material-icons">last_page</span> : <span className="material-icons">first_page</span>}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <span className="material-icons">keyboard_arrow_right</span> : <span className="material-icons">keyboard_arrow_left</span>}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <span className="material-icons">keyboard_arrow_left</span> : <span className="material-icons">keyboard_arrow_right</span>}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <span className="material-icons">first_page</span> : <span className="material-icons">last_page</span>}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function DisplayUser() {

  const users = [
    {firstname:"Ramesh", lastname:"K", age:"20", gender:"Male"},
    {firstname:"Ravi", lastname:"Y", age:"18", gender:"Male"},
    {firstname:"Jyoti", lastname:"S", age:"20", gender:"Female"},
    {firstname:"Kiran", lastname:"K", age:"22", gender:"Male"},
    {firstname:"Naresh", lastname:"A", age:"29", gender:"Male"},
    {firstname:"Rekha", lastname:"D", age:"28", gender:"Female"},
    {firstname:"Rahul", lastname:"P", age:"30", gender:"Male"},
    {firstname:"Nagma", lastname:"SK", age:"20", gender:"Female"},
    {firstname:"Kamini", lastname:"T", age:"25", gender:"Female"},
    {firstname:"Sita", lastname:"M", age:"35", gender:"Female"},
  ];//.sort((a,b) => a.email.split("@")[1].localeCompare(b.email.split("@")[1]));


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  let navigate = useNavigate();

  const breadcrumbs = [
    <Typography key="1" color="inherit">
      Admin
    </Typography>,
    <Link
    key="2"
    color="inherit"
    underline="hover"
    href="/admin/viewteam"
>
    Teams
</Link>,
    <Typography key="3" color="text.primary">
      Players
    </Typography>
  ];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleClose = () => {
    setDeleteModalOpen(false);
  };

  const handleEditUser = (user) => {
    navigate('/admin/editPlayer', {state : {user: user}})
  }

  return (
    <div>
      <Header highlight={"Users"}/>
      <div className="DisplayUser-Nav">
        <Avatar sx={{width: 30, height: 30, marginRight: '8px'}}>
          <span className="material-icons">person</span>
        </Avatar>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <TableContainer className="DisplayUser-Table" component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Edit&nbsp;&nbsp;</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : users
            ).map((row) => (
              <TableRow key={row.email}>
                <TableCell component="th" scope="row">
                  {row.firstname}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.lastname}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.age}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.gender}
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  <IconButton aria-label="edit" onClick={() => handleEditUser(row)}>
                    {/* <EditIcon sx={{fontSize: '20px'}} /> */}
                    <span className="material-icons">edit</span>
                  </IconButton>
                </TableCell>
                <TableCell style={{ width: 50 }} align="right">
                  <IconButton aria-label="delete" color="error" onClick={handleClickOpen}>
                    {/* <DeleteIcon sx={{fontSize: '20px'}}/> */}
                    <span className="material-icons">delete</span>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>


      <Dialog
        open={deleteModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Yes</Button>
          <Button onClick={handleClose} color="success" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DisplayUser