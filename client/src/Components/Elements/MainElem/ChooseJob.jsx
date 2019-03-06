import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

import Typography from '../../assets/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 4,
  },
  images: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://gazeta.a42.ru/uploads/922/92233500-13f5-11e9-af6d-a1cd63783566.jpeg',
      title: 'Music',
      width: '40%',
    },
    {
      url:
        'https://lh6.ggpht.com/HlgucZ0ylJAfZgusynnUwxNIgIp5htNhShF559x3dRXiuy_UdP3UQVLYW6c',
      title: 'Art',
      width: '20%',
    },
    {
      url:
        'https://www.cinema4dtutorial.net/wp-content/uploads/2014/06/ieoenr-640x250.jpg',
      title: '3D Model',
      width: '40%',
    },
    {
      url:
        'https://nofilmschool.com/sites/default/files/styles/article_wide/public/film_analysis.jpg?itok=iwgnGurT',
      title: 'Video making',
      width: '38%',
    },
    {
      url:
        'https://salarieshub.com/wp-content/uploads/2016/10/graphic-designer-working.jpg',
      title: 'Design',
      width: '38%',
    },
    {
      url:
        'http://caitlintphotography.com/wp-content/uploads/2017/01/photography.jpg',
      title: 'Photography',
      width: '24%',
    },
  ];

  return (
      <Grid>
        <Typography variant="h4" marked="center" align="center" component="h2" className="mt-5">
          BECOME A FREELANCER AND EARN MORE
        </Typography>
        <div style={{maxWidth: 1000, margin: 'auto'}} className='mt-4'>
          <Typography variant="h5" marked="center" align="center" component="h2">
            Find everything you need to know to launch your independent career, become a better freelancer, and get more freelance jobs
          </Typography>
        </div>
            
        <div className={classes.images}>
          {images.map(image => (
              <ButtonBase
                key={image.title}
                className={classes.imageWrapper}
                style={{
                  width: image.width,
                }}
              >
                <Link to='/work'>
                  <div
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.url})`,
                    }}
                  />
                  
                  <div className={classes.imageBackdrop} />
                  <div className={classes.imageButton}>
                    <Typography
                      component="h3"
                      variant="h6"
                      color="inherit"
                      className={classes.imageTitle}
                    >
                      {image.title}
                      <div className={classes.imageMarked} />
                    </Typography>
                  </div>
                </Link>
              </ButtonBase>
          ))}
        </div>
      </Grid>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);