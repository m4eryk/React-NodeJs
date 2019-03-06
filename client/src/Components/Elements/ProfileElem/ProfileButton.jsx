import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import NavigationIcon from '@material-ui/icons/Navigation';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit * 1,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

function ProfileButton(props) {
  const { classes } = props;
  if(props.name === 'add'){
      return(
        <Fab color="primary" onClick={props.onClick} aria-label="Add" className={classes.fab}>
            <AddIcon />
       </Fab>
      )
  } else if(props.name === 'edit') {
    return(
      <Fab color="secondary" onClick={props.onClick} aria-label="Edit" className={classes.fab}>
          <Icon>edit_icon</Icon>
      </Fab>
    )
  } else if(props.name === 'message'){
    return(
        <Fab variant="extended" onClick={props.onClick} aria-label="Delete" className={classes.fab}>
            <NavigationIcon className={classes.extendedIcon} />
            Message
        </Fab>
    )
  } else if(props.name === 'headerMessage'){
    return (
      <IconButton onClick={props.onClick} color="inherit">
        <Badge className={classes.margin} badgeContent={0} color="primary">
          <MailIcon />
        </Badge>
      </IconButton>
  )} else if(props.name === 'headerNotification'){
    return( 
      1
    )} else {
    return null
  }
}

ProfileButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileButton);
