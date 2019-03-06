import React, { Component } from 'react';
import {Route} from 'react-router-dom';


import MainPage from './Components/MainPage/MainPage';
import Header from './Components/Layout/Header/Header';
import Profile from './Components/Profile/Profile';
import Shop from './Components/Shop/Shop';
import Galery from './Components/Galery/Galery';
import AdminProfile from './Components/Profile/AdminProfile';
import NewsList from './Components/News/NewsList';
import News from './Components/News/News';
import Work from './Components/Work/WorkItem';
import WorkList from './Components/Work/WorkList';
import ShopItem from './Components/Shop/ShopItem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <Route exact path='/' component={MainPage}/>
          <Route exact path='/profile/user/:user_id' component={Profile} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/shop/item/:item_id' component={ShopItem} />
          <Route exact path='/galery' component={Galery} />
          <Route exact path='/news' component={NewsList} />
          <Route exact path='/news/item/:news_id' component={News} />
          <Route exact path='/work/:work_id' component={Work} />
          <Route exact path='/work' component={WorkList} />
            <Route exact path='/admin' component={AdminProfile} />
        </div>
      </div>
    );
  }
}


export default App;