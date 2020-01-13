export const setTestData = (hbs, hcv, hiv, patientId) => {
    return {
        type: "PATIENT_TEST_EDIT",
        hbs: hbs,
        hcv: hcv,
        hiv: hiv,
        patientId: patientId,
    }
};