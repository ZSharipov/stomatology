export const patientReferr = (id, fio) => {
    return {
        type: "PATIENT_REFERR_TO_DOCTOR",
        id: id,
        fio: fio
    }
}