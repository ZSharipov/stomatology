const initialState = {
    diagnoses: [],
    loading: true,
    error: null,
};

const diagnoses = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_DIAGNOSES_REQUEST":
            return {
                ...state,
                error: null,
                loading: true,
            }
        case "FETCH_DIAGNOSES_SUCCESS":
            return {
                ...state,
                error: null,
                diagnoses: action.payload,
                loading: false
            }
        case "FETCH_DIAGNOSES_FAILURE":
            return {
                ...state,
                diagnoses: [],
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}
export default diagnoses;