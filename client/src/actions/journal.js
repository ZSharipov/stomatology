import { getJournal, getAllJournal } from '../services/server-service'

const journalRequested = () => {
    return {
        type: "FETCH_JOURNAL_REQUEST"
    }

};

const journalLoaded = (newJournal) => {
    return {
        type: "FETCH_JOURNAL_SUCCESS",
        payload: newJournal
    }
};

const journalError = (error) => {
    return {
        type: "FETCH_JOURNAL_FAILURE",
        payload: error
    }
};


// const fetchPatients =(serverService, dispatch)=> ()=>{
//     dispatch(patientsRequested());
//     serverService.getPatients()
//         .then((data) => dispatch(patientsLoaded(data)))
//         .catch((err)=>dispatch(patientsError(err)));
// }



const fetchJournal = (arg) => (dispatch) => { //with thunk
    dispatch(journalRequested());
    getJournal(arg)
        .then(res => res.json())
        .then((res) => dispatch(journalLoaded(res)))
        .catch((err) => dispatch(journalError(err)));
}
const fetchAllJournal = () => (dispatch) => { //with thunk
    dispatch(journalRequested());
    getAllJournal()
        .then(res => res.json())
        .then((res) => dispatch(journalLoaded(res)))
        .catch((err) => dispatch(journalError(err)));
}
export {
    fetchJournal,
    fetchAllJournal,
}