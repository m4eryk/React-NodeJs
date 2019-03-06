import React, { Component } from 'react'
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

import Snackbar from "../../Components/Elements/Publick/Snackbar";
import Stepper from '../Elements/Stepper/Stepper';
import Comment from '../Elements/Publick/Comment';
import ProgressBar from '../Elements/Publick/ProgressBar';

class News extends Component {
    state = {
        mainImage: '',
        text: '',
        title: '',
        date: '',
        category: '',
        author: '',
        comment: '',
        commentList: '',
        imageList: '',
        video: '',

        commentSuccess: false,
        isLoad: false,
        commentIsLoad: false,
    }

    componentDidMount(){
        window.scroll(0,0);
        this.getComment();
        axios.get(`/api${this.props.match.url}`)
            .then(vul => {
                this.setState({
                    mainImage: vul.data.image,
                    text: vul.data.text,
                    title: vul.data.title,
                    date: vul.data.date,
                    category: vul.data.category,
                    author: vul.data.author,
                    imageList: vul.data.imageList,
                    video: vul.data.video,
                    isLoad: true
                })
            })
    }

    
    componentWillUnmount(){
        clearInterval(this.interval)
    }

    getLike = (like) => {
        this.setState({commentList: like})
    }

    getComment = () => {
        axios.get(`/api/news/item/comment/${this.props.match.params.news_id}`)
            .then(commentList => this.setState({commentList: commentList.data, commentIsLoad: true}))
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    

    sendComment = () => {
        const data = {
            user: this.props.auth.user.id,
            comment: this.state.comment
        }
        axios.post(`/api${this.props.match.url}`, data)
            .then(comment => {
                this.getComment()
                this.setState({commentSuccess: true})

                this.interval = setTimeout(() => {
                    this.setState({commentSuccess: false})
                }, 5000);
            })
        this.setState({comment: ''})
    }

    
  render() {
      console.log(this.state)
    return (
        <React.Fragment>
        {
            this.state.isLoad
            ?
                <div className='container flex-column d-flex' style={{marginTop: 70}}>
                    
                    <div className='text-center'  style={{marginBottom: 30 ,padding: 10 ,borderRadius: 10 ,backgroundColor: '#fff'}}>
                        <img src={this.state.mainImage} className=' img-fluid'></img>
                        <div className='d-flex justify-content-center text-center'>
                            <h2 style={{maxWidth: 900}} className='mt-3 mb-3'>{this.state.title}</h2>
                        </div>
                    </div>

                    <div style={{marginBottom: 10 ,padding: 10 ,borderRadius: 10 ,backgroundColor: '#fff'}} className='d-flex justify-content-center'>
                        <div style={{maxWidth: 800, marginTop: 10}}>
                            <div style={{whiteSpace: 'pre-line', textIndent: 4}}>        
                                {this.state.text}
                           </div>
                        </div>
                    </div>
                    {
                        this.state.video === '' || this.state.video === undefined ? null : <video className='mt-2' controls style={{width: '100%'}} src={this.state.video}></video>
                    }
                    {
                        this.state.imageList === '' || this.state.imageList.length === 0 ?  null : <div ><Stepper imageList={this.state.imageList}/></div>
                    }
                    <div style={{marginBottom: 30 ,padding: 10 ,borderRadius: 10 ,backgroundColor: '#fff'}} className='d-flex justify-content-between'>
                        <div>Author: {this.state.author}</div>
                        <div className='ml-2 mr-2'>Category: {this.state.category}</div>
                        <div>Date: {this.state.date.slice(0,10)}</div>
                    </div>

                    <div className='mb-5'>
                        {
                            this.props.auth.isAuthenicated
                            ?       
                            <React.Fragment>
                                <h2>Comments</h2>
                                <div style={{marginBottom: 10 ,padding: 10 ,borderRadius: 10 ,backgroundColor: '#fff'}}>
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
    auth: state.auth
})

export default connect(mapStateToProps)(News)