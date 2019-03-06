import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {GET_USER_PROFILE} from './types'

export const getProfile = (userData) => dispatch => {
    axios.get(`/api${userData}`)
        .then(vul => {
            const userInfo = {
                img: vul.data.user.avatar,
                name: vul.data.user.name,
                ready: true,
                skills: vul.data.skills,
                social: vul.data.social
            }
            return {
                type: GET_USER_PROFILE,
                payload: userInfo
            }
        }
    )
}