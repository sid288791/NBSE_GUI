import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props,setDate) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  function handleDateChange(date) {
    var dates = new Date(date)
    setSelectedDate(date);
    props.setDate(dates.getDate() + '/' +  (dates.getMonth() + 1)  + '/' +  dates.getFullYear());
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        
        <KeyboardDatePicker
          margin="normal"
          id="dob"
          label="Date Of Birth"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{width: 500}}
        />
        
      </Grid>
    </MuiPickersUtilsProvider>
  );
}