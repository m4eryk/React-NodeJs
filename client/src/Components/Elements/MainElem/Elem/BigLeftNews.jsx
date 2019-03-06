import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {Link} from 'react-router-dom';


const styles = theme => ({
  layout: {
    flex: 1,
    width: 'auto',
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    alignItems: 'stretch',
    display: 'flex',
    height: '100%'

  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
    height: '100%',
    alignItems: 'stretch',
    flex: 1
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
    flex: 1
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 150,
  },
  markdown: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

function Blog(props) {
  const { classes } = props;
  console.log(props.news.news.mainNews[0])
  return (

    <React.Fragment>
          <CssBaseline />
          <Link to={`/news/item/${props.news.news.mainNews[0]._id}`}>
            <div className={classes.layout}>
                <main style={{width: '100%'}}> 
                    <Paper className={[classes.mainFeaturedPost, 'flex-grow', 'flex-fill'].join(' ')} style={{backgroundSize: 'cover' ,height: '100%',backgroundImage: `url(${props.news.news.mainNews[0].image})`}}>
                        <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainFeaturedPostContent}>
                            <Typography component="h6" variant="h5" color="inherit" gutterBottom>
                              {props.news.news.mainNews[0].title}
                            </Typography>
                            <Typography variant="h6" color="inherit" paragraph>
                              {props.news.news.mainNews[0].shortText.slice(0, 120)}...
                            </Typography>
                            </div>
                        </Grid>
                        </Grid>
                    </Paper>
                </main>
            </div> 
          </Link>
    </React.Fragment>
  );
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);