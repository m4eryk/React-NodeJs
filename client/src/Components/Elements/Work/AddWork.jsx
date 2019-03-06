import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

import currencies from '../../static/Сurrency'
import paymentOptions from '../../static/paymentOptions';
import Snackbar from '../Publick/Snackbar';
import isEmpty from '../../../auth/is-empty';

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
    title: '',
    task: '',
    requirements: '',
    category: '',
    jobType: '',
    currency: '',
    cost: '',
    paymentOptions: [],
    send: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  componentDidMount(){
    if(this.props.reduct){
      this.setState({
        title: this.props.work.title,
        task: this.props.work.task,
        requirements: this.props.work.requirements,
        category: this.props.work.category,
        jobType: this.props.work.jobType,
        currency: this.props.work.currency,
        cost: this.props.work.cost,
        paymentOptions: this.props.work.paymentOptions,
      })
    }
  }

  reductWork = () => {
    const updateWork = {
      title: this.state.title,
      task: this.state.task,
      requirements: this.state.requirements,
      category: this.state.category,
      jobType: this.state.jobType,
      currency: this.state.currency,
      cost: this.state.cost,
      paymentOptions: this.state.paymentOptions,
    }
    axios.put(`/api/work//item/${this.props.dop.match.params.work_id}`, updateWork)
      .then(window.location.reload(true))
  }

  addWork = () => {
    const work = {
      title: this.state.title,
      task: this.state.task,
      requirements: this.state.requirements,
      category: this.state.category,
      jobType: this.state.jobType,
      currency: this.state.currency,
      cost: this.state.cost,
      paymentOptions: this.state.paymentOptions
    }
    axios.post('/api/work', work)
      .then(vul => {
        this.setState({send: true})
        this.timeout = setTimeout(() => window.location.reload(true), 3000)
      });
  }

  componentWillUnmount(){
    clearTimeout(this.timeout)
  }

  error = (vul) => {
    const errors = {};

    if(vul.title.length <= 3)
      errors.title = 'Title must be more than 3 letter'

    if(vul.task.length <= 20)
      errors.task = 'Task must be more than 20 letter'

    if(vul.category.length <= 1)
      errors.category = 'Choose a category'
      
    if(vul.jobType.length <= 1)
      errors.jobType = 'Choose a job type'
    
    if(vul.currency.length <= 1)
      errors.currency = 'Choose a currency'  
      
    if(vul.cost.length <= 0)
      errors.cost = 'Choose a cost'   
      
    if(vul.paymentOptions.length <= 0)
      errors.paymentOptions = 'Choose payment options'  

    return errors
  }

  render() {
    const { fullScreen } = this.props;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

    let errors = this.error(this.state)

    return (
      <div>
        {
          this.props.reduct
          ?
            <Button onClick={this.handleClickOpen} className='mb-2' variant="outlined" style={{color: 'green', borderColor: 'green'}}>
              Редактировать
            </Button>
          :
            <Button style={{color: 'green', borderColor: 'green'}} variant="outlined" onClick={this.handleClickOpen}>
              Add work
            </Button>
        }
        <Dialog
          fullScreen={fullScreen}
          fullWidth
          maxWidth={'sm'}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Add work"}</DialogTitle>
          <DialogContent>
            <TextField
                id="standard-title"
                label="Title"
                fullWidth
                value={this.state.title}
                onChange={this.handleChange('title')}
                margin="normal"
            />
            {errors.title && (<div className='text-danger'>{errors.title}</div>)}

            <FormControl className='mt-4' fullWidth>
                <InputLabel htmlFor="category-helper">Category</InputLabel>
                <Select
                    value={this.state.category}
                    onChange={this.handleChange('category')}
                    input={<Input name="category" id="category-helper" />}
                    fullWidth
                >    
                    <MenuItem value='art'>Art</MenuItem>
                    <MenuItem value='music'>Music</MenuItem>
                    <MenuItem value='3d model'>3D model</MenuItem>
                    <MenuItem value='design'>Design</MenuItem>
                    <MenuItem value='video making'>Video making</MenuItem>
                    <MenuItem value='photography'>Photography</MenuItem>
                </Select>
            </FormControl>
            {errors.category && (<div className='text-danger'>{errors.category}</div>)}

            <FormControl className='mt-4' fullWidth>
                <InputLabel htmlFor="jobType-helper">Job type</InputLabel>
                <Select
                    value={this.state.jobType}
                    onChange={this.handleChange('jobType')}
                    input={<Input name="jobType" id="jobType-helper" />}
                    fullWidth  
                >
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value='full-time'>Full-time</MenuItem>
                    <MenuItem value='contract'>Contract</MenuItem>
                    <MenuItem value='part-time'>Part-time</MenuItem>
                    <MenuItem value='commission'>Commission</MenuItem>
                    <MenuItem value='temporary'>Temporary</MenuItem>
                    <MenuItem value='internship'>Internship</MenuItem>
                </Select>
            </FormControl>
            {errors.jobType && (<div className='text-danger'>{errors.jobType}</div>)}

            <FormControl className='mt-3' fullWidth>
                <InputLabel htmlFor="select-multiple-checkbox">Payment options</InputLabel>
                <Select
                multiple
                fullWidth
                value={this.state.paymentOptions}
                onChange={this.handleChange('paymentOptions')}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {paymentOptions.map(name => (
                    <MenuItem key={name} value={name}>
                    <Checkbox checked={this.state.paymentOptions.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            {errors.paymentOptions && (<div className='text-danger'>{errors.paymentOptions}</div>)}

            <div className='d-flex'>
                <div>
                  <TextField
                      id="standard-select-currency"
                      select
                      style={{width: 150}}
                      label="Currency"
                      value={this.state.currency}
                      onChange={this.handleChange('currency')}
                      SelectProps={{
                          MenuProps: {
                          },
                      }}
                      margin="normal"
                      >
                      {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                          {option.value + ` (${option.label})`}
                          </MenuItem>
                      ))}
                  </TextField>
                  {errors.currency && (<div className='text-danger'>{errors.currency}</div>)}
                </div>

                <div style={{width: '100%'}}>
                <TextField
                    style={{marginLeft: 10}}
                    id="standard-title"
                    label="Cost"
                    fullWidth
                    value={this.state.cost}
                    onChange={this.handleChange('cost')}
                    margin="normal"
                />
                {errors.cost && (<div className='text-danger'>{errors.cost}</div>)}
                </div>
            </div>

            <TextField
                id="standard-multiline-flexible"
                label="Task"
                multiline
                fullWidth
                rows='5'
                rowsMax="10"
                value={this.state.task}
                onChange={this.handleChange('task')}
                margin="normal"
            />
            {errors.task && (<div className='text-danger'>{errors.task}</div>)}

            <TextField
                id="standard-multiline-flexible"
                label="Mandatory requirements"
                multiline
                fullWidth
                rows='5'
                rowsMax="10"
                value={this.state.requirements}
                onChange={this.handleChange('requirements')}
                margin="normal"
            />  
          </DialogContent>
          <DialogActions>
            {
              this.props.reduct
              ?
                <>
                {isEmpty(errors)
                ?
                  <Button onClick={this.reductWork} color="primary">
                    Save
                  </Button>
                : 
                  <Button disabled color="primary">
                    Save
                  </Button>
                }
                </>
              :
              <>
                {isEmpty(errors)
                ?
                  <Button onClick={this.addWork} color="primary">
                    Post
                  </Button>
                :
                  <Button disabled color="primary">
                    Post
                  </Button>
                }
              </>
            }
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {
          this.state.send
          ?
           <Snackbar textMessage='Work published'/>
          :
            null
        }
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
