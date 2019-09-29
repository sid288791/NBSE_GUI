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
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import { RadioGroup, RadioButton } from 'react-radio-buttons';



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
    marginTop: '1em'
  },
  header:{
    textAlign: 'center',
    backgroundColor: '#31bee5',
    color:'white',
    padding:'0.8rem',
    borderRadius:'8px 8px 0px 0px',
    variant:'h2'
  },
  radio: {
    cursor: 'pointer',
    color: '#282c34'
}
});

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
      oathVal:'',
      repassword: '',
      payMore: '',
      moreSubFeesVal: '',
      stu_num: ''
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
};

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

 handleOathCheck = name => event => {
   if(event.target.checked){
     console.log(event.target.checked)
     this.setState({oathVal:event.target.value})

   }
};

callbackFunctionForSchoolCode = (schoolCodedropdowndData) => {
      this.setState({schoolCodeVal: schoolCodedropdowndData})
}
toInputUppercaseForStuName = e =>{
   e.target.value = (""+ e.target.value).toUpperCase();
    this.setState({stu_name:e.target.value});

 }

 setPayMore = e =>{
   this.setState({payMore:e.target.value})
 }

 onMoreSubChange = moreSubFees =>{
   this.setState({moreSubFeesVal:moreSubFees});
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


  handleClick(event,role,mNum){
    var apiBaseUrl = "http://18.189.141.222:8081/api/v1";
    // console.log("values in register handler",role);
    var self = this;
    //console.log(this.state.payMore);
    //console.log(this.state.moreSubFeesVal);

    //To be done:check for empty values before hitting submit
    // if(this.state.password !== this.state.repassword){
    //   alert("The password you entered did not match ");
    //   return false;

    // }
    console.log(this.props.location.state.mNum);
    console.log(this.state.file);
    console.log(this.state.mother_num);
    console.log(this.state.password);
    
    if(this.state.oathVal.length>0){
    if(this.state.email.length>0 &&  this.state.stu_name.length>0 && this.state.mother_name.length>0 && this.state.father_name.length>0 
      && this.state.father_num.length>0 && this.state.dob !== 'undefined' && this.state.classVal !== 'undefined'
       && this.state.subFeesVal !== 'undefined'  && this.state.schoolCodeVal.length>0 && this.finalSubArray.length>0){
        
         // Prevent default behavior
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('myImage', this.state.file);
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
        formData.append('stu_num',this.props.location.state.mNum);
        const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };


     
      axios.post(apiBaseUrl+'/doRegistration', formData,config)
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
      this.props.history.push("/register", { role : role});
      alert("Input field value is missing");
    }
  }else{
    this.props.history.push("/register", { role : role});
    alert("Please check oath check box");
    this.props.history.push("/register", { role : role});
  }

  }
  render() {
    const { classes } = this.props;

    // console.log("props",this.props);
    var userhintText,userLabel,idval;
    console.log(this.props.location.state);
    //if(this.props.location.state.role === "student"){
      userhintText="Enter your Email Id";
      userLabel="Student Email Id";
    // }
    // else{
    //   userhintText="Enter your Email Id";
    //   userLabel="Teacher Email Id";
    // }
    return (
      
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="NBSE"
           />
           <br></br>
           <div>
             <Grid container justify="center" className={classes.gridContainer} spacing={3}>
             <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.header} variant="h2">
                  NBSE Registeration
                  </Paper>
                  </Grid>
              <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.paper}>
                  
           <form onSubmit={(event) => this.handleClick(event,this.props.role)}>
          
           <TextField
             hintText="Enter your Name"
             floatingLabelText="Student Name"
             onChange = {this.toInputUppercaseForStuName}
             style={{width: 500}}
             />
             <br/>
           <TextField
             hintText="Enter your Father Name"
             floatingLabelText="Father Name"
             onChange = {this.toInputUppercaseForFatherName}
             style={{width: 500}}
             />
           <br/>
           <br/>
           <FormControl style={{minWidth: 500}}>
           <MuiPhoneNumber
             name="fatherNum"
             data-cy="user-phone"
             defaultCountry={"in"}
             id="standard-number"
             label="Father Phone Number"
             value={this.state.fatherNum}
           // floatingLabelText="Mother Phone Number"
            onChange={this.handleFatherNum} 
            margin ="normal"
            style={{width: 500}}></MuiPhoneNumber>
            </FormControl>
           <br/>
           <TextField
             hintText="Enter your Mother Name"
             floatingLabelText="Mother Name"
             onChange = {this.toInputUppercaseForMotherName}
             style={{width: 500}}
             />
             <br/>
             <br/>
             <FormControl style={{minWidth: 500}}>
             <MuiPhoneNumber
             name="motherNum"
             data-cy="user-phone"
             defaultCountry={"in"}
             id="standard-number"
             label="Mother Phone Number"
             value={this.state.motherNum}
           // floatingLabelText="Mother Phone Number"
            onChange={this.handleMotherNum} 
            ></MuiPhoneNumber>
            </FormControl>
           
        <br/>
           <TextField
             hintText={userhintText}
             floatingLabelText={userLabel}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             style={{width: 500}}
             />
           {/* <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             style={{width: 500}}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Reconfirm Password"
             onChange = {(event,newValue) => this.setState({repassword:newValue})}
             style={{width: 500}}
             /> */}
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
               <div>
           <span style = {{fontWeight:'bold'}}>*If your school is not appearing here call or whatsapp on 7838594590</span>
           </div>
           <br/>
            
           <SubjectFess parentCallback = {this.callbackFunctionForSubFees}/>
        
           <SubjectTables props = {this.props} dataFromParent = {this.state.subFeesVal}  subCheckedFunction = {this.subCheckedFunction.bind(this)} />
           <br/>
           
           <MediaCapture parentCallback = {this.callbackFunctionForImage}/><label style = {{fontWeight:'bold'}}>{this.state.file.name}</label>
           {/* <div>
           <span>Do you want to add more Subjects :</span>
           <input type="radio" name="paymore" value="yes" onChange = {this.setPayMore}/>Yes
            <input type="radio" name="paymore" value="no" onChange = {this.setPayMore}/>No
            </div>
            <br/>{this.state.payMore === 'yes' &&
            <RadioGroup onChange={ this.onMoreSubChange } horizontal>
             <RadioButton value="1">
                1
             </RadioButton>
           <RadioButton value="2">
               2
           </RadioButton>
          <RadioButton value="3">
            3
          </RadioButton>
          <RadioButton value="4">
            4
          </RadioButton>
          <RadioButton value="5">
            5
          </RadioButton>
         
        </RadioGroup>} */}
           <br/>
           <Checkbox
        //checked={true}
        onChange={this.handleOathCheck('checkedOath')}
        value="checkedOath"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox',
        }}
      /><span>I hereby accept all Rules & Regulation of NBSE. I am appearing in only those Subjects which I have paid for. All particulars filled above including photo & payment details are correct. <span style = {{fontWeight:'bold'}}>Please issue me an Admit Card.</span></span>
      <br/>
           <RaisedButton primary={true} style={style} type="submit" className="button">
            Register
          </RaisedButton>
           
           </form>
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

export default withRouter(withStyles(Styles, { withTheme: true })(Register));