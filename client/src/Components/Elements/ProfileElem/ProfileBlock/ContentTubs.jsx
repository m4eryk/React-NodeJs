import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import ProfileItems from './ProfileItem';
import VideoDialog from '../../GaleryElem/VideoDialog';
import MusicDialog from '../../GaleryElem/MusicDialog';
import ImageTabs from '../../GaleryElem/ImageTabs';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 3 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class ContentTubs extends React.Component {
  state = {
    value: 0,
    allwork: [],
    image: '',
    video: '',
    music: '',
    isLoad: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount(){
    axios.get(`/api/profile/user/${this.props.currentId}/image`)
      .then(vul => {
        this.setState({image: vul.data, isLoad: true})
      })

    axios.get(`/api/profile/user/${this.props.currentId}/video`)
    .then(vul => {
      this.setState({video: vul.data})
    })

    axios.get(`/api/profile/user/${this.props.currentId}/music`)
    .then(vul => {
      this.setState({music: vul.data})
    })
  }

  

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    console.log('contentTub')
    console.log(this.state)

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" style={{borderRadius: '6px'}}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Picture" />
            <Tab label="Video" />
            <Tab label="Music" />
            <Tab label="3D Model" />
            {/* <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" /> */}
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><div className='d-flex flex-wrap justify-content-center'>
        {this.state.isLoad
          ?
          <>
            {this.state.image !== null && this.state.image.length !== 0 && this.state.image !== undefined
            ?
              <>
              {this.state.image.map((image, key) => (
                <div className='m-1' key={key} style={{zIndex: 200, height: 200, width: 200, backgroundImage: `url(${image.contentRef})`, backgroundRepeat: `no-repeat`,  backgroundSize: `cover`}}><ImageTabs image={image}/></div>
              )
              )}
              </>
            :
              <div className='text-center'>
                <img alt='nothing' className='mt-3 img-fluid' src='https://firebasestorage.googleapis.com/v0/b/artgalery-fe9fd.appspot.com/o/No%20content.png?alt=media&token=4d908381-734a-491a-99e2-78b9c59fc1c4'></img>
                <h2>Here is nothing</h2>
              </div>
            }
          </>
          :
         null
        }
        </div></TabContainer>}
        {value === 1 && 
          <TabContainer>
            {
              this.state.video !== null && this.state.video.length !== 0 && this.state.video !== undefined
              ?
                <div className='d-flex flex-wrap justify-content-stretch'>
                  {this.state.video.map((vul, key) => <VideoDialog video={vul} key={key}/>)}
                </div>
              :
                <div className='text-center'>
                  <img alt='nothing' className='mt-3 img-fluid' src='https://firebasestorage.googleapis.com/v0/b/artgalery-fe9fd.appspot.com/o/No%20content.png?alt=media&token=4d908381-734a-491a-99e2-78b9c59fc1c4'></img>
                  <h2>Here is nothing</h2>
                </div>
            }
          </TabContainer>}
        {value === 2 && 
          <TabContainer>
            {
              this.state.music !== null && this.state.music.length !== 0 && this.state.music !== undefined
              ?
                <div className='d-flex flex-wrap justify-content-stretch'>
                  {this.state.music.map((vul, key) => <MusicDialog vul={vul} music={vul} key={key}/>)}
                </div>
              :
                <div className='text-center'>
                  <img alt='nothing' className='mt-3 img-fluid' src='https://firebasestorage.googleapis.com/v0/b/artgalery-fe9fd.appspot.com/o/No%20content.png?alt=media&token=4d908381-734a-491a-99e2-78b9c59fc1c4'></img>
                  <h2>Here is nothing</h2>
                </div>
            }
          </TabContainer>}
        {value === 3 && <TabContainer><div className='text-center'>
            <img alt='nothing' className='mt-3 img-fluid' src='https://firebasestorage.googleapis.com/v0/b/artgalery-fe9fd.appspot.com/o/No%20content.png?alt=media&token=4d908381-734a-491a-99e2-78b9c59fc1c4'></img>
            <h2>Here is nothing</h2>
            </div></TabContainer>}
        {/* {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>} */}
      </div>
    );
  }
}

ContentTubs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentTubs);
