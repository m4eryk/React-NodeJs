import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SignIn from './SignIn';
import LogIn from './LogIn';

const styles = {
  root: {
    flexGrow: 1,
    border: 'none',
    boxShadow: 'none'
  },
};

class CenteredTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign Up" />
          <Tab label="Log In" />
        </Tabs>
      </Paper>
      {
        this.state.value === 0 
        ? <SignIn />
        : <LogIn />
      }
    </React.Fragment>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);
