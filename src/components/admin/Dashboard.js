import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SpotTable from './SpotTable';
import UserTable from './UserTable'
import { getPassport, getUsers } from '../../actions/userActions';

class Dashboard extends Component {
    constructor(props) {
        super(props)
            this.state = {
                spots: []
            }
    }

    componentDidMount() {
        getPassport()
        getUsers()
        }

    render() {
        const { user } = this.props.auth

        return (
            <div className="container page">
                <h1 className="text-center mb-5">Bienvenue dans le Dashboard {user.firstname}</h1>

                <SpotTable/>
                <UserTable/>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getPassport: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, {getPassport})(Dashboard)