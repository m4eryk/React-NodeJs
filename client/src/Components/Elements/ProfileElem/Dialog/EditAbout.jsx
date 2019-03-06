import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Avatar from '../../ProfileElem/Avatar';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

import ProfileButton from '../ProfileButton';
import FireBase from '../../../../FireBase/FireBase';
import SingleAutocomplete from '../../Publick/SingleAutocomplete';
import Autocomplete from '../../Publick/Autocomplete';

import CountryList from '../../../static/CountryList';
import Skills from '../../../static/Skills';


class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    firstname: '',
    surname: '',
    gender: '',
    date: '',
    skills: [],
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.close()
  };

  handleSave = () => {
    const profileData = {
      location: this.props.info.single,
      surname: this.props.info.surname,
      firstname: this.props.info.firstname,
      birthday: this.props.info.date,
      gender: this.props.info.gender,
      bio: this.props.info.aboutMe,
      skills: this.props.info.multi
    }

    axios.post('/api/profile/', profileData)
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  upload = (vul) => {
    axios.post('/api/user/avatar', {avatar: vul})
    .then(this.props.GetProfileInfo())
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <ProfileButton name='edit' onClick={this.handleClickOpen}/>
        <Dialog
          maxWidth={'sm'}
          fullWidth={true}
          style={{fles: 1}}
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Redact profile"}</DialogTitle>
          <DialogContent>

            <form onSubmit={this.onSubmit}>

                <Avatar  img={this.props.info.img}/>
                <FireBase upload={this.upload} addNews={true} api='' text={this.state.text} title={this.state.title} handleNotification={this.handleNotification}/>
              
                <TextField
                  id="standard-name"
                  label="Name"
                  fullWidth={true}
                  //className={classes.textField}
                  value={this.props.info.firstname}
                  onChange={this.props.handleChange('firstname')}
                  className='mb-4'
                />

                <TextField
                  id="standard-name"
                  fullWidth={true}
                  label="Surname"
                  //className={classes.textField}
                  value={this.props.info.surname}
                  onChange={this.props.handleChange('surname')}
                  className='mb-4'
                />
              
                <TextField
                  fullWidth={true}
                  id="date"
                  className='mb-4'
                  label="Birthday"
                  type="date"
                  value={this.props.info.date}
                  onChange={this.props.handleChange('date')}
                  //defaultValue="2017-05-24"
                  InputLabelProps={{
                  shrink: true,
                  }}
                />

                <FormControl className='mb-0' component="fieldset" >
                  <FormLabel className='mb-0' component="legend">Gender</FormLabel>
                  <div className='d-flex'>
                    <RadioGroup
                      className='d-flex flex-row'
                      aria-label="Gender"
                      name="gender1"
                      value={this.props.info.gender}
                      onChange={this.props.handleChange('gender')}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </div>
                </FormControl>
              
              
              <div>
                <SingleAutocomplete Change={this.props.Change} country={this.props.info.single} CategoryList={CountryList}/>
              </div>

              <TextField
                id="standard-multiline-flexible"
                label="About me"
                fullWidth={true}
                multiline
                rowsMax="10"
                value={this.props.info.aboutMe}
                onChange={this.props.handleChange('aboutMe')}
                className='mt-0'
                margin="normal"
              />

              <Autocomplete Change={this.props.Change} skills={this.props.info.multi} List={Skills}/>
            </form>

  
            {/* <h3>About Me</h3>
            <Datapicker />
            <Controls />
            <SelectCountry />
            <TextInput />
            <h3>My Experience</h3>
            <PickerSkills /> */}
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
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

export default withMobileDialog()(ResponsiveDialog);
