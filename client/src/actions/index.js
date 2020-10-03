import { patientReferr } from './registry'
import { fetchDoctors } from './doctors';
import { admin } from './admin';
import { fetchJournal, fetchAllJournal } from './journal';
import { authentication } from './authentication';
import { fetchPatients } from './patients';
import { fetchDiagnoses } from './diagnoses';
import { fetchTables } from './tables-for-manipulation';
import { setTestData } from './test';
import { fetchAphorism } from './aphorism';
import { openPatient, fetchImages, setCurImage, isDeciduous } from './manipulation';

export {
    authentication,
    fetchDoctors,
    patientReferr,
    fetchPatients,
    setTestData,
    fetchJournal,
    fetchAllJournal,
    openPatient,
    fetchImages,
    setCurImage,
    isDeciduous,
    fetchDiagnoses,
    fetchTables,
    fetchAphorism,
    admin,

}