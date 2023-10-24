import { db } from "../Config";
import { collection, addDoc } from "firebase/firestore";

export default function createScheduling(data) {
    const { doctorUid, date, time, modality, specialty, value, patientUid } = data
    const scheduling = {
        doctorUid,
        date,
        time,
        modality,
        specialty,
        value,
        patientUid
    }
    return addDoc(collection(db, "scheduling"), scheduling)
}