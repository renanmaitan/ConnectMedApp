import auth from "../Config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import Loading from "../components/Loading";

export default function Routes() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
        user ? < AppRoutes/> : <AuthRoutes />
    );
};
