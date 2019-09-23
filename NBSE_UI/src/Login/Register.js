import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './LoginPage';
import MaterialUIPickers from '../DatePicker/MaterialUIPickers';
import ClassNum from '../Dropdown/ClassNum';
import SchooldAutosuggest from '../Dropdown/SchooldAutosuggest';
import SubjectTables from '../Table/SubjectTable';
import SubjectFess from '../Dropdown/SubjectFees';
import MediaCapture from '../File/MediaCapture ';
import MuiPhoneNumber from 'material-ui-phone-number'

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      stu_name:'',
      email:'',
      password:'',
      dateTime: null,
      dob : '',
      mother_name : '',
      mother_num : '',
      father_name : '',
      father_num : '',
      idval : '',
      classVal :'',
      subFeesVal : '',
      schoolCodeVal : '',
      file: '',
      dobVal: '',
    }
  }

  finalSubArray = []
  
  callbackFunctionForImage = (imagedata) => {
    this.setState({file: imagedata})
}
 // state = { classVal: "" }
callbackFunction = (classdropdowndData) => {
      this.setState({classVal: classdropdowndData})
}

//state = { subFeesVal: "" }
callbackFunctionForSubFees = (subfeesdropdowndData) => {
      this.setState({subFeesVal: subfeesdropdowndData})
}

//state = { schoolCodeVal: "" }
callbackFunctionForSchoolCode = (schoolCodedropdowndData) => {
      this.setState({schoolCodeVal: schoolCodedropdowndData})
}
toInputUppercaseForStuName = e =>{
   e.target.value = (""+ e.target.value).toUpperCase();
    this.setState({stu_name:e.target.value});

 }

 toInputUppercaseForMotherName = e =>{
  e.target.value = (""+ e.target.value).toUpperCase();
   this.setState({mother_name:e.target.value});

}

toInputUppercaseForFatherName = e =>{
  e.target.value = (""+ e.target.value).toUpperCase();
   this.setState({father_name:e.target.value});

}

handleMotherNum=(value)=>{
  console.log(value);
  //this.mother_num=value;
  this.setState({mother_num:value});
}

handleFatherNum=(value)=>{
  console.log(value);
  //this.mother_num=value;
  this.setState({father_num:value});
}

handleInputChange(e) {
  this.setState({ item_msg: e.target.value })
}

  setDate = (dob) => {
    this.setState({ dob })
    this.setState({dobVal: dob.value})
  }

  subCheckedFunction = (subArray,flag,item) =>{
    
    for(var i=0;i<subArray.length;i++){
          if(flag === true && subArray[i].data === item){
            subArray.splice(i,1);
       
        }
    }
    if(this.state.subFeesVal.length === 0){
      alert("Please select the number of subject for which you have paid fees");
    }else{
      if(this.state.subFeesVal >= subArray.length){
    console.log(subArray);
    this.finalSubArray = subArray
    console.log(this.finalSubArray);
      }else{
        alert("Please select only " +this.state.subFeesVal + " subject for which you have paid fees otherwise only "+this.state.subFeesVal + " subjects will be considered");
      }
    }
    
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }


  handleClick(event,role){
    var apiBaseUrl = "http://localhost:4000/api/";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.email.length>0 && this.state.password.length>0 && this.state.file !== 'undefined'
      && this.state.stu_name.length>0 && this.state.mother_name.length>0 && 
      this.state.mother_num.length>0 && this.state.father_name.length>0 
      && this.state.father_num.length>0 && this.state.dob !== 'undefined' && this.state.classVal !== 'undefined'
       && this.state.subFeesVal !== 'undefined'  && this.state.schoolCodeVal.length>0 && this.finalSubArray.length>0){
        
         // Prevent default behavior
        event.preventDefault();

        const formData = new FormData();
        formData.append('myImage',this.state.file);
        formData.append('email',this.state.email);
        formData.append('password',this.state.password);
        formData.append('stu_name',this.state.stu_name);
        formData.append('mother_name',this.state.mother_name);
        formData.append('mother_num',this.state.mother_num.slice(4,9)+this.state.mother_num.slice(10,15));
        formData.append('father_name',this.state.father_name);
        formData.append('father_num',this.state.father_num.slice(4,9)+this.state.father_num.slice(10,15));
        formData.append('dob',this.state.dob);
        formData.append('classVal',this.state.classVal);
        formData.append('subFeesVal',this.state.subFeesVal);
        formData.append('schoolCodeVal',this.state.schoolCodeVal);
        formData.append('subFeesArray',this.finalSubArray);
        const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };


     
      axios.post(apiBaseUrl+'/register', formData,config)
     .then((response) => {
       console.log(response);
       if(response.status === 200){
        this.props.history.push("/login", { role : role});
        //  console.log("registration successfull");
         var loginscreen=[];
         loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
         var loginmessage = "Not Registered yet.Go to registration";
         this.setState({loginscreen:loginscreen.value,
         loginmessage:loginmessage.value,
         buttonLabel:"Register",
         isLogin:true
          });
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch((error) => {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    // console.log("props",this.props);
    var userhintText,userLabel,idval;
    console.log(this.props.location.state);
    if(this.props.location.state.role === "student"){
      userhintText="Enter your Email Id";
      userLabel="Student Email Id";
    }
    else{
      userhintText="Enter your Email Id";
      userLabel="Teacher Email Id";
    }
    return (
      
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <form onSubmit={(event) => this.handleClick(event,this.props.role)}>
           <TextField
             hintText="Enter your Name"
             floatingLabelText="Student Name"
             onChange = {this.toInputUppercaseForStuName}
             />
           <br/>
           <TextField
             hintText="Enter your Mother Name"
             floatingLabelText="Mother Name"
             onChange = {this.toInputUppercaseForMotherName}
             />
             <br/>
             <br/>
             <MuiPhoneNumber
             name="motherNum"
             data-cy="user-phone"
             defaultCountry={"in"}
             id="standard-number"
             label="Mother Phone Number"
             value={this.state.motherNum}
           // floatingLabelText="Mother Phone Number"
            onChange={this.handleMotherNum} ></MuiPhoneNumber>
             
           <br/>
           <TextField
             hintText="Enter your Father Name"
             floatingLabelText="Father Name"
             onChange = {this.toInputUppercaseForFatherName}
             />
           <br/>
           <br/>
           <MuiPhoneNumber
             name="fatherNum"
             data-cy="user-phone"
             defaultCountry={"in"}
             id="standard-number"
             label="Father Phone Number"
             value={this.state.fatherNum}
           // floatingLabelText="Mother Phone Number"
            onChange={this.handleFatherNum} 
            margin ="normal"></MuiPhoneNumber>
        <br/>
           <TextField
             hintText={userhintText}
             floatingLabelText={userLabel}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
             <MaterialUIPickers type = "dob"
             hintText="Enter your DOB"
             floatingLabelText="DOB"
             props = {this.props} 
             setDate = {this.setDate.bind(this)}/>
           <br/>
           <ClassNum parentCallback = {this.callbackFunction}/>
           <br/>
             <SchooldAutosuggest props = {this.props}
               parentCallback = {this.callbackFunctionForSchoolCode} />

           <SubjectFess parentCallback = {this.callbackFunctionForSubFees}/>
        
           <SubjectTables props = {this.props} dataFromParent = {this.state.subFeesVal}  subCheckedFunction = {this.subCheckedFunction.bind(this)} />
           <br/>
           
           <MediaCapture parentCallback = {this.callbackFunctionForImage}/>
           <br/>
           <RaisedButton primary={true} style={style} type="submit" className="button">
            Register
          </RaisedButton>
           
           </form>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;