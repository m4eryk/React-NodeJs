import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 300,
    boxShadow: 0,
    margin: 25 
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} style={{backgroundColor: 'white', boxShadow: 'none'}}>
      <CardActionArea onClick={props.onClick}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image={props.video.titleImage}
          title="Contemplative Reptile"
          //className='img-trumbnail'
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="h6">
            {props.video.title}
          </Typography>
          <Typography component="p">
            {props.video.user.name}
          </Typography>
          {/* <Typography component="p">
            46 k
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);