import auth, {db} from '../Config';
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
import { verifyBeforeUpdateEmail, updatePassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from "firebase/auth";

export const createUser = async (form) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;
        const docRef = await addDoc(collection(db, "users"), {
            name: form.name,
            birthDate: form.birthDate,
            cpf: form.cpf,
            phone: form.phone,
            cep: form.cep,
            uid: user.uid,
            isDoctor: form.isDoctor,
        });
        return docRef;
    } catch (error) {
        console.error(error);
        Alert.alert(error.message);
    }
};

export const createDoctorUser = async (form, doctorForm) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;

        const docRef = await addDoc(collection(db, "users"), {
            name: form.name,
            birthDate: form.birthDate,
            cpf: form.cpf,
            phone: form.phone,
            cep: form.cep,
            uid: user.uid,
            isDoctor: form.isDoctor,
            specialty: doctorForm.specialty,
            register: doctorForm.register,
            value: doctorForm.value,
            modality: doctorForm.modality,
            address: doctorForm.address,
            bairro: doctorForm.bairro,
            city: doctorForm.city,
            cep: doctorForm.cep,
            points: 5,
            startHour: doctorForm.startHour,
            endHour: doctorForm.endHour,
            workDays: doctorForm.workDays
        });

    } catch (error) {
        console.error(error);
        Alert.alert(error.message);
    }
};

export const getSpecialties = async () => {
    const q = collection(db, "specialty");
    const querySnapshot = await getDocs(q);
    let list = []
    querySnapshot.forEach((doc) => {
        list.push(doc.data())
    });
    return list
}

export async function addDeleteHour(day, month, year, hour, item) {
    const docRef = await addDoc(collection(db, "deleteHours"), {
        day: day,
        month: month,
        year: year,
        hour: hour,
        doctorUid: item.uid,
    });
    return docRef;
}

export async function addDeleteDay(day, month, year, item) {
    const docRef = await addDoc(collection(db, "deleteDays"), {
        day: day,
        month: month,
        year: year,
        doctorUid: item.uid,
    });
    return docRef;
}

export async function getDeleteDays(item, month, year) {
    const q = query(collection(db, "deleteDays"), where("doctorUid", "==", item.uid), where("month", "==", month), where("year", "==", year));
    const querySnapshot = await getDocs(q);
    let list = []
    querySnapshot.forEach((doc) => {
        list.push(doc.data())
    });
    return list
}

export async function getDeleteHours(item, day, month, year) {
    const q = query(collection(db, "deleteHours"), where("doctorUid", "==", item.uid), where("day", "==", day), where("month", "==", month), where("year", "==", year));
    const querySnapshot = await getDocs(q);
    let list = []
    querySnapshot.forEach((doc) => {
        list.push(doc.data())
    });
    return list
}

export async function updateUser (form) {
    const user = auth.currentUser;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let userRef = querySnapshot.docs[0].ref;
    await updateDoc(userRef, {
        ...form
    });
}

export async function updateUserEmail (newEmail) {
    const user = auth.currentUser;
    await verifyBeforeUpdateEmail(user, newEmail);
}

export async function updateUserPassword (newPassword) {
    const user = auth.currentUser;
    await updatePassword(user, newPassword);
}