import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import {MTLModel} from 'react-3d-viewer';
import mtl from '../../assets/3d model/Avent.mtl';
import obj from '../../assets/3d model/untitled.obj';
import VideoList from './VideoList';
import {Link} from 'react-router-dom';
//import ProgressBar from '../Publick/ProgressBar';


class ResponsiveDialog extends React.Component {
  state = {
    load: false,
    open: false,
    video: {
        titleImage: 'https://firebasestorage.googleapis.com/v0/b/artgalery-fe9fd.appspot.com/o/Background.jpg?alt=media&token=8b436373-0ec6-4c49-bd84-2134d3c962ff',
        title: 'Lamborghini',
        user: {
            name: 'Alex'
        }
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, load: false });
  };

  render() {
    const { fullScreen } = this.props;
    console.log(this.state)
    return (
      <div>
        <VideoList video={this.state.video} onClick={this.handleClickOpen}/>

        <Dialog
          fullWidth
          maxWidth='md'
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent>

          <div className='mb-2' style={{border: '1px solid #e4e4e4', marginBottom: 10,borderRadius: 10 ,backgroundColor: '#fff'}}>
            
            <div style={{position: 'relative'}} className='d-flex justify-content-center'>
                
                <MTLModel    
                    src={obj}
                    mtl={mtl}
                    width={800}                   
                    // onLoad={() => {
                    //     // console.log('load')
                    //     // this.setState({load: true})
                    // }}      
                >       
                </MTLModel> 

                {/* {this.state.load
                ?
                    null
                :
                    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, top: 0}} className='d-flex justify-content-center'>
                        <ProgressBar />
                    </div>
                } */}
            </div>

            <div style={{borderTop: '1px solid #e4e4e4'}} className='pl-3 pr-3 ml-1 mr-1 mt-1 mb-2 d-flex flex-row'>
                <Link className='p-1 align-items-center d-flex flex-row' to={`/profile/user/5c41ceec0df1830bd4f0f393`}>
                  <Avatar className='mr-2' alt="Remy Sharp" src='https://firebasestorage.googleapis.com/v0/b/artgalery-fe9fd.appspot.com/o/images%2F02-funny-cat-wallpapercat-wallpaper.jpg?alt=media&token=bf18701b-a07a-4e7b-9213-3742ac3f7491' />
                  <span>Alex</span>
                </Link>
            </div>

            <ExpansionPanel style={{boxShadow: 'none'}} className='ml-1 mr-1 mt-1'>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Still</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        
                    </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>     
        </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
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
