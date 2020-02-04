import { patientReferr } from './registry'
import { fetchDoctors } from './doctors';
import { fetchJournal, fetchAllJournal } from './journal';
import { authentication } from './authentication';
import { fetchPatients } from './patients';
import { setTestData } from './test';
import { openPatient, fetchImages, setCurImage, setJournalState } from './manipulation';

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
    setJournalState,

}