import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from "@material-ui/core/FormControl";


const suggestions = [
  { label: 'DELHI PUBLIC SCHOOL,VISHAKHAPATNAM, AP', id: '87085' },
  { label: 'ST JOSEPHS ENG SR SEC SCHOOL,KURNOOL, AP', id: '02187' },
  { label: 'DONYI POLO VIDYA NIKETAN,EAST SIANG, AR' , id: '17068'},
  { label: 'INTERNATIONAL SCHOOL GUWAHATI,GUWAHATI, AS', id: '26937' },
  { label: 'HOLY FAITH INTL PUBLIC SCHOOL,PATNA, BR', id: '11396' },
  { label: 'ST MICHAELS SCHOOL,WEST CHAMPARAN, BR', id: '17850' },
  { label: 'CHANDIGARH BAPTIST SCHOOL,CHANDIGARH, CH', id: '01645' },
  { label: 'DELHI PUBLIC SCHOOL,RAIPUR, CG', id: '05170' },
  { label: 'BAL BHAWAN INTL SCHOOL,DWARKA, DD', id: '16325' },
  { label: 'CHINMAYA VIDYALAYA SR SEC SCHOOL,VASANT VIHAR, DD', id: '15727' },
  { label: 'CRPF PUBLIC SCHOOL,DWARKA, DD', id: '16333' },
  { label: 'DAV PUBLIC SCHOOL,PUSHPANJALI ENCLAVE, DD', id: '15484' },
  { label: 'GD GOENKA PUBLIC SCHOOL,VASANT KUNJ, DD', id: '15754' },
  { label: 'ST GEORGES SCHOOL,ALAKNANDA, DD', id: '15875' },
  { label: 'VENKATESHWAR GLOBAL SCHOOL,ROHINI, DD', id: '16256' },
  { label: 'BRAIN INTL SCHOOL,VIKAS PURI, DD', id: '16272' },
  { label: 'GUJARAT PUBLIC SCHOOL,VADODARA, GJ', id: '19069' },
  { label: 'SCHOLARS ACADEMY,RAJKOT, GJ', id: '01865' },
  { label: 'SHREE SWAMI NARAYAN ACADEMY,SURAT, GJ', id: '05419' },
  { label: 'AMBALA PUBLIC SR SEC SCHOOL, AMBALA CITY, HR', id: '00773' },
  { label: 'DAV PUBLIC SCHOOL,FARIDABAD, HR', id: '00985' },
  { label: 'DELHI INTL CONVENT SCHOOL,SONEPAT, HR', id: '42758' },
  { label: 'DELHI PUBLIC SCHOOL,AMBALA CITY, HR', id: '07288' },
  { label: 'DELHI PUBLIC SCHOOL,YAMUNANAGAR, HR', id: '07162' },
  { label: 'GD GOENKA PUBLIC SCHOOL,SONEPAT, HR,', id: '07662' },
  { label: 'HOLY CHILD SR SEC SCHOOL,SONEPAT, HR', id: '00854' },
  { label: 'MARU MAL PUBLIC SCHOOL,GURGAON, HR', id: '07085' },
  { label: 'SATLUJ PUBLIC SCHOOL,SIRSA, HR', id: '00937' },
  { label: 'SCHOLARS ROSARY SR SEC SCHOOL,ROHTAK, HR', id: '07257' },
  { label: 'SHALOM HILLS INTL SCHOOL,GURGAON, HR', id: '07195' },
  { label: 'ST ANTHONY SCHOOL,HISAR, HR', id: '90428' },
  { label: 'ST JOHNS SCHOOL,FARIDABAD, HR', id: '00806' },
  { label: 'ST THERESAS CONVENT SCHOOL,KARNAL, HR', id: '00825' },
  { label: 'THE MILLENIUM SCHOOL,KURUKSHETRA, HR', id: '07543' },
  { label: 'THE OAKWOOD SCHOOL,BHIWANI, HR', id: '23499' },
  { label: 'DAV PUBLIC SCHOOL,MANDI, HP', id: '07751' },
  { label: 'DELHI PUBLIC SCHOOL,MANDI, HP', id: '20254' },
  { label: 'GREEN FIELD SR SEC SCHOOL,KANGRA, HP', id: '07766' },
  { label: 'SPRING FIELD PUBLIC SCHOOL,MANDI, HP', id: '91572' },
  { label: 'ST XAVIERS RES SCHOOL,MANDI, HP', id: '07782' },
  { label: 'SUNRISE PUBLIC SCHOOL,MANDI, HP', id: '20242' },
  { label: '*CITY CENTRAL EDUCATIONAL INSTITUTE,SRINAGAR, JK', id: '28048' },
  { label: 'KC INTL SCHOOL,JAMMU, JK', id: '07877' },
  { label: 'LYCEUM INTL SCHOOL,PULWAMA, JK', id: '42821' },
  { label: 'BOKARO PUBLIC SCHOOL,BOKARO, JH', id: '11676' },
  { label: 'CARMEL SCHOOL,GIRIDIH, JH', id: '27460' },
  { label: 'DELHI PUBLIC SCHOOL,DHANBAD, JH', id: '03810' },
  { label: 'DON BOSCO SCHOOL,DHANBAD, JH', id: '90032' },
  { label: 'VIVEKANANDA ENGLISH MEDIUM SCHOOL,DAKSHIN KANNAD, KA', id: '29089' },
  { label: 'CITY PUBLIC HIGH SCHOOL,ASHOK NAGAR,  MP', id: '06101' },
  { label: 'DELHI PUBLIC SCHOOL,SAGAR, MP', id: '86673' },
  { label: 'DELHI WORLD PUBLIC SCHOOL,GWALIOR, MP', id: '44241' },
  { label: 'ECS BAGLESS SCHOOL,GWALIOR, MP', id: '44784' },
  { label: 'GREEN WOOD PUBLIC SCHOOL,GWALIOR,  MP', id: '44782' },
  { label: 'MUSKAN PUBLIC SCHOOL,ASHOK NAGAR, MP', id: '86431' },
  { label: 'RAMAKRISHNA VIDYA MANDIR,GWALIOR, MP', id: '00202' },
  { label: 'SMT RUKMANI DEVI LADHA MAHESHWARI PUBLIC SCHOOL,GWALIOR, MP', id: '44788' },
  { label: 'ST JOSEPHS CONVENT SCHOOL,GWALIOR, MP', id: '44903' },
  { label: 'THE MANVENDRA GLOBAL SCHOOL,GWALIOR, MP', id: '86681' },
  { label: 'BHAVANS BHAGWANDAS PUROHIT VIDYA MANDIR,NAGPUR, MH', id: '02838' },
  { label: 'JOHN XXIII SCHOOL,THANE, MH', id: '10655' },
  { label: 'NARAYANA VIDYALAYAM,NAGPUR, MH', id: '10403' },
  { label: 'NASHIK CAMBRIDGE SCHOOL,NASHIK, MH', id: '02996' },
  { label: 'NEW HORIZON SCHOLAR SCHOOL,THANE (W), MH', id: '10706' },
  { label: 'RMD SINHGAD SPRING DALE SCHOOL,PUNE, MH', id: '86837' },
  { label: 'THE LEXICON INTL SCHOOL,PUNE, MH', id: '10622' },
  { label: 'ADITYA VIDYASHRAM RESIDENTIAL SCHOOL,PUDUCHERRY, PC', id: '03701' },
  { label: 'BKJS APPLE ORCHARD SCHOOL,KAPURTHALA, PB', id: '08465' },
  { label: 'BLOSSOM CONVENT SCHOOL,LUDHIANA, PB', id: '08083' },
  { label: 'DELHI WORLD PUBLIC SCHOOL,ZIRAKPUR, PB', id: '87590' },
  { label: 'DON BOSCO SR SEC SCHOOL,MOHALI, PB', id: '01482' },
  { label: 'GURU HARKRISHAN PUBLIC SCHOOL,PATIALA, PB', id: '08486' },
  { label: 'SAHIBZADA AJIT SINGH JI PUBLIC SCHOOL,JALANDHAR, PB', id: '07959' },
  { label: 'ST JOSEPHS CONVENT SCHOOL,PATIALA, PB', id: '91654' },
  { label: 'ST XAVIERS SCHOOL,BHATINDA, PB', id: '01347' },
  { label: 'TAGORE INTL SCHOOL,PATIALA CANTT, PB', id: '08477' },
  { label: 'DELHI PUBLIC WORLD SCHOOL,JAIPUR, RJ', id: '42794' },
  { label: 'MOUNT LITERA ZEE SCHOOL,ALWAR, RJ', id: '06840' },
  { label: 'ST TERESA VIDYADEEP SCHOOL,UDAIPUR, RJ', id: '06351' },
  { label: 'ARMY PUBLIC SCHOOL,THE NILGIRIS, TN', id: '03162' },
  { label: 'MAHARISHI VIDYA MANDIR SR SEC SCHOOL,CHENNAI, TN', id: '03076' },
  { label: 'VANI VIDYALAYA,CHENNAI, TN', id: '03189' },
  { label: 'GEETANJALI IIT OLYMPIAD HIGH SCHOOL,RANGAREDDY, TA', id: '16565' },
  { label: 'ASTER PUBLIC SCHOOL,GREATER NOIDA, UP', id: '11929' },
  { label: 'CAMBRIDGE INTL SCHOOL,SAHARANPUR, UP', id: '12995' },
  { label: 'DELHI PUBLIC SCHOOL,VARANASI, UP', id: '11993' },
  { label: 'DELHI PUBLIC SCHOOL,NOIDA, UP', id: '13073' },
  { label: 'DR KN MODI GLOBAL SCHOOL,MODI NAGAR,  UP', id: '12473' },
  { label: 'FR AGNEL SCHOOL,NOIDA, UP', id: '11923' },
  { label: 'RYAN INTERNATIONAL SCHOOL,GREATER NOIDA, UP', id: '12087' },
  { label: 'RYAN INTL SCHOOL,RAE BARELI, UP', id: '85049' },
  { label: 'SETH ANANDRAM JAIPURIA PUBLIC SCHOOL,GHAZIABAD, UP', id: '12098' },
  { label: 'ST FRANCIS CONVENT SCHOOL,MEERUT, UP', id: '84782' },
  { label: 'ST GEORGE SCHOOL,GAUTAM BUDH NAGAR, UP', id: '88907' },
  { label: 'SUN VALLEY INTL SCHOOL,GHAZIABAD, UP', id: '12004' },
  { label: 'SUNBEAM SCHOOL,SULTANPUR, UP', id: '88777' },
  { label: 'GRD ACADEMY,DEHRADUN, UK', id: '85409' },
  { label: 'AMARPATI LIONS CITIZENS PUBLIC SCHOOL,DARJEELING, WB', id: '41508' },
  { label: 'GB MEMORIAL INSTITUTION,KOLKATA, WB', id: '85947' },
  { label: 'NORTH KOLKATA PUBLIC SCHOOL,KOLKATA, WB', id: '85956' }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
  id: suggestion.id
}));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 150,
    minWidth: 500,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
}));


