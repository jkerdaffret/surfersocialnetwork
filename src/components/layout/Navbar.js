import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentUser, getPassport } from '../../actions/userActions';

class Navbar extends Component {

    componentDidMount() {
      getPassport()
    }

    onLogoutClick(e) {
        e.preventDefault()
        this.props.clearCurrentUser()
        this.props.logoutUser()
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        let authLinks
        if (user.role === 'SpotMan') {
      authLinks =
          <>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item text-white">Bonjour {user.firstname}</li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <Link className="nav-link" to="/add">Ajouter un spot</Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to="/waterwall">Spots</Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to={`/profile/${user.id}`} >Profil</Link>
            </li>
            <li className="nav-item">
              <a href="/" onClick={this.onLogoutClick.bind(this)} className="nav-link"> 
                Logout 
                </a>
            </li>
          </ul>
          </>
        } else if (user.role === 'Surfeur') { authLinks =
          <>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item text-white">Bonjour {user.firstname}</li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <Link className="nav-link" to="/waterwall">Spots</Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to={`/profile/${user.id}`} >Profil</Link>
            </li>
            <li className="nav-item">
              <a href="/" onClick={this.onLogoutClick.bind(this)} className="nav-link"> 
                Logout 
                </a>
            </li>
          </ul>
          </>
        } else { authLinks =
          <>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item text-white">Bonjour {user.firstname}</li>
            </ul>
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/add">Ajouter un spot</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to="/waterwall">Spots</Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to={`/profile/${user.id}`} >Profil</Link>
            </li>
            <li className="nav-item">
              <a href="/" onClick={this.onLogoutClick.bind(this)} className="nav-link"> 
                Logout 
                </a>
            </li>
          </ul>
          </>
        }
        

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register">S'inscrire</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Se connecter</Link>
            </li>
          </ul>
        )


        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-5 fixed-top">
            <div className="container">
              <Link className="navbar-brand" to="/"><img src="./../spotici.png" alt="Logo de Spot'Ici" className="rounded-circle"/></Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon"></span>
              </button>
        
              <div className="collapse navbar-collapse" id="mobile-nav">
                {isAuthenticated ? authLinks : guestLinks}
              </div>
            </div>
          </nav> 
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getPassport: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, {logoutUser, clearCurrentUser, getPassport})(Navbar)