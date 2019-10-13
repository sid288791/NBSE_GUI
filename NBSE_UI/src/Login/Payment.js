import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

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

const Styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    gridContainer:{
      marginTop: '4em'
    },
    header:{
      textAlign: 'center',
      backgroundColor: '#284e9b',
      color:'white',
      padding:'0.8rem',
      borderRadius:'8px 8px 0px 0px',
      variant:'h2'
    }
  });
  

class Payment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          payMore:'',
         
        }
    }

    componentDidMount(){

      var apiBaseUrl = " http://localhost:4000/api/v1"
      axios.get(apiBaseUrl+'/getExtraSub')
      .then((response) =>{
        //console.log(response);
        if(response.status === 200){
          this.extraSub = response.data
          console.log(this.extraSub);
        }
      }).catch((error) =>{
        console.log(error);
      });

    }

    static propTypes = {
        classes: PropTypes.object.isRequired
    };
    extraSub= []

      handleExtraSub = (row,index) => e =>{
      console.log(e.target.value);

    }

    setPayMore = e =>{
      console.log(e.target.value)
      this.setState({payMore:e.target.value})
    }

    render(){
     const { classes } = this.props;
    console.log(this.props.location.state.loginId)
    console.log(this.props.location.state.loginPass)
        return(
            <div>
           
            <MuiThemeProvider>
            <div>
            <AppBar style={{ background: '#284e9b' }}
               title="NBSE™"
             />
             <br/>
             <div>
             <Grid container justify="center" className={classes.gridContainer} spacing={3}>
             <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.header} variant="h2">
                  NBSE Payment
                  </Paper>
                  </Grid>
                  <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.paper}>
                <Typography variant="h4" component="h2" gutterBottom>
                You have registered successfully {this.props.location.state.loginName}
               </Typography>
               <div>
               <span>
                  Login Id - {this.props.location.state.loginId}
                 </span>
                 <br/>
                 <span>
                  Password (DOB) - {this.props.location.state.loginPass}
                 </span>
                 <br/>
                 <span>Please Remember above Login ID & Password for future Correspondence.</span>
                 <br/>
                 <span style = {{fontWeight:'bold'}}>To Download below mentioned documents Login after 30th November.</span>
                 <br/>
                 <span>Admit Card</span>
                 <br/>
                 <span>Marksheet</span>
                 <br/>
                 <span>Participation Certificate</span>
                 <br/>
                 <span>Topper Answersheet</span>
                 <br/>
                 <span>Please visit www.nbse.org.in for more information</span>
                 
               </div>
                  {/* <div>
                  <span>Do you want to add more Subjects :</span>
                    <input type="radio" name="paymore" value="yes" onChange = {this.setPayMore}/>Yes
                       <input type="radio" name="paymore" value="no" onChange = {this.setPayMore}/>No
                  </div> */}
                  <br/>
                  {this.state.payMore === 'yes' && <div style={{ width: '100%' }}>
      <Table className={classes.table} style={{ width: 500, margin: 'auto' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Subject Name</StyledTableCell>
            <StyledTableCell align="right">Subject code</StyledTableCell>
            <StyledTableCell align="right">Fees</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {this.extraSub.map((row,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.code}</StyledTableCell>
              <StyledTableCell align="right">{row.fees}</StyledTableCell>
              <StyledTableCell align="right">
              <Checkbox
                // checked={state.checkedB}
               // onChange={e => this.handleChange(e)}
                 onChange={this.handleExtraSub(row,index)}
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
      
      </div>}
                 
                </Paper>
                </Grid>
                  </Grid>
                  </div>
             </div>
             </MuiThemeProvider>
             </div>
        );
    }
}
const style = {
    margin: 15,
  };

//export default MobileNumber;
export default withRouter(withStyles(Styles, { withTheme: true })(Payment));