function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  /**
   * Children to render.
   */
  children: PropTypes.node,
  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired,
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  selectProps: PropTypes.object.isRequired,
};

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

Option.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
  }).isRequired,
  /**
   * Inner ref to DOM Node
   */
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  /**
   * Whether the option is focused.
   */
  isFocused: PropTypes.bool.isRequired,
  /**
   * Whether the option is selected.
   */
  isSelected: PropTypes.bool.isRequired,
};

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.any.isRequired,
  selectProps: PropTypes.object.isRequired,
};

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool.isRequired,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
  }).isRequired,
  selectProps: PropTypes.object.isRequired,
};

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};
 var idval = '';

 
export default function SchoolAutosuggest(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);
  const [multi, setMulti] = React.useState(null);

  function handleChangeSingle(value) {
    console.log(suggestions.length);
    for(var i=0; i<suggestions.length; i++){
      if(value.value === suggestions[i].label){
        idval = suggestions[i].id;
      }
    }
    props.parentCallback(idval);
    setSingle(value);
   
  }

  function handleChangeMulti(value) {
    setMulti(value);
  }

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <div className={classes.root}>
      <FormControl style={{minWidth: 500}}>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label: 'School Name',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true,
            },
          }}
          placeholder="Search a school (start with a)"
          
          options={suggestions}
          components={components}
          value={single}
          onChange={handleChangeSingle}
        />
        </FormControl>
        <br/>
        <FormControl style={{minWidth: 260}}>
        {idval && <TextField
        id="school-code"
        label="School Code"
        value={idval}
        margin="normal"
        style={{width: 500}}
             />}
       </FormControl>  </div>
  );
}
