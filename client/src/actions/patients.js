
const patientsRequested = () => {
    return {
        type: "FETCH_PATIENTS_REQUEST"
    }

};

const patientsLoaded = (newPatients) => {
    return {
        type: "FETCH_PATIENTS_SUCCESS",
        payload: newPatients
    }
};

const patientsError = (error) => {
    return {
        type: "FETCH_PATIENTS_FAILURE",
        payload: error
    }
};

export const patientsAdedToCard=(id_patient)=>{
    return {
        type: "PATIENT_ADDED_TO_CART",
        payload: id_patient
    }
}

// const fetchPatients =(serverService, dispatch)=> ()=>{
//     dispatch(patientsRequested());
//     serverService.getPatients()
//         .then((data) => dispatch(patientsLoaded(data)))
//         .catch((err)=>dispatch(patientsError(err)));
// }



const fetchPatients =(serverService)=>() => (dispatch)=>{  //with thunk
    dispatch(patientsRequested());
    serverService.getPatients()
        .then((data) => dispatch(patientsLoaded(data)))
        .catch((err)=>dispatch(patientsError(err)));
}
export {
  fetchPatients,
}