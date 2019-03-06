import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Firebase from '../../../FireBase/FireBase';

const currencies = [
    {
      value: 'film',
      label: 'Film',
    },
    {
      value: 'art',
      label: 'ART',
    },
    {
      value: 'music',
      label: 'Music',
    },
    {
      value: 'mainNews',
      label: 'MainNews',
    },
];

class AddNews extends Component {
    state = {
        title: '',
        text: '',
        category: '',
        shortDescription: '',
        author: '',
        imageTitle: '',
        imageList: [],
        titleForImageList: '',
        video: ''
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value });
    };

    upload = (vul) => {
        this.setState({imageTitle: vul})
    }

    uploadVideo = (vul) => {
        this.setState({video: vul})
    }

    uploadImgList = (vul) => {
        const imageList = [...this.state.imageList];
        imageList.push({label: this.state.titleForImageList, imgPath: vul})
        this.setState({imageList: imageList})
        this.setState({titleForImageList: ''})
        //this.setState({imageTitle: vul})
    }

    postNews = () => {
        const news = {
            title: this.state.title,
            text: this.state.text,
            image: this.state.imageTitle,
            author: this.state.author,
            shortText: this.state.shortDescription,
            category: this.state.category,
            imageList: this.state.imageList,
            video: this.state.video
        }

        axios.post('/api/news/', news)
            .then(console.log('ok'))
    }

  render() {
      console.log(this.state)
    return (
      <div>
          <div style={{width: '60vw', margin: 'auto'}}>
            <Paper elevation={1} className='p-4'>
                <Typography className='mb-1' variant="h5" component="h3">
                    Add news image
                </Typography>
                <img className='img-thumbnail' src={this.state.imageTitle}></img>
                <Firebase addNews={true} upload={this.upload} />
            </Paper>

            <TextField
                fullWidth
                id="standard-name"
                label="News title"    
                value={this.state.title}
                onChange={this.handleChange('title')}
                margin="normal"
            />

            <TextField
                fullWidth
                id="standard-select-currency"
                select
                label="Select"
                value={this.state.category}
                onChange={this.handleChange('category')}
                SelectProps={{
                    MenuProps: {
                    },
                }}
                helperText="Please select your currency"
                margin="normal"
                >
                {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                id="standard-name"
                label="Author"    
                value={this.state.author}
                onChange={this.handleChange('author')}
                margin="normal"
            />

            <TextField
                fullWidth
                id="standard-multiline-flexible"
                label="Short description"
                multiline
                rowsMax="2"
                value={this.state.shortDescription}
                onChange={this.handleChange('shortDescription')}
                margin="normal"
            /> 

            <TextField
                fullWidth
                id="standard-multiline-flexible"
                label="News text"
                multiline
                rowsMax="10"
                value={this.state.text}
                onChange={this.handleChange('text')}
                margin="normal"
            />  

            <p className='mt-2'></p>

            <Paper elevation={1} className='p-4 mt-4'>
                <Typography className='mb-1' variant="h5" component="h3">
                    Add video
                </Typography>
                {
                    this.state.video !== ''
                    ?
                        <video style={{width: '100%'}} controls src={this.state.video}></video>
                    :
                        null
                }
                <Firebase uploadVideo={true} uploadVideo={this.uploadVideo} />
            </Paper>

            <Paper elevation={1} className='p-4 mt-4'>
                <Typography className='mb-1' variant="h5" component="h3">
                    Add multiplay image list
                </Typography>
                {this.state.imageList.map((vul, key) => {
                    return(
                        <img className='img-thumbnail' style={{height: 200}} src={vul.imgPath}></img>
                    )
                })}
                <TextField
                    fullWidth
                    id="standard-name"
                    label="Image title"    
                    value={this.state.titleForImageList}
                    onChange={this.handleChange('titleForImageList')}
                    margin="normal"
                />
                <Firebase uploadImgList={true} uploadImgList={this.uploadImgList} />
            </Paper>

            <div className='text-center mt-3'>
                <Button onClick={this.postNews} variant="contained" color='primary'>Post news</Button>
            </div>
        </div>
      </div>
    )
  }
}

export default AddNews