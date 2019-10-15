import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Register from './Register';
import {withRouter} from "react-router-dom";
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
    backgroundColor: '#284e9b',
    color:'white',
    padding:'0.8rem',
    borderRadius:'8px 8px 0px 0px',
    variant:'h2'
  }
});

class VerifyOTP extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            otp:''
        }

    }
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    handleClick(event,param,role,mNum){
      event.preventDefault();

        if(param === 'resend'){
            this.props.history.push("/resendOTP",{ role : role,mNum : mNum});
        }else{
            console.log(mNum)
        var apiBaseUrl = "https://18.189.141.222:8081/api/v1";
        var self = this;
        if(this.state.otp.length>0){
            var payload={
                "otp": this.state.otp
            }
            console.log(this.props.location.state.mNum);
            //axios.post(apiBaseUrl+'/verifyOTP', payload)
            axios.get(apiBaseUrl+'/verifyOTP?mobileNumber='+mNum+"&"+"otp="+this.state.otp)
            .then((response) => {
                console.log(response);
                if(response.data === true){
                    this.props.history.push("/register", { role : role,mNum : mNum});
                   // this.props.history.push("/afterLogin", { loginName : "test"});
                    var registerscreen=[];
                    registerscreen.push(<Register appContext={self.props.appContext}/>);
                    self.props.appContext.setState({registerPage:[],registerscreen:registerscreen})
                }
                else{
                    console.log("some error ocurred",response.data);
                    alert("Please enter valid otp");

                }
            }).catch((error) => {
                console.log(error);
              });
        }
    }
    }

    render(){
        const { classes } = this.props;

        console.log(this.props.location.state.role);
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
                  Verify OTP
                  </Paper>
                  </Grid>
              <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.paper}>
        <TextField
             hintText="Please provide OTP"
             floatingLabelText="Enter OTP"
             type="number"
             onChange = {(event,newValue) => this.setState({otp:newValue})}
             onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)
          }}
             />
             <br/>
           <RaisedButton label="verify" primary={true} style={style} onClick={(event) => this.handleClick(event,'verify',this.props.location.state.role,this.props.location.state.mNum)}/>
           <br/>
          <RaisedButton label="Resend OTP" primary={true} style={style} onClick={(event) => this.handleClick(event,'resend',this.props.location.state.role)}/>
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

export default withStyles(Styles, { withTheme: true })(VerifyOTP);