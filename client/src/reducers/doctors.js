const initialState = {
    doctors: [],
    loading: true,
    error: null,
};

const doctors = (state = initialState, action) => {

    switch (action.type) {
        case "FETCH_DOCTORS_REQUEST":
            return {
                ...state,
                error: null,
                loading: true,
            }
        case "FETCH_DOCTORS_SUCCESS":
            return {
                ...state,
                error: null,
                doctors: action.payload,
                loading: false
            }
        case "FETCH_DOCTORS_FAILURE":
            return {
                ...state,
                doctors: [],
                error: action.payload,
                loading: false
            }
     
        default:
            return state
    }
}
export default doctors;