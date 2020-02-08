import { getDiagnoses } from '../services/server-service'

const diagnosesRequested = () => {
    return {
        type: "FETCH_DIAGNOSES_REQUEST"
    }

};

const diagnosesLoaded = (newDiagnoses) => {
    return {
        type: "FETCH_DIAGNOSES_SUCCESS",
        payload: newDiagnoses,
    }
};

const diagnosesError = (error) => {
    return {
        type: "FETCH_DIAGNOSES_FAILURE",
        payload: error
    }
};


// const fetchPatients =(serverService, dispatch)=> ()=>{
//     dispatch(patientsRequested());
//     serverService.getPatients()
//         .then((data) => dispatch(patientsLoaded(data)))
//         .catch((err)=>dispatch(patientsError(err)));
// }



const fetchDiagnoses = () => (dispatch) => { //with thunk
    dispatch(diagnosesRequested());
    getDiagnoses()
        .then(res => res.json())
        .then((res) => {
            dispatch(diagnosesLoaded(res))
        })
        .catch((err) => dispatch(diagnosesError(err)));
}
export {
    fetchDiagnoses,
}