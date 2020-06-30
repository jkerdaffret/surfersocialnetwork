import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

class SpotTable extends Component {
    constructor(props) {
        super(props)
            this.state = {
                spots: []
            }
    }

    componentDidMount() {
        const url = "/api/spots"
    
        axios.get(url)
            .then((res) => {
                if(res.data.spots) {
                    const data = res.data.spots.map((spot, index) => {
                        return {
                               key: index,
                               id: spot.id,
                               name: spot.name,
                               image: spot.image,
                               pays: spot.pays,
                               level: spot.level,
                               longitude: spot.longitude,
                               latitude: spot.latitude,
                               description: spot.description
                               }
                            })
                            this.setState({spots: data})
                }
          })
            .catch( (error) => {
                console.log('😱', error);
            })
        }

    handleSubmit (id) {
        return event => {
            event.preventDefault();
            const url2 = `/api/spots/${id}`
        
            if(window.confirm('Êtes-vous sûr ? Cette action ne pourra pas être annulé')) {
                axios.delete(url2, this.props.history)
                    .then((res) => this.props.history.push(`/dashboard/`))
                    .catch(err => {
                        console.log(err)
                })
            }
        }
      }

    render() {
        const imageUrl = 'http://localhost:5000/images/'
        const SpotTable = this.state.spots.map((spot, index) => (
            <tbody key={index}>
                <tr>
                <td><img src={imageUrl + `${spot.image}`} alt={spot.name} className="rounded-circle"/></td>
                <td>{spot.name}</td>
                <td>{spot.level}</td>
                <td>{spot.pays}</td>
                <td>{spot.latitude}</td>
                <td>{spot.longitude}</td>
                <td><Link to={`/update/${spot.id}`} className="btn btn-warning">Modifier</Link></td>
                <td><form onSubmit={this.handleSubmit(spot.id)}><button type="submit" className="btn btn-danger">Supprimer</button></form></td>
                </tr>
            </tbody>
        ))

        return (
            <div>
                <h3 className="text-center mb-5">Spots</h3>
                <table className="my-5">
                    <thead>
                        <tr>
                        <th></th>
                        <th>Nom</th>
                        <th>Niveau</th>
                        <th>Pays</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    {SpotTable}
                </table>
            </div>
        )
    }
}

export default SpotTable