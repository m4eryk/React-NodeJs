import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import axios from 'axios';

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  delete = () => {
    axios.delete(`/api/work/item/${this.props.work.match.params.work_id}`)
      .then(vul => {
        this.props.work.history.push('/work')
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <Button style={{width: '100%'}} variant="outlined" color="secondary" onClick={this.handleClickOpen}>
            Удалить
        </Button>
        <Dialog
          maxWidth='xs'
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Delete confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Attention, do you want to remove this ad? 
                The ad will be remove irrevocably.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.delete} color="secondary">
              Delite
            </Button>
            <Button onClick={this.handleClose} color="primary" >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
