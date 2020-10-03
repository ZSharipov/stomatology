const initialState = {
    activWindow: '',
};

const admin = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_ACTIVE_WINDOW":
            return {
                activWindow: action.payload
            }

        default:
            return state
    }
}
export default admin;