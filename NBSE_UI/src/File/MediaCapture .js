import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

const styles = (theme) => ({
    input: {
        display: 'none'
    }
});

class MediaCapture extends Component {
    constructor(props){
        super(props);
        this.state = {
            images: [],
            videos: []
        };

    }
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    

    handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        const name = target.accept.includes('image') ? 'images' : 'videos';
        if(target.files[0] !== undefined){
        if(target.files[0].size>205000){
            alert("Please select image less than 200KB");
        }
        else{
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            this.setState((prevState) => ({
                [name]: [...prevState[name], e.target.result]
            }));
        };
        this.props.parentCallback(target.files[0]);
    }
    }
    };


    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-photo"
                    onChange={this.handleCapture}
                    type="file"
                />
                <label htmlFor="icon-button-photo"> Upload Passport Size photo
                    <IconButton color="primary" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>

            </Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MediaCapture);