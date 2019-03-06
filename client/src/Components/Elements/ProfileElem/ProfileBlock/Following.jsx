import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Following extends React.Component {
//   state = {
//     checked: [1],
//   };

//   handleToggle = value => () => {
//     const { checked } = this.state;
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     this.setState({
//       checked: newChecked,
//     });
//   };

  render() {
    const { classes } = this.props;

    return (
      <List dense className={classes.root}>
        {[0, 1, 2, 3, 4, 5].map((value, key) => (
          <ListItem key={key} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`data:image/jpeg;base64,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`}
              />
            </ListItemAvatar>
            <ListItemText primary={`Alex Jonson ${value + 1}`} />
            <ListItemSecondaryAction>
              {/* <Checkbox
                onChange={this.handleToggle(value)}
                checked={this.state.checked.indexOf(value) !== -1}
              /> */}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

Following.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Following);
