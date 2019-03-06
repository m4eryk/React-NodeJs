import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {SET_CURRENT_USER, GET_ERRORS} from '../actions/types';

//Login
export const loginUser = (userData) => dispatch => {
    axios.post('/api/user/login', userData)
        .then(res => {
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            window.location.reload(true)
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//Register
export const registerUser = (userData, history) => dispatch => {
    return axios.post('/api/user/register', userData)
        .then(vul => vul)
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const setCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const setAuthToken = token => {
    if(token){
        //Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        //Delete Auth Header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const logoutUser = () => dispatch => {
    //Remove token
    localStorage.removeItem('jwtToken');
    //Remove auth header
    setAuthToken(false);
    //Set current user to {} which set
    dispatch(setCurrentUser({}));
    window.location.reload(true)
}