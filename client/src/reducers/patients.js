const initialState = {
    patients: [],
    loading: true,
    error: null,
    items: [],
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
        case "PATIENT_ADDED_TO_CART":
            const id = action.payload;
            const patient = state.patients.find((patient) => patient.id === id);
            const newRec = {
                id: patient.id,
                fio: patient.fio,
                address: patient.address,
                tel: patient.tel,
            };
            return {
                ...state,
                items: [...state.items, newRec]
            }
        default:
            return state
    }
}
export default patients;