import React, { Component } from 'react'
import CardProduct from '../Elements/Shop/CardProduct';
import axios from 'axios';
import {connect} from 'react-redux';

import AddShopItem from '../Elements/Shop/Elem/AddShopItem';
import ProgressBar from '../Elements/Publick/ProgressBar';

class Shop extends Component {
    state = {
        price: 0,
        shopItems: '',
        isLoad: false
    }

    onChange = (e) =>{
        this.setState({
            price: e.target.value
        })
    }

    componentWillMount(){
        axios.get('/api/shop/')
            .then(vul => this.setState({
                shopItems: vul.data,
                isLoad: true
            }))
    }

  render() {
    return (
        <>
        {
            this.state.isLoad
            ?   
                <div style={{height: '100%'}} >
                    <div className='mt-5 container' >
                        <div style={{marginTop: 70}} className='d-flex justify-content-between mb-4'>
                            <h3>Shop</h3>

                            {this.props.auth.isAuthenicated
                            ?
                                <AddShopItem />
                            :
                                null
                            }
                        </div>
                        
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12 col-lg-2'>
                                {/* <SingleAutocomplete CategoryList={Category}/>
                                <Autocomplete List={PictyreGenreList}/> */}
                                {/* <input style={{width: '100%'}} type='range' min='0' max='2000' value={this.state.price} onChange={this.onChange}/>
                                <br/>
                                <p>{this.state.price} $</p> */}
                                {/* <Button variant="contained">Search</Button> */}
                            </div>
                            <div className='col-12 flex-wrap col-lg-10 justify-content-evenly row'>
                                {this.state.shopItems.map((vul, key) => <div key={key} className='d-flex col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 justify-content-center mb-2'><CardProduct shopItems={vul}/></div>)}
                            </div>
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

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(Shop)