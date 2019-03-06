import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from "../Components/Elements/Publick/Snackbar";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
 

const config = {
    apiKey: "AIzaSyC5l8ArMOi5_Gs-LCeI1A4QeOg_tLIObDM",
    authDomain: "artgalery-fe9fd.firebaseapp.com",
    databaseURL: "https://artgalery-fe9fd.firebaseio.com",
    storageBucket: "artgalery-fe9fd.appspot.com"
  };
  
  firebase.initializeApp(config);

class ProfilePage extends Component {
  state = {
    isUploading: false,
    progress: 0,
    avatarURL: "",
    success: false
  };

  randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand / 10) * 10;
    return rand;
  }
 
  //handleChangeUsername = event => this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        if(this.props.newTitle){
          axios.post('/api/user/userWork', {
            title: this.props.title,
            text: this.props.text,
            contentType: this.props.category,
            contentRef: url,
            titleImage: this.props.titleImage,
            //imageWidth: this.randomInteger(40, 60) + '%'
          });
          console.log(url)
          //this.setState({success: true})
        }


          if(this.props.addNews){
            this.props.upload(url)
          }

          if(this.props.uploadImgList){
            this.props.uploadImgList(url)
          }

          if(this.props.uploadVideo){
            this.props.uploadVideo(url)
          }

          this.setState({success: true})
      });
  };
 
  render() {
    return (
      <React.Fragment>
      {
        this.state.isUploading
        ?
          <div className='d-flex align-items-center flex-column justify-content-center'>
            <p>Uploading: {this.state.progress}%</p>
            <CircularProgress
              variant="static"
              value={this.state.progress}
            />
          </div>
        :
          <div className='text-center mt-3'>
            <CustomUploadButton
                accept=""
                storageRef={firebase.storage().ref('images')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
                style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}
              >
                Select and start upload
              </CustomUploadButton>
          </div>
      }

      {
        this.state.success
        ?
          <Snackbar textMessage='Uploading success!'/>
        :
          null
      }
      </React.Fragment>
    );
  }
}
 
export default ProfilePage