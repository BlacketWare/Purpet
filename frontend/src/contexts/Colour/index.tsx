import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface ColourContextProps {
    colours: Colour[];
}

interface ColourProviderProps {
    children: JSX.Element;
}

interface Colour {
    id: string;
    name: string;
    color: string;
    animation: string;
    exp: number;
    waitTime: number;
}

const ColourContext = createContext<ColourContextProps | undefined>(undefined);

export function useColours(): ColourContextProps {
    const context = useContext(ColourContext);
    if (!context) throw new Error("useColours must be used within ColourProvider component");
    return context;
}

export function ColourProvider({ children }: ColourProviderProps) {
    const [loading, setLoading] = useState(true);
    const [colours, setColours] = useState<Colour[]>([]);

    useEffect(() => {
        axios.get("/game/colours").then((response) => setColours(response.data));
        setLoading(false);
    }, []);

    const contextValue: ColourContextProps = {
        colours
    };

    return (
        <ColourContext.Provider value={contextValue}>
            {!loading && children}
        </ColourContext.Provider>
    );
}