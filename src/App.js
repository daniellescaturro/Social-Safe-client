import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom';

import LoginRegisterContainer from './LoginRegisterContainer'
import Navbar from './Navbar'
import HomeContainer from './HomeContainer'
import MyRestaurantsContainer from './MyRestaurantsContainer'
import NewRestaurantForm from './NewRestaurantForm'


import './App.css';
const Protected = ({ component: Component,  ...rest}) => {
  return <Route {...rest} render={(props)=>(
    localStorage.getItem('active') === 'active' ? <Component {...props}/> : <Redirect to='/login'/>
  )} />
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route path="/login" exact component={LoginRegisterContainer}/>
          <Protected path='/' exact component={HomeContainer}/>
          <Protected path='/favorites' exact component={MyRestaurantsContainer}/>
          <Protected path='/add_restaurant' exact component={NewRestaurantForm}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
