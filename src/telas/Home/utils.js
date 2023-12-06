import { getDocs, query, collection, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Config";

export const disjoinData = (data) => {
    const date = new Date();
    const newData = [];
    const newData2 = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].year > date.getFullYear()) {
            newData.push(data[i]);
        } else if (data[i].year == date.getFullYear()) {
            if (data[i].month > date.getMonth() + 1) {
                newData.push(data[i]);
            } else if (data[i].month == date.getMonth() + 1) {
                if (data[i].day > date.getDate()) {
                    newData.push(data[i]);
                } else if (data[i].day == date.getDate()) {
                    if (data[i].hour > date.getHours()) {
                        newData.push(data[i]);
                    } else if (data[i].hour == date.getHours()) {
                        if (data[i].minute > date.getMinutes()) {
                            newData.push(data[i]);
                        } else {
                            newData2.push(data[i]);
                        }
                    } else {
                        newData2.push(data[i]);
                    }
                } else {
                    newData2.push(data[i]);
                }
            }
        }
    }
    return [newData, newData2];
};

export const orderData = (data) => {
    const newData = data.sort((a, b) => {
        if (a.year > b.year) {
            return 1;
        } else if (a.year < b.year) {
            return -1;
        } else {
            if (a.month > b.month) {
                return 1;
            } else if (a.month < b.month) {
                return -1;
            } else {
                if (a.day > b.day) {
                    return 1;
                } else if (a.day < b.day) {
                    return -1;
                } else {
                    if (a.hour > b.hour) {
                        return 1;
                    } else if (a.hour < b.hour) {
                        return -1;
                    } else {
                        if (a.minute > b.minute) {
                            return 1;
                        } else if (a.minute < b.minute) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                }
            }
        }
    });
    for (let i = 0; i < newData.length; i++) {
        newData[i].id = i + 1;
    }
    return newData;
};

export async function getUser(uid) {
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const doc = querySnapshot.docs[0];
        if (doc) {
            const user = doc.data();
            return { ...user, id: doc.id };
        }
        throw new Error("Usuário não encontrado");
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        throw error;
    }
}

export async function getScheduling(mode, userDatas) {
    try {
        const q = query(collection(db, "scheduling"), where(mode, "==", userDatas.uid));
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return list;
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        throw error;
    }
}


export const handleToSelectData = (data) => {
    const newData = [];
    for (const appointment of data) {
        newData.push({
            id: appointment.id,
            label: `${appointment.day}/${appointment.month}/${appointment.year} - ${appointment.hour}:${appointment.minute} - ${appointment.name}`,
            docId: appointment.docId,
        });
    }
    return newData;
}

export async function deleteScheduling(id) {
    const schedulingRef = doc(db, "scheduling", id);
    try {
        await deleteDoc(schedulingRef);
    }
    catch (error) {
        console.error("Erro ao deletar agendamento:", error);
    }
}