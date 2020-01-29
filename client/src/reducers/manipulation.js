const initialState = {
    error: null,
    loading: true,
    test: 8,
    currentSlideImage: 0,
    obj: null,
    slides: []
};

const manipulation = (state = initialState, action) => {

    switch (action.type) {
        case "OPEN_PATIENT":
            return {
                ...state,
                obj: action.payload,
            }
        case "SET_CUR_IMAGES":
            return {
                ...state,
                currentSlideImage: action.payload,
            }
        case "FETCH_IMAGES_REQUEST":
            return {
                ...state,
                error: null,
                loading: true,

            }
        case "FETCH_IMAGES_SUCCESS":
            return {
                ...state,
                error: null,
                slides: action.payload,
                currentSlideImage: 0,
                loading: false
            }
        case "FETCH_IMAGES_FAILURE":
            return {
                ...state,
                slides: [],
                error: action.payload,
                loading: false
            }

        default:
            return state
    }
}
export default manipulation;