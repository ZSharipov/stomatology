const initialState = {
    anaesthesia: [],
    anaesthetization: [],
    materials: [],
    loading: true,
    error: null,
};

const tables = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_TABLES_REQUEST":
            return {
                ...state,
                error: null,
                loading: true,
            }
        case "FETCH_TABLES_SUCCESS":
            return {
                ...state,
                error: null,
                anaesthesia: action.anaesthesia,
                anaesthetization: action.anaesthetization,
                materials: action.materials,
                loading: false
            }
        case "FETCH_TABLES_FAILURE":
            return {
                ...state,
                anaesthesia: [],
                anaesthetization: [],
                materials: [],
                error: action.payload,
                loading: false
            }

        default:
            return state
    }
}
export default tables;