
const initialState = {
    patients: []
};

const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case "PATIENT_LOADED":
            return {
                patients: payload
            }
        default:
            return state
    }
}
export default reducer;