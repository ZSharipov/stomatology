
const doctorsRequested = () => {
    return {
        type: "FETCH_DOCTORS_REQUEST"
    }

};

const doctorsLoaded = (newDoctors) => {
    return {
        type: "FETCH_DOCTORS_SUCCESS",
        payload: newDoctors
    }
};

const doctorsError = (error) => {
    return {
        type: "FETCH_DOCTORS_FAILURE",
        payload: error
    }
};


// const fetchPatients =(serverService, dispatch)=> ()=>{
//     dispatch(patientsRequested());
//     serverService.getPatients()
//         .then((data) => dispatch(patientsLoaded(data)))
//         .catch((err)=>dispatch(patientsError(err)));
// }



const fetchDoctors = (serverService) => () => (dispatch) => {  //with thunk
    dispatch(doctorsRequested());
    serverService.getDoctors()
        .then((data) => dispatch(doctorsLoaded(data)))
        .catch((err) => dispatch(doctorsError(err)));
}
export {
    fetchDoctors,
}