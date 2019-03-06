import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


function AboutUs(props) {
  const { classes } = props;
  console.log('ggggggg')
  console.log(props)
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>About Me</Typography>
        </ExpansionPanelSummary>
          <div className='d-flex row pl-4 pr-4'>
            <div className='col-md-5 col-sm-12 col-lg-3'>
              <p><strong>Name:</strong> {props.info.firstname}</p>
              <p><strong>Surname:</strong> {props.info.surname}</p>
              <p><strong>Gender:</strong> {props.info.gender}</p>
              <p><strong>Birtdtay:</strong> {props.info.date}</p>
              {
                props.info.single !== null && props.info.multi !== '' && props.info.multi !== undefined && props.info.single !== undefined
                ?
                  <p><strong>Country:</strong> {props.info.single.value}</p>
                :
                <p><strong>Country:</strong> </p>
              }
            </div>
            <div className='col-sm-12 col-md-7 col-lg-9' style={{width: '300'}}>
              <p><strong>About:</strong> {props.info.aboutMe}</p>
            </div>
          </div>  
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>My Experience</Typography>
        </ExpansionPanelSummary>
          <div className='pr-4 pl-4 mb-3'>
            <div className='mb-1'>
              <span ><strong>Skills: </strong></span>
              { 
                <React.Fragment>
                  {
                    props.info.multi !== null && props.info.multi !== '' && props.info.multi !== undefined
                    ?
                      props.info.multi.map((vul, key) => {
                        return <span key={key}>{vul.label}, </span>
                      })
                    :
                      null
                  }
                </React.Fragment>
              }
            </div>
            {/* <p>1 Work: </p>
            <p>2 Work: </p>
            <p>3 Work: </p>
            <p>4 Work: </p> */}
          </div>
      </ExpansionPanel>
      
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>My concacts</Typography>
        </ExpansionPanelSummary>
            <div className='pr-4 pl-4'>
            {
              props.info.social !== null && props.info.social !== '' && props.info.social !== undefined
              ?
                <div>
                  {
                    props.info.social.map((vul, key) => {
                      return <p key={key}>{vul.source}: <a href={vul.link}>{vul.link}</a></p>
                    })
                  }
                </div>
              :
                null
            }      
            </div>
      </ExpansionPanel>
    </div>
  );
}

AboutUs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutUs);