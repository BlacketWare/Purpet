import { useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet";
import Background from "@components/Background";
import Header from "@components/Header";
import styles from "./styles.module.css";

interface RouterError {
    statusText?: string;
    message?: string;
}

export default function Error() {
    const error = useRouteError() as RouterError;

    return (
        <>
            <Helmet>
                <title>Error | Purpet</title>
                <meta name="description" content="The page you are looking for does not exist." />
            </Helmet>
            <Header />
            <Background />

            <div className="regularBody">
                <div className={styles.container}>
                    <div className={styles.containerHeader}>
                        5
                        <div className={styles.blookContainer}>
                            <img className={styles.blook} src="https://blooket.s3.us-east-2.amazonaws.com/blooks/aquatic/blobfish.svg" draggable="false" />
                        </div>
                        0
                    </div>

                    <div className={styles.containerText}>
                        {error.statusText || error.message}
                    </div>
                </div>
            </div>
        </>
    );
}
