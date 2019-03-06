import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {connect} from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comment from '../Publick/Comment';
import ProgressBar from '../Publick/ProgressBar';
import Snackbar from '../Publick/Snackbar';
import axios from 'axios'

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
  };

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
    axios.get(`/api/news/item/comment/${this.props.image._id}`)
        .then(commentList => this.setState({commentList: commentList.data, commentIsLoad: true}))
  }

  sendComment = () => {
    const data = {
        user: this.props.auth.user.id,
        comment: this.state.comment
    }

    axios.post(`/api/galery/post/${this.props.image._id}` , data)
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
      <div style={{zIndex: 400, height: '100%', width: '100%'}}>
        <Button style={{zIndex: 400, height: '100%', width: '100%'}}  onClick={this.handleClickOpen}>
          <span></span>
        </Button>
        <Dialog
            
          maxWidth='md'   
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
      
          <DialogContent>
          <div className='mb-2' style={{border: '1px solid #e4e4e4', marginBottom: 10,borderRadius: 10 ,backgroundColor: '#fff'}}>
            <a href={this.props.image.contentRef} target="_blank"><img style={{maxHeight: 500}} className='img-thumbnail' src={this.props.image.contentRef} /></a>

            
                <div className='pl-3 pr-3 ml-1 mr-1 mt-1 mb-2 d-flex flex-row' >
                <Link className='p-1 align-items-center d-flex flex-row' to={`/profile/user/${this.props.image.user._id}`}>
                    <Avatar className='mr-2' alt="Remy Sharp" src={this.props.image.user.avatar} />
                    <span>{this.props.image.user.name}</span>
                </Link>
                </div>

                <ExpansionPanel style={{boxShadow: 'none'}} className='ml-1 mr-1 mt-1'>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Still</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {this.props.image.text}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            
        

            <div className='mb-5'>
              {
                this.props.auth.isAuthenicated
                ?       
                <React.Fragment>
                    {/* <h2 className='ml-1 mb-0'>Comments</h2> */}
                    <div className='' style={{borderRadius: 10 ,backgroundColor: '#fff'}}>
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
                <div style={{marginBottom: 10,borderRadius: 10 ,backgroundColor: '#fff'}}>
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
