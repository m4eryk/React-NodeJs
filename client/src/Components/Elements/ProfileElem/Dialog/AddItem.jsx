import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Firebase from '../../../../FireBase/FireBase';

import ProfileButton from '../ProfileButton';
import FireBase from '../../../../FireBase/FireBase';


class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    text: '',
    title: '',
    notification: '',
    status: false,
    category: '',
    titleImage: '',
    error: {}
  };

  handleChange = name => event => {
    this.setState({
        [name]: event.target.value,
    })
  }

  upload = (vul) => {
    this.setState({titleImage: vul})
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ 
      open: false,
      title: '',
      category: '',
      titleImage: ''
    });
  };

  handleNotification = (vul) => {
    this.setState({notification: vul})
    this.handleClose()
  }

  check = (title, category, titleImage) => {
    if(category !== 'image')
      if(title.length <= 3 || category.length <= 3 || titleImage.length <= 3){
        return false
      } else {
        return true
      }
    else
      if(title.length <= 3 || category.length <= 3){
        return false
      } else {
        return true
      }
  }

  error = (title, category, titleImage) => {
    const error = {}

    if(title.length <= 3)
      error.title = 'Title must be more than 3 letter'

    if(category.length <= 3)
      error.category = 'Choose a category'

    if(titleImage.length <= 3 && category !== 'image')
      error.titleImage = 'Upload title image'

    return error
  }

  render() {
    
    const { fullScreen } = this.props;
    let check = this.check(this.state.title, this.state.category, this.state.titleImage)
    let errors = this.error(this.state.title, this.state.category, this.state.titleImage)
    console.log(this.state)
    console.log(errors)
    return (
      <div>
        <form>
          <ProfileButton name='add' onClick={this.handleClickOpen}/>
          <Dialog
            maxWidth={'sm'}
            fullWidth={true}
            style={{fles: 1, overflowX: 'hidden'}}
            fullScreen={fullScreen}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{"Add new work"}</DialogTitle>
            <DialogContent>

            {
              this.state.category === 'music' || this.state.category === 'video'
              ?
                <div style={{textAlign: 'center'}}> 
                  <p className='mt-2'>Title image</p>
                  <img style={{maxWidth: 300}} src={this.state.titleImage} />
                  <Firebase addNews={true} upload={this.upload} />
                  {errors.titleImage && (<div className='text-danger'>{errors.titleImage}</div>)}
                </div>
              :
                null
            }  
          
            <TextField
              id="filled-name"
              label="Title"
              value={this.state.name}
              onChange={this.handleChange('title')}
              margin="normal"
              style={{width: '100%'}}
            />
            {errors.title && (<div className='text-danger'>{errors.title}</div>)}

            <FormControl  fullWidth>
              <InputLabel htmlFor="age-simple">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange('category')}
                inputProps={{
                  name: 'category',
                  id: 'age-simple',
                }}
              >
                <MenuItem value='music'>Music</MenuItem>
                <MenuItem value='video'>Video</MenuItem>
                <MenuItem value='image'>Image</MenuItem>
              </Select>
            </FormControl>
            {errors.category && (<div className='text-danger'>{errors.category}</div>)}

            <TextField
              id="filled-multiline-flexible"
              label="More information"
              multiline
              rowsMax="8"
              value={this.state.multiline}
              onChange={this.handleChange('text')}
              rows='8'
              margin="normal"
              style={{width: '100%'}}
            />    

            {
              check
              ?
                <FireBase 
                  newTitle={true}
                  titleImage={this.state.titleImage}
                  text={this.state.text} 
                  category={this.state.category}
                  title={this.state.title} 
                  handleNotification={this.handleNotification}/>
              :
                <div className='text-center mt-2'>
                  <Button color='secondary' variant='outlined'>Please, fill in all the fields</Button>
                </div>
            }
            </DialogContent>
            <Button className='border-top' color="primary" onClick={this.handleClose}>Close</Button>              

          </Dialog>
        </form>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
