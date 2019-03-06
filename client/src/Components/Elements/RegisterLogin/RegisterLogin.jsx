import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import RegisterLoginTabs from './RegisterElem/RegisterLoginTabs';


class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

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
        <Button variant="outlined" onClick={this.handleClickOpen} color="secondary">LogIn</Button>
        <Dialog
          maxWidth={'sm'}
          fullWidth={true}
          style={{fles: 1}}
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
  
            <RegisterLoginTabs/>

          </DialogContent>
          <Button className='border-top' color="primary" onClick={this.handleClose}>Close</Button>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
