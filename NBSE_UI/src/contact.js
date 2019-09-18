import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios'

class Contact extends React.Component {
  constructor(props){
    super(props);
    this.state ={
        mobile_number:'',
        resp :''
    }
}
  onSubmit = () => {
    var apiBaseUrl = "http://localhost:4000/api/";
    // console.log("values in register handler",role);
    var self = this;
    if(this.state.mobile_number.length>0){
    
        var payload={
            "mobile_number": this.state.mobile_number//,
           // "role":param
        }
      }
      axios.post(apiBaseUrl+'/sendOTP', payload).
      then( (response) => {
        console.log(response);
        
       if(response.status === 200){
        this.props.history.push("/VerifyOTP");
        //this.setState({ resp: "test" });
       }
      }).
      catch((error) => {
        console.log(error);
      });
      if(this.state.resp === "test"){
      this.props.history.push("/VerifyOTP");
      }
  };

  render() {
    return (
        <div>
            <MuiThemeProvider>
            <div>
            <AppBar
               title="Mobile Number"
             />

        <TextField
             hintText="Enter your mobile number"
             floatingLabelText="Mobile number"
             onChange = {(event,newValue) => this.setState({mobile_number:newValue})}
             />
             <br/>
             <RaisedButton label="Send OTP" primary={true} style={style} onClick={this.onSubmit}/>

             <button onClick={this.onSubmit}>Submit</button>
             </div>
             </MuiThemeProvider>
           </div>
        
      
    );
  }
}

const style = {
  margin: 15,
};

export default Contact;
