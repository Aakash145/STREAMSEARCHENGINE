import { MOVIE_ID } from '../actions/actionTypes'

const initialState = {
    movieID: ''
}

const movieIDReducer = (state = initialState, action) => {
    switch(action.type){
        case MOVIE_ID:
            return {
                ...state,
                movieID: action.payload
            }

        default:
            return state
    }
}

export default movieIDReducer