import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {getPassport, getCurrentUser } from '../../actions/userActions';
import Favoris from './Favoris'
import axios from 'axios'

class Profile extends Component {

    componentDidMount() {
        getPassport()
        getCurrentUser() 
     }

     handleSubmit = event => {
        event.preventDefault();

        const id = this.props.match.params.id
        const url = `/api/users/${id}`
    
        if(window.confirm('Êtes-vous sûr ? Cette action ne pourra pas être annulé')) {
            axios.delete(url, this.props.history)
                .then((res) => this.props.history.push(`/register/`))
                .catch(err => {
                    console.log(err)
            })
        }
      }

    render() {
        const { user } = this.props.auth
        return (
        <div className="container page">
            <div className="row">
                <div className="col-md-12">
                <Link to="/" className="btn btn-light mb-3 float-left">
                    Retour à la page d'accueil
                </Link>
                <div className="col-md-6"/>
                <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{user.firstname} {user.lastname}</h3>
                <p className="lead">{user.email}</p>
                <p className="lead">{user.pays}</p>
                <p className="lead">{user.role}</p>
                <hr />
                <h3 className="text-center text-info">{user.level}</h3>
                <Link to="/bycountry"><button className="btn btn-light">Spots dans mon Pays</button></Link>
                <Link to="/bylevel"><button className="btn btn-light">Spots de mon Niveau</button></Link>
                <Link to={`/edit/${user.id}`}><button className="btn btn-light">Modifier mon profil</button></Link>
                <form onSubmit={this.handleSubmit}>
                <button type="submit" className="btn btn-danger">Supprimer mon compte</button>
                </form>
              </div>
                    </div>
            </div>
            <Favoris/>
        </div>
        )
    }
}

Profile.propTypes = {
    getPassport: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, {getPassport, getCurrentUser})(Profile)