import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Register from './Register';
import {withRouter} from "react-router-dom";

class VerifyOTP extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            otp:''
        }

    }

    handleClick(event,param,role,mNum){
        if(param === 'resend'){
            this.props.history.push("/resendOTP",{ role : role});
        }else{
            console.log(mNum)
        var apiBaseUrl = "http://18.189.141.222:8081/api/v1";
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
                if(response.status === 200){
                    this.props.history.push("/register", { role : role});
                    var registerscreen=[];
                    registerscreen.push(<Register appContext={self.props.appContext}/>);
                    self.props.appContext.setState({registerPage:[],registerscreen:registerscreen})
                }
                else{
                    console.log("some error ocurred",response.data.code);

                }
            }).catch((error) => {
                console.log(error);
              });
        }
    }
    }

    render(){
        console.log(this.props.location.state.role);
        return(
            <div>
            <MuiThemeProvider>
            <div>
            <AppBar
               title="Verify OTP"
             />

        <TextField
             hintText="Please provide OTP"
             floatingLabelText="Enter OTP"
             onChange = {(event,newValue) => this.setState({otp:newValue})}
             />
             <br/>
           <RaisedButton label="verify" primary={true} style={style} onClick={(event) => this.handleClick(event,'verify',this.props.location.state.role,this.props.location.state.mNum)}/>
           <br/>
          <RaisedButton label="Resend OTP" primary={true} style={style} onClick={(event) => this.handleClick(event,'resend',this.props.location.state.role)}/>
             </div>
            </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
  };

export default VerifyOTP;