import styles from "./styles.module.css";

export default function OrContainer() {
    return (
        <div className={styles.orRow}>
            <div className={styles.orBar} />
            <div className={styles.orText}>or</div>
            <div className={styles.orBar} />
        </div>

    );
}