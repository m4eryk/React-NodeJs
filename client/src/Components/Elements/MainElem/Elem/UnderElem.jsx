import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import UnderNewItems from './UnderNewItems';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ paddingTop: 8 * 3, paddingRight: 5, paddingLeft: 5 }}>
      {children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    console.log(this.props.arrNews)
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor: 'white', boxShadow: 'none'}}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            variant="standard"
            textColor='primary'
            centered
          >
            <Tab label="Music" />
            <Tab label="Art" />
            <Tab label="Film" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >      
          <TabContainer  dir={theme.direction}><div className='d-flex flex-wrap justify-content-around'>{this.props.arrNews.music.map((vul, key) => <UnderNewItems key={key} vul={vul}/>)}</div></TabContainer> 
          <TabContainer dir={theme.direction}><div className='d-flex flex-wrap justify-content-around'>{this.props.arrNews.art.map((vul, key) => <UnderNewItems key={key} vul={vul}/>)}</div></TabContainer>
          <TabContainer dir={theme.direction}><div className='d-flex flex-wrap justify-content-around'>{this.props.arrNews.film.map((vul, key) => <UnderNewItems key={key} vul={vul}/>)}</div></TabContainer>    
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);