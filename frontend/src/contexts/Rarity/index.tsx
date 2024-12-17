import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface RarityContextProps {
    rarities: Rarity[];
}

interface RarityProviderProps {
    children: JSX.Element;
}

interface Rarity {
    id: string;
    name: string;
    color: string;
    animation: string;
    exp: number;
    waitTime: number;
}

const RarityContext = createContext<RarityContextProps | undefined>(undefined);

export function useRarities(): RarityContextProps {
    const context = useContext(RarityContext);
    if (!context) throw new Error("useRarities must be used within RarityProvider component");
    return context;
}

export function RarityProvider({ children }: RarityProviderProps) {
    const [loading, setLoading] = useState(true);
    const [rarities, setRarities] = useState<Rarity[]>([]);

    useEffect(() => {
        axios.get("/game/rarities").then((response) => setRarities(response.data));
        setLoading(false);
    }, []);

    const contextValue: RarityContextProps = {
        rarities
    };

    return (
        <RarityContext.Provider value={contextValue}>
            {!loading && children}
        </RarityContext.Provider>
    );
}