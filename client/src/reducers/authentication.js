const initialState = {
    id_doctor: '',
    fio: '',
    isType: '',
};

const authentication = (state = initialState, action) => {

    switch (action.type) {
        case "AUTHENTICATION_REQUEST":
            const { data, text } = action;
            const doctor = data.find((item) =>
                item.authentication === text)
            if (doctor === undefined) {
                return {
                    ...state,
                    id_doctor: '',
                    fio: '',
                    isType: ''
                }
            }

            return {
                ...state,
                id_doctor: doctor.id_doctor,
                fio: doctor.fio,
                isType: doctor.isType
            }

        default:
            return state
    }
}
export default authentication;