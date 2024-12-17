import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Purpet</title>
                <meta name="description" content="Purpet is a new and cool Blooket Private server built on industry standards." />
            </Helmet>

            <div className={styles.headerContainer}>
                <img className={styles.headerImage} src="https://cdn.purpet.xyz/global/homeBlooks.png" draggable="false" />
                <div className={styles.headerSide} />
                <div className={styles.topHeaderContainer}>
                    <div className={styles.logoText}>Purpet</div>
                </div>

                <div className={styles.welcomeContainer}>
                    <div className={styles.welcomeText}>
                        Blooket
                        <br />
                        Private
                        <br />
                        Server
                    </div>

                    <div className={styles.welcomeDesc}>
                        Purpet is a <b>new</b> and cool <b>Blooket Private server</b><br />built on <b>industry standards</b>.
                    </div>

                    <div className={styles.welcomeButtonContainer}>
                        <Link className={styles.welcomeButton} to="/register">Get Started</Link>
                        <div className={styles.welcomeButton} role="button" tabIndex={0} onClick={() => window.open("https://discord.gg/Yu42pbV5Vr", "_blank")}>Discord</div>
                    </div>

                    <div className={styles.pronounceButton} role="button" tabIndex={0} onClick={() => new Audio("./purpet.wav").play()}>
                        <FontAwesomeIcon icon={faVolumeUp} className={styles.pronounceIcon} />
                        Pronunciation ("Pur-Pit")
                    </div>
                </div>
            </div>

            <div className={styles.topButtonContainer}>
                <Link className={`${styles.topButton} ${styles.loginButton}`} to="/login">Login</Link>
                <Link className={`${styles.topButton} ${styles.registerButton}`} to="/register">Register</Link>
            </div>
        </>
    );
}
