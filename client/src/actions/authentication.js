const authentication = (data, text) => {
    return {
        type: "AUTHENTICATION_REQUEST",
        data: data,
        text: text
    }

};

export {
    authentication,
}