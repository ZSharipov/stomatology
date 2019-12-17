
const patientsLoaded = (newPatients) => {
    return {
        type: "PATIENTS_LOADED",
        payload: newPatients
    }
};

export {
    patientsLoaded
};