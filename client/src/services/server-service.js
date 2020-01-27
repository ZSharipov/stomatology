const url = 'http://localhost:3210/'

const getDoctors = _ =>
    fetch(`${url}doctors`)

const getPatients = _ =>
    fetch(`${url}patients`)

const getJournal = (data) =>
    fetch(`${url}journal/${data}`);

const getAllJournal = () =>
    fetch(`${url}journal`);

const postJournal = (data) =>
    fetch(`${url}journal`, {
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


const putPatients = (data) =>
    fetch(`${url}patients`, {
        method: 'PUT',
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


const putDoctors = (data) =>
    fetch(`${url}doctors`, {
        method: 'PUT',
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

const addImg = ({ body, id, myFile }) =>
    fetch(`http://localhost:3211/file/${id}/${myFile}`, {
        method: 'POST',
        body: body

    });


export {
    getDoctors,
    getPatients,
    postJournal,
    putPatients,
    postPatients,
    putDoctors,
    postDoctors,
    delDoctors,
    delPatients,
    getJournal,
    getAllJournal,
    delJournal,
    addImg,
}