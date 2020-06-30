import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

class UserTable extends Component {
    constructor(props) {
        super(props)
            this.state = {
                users: []
            }
    }

    componentDidMount() {

        const url = "/api/users"
    
        axios.get(url)
            .then((res) => {
                if(res.data.users) {
                    const data = res.data.users.map((user, index) => {
                        return {
                               key: index,
                               id: user.id,
                               firstname: user.firstname,
                               lastname: user.lastname,
                               email: user.email,
                               pays: user.pays,
                               level: user.level,
                               role: user.role,
                               }
                            })
                            this.setState({users: data})
                }
          })
            .catch( (error) => {
                console.log('😱', error);
            })
    }

    handleSubmit (id) {
        return event => {
            event.preventDefault();
            const url = `/api/users/${id}`
        
            if(window.confirm('Êtes-vous sûr ? Cette action ne pourra pas être annulé')) {
                axios.delete(url, this.props.history)
                    .then((res) => this.props.history.push(`/dashboard/`))
                    .catch(err => {
                        console.log(err)
                })
            }
        }
      }

    render() {
        const UserTable = this.state.users.map((user, index) => (
            <tbody key={index}>
                <tr>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.pays}</td>
                <td>{user.level}</td>
                <td>{user.role}</td>
                <td><Link to={`/role/${user.id}`} className="btn btn-warning">Modifier</Link></td>
                <td><form onSubmit={this.handleSubmit(user.id)}><button type="submit" className="btn btn-danger">Supprimer</button></form></td>
                </tr> 
           </tbody>
        ))

        return (
            <div>
                  <h3 className="text-center my-5">Utilisateurs</h3>
                <table>
                    <thead>
                        <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Pays</th>
                        <th>Niveau</th>
                        <th>Rôle</th>
                        </tr>
                    </thead>
                    {UserTable}
                </table>
            </div>
        )
    }
}

export default UserTable