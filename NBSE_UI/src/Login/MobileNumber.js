import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import VerifyOTP from './VerifyOTP';
//import UploadPage from './UploadPage';
//import history from "./history";
import {withRouter} from "react-router-dom";
import MuiPhoneNumber from 'material-ui-phone-number'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



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
    backgroundColor: '#31bee5',
    color:'white',
    padding:'0.8rem',
    borderRadius:'8px 8px 0px 0px',
    variant:'h2'
  }
});

class MobileNumber extends React.Component{
  
    constructor(props){
        super(props);
        this.state ={
            mobile_number:''
        }
    }
    static propTypes = {
      classes: PropTypes.object.isRequired
  };

    handleMobileNum=(value)=>{
      console.log(value);
      //this.mother_num=value;
      this.setState({mobile_number:value});
    }

    handleClick(event,role){
       // var apiBaseUrl = "http://localhost:4000/api/";
        var apiBaseUrl = " http://18.189.141.222:8081/api/v1"
        // console.log("values in register handler",role);
        var mNum = this.state.mobile_number.slice(4,9)+this.state.mobile_number.slice(10,15);
        var self = this;
        if(this.state.mobile_number.length>0 ){
            var payload={
                "mobile_number": this.state.mobile_number,
                "role":role
            }
            //axios.post(apiBaseUrl+'/sendOTP', payload)
            axios.get(apiBaseUrl+'/sendSMS?mobileNumber='+this.state.mobile_number.slice(4,9)+this.state.mobile_number.slice(10,15))
     .then((response) =>{
       console.log(response);
       if(response.status === 200){
         console.log(mNum);
         this.props.history.push("/VerifyOTP",{ role : role,mNum :mNum})
       }
       else{
        console.log("some error ocurred",response.status);
      }
    }).catch((error) =>{
        console.log(error);
      });
        }
    }

    render(){
      const { classes } = this.props;
      var userhintText,userLabel;
      if(this.props.role === "student"){
        userhintText="Enter your Mobile Number";
        userLabel="Student Mobile";
      }
      else{
        userhintText="Enter your Mobile Number";
        userLabel="Teacher mobile";
      }
        return(
            <div>
           
            <MuiThemeProvider>
            <div>
            <AppBar
               title="NBSE"
             />
             <br/>
             <div>
             <Grid container justify="center" className={classes.gridContainer} spacing={3}>
             <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.header} variant="h2">
                  Mobile Number
                  </Paper>
                  </Grid>
              <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.paper}>
                  <MuiPhoneNumber
             name="mobileNum"
             data-cy="user-phone"
             defaultCountry={"in"}
             id="standard-number"
             label="Phone Number"
             value={this.state.mobileNum}
           // floatingLabelText="Mother Phone Number"
            onChange={this.handleMobileNum} 
            margin ="normal"></MuiPhoneNumber>
             <br/>
           <RaisedButton label="Send OTP" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
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
export default withRouter(withStyles(Styles, { withTheme: true })(MobileNumber));

