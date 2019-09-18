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


class MobileNumber extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            mobile_number:''
        }
    }
    handleClick(event,role){
        var apiBaseUrl = "http://localhost:4000/api/";
        // console.log("values in register handler",role);
        var self = this;
        if(this.state.mobile_number.length>0 ){
            var payload={
                "mobile_number": this.state.mobile_number,
                "role":role
            }
            axios.post(apiBaseUrl+'/sendOTP', payload)
     .then((response) =>{
       console.log(response);
       if(response.status === 200){
         this.props.history.push("/VerifyOTP",{ role : role})
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
               title="Mobile Number"
             />

        <TextField
             hintText={userhintText}
             floatingLabelText={userLabel}
             onChange = {(event,newValue) => this.setState({mobile_number:newValue})}
             />
             <br/>
           <RaisedButton label="Send OTP" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
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
export default withRouter(MobileNumber);

