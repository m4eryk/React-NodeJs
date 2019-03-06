import React, { Component } from 'react'
import {connect} from 'react-redux';
import AdminTubs from '../Elements/Admin/AdminTubs';

class AdminProfile extends Component {
  render() {
    return (
      <div className='mt-4 pt-4'>
        {this.props.auth.user.admin
        ?
          <div>
            <div className='text-center'>
              <h1>Welcom to admin panel</h1>
            </div>
            <AdminTubs />
          </div>
        :
          <div className='text-center'>
            <h1>You have no permission</h1>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AdminProfile);