import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextProps {
    user: User | null | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
    getLoggedIn: () => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth(): AuthContextProps {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider component");
    return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const getLoggedIn = useCallback(async () => {
        setLoading(true);
        await axios.get("/users/me").then((response: AxiosResponse) => {
            setUser(response.data);
            axios.defaults.withCredentials = true;
        }).catch(() => {
            setUser(null);
        });
        setLoading(false);
    }, []);

    useEffect(() => {
        getLoggedIn();
    }, [getLoggedIn]);

    const logout = useCallback(async () => {
        await axios.post("/auth/logout").then(() => {
            setUser(null);
            navigate("/login");
        });
    }, [navigate]);

    const contextValue: AuthContextProps = {
        user,
        setUser,
        getLoggedIn,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
