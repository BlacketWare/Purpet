import { useAuth } from "@contexts/Auth";
import { Navigate } from "react-router-dom";
import Background from "@components/Background";
import Sidebar from "@components/Sidebar";

export default function SidebarWrapper({ children }: { children: JSX.Element }) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    return (
        <>
            <Background />
            <Sidebar />
            {children}
        </>
    );
}
