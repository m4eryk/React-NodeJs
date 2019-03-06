import React, { Component } from 'react'
import axios from 'axios';

import UnderNews from '../Elements/MainElem/Elem/UnderNews';
import ProgressBar from '../Elements/Publick/ProgressBar';


export default class NewsList extends Component {
    state = {
        music: '',
        art: '',
        film: '',
        isLMusicLoad: false,
        isLArtLoad: false,
        isFilmLoad: false
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
    }

  render() {
    return (
      <React.Fragment>
        {
          this.state.isLMusicLoad && this.state.isLArtLoad && this.state.isFilmLoad
          ?
            <div style={{marginTop: 50, height: '92vh', backgroundColor: 'white'}} className=''>
              <UnderNews news={true} arrNews={this.state}/>
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
