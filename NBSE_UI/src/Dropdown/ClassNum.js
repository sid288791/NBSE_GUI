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

class SimpleSelect extends React.Component {
  state = {
    classnum: "",
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef.current).offsetWidth
    });
  }

  
  handleClassDropDownChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.parentCallback(event.target.value);
  };

  render() {
    const { classes } = this.props;

    this.InputLabelRef = React.createRef();
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={this.InputLabelRef} htmlFor="outlined-classnum-simple">
            Class
          </InputLabel>
          <Select
            value={this.state.classnum}
           // onChange={this.handleChange}
           onChange={this.handleClassDropDownChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="classnum"
                id="outlined-classnum-simple"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>one</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
            <MenuItem value={6}>Six</MenuItem>
            <MenuItem value={7}>Seven</MenuItem>
            <MenuItem value={8}>Eight</MenuItem>
            <MenuItem value={9}>Nine</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={11}>Eleven</MenuItem>
            <MenuItem value={12}>Twelve</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
