import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';

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
    },
    button: {
     // margin: theme.spacing(1),
      width: '970px'
    }
  });
class AfterLogin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          payMore:'',
         
        }
    }
    static propTypes = {
      classes: PropTypes.object.isRequired
  };

    render(){
        const { classes } = this.props;
        return(
            <div>
            <MuiThemeProvider>
            <div>
                <AppBar style={{ background: '#284e9b' }}  title="NBSE™"/>
                <br/>
                <div>
                <Grid container justify="center" className={classes.gridContainer} spacing={3}>
                <Grid item xs={10} style={{maxWidth:'1000px'}}>
                <Paper className={classes.header} variant="h2">
                Welcome to NBSE {this.props.location.state.loginName}
                </Paper>
                <div>
                    <Button variant="contained" className={classes.button}>
                     Download Admit Card
                    </Button>
                    <Button variant="contained" className={classes.button}>
                     Download Marksheet
                    </Button>
                    <Button variant="contained" className={classes.button}>
                     Re-Verification
                    </Button>
                    <Button variant="contained" className={classes.button}>
                     Re-Evaluation
                    </Button>
                    <Button variant="contained" className={classes.button}>
                     Scanned Copy
                    </Button>
                </div>
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

export default withRouter(withStyles(Styles, { withTheme: true })(AfterLogin));