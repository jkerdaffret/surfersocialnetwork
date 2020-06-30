import axios from 'axios'

import { 
    GET_ERRORS,
    GET_USER,
    GET_USERS,
    USER_LOADING,
    CLEAR_CURRENT_USER,
    SET_CURRENT_USER
} from './types';

export const getCurrentUser = id => dispatch => {
    dispatch(setUserLoading())
    axios.get(`/api/users/${id}`)
    .then(res =>
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_USER,
            payload: null
        })
    )
}

export const getPassport = () => dispatch => {
    dispatch(setUserLoading())
    axios.get(`/api/users/passport`)
    .then(res =>
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_USER,
            payload: null
        })
    )
}

export const getUsers = () => dispatch => {
    dispatch(setUserLoading())
    axios
        .get('/api/users/')
        .then(res => dispatch({
            type: GET_USERS,
            payload: null
        }))
}

export const updateUser = (id, userData, history) => dispatch => {
    dispatch(setUserLoading())
    axios
        .patch(`/api/users/${id}`, userData)
        .then(res => history.push('/profile/:id'))
        .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    )
}

export const updateRole = (id, userData, history) => dispatch => {
    dispatch(setUserLoading())
    axios
        .put(`/api/users/${id}`, userData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}

export const deleteAccount = id => dispatch => {
    if(window.confirm('Êtes-vous sûr ? Cette action ne pourra pas être annulé')) {
        axios
            .delete(`/api/users/${id}`)
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            ).catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                })
            )
    }
}

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}