const initialState = {
    patientReferrId: '',
    patientReferrFio: ''
};

const registry = (state = initialState, action) => {

    switch (action.type) {
        case "PATIENT_REFERR_TO_DOCTOR":
            return {
                ...state,
                patientReferrId: action.id,
                patientReferrFio: action.fio,
            }


        default:
            return state
    }
}
export default registry;