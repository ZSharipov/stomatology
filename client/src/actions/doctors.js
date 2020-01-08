import { getDoctors } from '../services/server-service'

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



const fetchDoctors = () => (dispatch) => { //with thunk
    dispatch(doctorsRequested());
    getDoctors()
        .then(res => res.json())
        .then((res) => dispatch(doctorsLoaded(res)))
        .catch((err) => dispatch(doctorsError(err)));
}
export {
    fetchDoctors,
}