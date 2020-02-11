import { getAnaesthesia, getAnaesthetization, getMaterials } from '../services/server-service'

const tablesRequested = () => {
    return {
        type: "FETCH_TABLES_REQUEST"
    }
};

const tablesLoaded = (anaesthesia, anaesthetization, materials) => {
    return {
        type: "FETCH_TABLES_SUCCESS",
        anaesthesia: anaesthesia,
        anaesthetization: anaesthetization,
        materials: materials
    }
};

const tablestsError = (error) => {
    return {
        type: "FETCH_TABLES_FAILURE",
        payload: error
    }
};


// const fetchPatients =(serverService, dispatch)=> ()=>{
//     dispatch(patientsRequested());
//     serverService.getPatients()
//         .then((data) => dispatch(patientsLoaded(data)))
//         .catch((err)=>dispatch(patientsError(err)));
// }


let anaesthesia, anaesthetization, materials;

const fetchTables = () => (dispatch) => { //with thunk
    dispatch(tablesRequested());
    getAnaesthesia()
        .then(res => res.json())
        .then((res1) => {
            anaesthesia = res1;
            getAnaesthetization()
                .then(res => res.json())
                .then((res2) => {
                    anaesthetization = res2;
                    getMaterials()
                        .then(res => res.json())
                        .then((res3) => {
                            materials = res3;
                            dispatch(tablesLoaded(anaesthesia, anaesthetization, materials))
                        })
                        .catch((err) => dispatch(tablestsError(err)));
                })
                .catch((err) => dispatch(tablestsError(err)));
        })
        .catch((err) => dispatch(tablestsError(err)));
}
export {
    fetchTables,
}