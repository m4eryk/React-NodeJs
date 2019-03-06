import React from 'react';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';


import Items from './RigtNews';
import Grid from '@material-ui/core/Grid';


function WithWidth(props) {
  const { width } = props;
    if(width === 'xs'){
        return  null
    }else if(width === 'sm'){
        return null 
    }else if(width === 'md'){
        return null
    } else{
        return (
            <Grid item lg={5}>
                <Items news={props.news}/>
            </Grid>
        );
    }
}

WithWidth.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(WithWidth);