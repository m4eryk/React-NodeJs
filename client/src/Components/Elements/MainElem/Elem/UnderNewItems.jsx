import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const styles = {
  card: {
    maxWidth: 320,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between'
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  console.log(props)
  return (
    <Card className={classes.card}>
      <CardActionArea  style={{height: '100%'}}>
        <Link to={'/news/item/'+ props.vul._id }  style={{height: '100%'}} className='d-flex flex-column'>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="200"
          image={props.vul.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.vul.title.slice(0, 60)}...
          </Typography>
          <Typography component="p">
            {props.shortText}
          </Typography>
        </CardContent>
        </Link>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          <Link to={'/news/item/'+ props.vul._id }>Learn More</Link>
        </Button>
      </CardActions> */}
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
