import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';

import {loginUser} from '../../../../redux/actions/authActions';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    //marginLeft: theme.spacing.unit * 3,
    //marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    boxShadow: 'none',
    marginTop: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    //marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      errors: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.setState({
        [e.target.id]: e.target.value
    })
  }
  
  onSubmit(e){
    e.preventDefault();
    const userData = {
        name: this.state.username,
        password: this.state.password
    }

    this.props.loginUser(userData);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  componentWillUnmount(){
    this.props.addTodoWithDispatch();
  }

  render(){
  const { classes } = this.props;
  const {errors} = this.state;
    console.log(this.props.errors)
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Log In
        </Typography>
        <form onSubmit={this.onSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="Username">Username</InputLabel>
            <Input  onChange={this.onChange} id="username" name="username" autoComplete="Username" autoFocus />
            {errors.name && (<div className='text-danger'>{errors.name}</div>)}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input  onChange={this.onChange} name="password" type="password" id="password" autoComplete="current-password" />
            {errors.password && (<div className='text-danger'>{errors.password}</div>)}
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </main>
  );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

function addTodoWithDispatch() {
  return {
    type: 'GET_ERRORS',
    payload: {}
  }
}

export default connect(mapStateToProps, {loginUser, addTodoWithDispatch})(withStyles(styles)(SignIn));