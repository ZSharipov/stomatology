export default class ServerService {
    doctors = [{
            id: 1,
            fio: "Баротов З. М.",
            station: "головной",
            tel: "343-5-4-455",
            authentication: "zafar",
            isType: "a"
        },
        {
            id: 2,
            fio: "Иванов И. И.",
            station: "головной",
            tel: "343-5-4-455",
            authentication: "ivan",
            isType: "d"
        },
        {
            id: 3,
            fio: "Козлов И. И.",
            station: "головной",
            tel: "343-5-4-455",
            authentication: "kozlov",
            isType: "r"
        },
        {
            id: 4,
            fio: "Popov И. И.",
            station: "головной",
            tel: "343-5-4-455",
            authentication: "popov",
            isType: "d"
        },
        {
            id: 5,
            fio: "Nemoy И. И.",
            station: "головной",
            tel: "343-5-4-455",
            authentication: "nemoy",
            isType: "d"
        },
    ];

    patients = [{
            id: 1,
            fio: "Иванов И. И.",
            address: "ул. Терешково",
            tel: "34-75-5-46-75",
            hbs: 0,
            hcv: 0,
            hiv: 0,
            birth_day: "1982-02-02",
            date_created: "2019-12-17 21:23:09",
            date_edit: "2019-12-17 21:23:09",
        },
        {
            id: 2,
            fio: "Степан Игорь Николаевич",
            address: "ул. Дружба",
            tel: "92-765-46-78",
            hbs: 0,
            hcv: 0,
            hiv: 0,
            birth_day: "1970-12-12",
            date_created: "2019-12-17 21:23:09",
            date_edit: "2019-12-17 21:23:09",
        }
    ];

    getPatients() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75) {
                    reject(new Error('Something bad happened!'));
                } else {
                    resolve(this.patients);
                }
            }, 800)
        });
    }
    getDoctors() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 111110.75) {
                    reject(new Error('Something bad happened!'));
                } else {
                    resolve(this.doctors);
                }
            }, 800)
        });
    }
}