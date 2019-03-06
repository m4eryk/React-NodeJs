import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BigLeftNews from '../MainElem/Elem/BigLeftNews';

import UnderNews from './Elem/UnderNews';
import RightSmallNews from './Elem/RighSmallNews';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function FullWidthGrid(props) {
  const { classes } = props;
  console.log(props)
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <BigLeftNews news={props}/>
        </Grid>
        <RightSmallNews news={props}/>
      </Grid>
      <UnderNews news={props.news}/>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);
