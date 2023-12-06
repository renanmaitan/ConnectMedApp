import React, { createContext, useState, useEffect } from "react";
import Loading from "../components/Loading";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import auth, {db} from "../Config";

const UserContext = createContext({});

export function UserProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [userDatas, setUserDatas] = useState({});

    useEffect(() => {
        async function getUserDatas() {
            const user = auth.currentUser;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const item = querySnapshot.docs[0].data();
            setUserDatas(item);
            setLoading(false);
        }
        auth.onAuthStateChanged((user) => {
            if (user) {
                getUserDatas();
            }
            else {
                setLoading(false);
            }
        });
    }, [])

    const delUser = async () => {
        const user = auth.currentUser;
        const s = query(collection(db, "scheduling"), where(userDatas.isDoctor ? "doctorUid" : "patientUid", "==", user.uid));
        const squerySnapshot = await getDocs(s);
        squerySnapshot.forEach((sdoc) => {
            deleteDoc(sdoc.ref);
        });
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    }

    if (loading) {
        return <Loading />
    }

    return (
        <UserContext.Provider value={{ userDatas, delUser, setUserDatas }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext