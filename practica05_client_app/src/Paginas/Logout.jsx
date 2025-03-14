import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const refreshToken = localStorage.getItem("refreshToken");

    const logout = async (authToken) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/account/logout/", {
                method: "POST",
                body: JSON.stringify({ refresh_token: refreshToken }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
            });

            if (response.status === 200) {
                console.log("Logout exitoso");
            } else {
                await refreshTokenFn();
                return;
            }
        } catch (error) {
            console.error("Error en la solicitud de logout:", error);
        }

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
    };

    const refreshTokenFn = async () => {
        if (!refreshToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/account/refresh-token/", {
                method: "POST",
                body: JSON.stringify({ refresh_token: refreshToken }),
                headers: { "Content-Type": "application/json" },
            });

            const resData = await response.json();

            if (response.status === 200) {
                localStorage.setItem("accessToken", resData.access_token);
                setToken(resData.access_token);
                await logout(resData.access_token);
            } else {
                console.log("Fallo al refrescar token, cerrando sesión.");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate('/login');
            }
        } catch (error) {
            console.error("Error en refreshTokenFn:", error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate('/login');
        }
    };

    useEffect(() => {
        if (!token) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate('/login');
            return;
        }
        logout(token);
    }, [token]);

    return null;
}
