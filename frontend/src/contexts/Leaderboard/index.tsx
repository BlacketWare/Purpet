import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface LeaderboardContextProps {
    leaderboard: any[];
}

interface LeaderboardProviderProps {
    children: JSX.Element;
}

interface LeaderboardUser {
    username: string;
    avatar: string;
    tokens: number;
    color: string;
}

const LeaderboardContext = createContext<LeaderboardContextProps | undefined>(undefined);

export function useLeaderboard(): LeaderboardContextProps {
    const context = useContext(LeaderboardContext);
    if (!context) throw new Error("useLeaderboard must be used within LeaderboardProvider component");
    return context;
}

export function LeaderboardProvider({ children }: LeaderboardProviderProps) {
    const [loading, setLoading] = useState(true);
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

    useEffect(() => {
        axios.get("/leaderboard/tokens").then((response: AxiosResponse) => {
            setLeaderboard(response.data);
        }).catch(() => {
            setLeaderboard([]);
        });
        setLoading(false);
    }, []);

    const contextValue: LeaderboardContextProps = {
        leaderboard
    };

    return (
        <LeaderboardContext.Provider value={contextValue}>
            {!loading && children}
        </LeaderboardContext.Provider>
    );
}
