import {SET_CURRENT_USER} from '../actions/types';
import isEmpty from '../../auth/is-empty';

const initialState = {
    ///// ИЗМЕНИТЬ
    isAuthenicated: false,
    user: {}
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenicated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}