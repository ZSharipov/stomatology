const initialState = {
    id: '',
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
                    id: '',
                    fio: '',
                    isType: ''
                }
            }

            return {
                ...state,
                id: doctor.id,
                fio: doctor.fio,
                isType: doctor.isType
            }

        default:
            return state
    }
}
export default authentication;