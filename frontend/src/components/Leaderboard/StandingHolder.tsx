import { Textfit } from "react-textfit";
import styles from "./styles.module.css";

interface StandingHolderProps {
    key: number;
    place: number;
    username: string;
    avatar: string;
    tokens: number;
}

export default function StandingHolder({ place, username, avatar, tokens }: StandingHolderProps) {
    return (
        <div className={styles.standingHolder}>
            <div className={styles.standingContainer}>
                <div className={styles.standingPlaceText}>{place}</div>
                <div className={styles.standingPlaceSuffix}>{place === 1 ? "st" : place === 2 ? "nd" : place === 3 ? "rd" : "th"}</div>
                <div className={`${styles.blookContainer} ${styles.standingBlook}`}>
                    <img className={styles.blook} src={avatar} draggable="false" />
                </div>
                <Textfit className={styles.standingNameText} mode="single" max={36}>{username}</Textfit>
                <div className={styles.standingStatText}>{tokens}</div>
            </div>
        </div>
    );
}
