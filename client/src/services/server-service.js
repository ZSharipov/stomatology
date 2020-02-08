const url = 'http://localhost:3210/'

//GET's

const getDoctors = _ =>
    fetch(`${url}doctors`)

const getDiagnoses = _ =>
    fetch(`${url}diagnoses`)

const getPatients = _ =>
    fetch(`${url}patients`)

const getJournal = (data) =>
    fetch(`${url}journal/${data}`);

const getImages = (data) =>
    fetch(`${url}image/${data}`);

const getAllJournal = () =>
    fetch(`${url}journal`);


//POST's
const postDiagnoses = (data) =>
    fetch(`${url}diagnoses`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
const postJournal = (data) =>
    fetch(`${url}journal`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

const postImage = (data) =>
    fetch(`${url}image`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
const postPatients = (data) =>
    fetch(`${url}patients`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

const postDoctors = (data) =>
    fetch(`${url}doctors`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });



//PUT's
const putDiagnoses = (data) =>
    fetch(`${url}diagnoses`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

const putPatients = (data) =>
    fetch(`${url}patients`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

const putJournal = (data) =>
    fetch(`${url}journal`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

const putDoctors = (data) =>
    fetch(`${url}doctors`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });



//DELETE's 

const delDiagnoses = (data) =>
    fetch(`${url}diagnoses`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
const delDoctors = (data) =>
    fetch(`${url}doctors`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

const delPatients = (data) =>
    fetch(`${url}patients`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

const delJournal = (data) =>
    fetch(`${url}journal`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

const delImgDb = (data) =>
    fetch(`${url}image`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

const delImgFs = (id, myFile) =>
    fetch(`http://localhost:3211/file/del/${id}/${myFile}`, {
        method: 'POST',

    });
const addImg = ({ body, id, myFile }) =>
    fetch(`http://localhost:3211/file/${id}/${myFile}`, {
        method: 'POST',
        body: body

    });


export {
    getDoctors,
    getPatients,
    getDiagnoses,
    getJournal,
    getAllJournal,
    postJournal,
    postPatients,
    postDoctors,
    postDiagnoses,
    putDoctors,
    putPatients,
    putDiagnoses,
    putJournal,
    delDoctors,
    delPatients,
    delJournal,
    delDiagnoses,
    addImg,
    postImage,
    getImages,
    delImgDb,
    delImgFs,
}