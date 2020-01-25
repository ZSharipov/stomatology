export const openPatient = (obj) => {
    return {
        type: "OPEN_PATIENT",
        payload: obj,
    }
}