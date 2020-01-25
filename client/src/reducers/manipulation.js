const initialState = {
    test: 8,
    obj: null,
    slides: [
        'https://picsum.photos/500/300?image=0',
        'https://picsum.photos/500/300?image=44',
        'https://picsum.photos/500/300?image=22'

    ],
};

const manipulation = (state = initialState, action) => {

    switch (action.type) {
        case "OPEN_PATIENT":
            return {
                ...state,
                obj: action.payload,

            }

        default:
            return state
    }
}
export default manipulation;