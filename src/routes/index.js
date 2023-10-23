import auth from "../Config";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import Loading from "../components/Loading";
import UserContext from "../contexts/userData";
import AppDoctor from "./doctor.routes";

export default function Routes() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const {userDatas} = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        user ? (
            userDatas.isDoctor ? <AppDoctor/> : < AppRoutes/> 
        ): <AuthRoutes />
    );
};
