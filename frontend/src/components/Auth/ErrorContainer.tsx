import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

interface ErrorContainerProps {
    errorText: string;
}

export default function ErrorContainer({ errorText }: ErrorContainerProps) {
    return (
        <div className={styles.errorContainer}>
            <FontAwesomeIcon icon={faTimesCircle} className={styles.errorIcon} />
            <div className={styles.errorText}>{errorText}</div>
        </div>
    );
}