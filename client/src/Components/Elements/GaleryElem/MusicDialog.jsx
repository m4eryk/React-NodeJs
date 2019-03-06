import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import MusicList from './MusicList';
import axios from 'axios'
import {Link} from 'react-router-dom';

import Snackbar from "../Publick/Snackbar";
import Comment from '../Publick/Comment';
import ProgressBar from '../Publick/ProgressBar';
import { connect } from 'react-redux';

const styles = {
  avatar: {
    margin: 100,
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200,
  },
};

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    images: 's',
    video: '',
    mainImage: '',
    text: '',
    title: '',
    date: '',
    category: '',
    author: '',
    comment: '',
    commentList: '',

    commentSuccess: false,
    isLoad: false,
    commentIsLoad: false,
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  componentDidMount(){
    window.scroll(0,0);
    this.getComment();
  }

  getLike = (like) => {
    this.setState({commentList: like})
  }

  getComment = () => {
    axios.get(`/api/news/item/comment/${this.props.music._id}`)
        .then(commentList => this.setState({commentList: commentList.data, commentIsLoad: true}))
  }

  sendComment = () => {
    const data = {
        user: this.props.auth.user.id,
        comment: this.state.comment
    }

    axios.post(`/api/galery/post/${this.props.music._id}` , data)
        .then(comment => {
            this.getComment()
            this.setState({commentSuccess: true})

            this.interval = setTimeout(() => {
                this.setState({commentSuccess: false})
            }, 5000);
        })
    this.setState({comment: ''})
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <MusicList music={this.props.music} onClick={this.handleClickOpen}/>
        <Dialog
          fullScreen={fullScreen}
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          maxWidth={'sm'}
        >
          <DialogTitle id="responsive-dialog-title">{this.props.music.title}</DialogTitle>
          <DialogContent>
            <div className='mb-2' style={{border: '1px solid #e4e4e4', marginBottom: 10,borderRadius: 10 ,backgroundColor: '#fff'}}>
              <div style={{background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${this.props.music.titleImage})`, backgroundSize: 'cover', color: 'white'}} className='d-flex justify-content-center flex-wrap align-items-center'>
                <Avatar alt="Remy Sharp" className='m-3' src={this.props.music.titleImage} style={{width: 250, height: 250}} />
                <h5>{this.props.music.title}</h5>
              </div>

              {/* <div className='d-flex justify-content-center'>
                <div className='ml-2 mr-2 d-flex align-items-end' style={{height: 500 ,backgroundSize: 'cover' ,backgroundImage: `url(${this.props.music.titleImage})`}}>
                  <audio className='' style={{width: '97%',  background: 'rgb(241, 243, 244)', borderRadius: 0}} controls src={this.props.music.contentRef} />
                </div>
              </div> */}
              
              <div className='d-flex flex-column'>
                <div>
                  <audio className='' style={{width: '100%',  background: 'rgb(241, 243, 244)', borderRadius: 0}} controls src={this.props.music.contentRef} />
                </div>
                <Link className='p-2 align-items-center d-flex flex-row' to={`/profile/user/${this.props.music.user._id}`}>
                  <Avatar className='mr-2 ml-2' alt="Remy Sharp" src={this.props.music.user.avatar} />
                  <span>{this.props.music.user.name}</span>
                </Link>

                <ExpansionPanel style={{boxShadow: 'none'}} className='ml-1 mr-1 mt-1'>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Still</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                      <Typography>
                      {this.props.music.text}
                      </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>

            <div className='mb-5'>
              {
                this.props.auth.isAuthenicated
                ?       
                <React.Fragment>
                    <div style={{marginBottom: 10,borderRadius: 10 ,backgroundColor: '#fff'}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Send a comment"
                            onChange={this.handleChange('comment')}
                            multiline
                            value={this.state.comment}
                            rows="4"
                            fullWidth={true}
                            margin="normal"
                            variant="outlined"
                        />
                        <div className='text-right'>
                            <Button onClick={this.sendComment} variant="outlined">
                                Send
                            </Button>
                        </div>
                    </div>
                </React.Fragment>
              :
                <div style={{marginBottom: 10 ,padding: 10 ,borderRadius: 10 ,backgroundColor: '#fff'}}>
                    <h3>Login to leave a comment</h3>
                </div>
              }
              {
                this.state.commentIsLoad
                ?
                  <Comment getComment={this.getComment} auth={this.props.auth} commentList={this.state.commentList}/>
                :
                  <div style={{height: '95vh'}} className='d-flex justify-content-center'>
                      <ProgressBar />
                  </div>
              }

              {
                this.state.commentSuccess
                ?
                  <Snackbar textMessage='Comment ressived'/>
                :
                  null
              }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(withMobileDialog()(ResponsiveDialog));
