import { MOVIE_ID } from './actionTypes'

export const movieID = (id) => {
    return {
        type: MOVIE_ID,
        payload: id
}
}