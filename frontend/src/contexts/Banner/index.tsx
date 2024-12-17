import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface BannerContextProps {
    allBanners: Banner[];
}

interface BannerProviderProps {
    children: JSX.Element;
}

interface Banner {
    id: string;
    name: string;
    rarity: string;
    price: number;
    chance: number;
    image: string;
    background: string;
}

const BannerContext = createContext<BannerContextProps | undefined>(undefined);

export function useBanners(): BannerContextProps {
    const context = useContext(BannerContext);
    if (!context) throw new Error("useBanners must be used within BannersProvider component");
    return context;
}

export function BannerProvider({ children }: BannerProviderProps) {
    const [loading, setLoading] = useState(true);
    const [allBanners, setAllBanners] = useState<Banner[]>([]);

    useEffect(() => {
        axios.get("/game/banners").then((response: AxiosResponse) => setAllBanners(response.data));
        setLoading(false);
    }, []);

    const contextValue: BannerContextProps = {
        allBanners
    };

    return (
        <BannerContext.Provider value={contextValue}>
            {!loading && children}
        </BannerContext.Provider>
    );
}
