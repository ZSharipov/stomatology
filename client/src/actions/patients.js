import { getPatients } from '../services/server-service'

const patientsRequested = () => {
    return {
        type: "FETCH_PATIENTS_REQUEST"
    }
};

const patientsLoaded = (newPatients) => {
    return {
        type: "FETCH_PATIENTS_SUCCESS",
        payload: newPatients,
    }
};

const patientsError = (error) => {
    return {
        type: "FETCH_PATIENTS_FAILURE",
        payload: error
    }
};


// const fetchPatients =(serverService, dispatch)=> ()=>{
//     dispatch(patientsRequested());
//     serverService.getPatients()
//         .then((data) => dispatch(patientsLoaded(data)))
//         .catch((err)=>dispatch(patientsError(err)));
// }



const fetchPatients = () => (dispatch) => { //with thunk
    dispatch(patientsRequested());
    getPatients()
        .then(res => res.json())
        .then((res) => {
            dispatch(patientsLoaded(res))
        })
        .catch((err) => dispatch(patientsError(err)));
}
export {
    fetchPatients,
}