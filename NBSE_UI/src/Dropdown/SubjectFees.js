import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240
  }
});

class SubjectFess extends React.Component {
  state = {
    subfees: "",
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef.current).offsetWidth
    });
  }

  handleSubFeesChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.parentCallback(event.target.value);
  };

  render() {
    const { classes } = this.props;

    this.InputLabelRef = React.createRef();
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={this.InputLabelRef} htmlFor="outlined-subfees-simple">
            Subject Fees Paid
          </InputLabel>
          <Select
            value={this.state.subfees}
            onChange={this.handleSubFeesChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="subfees"
                id="outlined-subfees-simple"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SubjectFess.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubjectFess);
