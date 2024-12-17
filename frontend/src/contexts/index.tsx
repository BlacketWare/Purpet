import { AuthProvider } from "./Auth";
import { BlookProvider } from "./Blook";
import { BannerProvider } from "./Banner";
import { LeaderboardProvider } from "./Leaderboard";
import { PackProvider } from "./Pack";
import { RarityProvider } from "./Rarity";
import { ColourProvider } from "./Colour";

interface ContextWrapperProps {
    children: JSX.Element;
}

export default function ContextWrapper({ children }: ContextWrapperProps) {
    return (
        <AuthProvider>
            <BlookProvider>
                <PackProvider>

                    <BannerProvider>
                        <LeaderboardProvider>
                            <RarityProvider>
                                <ColourProvider>
                                    {children}
                                </ColourProvider>
                            </RarityProvider>
                        </LeaderboardProvider>
                    </BannerProvider>
                </PackProvider>
            </BlookProvider>
        </AuthProvider>
    );
}
