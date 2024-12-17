import { Textfit } from "react-textfit";
import styles from "./styles.module.css";

interface TopThreeStandingsProps {
    place: number;
    username: string;
    avatar: string;
    tokens: number;
}

export default function TopThreeStandings({ place, username, avatar, tokens }: TopThreeStandingsProps) {
    const mainColors = ["One", "Two", "Three"];
    const otherColors = ["first", "second", "third"];

    return (
        <div className={styles[`container${mainColors[place - 1]}`]}>
            <div className={styles.containerInside}>
                <Textfit className={styles[`nameText${mainColors[place - 1]}`]} mode="single" max={100}><span style={{ fontFamily: "Titan One" }}>{username}</span></Textfit>
                <div className={styles[`scoreText${mainColors[place - 1]}`]}>{tokens}</div>
                <div className={styles[`place${mainColors[place - 1]}`]}>
                    <Textfit className={styles.placeText} mode="single" max={85}><span style={{ fontFamily: "Titan One" }}>{place}</span></Textfit>
                    <Textfit className={styles.placeSuffix} mode="single" max={30}><span style={{ fontFamily: "Titan One" }}>{place === 1 ? "st" : place === 2 ? "nd" : "rd"}</span></Textfit>
                </div>
                <div className={`${styles.blookContainer} ${styles[`${otherColors[place - 1]}Blook`]}`}>
                    <img className={styles.bigBlook} src={avatar} draggable="false" />
                </div>
            </div>
        </div>
    );
}
