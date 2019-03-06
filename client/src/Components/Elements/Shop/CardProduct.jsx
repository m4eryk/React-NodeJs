import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';


const styles = theme => ({
  root: {
    //marginBottom: 10,
    width: '100%',
    maxWidth: 200,
    //minWidth: 200,
   
    borderRadius: '10px',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  //section1: {
  //  margin: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
  //},
  // section2: {
  //   margin: theme.spacing.unit * 2,
  // },
  // section3: {
  //   margin: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  // },
});

function MiddleDividers(props) {
  const { classes } = props;
  return (
      <div className={classes.root}>
        <Link to={`/shop/item/${props.shopItems._id}`}>
          <div style={{height: 200, width: 200, overflow: 'hidden'}} className='d-flex justify-content-center'>
            <img style={{objectFit: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10, width: 200}}  src={props.shopItems.titleImage}></img>
          </div>

          <div className={classes.section1}>
            <Grid className='pt-2 pl-2 pr-2' container alignItems="center">
              <Grid item xs>
                  {props.shopItems.title.slice(0,17)}...
              </Grid>
            </Grid>
          </div>
        </Link>

        <div className='pb-2 pl-2 pr-2 d-flex justify-content-between align-items-center'>
          <span style={{color: '#fd7801', fontWeight: 'bolder'}}>{props.shopItems.currency} {props.shopItems.cost}</span>
          <Button style={{color: '#fd7801'}}>Add to card</Button>
        </div>
      </div>
  );
}

MiddleDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiddleDividers);
