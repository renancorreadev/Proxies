import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

export function Logout() {
    const { makeLogoutUrl } = useContext(AuthContext);
    useEffect(() => {
        const logoutUrl = makeLogoutUrl();
        if (logoutUrl) {
            window.location.href = logoutUrl;
        }
    }, [makeLogoutUrl]);

    return <div>Loading...</div>;
}
