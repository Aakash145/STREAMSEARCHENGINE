import { combineReducers } from 'redux'
import movieIDReducer from './reducers/movieIDReducer'
import countryCodeReducer from './reducers/countryCodeReducer'

const rootReducer = combineReducers({
    movieID: movieIDReducer,
    countryCode: countryCodeReducer
})

export default rootReducer