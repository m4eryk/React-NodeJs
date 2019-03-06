import React, { Component } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';

import ProfileBlock from '../Elements/ProfileElem/ProfileBlock';
import Avatar from '../Elements/ProfileElem/Avatar';
import AddItem from '../Elements/ProfileElem/Dialog/AddItem';
import EditAbout from '../Elements/ProfileElem/Dialog/EditAbout';
import Message from '../Elements/ProfileElem/Dialog/Message';
import ProgressBar from '../Elements/Publick/ProgressBar';



class Profile extends Component {
  state = {
    img: '',
    name: '',
    ready: false,
    social: [],
    surname: '',
    firstname: '',
    date: '',
    gender: '',
    aboutMe: '',
    single: '',
    multi: null,
  }

  Change = name => value => {
    this.setState({
      [name]: value,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  GetProfileInfo = () => {
    axios.get(`/api${this.props.match.url}`)
      .then(vul => {
        this.setState({
          single: vul.data.location,
          firstname: vul.data.firstname,
          surname: vul.data.surname,
          gender: vul.data.gender,
          img: vul.data.user.avatar,
          name: vul.data.user.name,
          aboutMe: vul.data.bio,
          ready: true,
          multi: vul.data.skills,
          social: vul.data.social
      })
    }
    )
  }

  componentWillMount(){
    this.GetProfileInfo();
  }


  render() {
    return (
      <React.Fragment>
        {
          this.state.ready
          ?
          <div className='container mb-2 mt-5 pt-4'>
            <Avatar img={this.state.img}/>
            <h1 className='text-center color-white mb-2'>{this.state.name}</h1>
            {
              this.props.auth.user.id === this.props.match.params.user_id
              ?
              <div className='d-flex align-items-center'>
                <AddItem />
                <EditAbout 
                  GetProfileInfo={this.GetProfileInfo}
                  handleChange={this.handleChange}
                  close={this.GetProfileInfo} 
                  Change={this.Change} 
                  info={this.state} />
                <Message name='message'/>
              </div>
              :
              null
            }
            <ProfileBlock info={this.state} currentId={this.props.match.params.user_id}/>
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

const mapStateToProps = state => ({
  auth: state.auth,
})


export default connect(mapStateToProps)(Profile);