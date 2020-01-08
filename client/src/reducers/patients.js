const initialState = {
    patients: [],
    loading: true,
    error: null,
};

const patients = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PATIENTS_REQUEST":
            return {
                ...state,
                error: null,
                loading: true,
            }
        case "FETCH_PATIENTS_SUCCESS":
            return {
                ...state,
                error: null,
                patients: action.payload,
                loading: false
            }
        case "FETCH_PATIENTS_FAILURE":
            return {
                ...state,
                patients: [],
                error: action.payload,
                loading: false
            }

        default:
            return state
    }
}
export default patients;