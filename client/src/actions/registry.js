export const patientReferr = (id, fio) => {
    return {
        type: "PATIENT_REFERR_TO_DOCTOR",
        id: id,
        fio: fio
    }
}


export const getPatiens = (data, text) => {
    return {
        type: "AUTHENTICATION_REQUEST",
        data: data,
        text: text
    }

};


// const patientsRequested = () => {
//     return {
//         type: "FETCH_PATIENTS_REQUEST"
//     }

// };

// const patientsLoaded = (newPatients) => {
//     return {
//         type: "FETCH_PATIENTS_SUCCESS",
//         payload: newPatients
//     }
// };

// const patientsError = (error) => {
//     return {
//         type: "FETCH_PATIENTS_FAILURE",
//         payload: error
//     }
// };



// // const fetchPatients =(serverService, dispatch)=> ()=>{
// //     dispatch(patientsRequested());
// //     serverService.getPatients()
// //         .then((data) => dispatch(patientsLoaded(data)))
// //         .catch((err)=>dispatch(patientsError(err)));
// // }



// const fetchPatients =(serverService)=>() => (dispatch)=>{  //with thunk
//     dispatch(patientsRequested());
//     serverService.getPatients()
//         .then((data) => dispatch(patientsLoaded(data)))
//         .catch((err)=>dispatch(patientsError(err)));
// }
// export {
//   fetchPatients,
// }