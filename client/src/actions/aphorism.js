import { getAphorism } from '../services/server-service'

const aphorismRequested = () => {
    return {
        type: "FETCH_APHORISM_REQUEST"
    }

};

const aphorismLoaded = (newDiagnoses) => {
    return {
        type: "FETCH_APHORISM_SUCCESS",
        payload: newDiagnoses,
    }
};

const aphorismError = (error) => {
    return {
        type: "FETCH_APHORISM_FAILURE",
        payload: error
    }
};


// const fetchPatients =(serverService, dispatch)=> ()=>{
//     dispatch(patientsRequested());
//     serverService.getPatients()
//         .then((data) => dispatch(patientsLoaded(data)))
//         .catch((err)=>dispatch(patientsError(err)));
// }



const fetchAphorism = () => (dispatch) => { //with thunk
    dispatch(aphorismRequested());
    getAphorism()
        .then(res => res.json())
        .then((res) => {
            dispatch(aphorismLoaded(res))
        })
        .catch((err) => dispatch(aphorismError(err)));
}
export {
    fetchAphorism,
}