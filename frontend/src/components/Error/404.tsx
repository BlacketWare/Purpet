import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import Background from "@components/Background";
import Header from "@components/Header";
import styles from "./styles.module.css";

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>404 | Purpet</title>
                <meta name="description" content="The page you are looking for does not exist." />
            </Helmet>
            <Header />
            <Background />

            <div className="regularBody">
                <div className={styles.goBack}>
                    <div className={styles.button} role="button" tabIndex={0} onClick={() => history.back()}>
                        <div className={styles.shadow} />
                        <div className={styles.edge} style={{ backgroundColor: "#3c005d" }} />
                        <div className={`${styles.front} ${styles.buttonInside}`} style={{ backgroundColor: "#3c005d" }}>
                            <FontAwesomeIcon icon={faReply} style={{ padding: "7px" }} />
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.containerHeader}>
                        4
                        <div className={styles.blookContainer}>
                            <img className={styles.blook} src="https://cdn.purpet.xyz/blooks/blobfish.svg" draggable="false" />
                        </div>
                        4
                    </div>
                    <div className={styles.containerText}>The page you are looking for does not exist.</div>
                </div>
            </div>
        </>
    );
}
