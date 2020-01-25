const initialState = {
    hbs: 0,
    hcv: 0,
    hiv: 0,
    patientId: '',
    patientFio: '',
};

const test = (state = initialState, action) => {
    switch (action.type) {
        case "PATIENT_TEST_EDIT":
            return {
                ...state,
                hbs: action.hbs,
                hcv: action.hcv,
                hiv: action.hiv,
                patientId: action.patientId,
                patientFio: action.patientFio,
            }

        default:
            return state
    }
}
export default test;