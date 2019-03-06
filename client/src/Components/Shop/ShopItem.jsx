import React, { Component } from 'react'
import {connect} from 'react-redux';
import Stepper from '../Elements/News/Stepper';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

import ProgressBar from '../Elements/Publick/ProgressBar';

class ShopItem extends Component {
    state = {
        title: '',
        text: '',
        user: '',
        category: '',
        imageList: '',
        titleImage: '',
        cost: '',
        paymentOptions: '',
        currency: '',
        isLoad: false
    }

    componentWillMount(){
        axios.get(`/api/shop/item/${this.props.match.params.item_id}`)
            .then(vul => this.setState({
                title: vul.data.title,
                text: vul.data.text,
                category: vul.data.category,
                imageList: vul.data.imageList,
                titleImage: vul.data.titleImage,
                cost: vul.data.cost,
                paymentOptions: vul.data.paymentOptions,
                currency: vul.data.currency,
                user: vul.data.user,
                isLoad: true
            }))
    }
  render() {
    return (
        <>
        {
            this.state.isLoad
            ?
                <div className='container' style={{marginTop: 70}}>
                    <div className='row'>
                        <div className='col-12 col-lg-6 d-flex flex-column'>
                            <Stepper shopItem={this.state}/>

                            <Link to={`/profile/user/${this.state.user._id}`}>
                                <div className='d-flex align-items-center border rounded p-2 mb-3'>
                                    <Avatar className='mr-3' alt="Remy Sharp" src={this.state.user.avatar} />
                                    <span>{this.state.user.name}</span>
                                </div>
                            </Link>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <h3 className='mt-1' style={{fontWeight: 'bolder', color: '#4a4a4a'}}>{this.state.title}</h3>
                            <p style={{color: '#9a9a9a', fontStyle: 'italic', fontWeight: 'bold'}}>In Category: {this.state.category}</p>
                            <h2>{this.state.currency} {this.state.cost}</h2>
                            <p style={{color: '#9a9a9a'}}>
                                {this.state.text}
                            </p>

                            <h5 className='mb-2'>Payment:</h5>
                            <div className='d-flex flex-wrap'>  
                                {this.state.paymentOptions.map((vul, key) => {
                                    return <Chip key={key} className='mr-2 mb-1' label={vul} />
                                })}
                            </div>
                            
                            {this.props.auth.isAuthenicated
                                ?
                                <div className='mt-4 mb-3'>
                                    <Button variant="contained" color="primary" className='mr-4'>Buy</Button>
                                    <Button variant="outlined" color="primary">Add to Cart</Button>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            :
                <div style={{height: '95vh'}} className='d-flex justify-content-center'>
                    <ProgressBar />
                </div>
        }
        </>
    )
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ShopItem)