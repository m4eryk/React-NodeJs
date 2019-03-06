import React, { Component } from 'react'
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../Elements/MainElem/Elem/Grid/GridContainer";
import GridItem from "../Elements/MainElem/Elem/Grid/GridItem";
import Button from "../Elements/MainElem/Elem/CustomButtons/Button";
import Parallax from "../Elements/MainElem/Elem/Parallax/Parallax.jsx";
import landingPageStyle from "../assets/jss/material-kit-react/views/landingPage.jsx";
import Typography from '../assets/Typography';
import axios from 'axios';

import Job from "../Elements/MainElem/ChooseJob";
import NewsBlock from "../Elements/MainElem/NewsBlock";
import CardProduct from '../Elements/Shop/CardProduct';
import Footer from '../Elements/MainElem/Footer';
import ProgressBar from '../Elements/Publick/ProgressBar';


class MainPage extends Component {
  state = {
    music: '',
    art: '',
    film: '',
    mainNews: '',
    shopItems: '',
    isFilmLoad: false,
    isMainNewsLoad: false,
    isLMusicLoad: false,
    isLArtLoad: false,
    isShopItemsLoad: false
  }

  componentWillMount(){
    axios.get('/api/news/music')
      .then(vul => {
        this.setState({music: vul.data, isLMusicLoad: true})
      })

    axios.get('/api/news/art')
      .then(vul => {
        this.setState({art: vul.data, isLArtLoad: true})
    })

    axios.get('/api/news/film')
      .then(vul => {
        this.setState({film: vul.data, isFilmLoad: true})
    })

    axios.get('/api/news/mainnews')
      .then(vul => {
        this.setState({mainNews: vul.data, isMainNewsLoad: true})
    })

    axios.get('api/shop/three')
      .then(vul => {
        this.setState({shopItems: vul.data, isShopItemsLoad: true})
      })
  }

  render() {
    const { classes } = this.props;
    console.log('main')
    console.log(this.state)
    return (
      <React.Fragment>
        {
          this.state.isLMusicLoad && this.state.isLArtLoad && this.state.isFilmLoad && this.state.isMainNewsLoad && this.state.isShopItemsLoad
          ?
            <div>
              <Parallax filter image={require("../assets/img/d.jpg")}>
                <div className={classes.container}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <h1 className={classes.title}>Your Story Starts With Us.</h1>
                      <h4>
                        Every landing page needs a small description after the big
                        bold title, that's why we added this text here. Add here all
                        the information that can make you or your product create the
                        first impression.
                      </h4>
                      <br />
                      <Button
                        className='p-2 mb-5'
                        color="danger"
                        size="lg"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                      <div style={{color: '#e5e5e5'}} className='d-flex align-items-center'>
                        <i style={{marginRight: 7}} className="fas fa-play" /> <span>Watch video</span>
                      </div>
                      </Button>
                    </GridItem>
                  </GridContainer>
                </div>
              </Parallax>
              <div className={classNames(classes.main, classes.mainRaised)}>

                <NewsBlock news={this.state}/>

                <Typography variant="h4" marked="center" align="center" component="h2" className="mt-5">
                  EARN WITH ART GALERY!
                </Typography>
                <div style={{maxWidth: 1000, margin: 'auto'}} className='mt-4 mb-5'>
                  <Typography variant="h5" marked="center" align="center" component="h2">
                    Up to 500 000 customers daily, and you can be one of them
                  </Typography>
                </div>
                <div className='d-flex flex-wrap justify-content-center'>{this.state.shopItems.map((vul, key) => <div style={{backgroundColor: '#f0eef0', borderRadius: 10}} className='ml-3 mr-3 p-1 mb-2' key={key}><CardProduct shopItems={vul}/></div>)}</div>

                <Job/>
                
                <br />
              </div>
              <Footer />
            </div>
          :
            <div style={{height: '95vh'}} className='d-flex justify-content-center'>
              <ProgressBar />
            </div>
        }
      </React.Fragment>
    )
  }
}

export default withStyles(landingPageStyle)(MainPage);