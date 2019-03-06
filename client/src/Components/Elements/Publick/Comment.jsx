import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

import {Link} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10
  },
  inline: {
    display: 'inline',
  },
});

function like(idComment, idUser, getComment){
  const data = {
    id: idComment,
    idUser: idUser,
  }

  axios.post('/api/news/item/comment/' + idComment, data)
    .then(vul => 
      getComment()
    )
  
}

function AlignItemsList(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      {props.commentList.map((comment, key) => (

      <ListItem key={key} alignItems="flex-start">
        <ListItemAvatar>
          <Link to={'/profile/user/' +  comment.user._id}>
            <Avatar alt="Remy Sharp" src={comment.user.avatar} />
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={(
            <div className='d-flex justify-content-between'>
                <span><Link to={'/profile/user/' +  comment.user._id}>{comment.user.name}</Link></span>
                {
                  comment.like.includes(props.auth.user.id) 
                  ?
                    <i style={{color: 'red', transition: '1s'}} className="fas fa-heart btn" onClick={() => like(comment._id, props.auth.user.id, props.getComment)}> {comment.like.length}</i>
                  :
                    <i style={{color: 'black', transition: '1s'}} className="fas fa-heart btn" onClick={() => like(comment._id, props.auth.user.id, props.getComment)}> {comment.like.length}</i>
                }
            </div>
          )}
          secondary={
            <React.Fragment>
              {comment.text}
            </React.Fragment>
          }
        />
      </ListItem>

      ))}
    </List>
  );
}

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);
