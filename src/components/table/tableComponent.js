import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { userService } from '../../services/userService';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

const columns = [
  { id: 'consumerNo', label: 'Consumer No', minWidth: 100 },
  { id: 'Location', label: 'Location', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'ipMCB',
    label: 'I/P MCB',
    minWidth: 100,
    align: 'center',
    
  },
  {
    id: 'opMCB',
    label: 'O/P MCB',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'activeLoad',
    label: 'Active Load(Kw)',
    minWidth: 100,
    align: 'center',
   
  },
  {
    id: 'updateTime',
    label: 'Update Time',
    minWidth: 100,
    align: 'center',
   
  },
];


const useStyles = makeStyles({
  root: {
    width: '95%',
    marginLeft: '2%'
  },
  container: {
    maxHeight: 440,
  },
});

export default function TableComoponent( props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [status,setStatus] = useState('');
  // const [newSiteData, setNewSiteData] = React.useState([]);
  const [ data, setData] = useState(props.smartTimerData)
  const [age, setAge] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeStatus =(e)=>{
    console.log(e.target.value)
    let currentData = (age == 1) ? props.smartTimerData : props.keonicsData
    if(e.target.value==="Status"){
      setData(currentData)
      setStatus(e.target.value)
      return
    }
    const filteData = currentData.filter((row)=>{
      return row['Status'] == e.target.value
    })
    setData(filteData)
    setStatus(e.target.value)

  }

  const handleChange = (event) => {
    setAge(event.target.value);
    if (event.target.value===1){
     setData(props.smartTimerData) 
    }
    else{
      setData(props.keonicsData)
    }
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // useEffect(()=>{
  //   console.log(props.Data)
  //  setData(props.Data);
  // },[])  
  return (
    <>
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Smart Timer</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="site"
          onChange={handleChange}
        >
          <MenuItem value={0}>Keonics</MenuItem>
          <MenuItem value={1}>Smart Timer</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Paper className={classes.root}>
      
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                column.id !='status' ?
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell> : 
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}> 
                  <TextField
                   id="select-status"
                   select
                   value={status}
                   label="Status"
                   style={{minWidth: 100}}
                   onChange={handleChangeStatus}>
                     <MenuItem value={"Status"}>All Status</MenuItem>
                     <MenuItem value={"ON"}>ON</MenuItem>
                     <MenuItem value={"OFF"}>OFF</MenuItem>
                     <MenuItem value={"NS"}>NS</MenuItem>

                  </TextField>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {data &&
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.label];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          }
        </Table>
      </TableContainer>
     { data && 
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    }
    </Paper>
    </>
  );
}
