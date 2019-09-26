import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TablePagination from '@material-ui/core/TablePagination';




const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#40b7d8',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#3f51b514',
    },
  },
}))(TableRow);


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Mathematics Standard', "041", 6.0, 24, 4.0),
  createData('Mathematics Basic', "241", 9.0, 37, 4.3),
  createData('Science', "086", 16.0, 24, 6.0),
  createData('Social Science', "087", 3.7, 67, 4.3),
  createData('English', "184", 16.0, 49, 3.9),
  createData('Hindi-A', "002", 16.0, 49, 3.9),
  createData('Hindi-B', "085", 16.0, 49, 3.9),
  createData('Sanskrit', "122", 16.0, 49, 3.9),
];

const useStyles = makeStyles(theme => ({
  root: {
   // width: '500px',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    //minWidth: 700,
  },
}));

export default function SubjectTables(props,subCheckedFunction) {
  
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    fields: [],
    subCheckedFunction :Function
  });

  
  let flag = false;
  const handleCheck = (props,item,index,name,subFeesVal) => event => {
    console.log(subFeesVal);
    
    setState({ ...state, [name]: event.target.checked });
    let newFields = state.fields
  
    if(event.target.checked){
     
      newFields[index] = {
        check: !newFields[index],
        data: item
      }
      setState({fields: newFields})
    }else{
    
      newFields.splice(index,1);
      flag=true;
    }
    newFields = newFields.filter(function(element){
      return newFields !== undefined; 
    });
    props.subCheckedFunction(newFields,flag,item);
  };
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  if(props.dataFromParent !== 'undefined' && props.dataFromParent > 0){
  return (
    
      <div style={{ width: '100%' }}>
      <Table className={classes.table} style={{ width: 400, margin: 'auto' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Subject Name</StyledTableCell>
            <StyledTableCell align="right">Subject code</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">
              <Checkbox
                // checked={state.checkedB}
               // onChange={e => this.handleChange(e)}
                 onChange={handleCheck(props,row,index,'checkedB',props.dataFromParent)}
                  value="checkedB"
                   color="primary"
                   inputProps={{
                    'aria-label': 'secondary checkbox',
                     }}
                  />
              </StyledTableCell>
             </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      
      </div>
    
  );
  }else{
    return(<html></html>)
  }
}