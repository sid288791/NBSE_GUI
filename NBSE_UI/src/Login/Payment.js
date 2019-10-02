import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

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
  

class Payment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          payMore:'',
          extraSub: []
        }
    }

    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    setPayMore = e =>{
      console.log(e.target.value)
      if(e.target.value === 'yes'){
        var apiBaseUrl = " http://localhost:8080/api/v1"
        axios.get(apiBaseUrl+'/getExtraSub')
        .then((response) =>{
          console.log(response);
          if(response.status === 200){
            extraSub : response
          }
        }).catch((error) =>{
          console.log(error);
        });


      }
      this.setState({payMore:e.target.value})
    }

    render(){
     const { classes } = this.props;
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
                  NBSE Payment
                  </Paper>
                  </Grid>
                  <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.paper}>
                <Typography variant="h4" component="h2" gutterBottom>
                You have been successfully registered
               </Typography>
                  <div>
                  <span>Do you want to add more Subjects :</span>
                    <input type="radio" name="paymore" value="yes" onChange = {this.setPayMore}/>Yes
                       <input type="radio" name="paymore" value="no" onChange = {this.setPayMore}/>No
                  </div>
                 
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