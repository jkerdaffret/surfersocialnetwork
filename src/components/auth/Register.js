import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import axios from 'axios'

class  Register extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password2: '',
            pays: '',
            level: '',
            role: '',
            errors: {},
            Countries: []
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    
    componentDidMount() {
        const url = '/api/countries/'
        axios.get(url)
        .then(res => {
            if (res.data.pays) {
                const data = res.data.pays.map((country, index) => {
                    return {
                        key: index,
                        name: country.name
                    }
                })

                this.setState({ Countries: data })
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            pays: this.state.pays,
            level: this.state.level,
            role: this.state.role
        }

        this.props.registerUser(newUser, this.props.history)
    }

    render() {
        const { errors } = this.state

        const pays = this.state.Countries.map((country, index) => (
                       <option key={index} value={country.name}>
                           {country.name}
                       </option>
        ))

        const level = [
            {label: 'Selectionner votre niveau', value: 0},
            {label: 'Débutant', value: 'Débutant'},
            {label: 'Intermédiaire', value: 'Intermédiaire'},
            {label: 'Confirmé', value: 'Confirmé'},
            {label: 'Professionnel', value: 'Professionnel'},
        ]

        const role = [
            {label: 'Quel role pour ce compte ?', value: 0},
            {label: 'Surfeur (Pour découvrir les meilleurs spots)', value: 'Surfeur'},
            {label: "SpotMan (Pour ajouter vos spots et contribuer à enrichir la plateforme Spot'Ici)", value: 'SpotMan'}
        ]

        return (
            <div className="container page">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">S'inscrire</h1>
                  <p className="lead text-center">Créer votre compte Spot'Ici</p>
                  <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup 
                      placeholder="Prénom"
                      name="firstname"
                      value={this.state.firstname}
                      onChange={this.onChange}
                      error={errors.firstname}
                      />
                  <TextFieldGroup 
                      placeholder="Nom"
                      name="lastname"
                      value={this.state.lastname}
                      onChange={this.onChange}
                      error={errors.lastname}
                      />
                      <TextFieldGroup 
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                      />
                      <TextFieldGroup 
                      placeholder="Mot de passe"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                      />
                      <TextFieldGroup 
                      placeholder="Confirmation Mot de Passe"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                      />
                      <select
                      className="form-control form-control-lg mb-3"
                      placeholder="Pays"
                      name='pays'
                      value={this.state.pays}
                      onChange={this.onChange}>
                          {pays}
                      </select>
                      <SelectListGroup
                      placeholder="Niveau"
                      name="level"
                      value={this.state.level}
                      onChange={this.onChange}
                      options={level}
                      error={errors.level}
                      />
                      <SelectListGroup
                      placeholder="Rôle"
                      name="role"
                      value={this.state.role}
                      onChange={this.onChange}
                      options={role}
                      error={errors.role}
                      />
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));