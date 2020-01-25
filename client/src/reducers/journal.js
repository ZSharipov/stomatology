const initialState = {
    journal: [],
    loading: true,
    error: null,
};

const journal = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_JOURNAL_REQUEST":
            return {
                ...state,
                error: null,
                loading: true,
            }
        case "FETCH_JOURNAL_SUCCESS":
            return {
                ...state,
                error: null,
                journal: action.payload,
                loading: false
            }
        case "FETCH_JOURNAL_FAILURE":
            return {
                ...state,
                journal: [],
                error: action.payload,
                loading: false
            }

        default:
            return state
    }
}
export default journal;