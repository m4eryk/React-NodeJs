import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DiyIcon from '@material-ui/icons/PhotoAlbum';
import WorkIcon from '@material-ui/icons/Work';
import AboutMeIcon from '@material-ui/icons/Info';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import {connect} from 'react-redux';

import AboutUs from '../ProfileElem/ProfileBlock/AboutUs';
import List from '../../Elements/ProfileElem/ProfileBlock/List';
import Following from '../../Elements/ProfileElem/ProfileBlock/Following';
import ContentTubs from '../../Elements/ProfileElem/ProfileBlock/ContentTubs';
import Diy from '../../Elements/ProfileElem/ProfileBlock/Diy';
import ImageList from '../GaleryElem/ImageList';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 2 * 3,  borderRadius: 12,}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    borderRadius: 12,
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class ProfileBlock extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root} >
        <AppBar position="static" color="default" style={{borderRadius: '12px 12px 0 0'}}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            {
              this.props.auth.user.id === this.props.currentId
              ?
                [
                  <Tab key='1' label="Home" icon={<HomeIcon />} />,
                  <Tab key='2' label="About me" icon={<AboutMeIcon />} />,
                 // <Tab key='3' label="Following" icon={<PersonPinIcon />} />,
                  <Tab key='4' label="My works" icon={<WorkIcon />} />,
                  <Tab key='5' label="DIY" icon={<DiyIcon />} />
                ]
              :
                [
                  <Tab key='1' label="About me" icon={<AboutMeIcon />} />,
                  //<Tab key='2' label="Following" icon={<PersonPinIcon />} />,
                  <Tab key='3' label="My works" icon={<WorkIcon />} />,
                  <Tab key='4' label="DIY" icon={<DiyIcon />} />
                ]
            }
            {/* <Tab label="Item Six" icon={<ThumbDown />} />
            <Tab label="Item Seven" icon={<ThumbUp />} />  */}
          </Tabs>
        </AppBar>
        {
          this.props.auth.user.id === this.props.currentId
          ?
            <React.Fragment>
              {this.state.value === 0 && <TabContainer>
                <List /> 
                
                </TabContainer>}
              {this.state.value === 1 && <TabContainer><AboutUs info={this.props.info}/></TabContainer>}
              {/* {this.state.value === 2 && <TabContainer><Following /></TabContainer>}  */}
              {this.state.value === 2 && <TabContainer><ContentTubs currentId={this.props.currentId}/></TabContainer>}
              {this.state.value === 3 && <TabContainer><Diy /></TabContainer>}
            </React.Fragment>
          :
            <React.Fragment>
              {value === 0 && <TabContainer><AboutUs info={this.props}/></TabContainer>}
              {/* {value === 1 && <TabContainer><Following /></TabContainer>}  */}
              {value === 1 && <TabContainer><ContentTubs currentId={this.props.currentId}/></TabContainer>}
              {value === 2 && <TabContainer><Diy /></TabContainer>}
            </React.Fragment>
        }
        {/* {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>} */}
      </div>
    );
  }
}

ProfileBlock.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withStyles(styles)(ProfileBlock));