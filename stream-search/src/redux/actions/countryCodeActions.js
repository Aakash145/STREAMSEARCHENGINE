import { COUNTRY_CODE } from './actionTypes'

export const countryCode = (code) => {
    return {
        type: COUNTRY_CODE,
        payload: code
}
}