import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentUser } from './actions/userActions';

import { Provider } from 'react-redux'
import store from './store'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Landing from './components/layout/Landing';
import Profile from './components/profile/Profile';
import Waterwall from './components/surfeur/Waterwall'
import Spot from './components/spot/Spot';
import Visiteurs from './components/visiteurs/Visiteurs'
import AddSpot from './components/add-spot/AddSpot';
import Dashboard from './components/admin/Dashboard';
import ByCountry from './components/surfeur/ByCountry';
import ByLevel from './components/surfeur/ByLevel';
import EditUser from './components/update-delete/EditUser';
import EditSpot from './components/update-delete/EditSpot';
import EditRole from './components/update-delete/EditRole';
import NotFound from './components/not-found/NotFound'

import './App.css';
import PrivateRoute from './components/common/PrivateRoute'

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentUser())
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing}/>
            <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/not-found" component={NotFound} />
              <Switch> 
              <Route exact path="/visiteur" component={Visiteurs} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile/:id" component={Profile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit/:id" component={EditUser} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/waterwall" component={Waterwall} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/bycountry" component={ByCountry} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/bylevel" component={ByLevel} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/spot/:id" component={Spot} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/update/:id" component={EditSpot} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add" component={AddSpot} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/role/:id" component={EditRole} />
              </Switch>
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
