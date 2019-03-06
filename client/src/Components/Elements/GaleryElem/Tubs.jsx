import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MovieIcon from '@material-ui/icons/Movie'
import TerrainIcon from '@material-ui/icons/Terrain'
import InsertPhoto from '@material-ui/icons/InsertPhoto'
import MusicVideoIcon from '@material-ui/icons/MusicVideo'
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import ImageList from './ImageList';
import VideoDialog from './VideoDialog';
import MusicDialog from './MusicDialog';
import axios from 'axios';

import ProgressBar from '../Publick/ProgressBar';
import { Button } from '@material-ui/core';
import Dialog3D from './Dialog3D';

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    //flexGrow: 1,
    //width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 0,
    video: '',
    music: '',
    image: '',
    isVideoLoad: false,
    isMusicLoad: false,
    isImageLoad: false,
    skip: 11
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount(){
    axios.get(`/api/galery/video`)
    .then(vul => {
      this.setState({video: vul.data, isVideoLoad: true})
    })

    axios.get(`/api/galery/music`)
    .then(vul => {
      this.setState({music: vul.data, isMusicLoad: true})
    })

    axios.get(`/api/galery/image`)
    .then(vul => {
      this.widthFun(vul.data)
      this.setState({image: vul.data, isImageLoad: true})
    })

  }

  loadMoreImage = () =>{
    let scroll = window.scrollY
    axios.post(`/api/galery/image/moreimage`, {skip: this.state.skip})
      .then(vul => {
        let image = this.widthFun(vul.data)
        let newArr = [...this.state.image, ...image];
        this.setState({image: newArr, skip: this.state.skip + 11})
        window.scroll(0, scroll + scroll * 40 / 100 );
        console.log(window.scrollY)
        console.log(this.props)
      })
      
  }

  widthFun = (vul) => {
    vul.map((vul, key) => {
      switch (key) {
        case 0:
          vul.imageWidth = '30%'
          break
        case 1:
          vul.imageWidth = '40%'
          break
        case 2:
          vul.imageWidth = '30%'
          break
        case 3:
          vul.imageWidth = '40%'
          break
        case 4:
          vul.imageWidth = '40%'
          break
        case 5:
          vul.imageWidth = '20%'
          break
        case 6:
          vul.imageWidth = '50%'
          break
        case 7:
          vul.imageWidth = '50%'
          break
        case 8:
          vul.imageWidth = '20%'
          break
        case 9:
          vul.imageWidth = '30%'
          break
        case 10:
          vul.imageWidth = '50%'
          break
        default:
          break
      }
    })
    return vul
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    // console.log('galery state')
    // console.log(this.state)
    // console.log(this.randomInteger(30, 70))
    return (
      <React.Fragment>
      {
        this.state.isVideoLoad && this.state.isMusicLoad && this.state.isImageLoad
        ?
        <div className={classes.root}>
          <AppBar position="static" color="default" className='justify-content-center mb-3' style={{backgroundColor: 'white', boxShadow: 'none'}}>
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Image" icon={<InsertPhoto />} />
              <Tab label="Video" icon={<MovieIcon />} />
              <Tab label="Music" icon={<MusicVideoIcon />} />
              {/* <Tab label="3D Model" icon={<TerrainIcon />} /> */}
              
            </Tabs>
          </AppBar>
            {value === 0 && <TabContainer> 
              <ImageList imageList={this.state.image}/>
              <Button color='secondary' variant='flat' size='large' onClick={this.loadMoreImage} style={{width: '100%'}}>Load more</Button>
              </TabContainer>}

            {value === 1 && <TabContainer>
              <div className='d-flex justify-content-center' style={{backgroundColor: '#fafafa'}}>
                <div className='d-flex flex-wrap justify-content-center'>
                    {this.state.video.map((vul, key) => <VideoDialog vul={this.state} video={vul} key={key}/>)}
                  </div>
              </div>
            </TabContainer>}

            {value === 2 && <TabContainer>
              <div className='d-flex justify-content-center' style={{backgroundColor: '#fafafa'}}>
                <div className='d-flex flex-wrap justify-content-center'>
                  {this.state.music.map((vul, key) => <MusicDialog vul={this.state} music={vul} key={key}/>)}
                </div>
              </div>
            </TabContainer>}
            
            {/* {value === 3 && <TabContainer>
              <Dialog3D />
            </TabContainer>} */}
            {/* {value === 4 && <TabContainer>Item Five</TabContainer>} */}
            {/* {value === 5 && <TabContainer>Item Six</TabContainer>}
            {value === 6 && <TabContainer>Item Seven</TabContainer>} */}
          </div>
        :
          <div style={{height: '95vh'}} className='d-flex justify-content-center'>
            <ProgressBar />
          </div>
      }
      </React.Fragment>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);
