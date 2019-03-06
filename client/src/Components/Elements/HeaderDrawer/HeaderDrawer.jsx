import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ShopIcon from '@material-ui/icons/ShoppingCart'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import NewsIcon from '@material-ui/icons/ImportContacts'
import WorkIcon from '@material-ui/icons/Work'
import {Link} from 'react-router-dom';


import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {[
            {name: 'Main Page', to: '/', icon:  <HomeIcon/>}, 
            {name: 'Work', to: '/work', icon:  <WorkIcon/>}, {name: 'Shop', to: '/shop', icon:  <ShopIcon/>}, 
            {name: 'News', to: '/news', icon:  <NewsIcon/>}, {name: 'Galery', to: '/galery', icon:  <SubscriptionsIcon/>}
          ]
            .map((vul, index) => (
              <Link key={index} to={vul.to}>
                <ListItem button>
                  <ListItemIcon>{vul.icon}</ListItemIcon>
                  <ListItemText primary={vul.name} />
                </ListItem>
              </Link>
          ))}
        </List>
        <Divider />
      </div>
    );

    return (
      <div>
          <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);