import { getImages } from '../services/server-service'

const openPatient = (obj) => {
    return {
        type: "OPEN_PATIENT",
        payload: obj,
    }
}
const setCurImage = (img) => {
    return {
        type: "SET_CUR_IMAGES",
        payload: img,
    }
}
const setJournalState = (jurnState) => {
    return {
        type: "SET_JOUNAL_STATE",
        payload: jurnState,
    }
}

const imagesRequested = () => {
    return {
        type: "FETCH_IMAGES_REQUEST"
    }
};
const imagesLoaded = (images) => {
    return {
        type: "FETCH_IMAGES_SUCCESS",
        payload: images
    }
};

const imagesError = (error) => {
    return {
        type: "FETCH_IMAGES_FAILURE",
        payload: error
    }
};
const fetchImages = (arg) => (dispatch) => { //with thunk
    dispatch(imagesRequested());
    getImages(arg)
        .then(res => res.json())
        .then((res) => dispatch(imagesLoaded(res)))
        .catch((err) => dispatch(imagesError(err)));
}

export {
    fetchImages,
    openPatient,
    setCurImage,
    setJournalState,
}