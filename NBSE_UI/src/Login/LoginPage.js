import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import { ReactNestedMenu } from 'react-nested-menu';
import { Link } from 'react-router-dom';
import NestedList from '../Menu/NestedList'



var apiBaseUrl = "http://localhost:4000/api/";

const styles = {
  navBar: {'top': AppBar.height}
}

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

//import UploadPage from './UploadPage';
class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
         <TextField
           hintText="Enter your mobile number"
           floatingLabelText="User Name"
           onChange={(event,newValue) => this.setState({username:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your DOB"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      menuValue:1,
      loginComponent:localloginComponent,
      loginRole:'student',
      open: false
    }
  }
  static propTypes = {
    classes: PropTypes.object.isRequired
};

linkTransformer = (menuItem) => {

  return (
      <Link to={menuItem.url}>{ menuItem.title }</Link>
  )
}


  componentWillMount(){
  // console.log("willmount prop values",this.props);
  if(this.props.role !== undefined){
    if(this.props.role === 'student'){
      console.log("in student componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your mobile number"
             floatingLabelText="User Name"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your DOB"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'student'})
    }
    else if(this.props.role === 'teacher'){
      console.log("in teacher componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your mobile number"
             floatingLabelText="User Name"
             onChange={(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your DOB"
               floatingLabelText="Password"
               onChange={(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({menuValue:2,loginComponent:localloginComponent,loginRole:'teacher'})
    }
  }
  }
  handleClick(event){
    var self = this;
    var payload={
      "userid":this.state.username,
	    "password":this.state.password,
      "role":this.state.loginRole
    }
    axios.post(apiBaseUrl+'login', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.code === 200){
       console.log("Login successfull");
      // var uploadScreen=[];
      // uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole}/>)
       //self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
     }
     else if(response.data.code === 204){
       console.log("Username password do not match");
       alert(response.data.success)
     }
     else{
       console.log("Username does not exists");
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }
  handleMenuChange(value){
    console.log("menuvalue",value);
    var loginRole;
    if(value === 1){
      var localloginComponent=[];
      loginRole='student';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your mobile number"
             floatingLabelText="User Name"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your DOB"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
    }
    else if(value === 2){
      var localloginComponent=[];
      loginRole='teacher';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your mobile numer"
             floatingLabelText="User Name"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your DOB"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
    }
    this.setState({menuValue:value,
                   loginComponent:localloginComponent,
                   loginRole:loginRole})
  }
  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const { classes } = this.props;
    const menu = [
      {
          id: 1,
          title: "Home",
          url: "http://nbse.org.in/"
      },
      {
          id: 2,
          title: "About Us",
          url: "/about-us"
      },
      {
          title: "Team",
          url: "/team",
          children: [
              {
                  id: 8,
                  title: "Tim Drake",
                  url: "/tim-drake"
              },
              {
                  id: 9,
                  title: "Jason Todd",
                  url: "/jason-todd"
              },
              {
                  id: 10,
                  title: "Richard Grayson",
                  url: "/richard-grayson"
              }
          ]
      },
      {
          title: "Services",
          url: "/services",
          children: [
              {
                  id: 5,
                  title: "Web Development",
                  url: "/web-development"
              },
              {
                  id: 6,
                  title: "UI Design",
                  url: "/ui-design"
              },
              {
                  id: 7,
                  title: "Copywriting",
                  url: "/copywriting"
              }
          ]
      },
      {
          id: 4,
          title: "Contact",
          url: "/contact"
      },
      {
          title: "Social",
          url: "/social",
          children: [
              {
                  id: 11,
                  title: "Twitter",
                  url: "/twitter"
              },
              {
                  id: 12,
                  title: "Facebook",
                  url: "/facebook"
              }
          ]
      },
  ];


    return (
      <div>
        <MuiThemeProvider>
        <AppBar style={{ background: '#284e9b' }}
             title="NBSE™" iconElementLeft={<IconButton onClick={this.handleToggle} className="material-icons"><MenuIcon /></IconButton>}>
               </AppBar>
            {/* <Drawer
            open={this.state.open}
            width={200}
            containerStyle={styles.navBar}>
              <NestedList></NestedList>
             <ReactNestedMenu
                    navParentClassname="vertical menu nested"
                    navTopLevelParentClassname="vertical menu"
                    navChildClassname="child"
                    linkTransformer={this.linkTransformer}
                    menuData={menu}/> 
          </Drawer> */}
        </MuiThemeProvider>
        <div>
        <Grid container justify="center" className={classes.gridContainer} spacing={3}>
        <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.header} variant="h2">
                  Login
                  </Paper>
                  </Grid>
              <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.paper}>
        <MuiThemeProvider>
        <div>
        <p>Login as:</p>
        <DropDownMenu value={this.state.menuValue} onChange={(event,index,value)=>this.handleMenuChange(value)}>
          <MenuItem value={1} primaryText="Student" />
          <MenuItem value={2} primaryText="Teacher" />
        </DropDownMenu>
        
        </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
        
        </Paper>
        </Grid>
        </Grid>
        
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default withStyles(Styles, { withTheme: true })(Login);