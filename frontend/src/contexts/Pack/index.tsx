import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface PackContextProps {
    packs: Pack[];
}

interface PackProviderProps {
    children: JSX.Element;
}

interface Pack {
    id: string;
    name: string;
    price: number;
    colors: string[];
    blooks: string[];
    image: string;
}

const PackContext = createContext<PackContextProps | undefined>(undefined);

export function usePacks(): PackContextProps {
    const context = useContext(PackContext);
    if (!context) throw new Error("usePacks must be used within PackProvider component");
    return context;
}

export function PackProvider({ children }: PackProviderProps) {
    const [loading, setLoading] = useState(true);
    const [packs, setPacks] = useState<Pack[]>([]);

    useEffect(() => {
        axios.get("/game/packs").then((response: AxiosResponse) => setPacks(response.data));
        setLoading(false);
    }, []);

    const contextValue: PackContextProps = {
        packs
    };

    return (
        <PackContext.Provider value={contextValue}>
            {!loading && children}
        </PackContext.Provider>
    );
}
