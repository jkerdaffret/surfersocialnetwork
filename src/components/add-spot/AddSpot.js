import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import data from './FormData'

class AddSpot extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            image: '',
            longitude: '',
            latitude: '',
            pays: '',
            level: '',
            errors: {},
            Countries: []
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.fileInput = React.createRef();
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    
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

    onChangeHandler(event) {

        this.setState({
            image: event.target.files[0],
            loaded: 0,
          })

        console.log(event.target.files[0])
    }

    onSubmit(e) {
        e.preventDefault();

        const Data =  data(this.state)

            console.log("result:", e.target.image);
            
        const url2 = '/api/spots/add'

        axios.post(url2, Data, this.props.history)
        .then(res => this.props.history.push('/waterwall'))
        .catch(err => {
            console.log(err);
            
        })
        console.log(e.target.image);
    
    }

    render() {
        const { errors } = this.state

        const pays = this.state.Countries.map((country, index) => (
                       <option key={index} value={country.name}>
                           {country.name}
                       </option>
                    ))
                    
        const level = [
            {label: 'Selectionner le niveau du spot', value: 0},
            {label: 'Débutant', value: 'Débutant'},
            {label: 'Intermédiaire', value: 'Intermédiaire'},
            {label: 'Confirmé', value: 'Confirmé'},
            {label: 'Professionnel', value: 'Professionnel'},
        ]

        return (
            <div className="container page">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Ajouter un spot</h1>
                  <p className="lead text-center">Faites découvrir un nouveau spot à la communauté</p>
                  <form noValidate onSubmit={this.onSubmit} encType="multipart/form-data">
                  <TextFieldGroup 
                      placeholder="Nom"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                      />
                  <TextAreaFieldGroup 
                      placeholder="Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      error={errors.description}
                      />
                      <select
                      className="form-control form-control-lg mb-3"
                      placeholder="Pays"
                      name='pays'
                      value={this.state.pays}
                      onChange={this.onChange}>
                          {pays}
                      </select>
                      <TextFieldGroup 
                      placeholder="Latitude"
                      name="latitude"
                      type="number"
                      value={this.state.latitude}
                      onChange={this.onChange}
                      error={errors.latitude}
                      />
                      <TextFieldGroup 
                      placeholder="Longitude"
                      name="longitude"
                      type="number"
                      value={this.state.longitude}
                      onChange={this.onChange}
                      error={errors.longitude}
                      />
                      <SelectListGroup
                      placeholder="Niveau"
                      name="level"
                      value={this.state.level}
                      onChange={this.onChange}
                      options={level}
                      />
                      <input
                      placeholder="Photo"
                      name="image"
                      type="file"
                      onChange={this.onChangeHandler}
                      />
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
        )
    }
}

AddSpot.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps)(withRouter(AddSpot))