import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface BlookContextProps {
    allBlooks: Blook[];
}

interface BlookProviderProps {
    children: JSX.Element;
}

interface Blook {
    id: string;
    name: string;
    rarity: string;
    price: number;
    chance: number;
    image: string;
    background: string;
}

const BlookContext = createContext<BlookContextProps | undefined>(undefined);

export function useBlooks(): BlookContextProps {
    const context = useContext(BlookContext);
    if (!context) throw new Error("useBlooks must be used within BlooksProvider component");
    return context;
}

export function BlookProvider({ children }: BlookProviderProps) {
    const [loading, setLoading] = useState(true);
    const [allBlooks, setAllBlooks] = useState<Blook[]>([]);

    useEffect(() => {
        axios.get("/game/blooks").then((response: AxiosResponse) => setAllBlooks(response.data));
        setLoading(false);
    }, []);

    const contextValue: BlookContextProps = {
        allBlooks
    };

    return (
        <BlookContext.Provider value={contextValue}>
            {!loading && children}
        </BlookContext.Provider>
    );
}