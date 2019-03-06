import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

export default class JobSelect extends Component {
  state = {
    category: '',
    jobType: '',
    sortBy: ''
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    console.log(this.state)
    return (
      <div className='p-2'>
        <FormControl fullWidth>
          <InputLabel htmlFor="sortBy-helper">Sort by</InputLabel>
          <Select
            value={this.state.sortBy}
            onChange={this.handleChange('sortBy')}
            input={<Input name="sortBy" id="sortBy-helper" />}
            fullWidth
          >    
            <MenuItem value='date'>Date</MenuItem>
            <MenuItem value='salary'>Salary</MenuItem>
          </Select>
        </FormControl>

        <FormControl className='mt-4' fullWidth>
          <InputLabel htmlFor="category-helper">Category</InputLabel>
          <Select
            value={this.state.category}
            onChange={this.handleChange('category')}
            input={<Input name="category" id="category-helper" />}
            fullWidth
          >    
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='art'>Art</MenuItem>
            <MenuItem value='music'>Music</MenuItem>
            <MenuItem value='3d model'>3D model</MenuItem>
            <MenuItem value='design'>Design</MenuItem>
            <MenuItem value='video making'>Video making</MenuItem>
            <MenuItem value='photography'>Photography</MenuItem>
          </Select>
        </FormControl>


        <FormControl className='mt-4' fullWidth>
          <InputLabel htmlFor="jobType-helper">Job type</InputLabel>
          <Select
            value={this.state.jobType}
            onChange={this.handleChange('jobType')}
            input={<Input name="jobType" id="jobType-helper" />}
            fullWidth
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='full-time'>Full-time</MenuItem>
            <MenuItem value='contract'>Contract</MenuItem>
            <MenuItem value='part-time'>Part-time</MenuItem>
            <MenuItem value='commission'>Commission</MenuItem>
            <MenuItem value='temporary'>Temporary</MenuItem>
            <MenuItem value='internship'>Internship</MenuItem>
          </Select>
        </FormControl>
        
        <div className='d-flex justify-content-center'>
            <Button onClick={
                () => this.props.workSearch(this.state.category, this.state.jobType, this.state.sortBy)
              } className='mt-4' color="primary" variant="contained">Search</Button>
        </div>
      </div>
    )
  }
}
