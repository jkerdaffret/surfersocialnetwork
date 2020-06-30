import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {getPassport } from '../../actions/userActions';

class Favoris extends Component {
    constructor(props) {
        super(props)
            this.state = {
                favoris: []
            }
    }

    componentDidMount() {
        getPassport()
        const { user } = this.props.auth


        const id = user.id
        const url = `/api/users/${id}/favoris`
    
        axios.get(url)
            .then((res) => {
            if(res.data.favoris) {
            const data = res.data.favoris.map((spot, index) => {
                return {
                        key: index,
                        id: spot.id,
                        name: spot.name,
                        image: spot.image,
                        pays: spot.pays,
                        level: spot.level,
                        }
                    })
                    this.setState({favoris: data})
                }
            })
            .catch( (error) => {
                console.log('😱', error);
            })
        
      }

      render() {
            const imageUrl = 'http://localhost:5000/images/'
            const card = this.state.favoris.map((spot, index) => (
            <div className="col-4">
            <Link to={`/spot/${spot.id}`}>
            <div className="card" key={index}>
            <img src={imageUrl + `${spot.image}`} alt={spot.name} className="card-img"/>
            <h3 className="card-title text-center text-uppercase mt-2">{spot.name}</h3>
            <div className="card-body mt-5">
            <ul>
                <li className="list-unstyled">Pays: {spot.pays}</li>
                <li className="list-unstyled">Niveau: {spot.level}</li>
            </ul>
            </div>
            </div>
            </Link>
            </div>
            ))
            return (
            <div className="container page">
                <div className="row">
                    {card}
                </div>
            </div>
            )
        }
}

Favoris.propTypes = {
    getPassport: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, {getPassport})(Favoris)