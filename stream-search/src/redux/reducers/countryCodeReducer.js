import { COUNTRY_CODE } from '../actions/actionTypes'

const initialState = {
    countryCode: ''
}

const countryCodeReducer = (state = initialState, action) => {
    switch(action.type){
        case COUNTRY_CODE:
            return {
                ...state,
                countryCode: action.payload
            }

        default:
            return state
    }
}

export default countryCodeReducer