import { Helmet } from "react-helmet";
import { useLeaderboard } from "@contexts/Leaderboard";
import TopThreeStandings from "@components/Leaderboard/TopThreeStandings";
import StandingHolder from "@components/Leaderboard/StandingHolder";
import styles from "./styles.module.css";
import { constructBlook } from "@utils/ConstructUrl";

interface User {
    username: string;
    avatar: {
        id: number;
    };
    tokens: number;
}

export default function Leaderboard() {
    const { leaderboard } = useLeaderboard();

    return (
        <>
            <Helmet>
                <title>Leaderboard | Purpet</title>
                <meta name="description" content="Check out the Purpet leaderboard!" />
            </Helmet>

            <div className={styles.hostBody}>
                <div className={styles.leaderboardWrapper}>
                    {leaderboard.slice(0, 3).map((user: User, i: number) => (
                        <TopThreeStandings
                            key={i}
                            place={i + 1}
                            username={user.username}
                            avatar={constructBlook(user.avatar.id)}
                            tokens={user.tokens.toLocaleString()}
                        />
                    ))}

                    <div className={styles.standingsArray}>
                        <div className={styles.topThreeStandings}>
                            {leaderboard.slice(0, 3).map((user: User, i: number) => (
                                <StandingHolder
                                    key={i}
                                    place={i + 1}
                                    username={user.username}
                                    avatar={constructBlook(user.avatar.id)}
                                    tokens={user.tokens.toLocaleString()}
                                />
                            ))}
                        </div>
                        {leaderboard.slice(3).map((user: User, i: number) => (
                            <StandingHolder
                                key={i}
                                place={i + 4}
                                username={user.username}
                                avatar={constructBlook(user.avatar.id)}
                                tokens={user.tokens.toLocaleString()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
