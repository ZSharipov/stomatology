const initialState = {
    aphorism: [],
    loading: true,
    error: null,
};

const aphorism = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_APHORISM_REQUEST":
            return {
                ...state,
                error: null,
                loading: true,
            }
        case "FETCH_APHORISM_SUCCESS":
            return {
                ...state,
                error: null,
                aphorism: action.payload,
                loading: false
            }
        case "FETCH_APHORISM_FAILURE":
            return {
                ...state,
                aphorism: [],
                error: action.payload,
                loading: false
            }

        default:
            return state
    }
}
export default aphorism;