const url = 'http://localhost:3210/'

const getDoctors = _ =>
    fetch(`${url}doctors`)

const getPatients = _ =>
    fetch(`${url}patients`)

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


export { getDoctors, getPatients, postJournal, putPatients, postPatients }