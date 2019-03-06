import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = SwipeableViews;

const styles = theme => ({
  root: {
    //maxWidth: 400,
    //flexGrow: 1,
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 10,
    paddingLeft: theme.spacing.unit * 1,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    //height: '100% !important',
    display: 'block',
    maxHeight: 700,
    
    overflow: 'hidden',
    width: '100%',
    //heigth: 400
    //height: '100%'
  },
});

class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  componentDidMount(){
    //this.timeout = setTimeout(() =>  this.handleNext(), 600)
  }

  componentWillUnmount(){
    //clearTimeout(this.timeout)
  }

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.props.shopItem.imageList.length;

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}></Paper>
        <AutoPlaySwipeableViews
          //animateHeight
          animateTransitions
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {this.props.shopItem.imageList.map((step, index) => (
            <div key={step.imgPath} className='d-flex align-items-center' style={{height: '100%'}}>
              {Math.abs(activeStep - index) <= 1 ? (
                <img className={classes.img} src={step.imgPath} alt={step.label} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
            </Button>
          }
        />
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
